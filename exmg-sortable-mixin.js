import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
import {microTask} from '@polymer/polymer/lib/utils/async.js';
import {addListener, removeListener} from '@polymer/polymer/lib/utils/gestures.js';


/**
* Orientation map to limit dragging to horizontal or vertical.
*/
const orientationMap =  {
  horizontal: {x: 1, y: 0},
  vertical: {x: 0, y: 1}
};

/**
 * Element class mixin that enables drag and drop sorting of nodes in a list, table or any other set of
 * elements as selected by the selector property. Fires a cancelable `dom-order-change` event with `sourceIndex` and
 * `targetIndex` properties indicating user intent of the drag operation. This event may be prevented to keep the
 * dom order as is. The handler is then assumed to update the dom, for instance via a model update.
 *
 * The host element MUST define a CSS `position` value other than `static`, preferably `relative`. This ensures that
 * the dragged element can be properly positioned within it. A block-like `display` value is advised as well.
 *
 * @polymer
 * @mixinFunction
 * @demo demo/index.html
 */
const ExmgSortableMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this._trackListener = e => this._handleTrack(e);
  }

  static get properties() {
    return {
      /**
       * Animation timing options
       * @type {{ duration: number, easing: string }}
       */
      animationTiming: {
        type: Object,
        value: {duration: 200, easing: 'ease-out'}
      },

      // CSS class for the dragged node's clone
      cloneClass: {
        type: String,
        value: 'clone'
      },

      // CSS class for the node that is being dragged
      draggedClass: {
        type: String,
        value: 'dragged'
      },

      // Toggle to enable / disable sorting
      draggingDisabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
      },

      // Optional handle selector to drag items with instead of items themselves.
      handleSelector: String,

      // CSS Selector for the nodes that should be draggagle.
      itemSelector: String,

      // Optionally set to "horizontal" or "vertical" to lock drag orientation.
      orientation: String
    };
  }

  /**
   * Toggles the track listener depending on the `draggingDisabled` property.
   *
   * @param {Boolean} newValue
   * @param {Boolean} oldValue
   */
  _disabledChanged(value) {
    if (value === false) {
      addListener(this, 'track', this._trackListener);
    } else {
      removeListener(this, 'track', this._trackListener);
    }
  }

  /**
   * Tracks a pointer from touchstart/mousedown to touchend/mouseup. Note that the start state is fired following
   * the first actual move event following a touchstart/mousedown.
   *
   * @param {CustomEvent} trackEvent
   */
  _handleTrack(e) {
    switch (e.detail.state) {
      case 'start':
        this._trackStart(e);
        break;
      case 'track':
        this._trackMove(e);
        break;
      case 'end':
        this._trackEnd(e);
        break;
    }
  }

  /**
   * Fast and simple hit test to check whether the center of a node intersects with the rectangle of any of the
   * given targets. Returns an array of matches.
   *
   * @param {Node} node
   * @param {Array} targets
   * @return {Array} matches
   */
  _hitTest(node, targets) {
    const {left, top, width, height} = node.getBoundingClientRect();
    const x = left + (width / 2);
    const y = top + (height / 2);

    return targets.filter(item => {
      const {left, right, top, bottom} = item.getBoundingClientRect();
      return ! (x < left || x > right || y < top || y > bottom);
    });
  }

  /**
   * Clones a given node to visually drag around. The original node is left in the same flow as its siblings. Clone
   * styles are added onto the style object directly, since the ::slotted() selector can't universally target nodes
   * that may be nested an unknown amount of shadow dom levels deep.
   *
   * @param {Node} node
   * @return {Node} clone
   */
  _createClone(node) {
    const clone = node.cloneNode(true);
    const {offsetLeft: x, offsetTop: y} = node;

    Object.assign(clone.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      willChange: 'transform,opacity',
    });

    clone.classList.add(this.cloneClass);

    return node.parentNode.appendChild(clone);
  }

  /**
   * Initialized a drag and drop sequence if a child node was clicked that matches the itemSelector property. If a
   * handleSelector is defined, a node matching this selector must be clicked instead.
   *
   * @param {CustomEvent} trackEvent
   */
  _trackStart(e) {
    const handle = this.handleSelector;
    if (handle && !e.target.closest(handle)) {
      return;
    }

    const selector = this.itemSelector;
    const node = e.target.closest(selector);

    if (node) {
      e.preventDefault();

      this._current = node;
      this._nodes = Array.from(this.querySelectorAll(selector));
      this._clone = this._createClone(node);
      this._origin = node.nextSibling;
      this._animating = [];
  
      this._limiter = orientationMap[this.orientation];
      
      node.classList.add(this.draggedClass);
    }
  }

  /**
   * Moves the active node's clone to follow the pointer. The node that the clone intersects with (via hitTest) is
   * the insert point for updated sorting.
   *
   * @param {CustomEvent} trackEvent
   */
  _trackMove(e) {
    const {_current, _clone, _limiter} = this;
    if (!_current) {
      return;
    }

    e.preventDefault();

    let {dx, dy} = e.detail;
    if (_limiter) {
      dx = dx * _limiter.x;
      dy = dy * _limiter.y;
    }

    Object.assign(_clone.style, {
      'transform': `translate3d(${dx}px, ${dy}px, 0)`
    });

    const target = this._hitTest(_clone, this._nodes)[0];
    if (
      // if clone intersects with a valid target,
      target &&
      // other than its own origin,
      (target !== _current) &&
      // and the target isn't currently animating, which causes false hit tests,
      this._isAnimating(target) === false
    ) {
      this._insertAtTarget(_current, target);
    }
    
  }

  /**
   * Inserts node at target to update sibling sorting. If the node precedes the target, it is inserted after it;
   * If it follows the target, it is inserted before it. This ensures any node can be dragged from the very
   * beginning to the very end and vice versa. The animateNode function is called for all nodes that moved because
   * of this dom update.
   *
   * @param {Node} node
   * @param {Node} target
   */
  _insertAtTarget(node, target) {
    const offsets = this._nodes.map(item => ({
      x: item.offsetLeft,
      y: item.offsetTop
    }));

    const insert = (node.compareDocumentPosition(target) & 4) ? target.nextSibling : target;
    node.parentNode.insertBefore(node, insert);

    // this._nodes.forEach((node, i) => {
    //   const {x, y} = offsets[i];
    //   const dx = x - node.offsetLeft;
    //   const dy = y - node.offsetTop;
    //   if (dx !== 0 || dy !== 0) {
    //     console.log('ani', dx, dy);
    //     this._animateNode(node, dx, dy);
    //   }
    // });
  }

  /**
   * Triggers a CSS animation on a node with the given dx and dy. Used following dom updates to make it appear as
   * if nodes animate from their old to their new position in the dom.
   *
   * @param {Node} node
   * @param {number} dx
   * @param {number} dy
   */
  _animateNode(node, dx, dy) {
    if (!node.animate) {
      return;
    }

    // keep a stack of currently animating nodes to exclude as drag & drop targets.
    const anims = this._animating;
    anims.push(node);

    // animate from dx/dy (old node position) to none (new node position)
    node.animate([
      {transform: `translate3d(${dx}px, ${dy}px, 0)`},
      {transform: 'none'},

    ], this.animationTiming).addEventListener('finish', e => {
      const index = anims.indexOf(node);
      if (index > -1) {
        // splice out when done to unlock as a valid target
        anims.splice(index, 1);
      }
    });
  }

  /**
   * Returns a boolean indicating whether the node is currently in an animation.
   *
   * @param {Node} node
   * @returns {boolean} isAnimating
   */
  _isAnimating(node) {
    return this._animating.indexOf(node) > -1;
  }

  /**
   * Ends the drag and drop sequence and updates the new node order to the instance's items for binding and
   * rendering purposes.
   *
   * @param {CustomEvent} trackEvent
   */
  _trackEnd(e) {
    const {_current, _clone, _origin, _nodes} = this;

    if (!_current) {
      return;
    }

    const updated = Array.from(this.querySelectorAll(this.itemSelector));
    const sourceIndex = _nodes.indexOf(_current);
    const targetIndex = updated.indexOf(_current);

    if (sourceIndex !== targetIndex) {
      const orderEvent = new CustomEvent('dom-order-change', {
        bubbles: false,
        cancelable: true,
        detail: {
          sourceIndex: sourceIndex,
          targetIndex: targetIndex
        }
      });

      this.dispatchEvent(orderEvent);

      // if prevented, the handler is assumed to update the dom itself, for instance via a model update.
      if (orderEvent.defaultPrevented) {
        _current.parentNode.insertBefore(_current, _origin);
      }
    }

    _clone.parentNode.removeChild(_clone);
    _current.classList.remove(this.draggedClass);

    delete this._clone;
    delete this._current;
  }

};

export const SortableMixin = dedupingMixin(ExmgSortableMixin);

/**
 * Fired on release and contains `sourceIndex` and `targetindex` properties on the event's details that indicate
 * the user's intent. May be prevented to not have sortable change dom order.
 *
 * @event dom-order-change
 * @param {number} sourceIndex
 * @param {number} targetIndex
 */