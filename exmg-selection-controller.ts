/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {ExmgRadioGroupItem} from './exmg-radio-group-item';

/**
 * Unique symbol for marking roots
 */
const selectionController = Symbol('selection controller');

class SelectionSet {
  selected: ExmgRadioGroupItem | null = null;
  ordered: ExmgRadioGroupItem[] | null = null;
  readonly set = new Set<ExmgRadioGroupItem>();
}

export class SelectionController {
  private sets: {[name: string]: SelectionSet} = {};

  private focusedSet: SelectionSet | null = null;

  private mouseIsDown = false;

  private updating = false;

  static getController(element: Node) {
    const root = <any>element;
    if (!root[selectionController]) {
      root[selectionController] = new SelectionController(root);
    }
    return root[selectionController] as SelectionController;
  }

  constructor(element: Node) {
    // console.log('SelectionController constructor', element);
    element.addEventListener('keydown', (e: Event) => this.keyDownHandler(e as KeyboardEvent));
    element.addEventListener('mousedown', () => this.mousedownHandler());
    element.addEventListener('mouseup', () => this.mouseupHandler());
  }

  protected keyDownHandler(e: KeyboardEvent) {
    if (!(e.target instanceof ExmgRadioGroupItem)) {
      return;
    }
    const element = e.target;
    if (!this.has(element)) {
      return;
    }
    if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
      this.next(element);
    } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
      this.previous(element);
    }
  }

  protected mousedownHandler() {
    this.mouseIsDown = true;
  }

  protected mouseupHandler() {
    this.mouseIsDown = false;
  }

  has(element: ExmgRadioGroupItem) {
    const set = this.getSet(element.name);
    return set.set.has(element);
  }

  previous(element: ExmgRadioGroupItem) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i-1] || order[order.length-1]);
  }

  next(element: ExmgRadioGroupItem) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i+1] || order[0]);
  }

  select(element: ExmgRadioGroupItem) {
    element.click();
  }

  /**
   * Helps to track the focused selection group and if it changes, focuses
   * the selected item in the group. This matches native radio button behavior.
   */
  focus(element: ExmgRadioGroupItem) {
    // Only manage focus state when using keyboard
    if (this.mouseIsDown) {
      return;
    }
    const set = this.getSet(element.name);
    const currentFocusedSet = this.focusedSet;
    this.focusedSet = set;
    if (currentFocusedSet != set && set.selected && set.selected != element) {
      set.selected!.focusNative();
    }
  }

  getOrdered(element: ExmgRadioGroupItem) {
    const set = this.getSet(element.name);
    if (!set.ordered) {
      set.ordered = Array.from(set.set);
      set.ordered.sort((a, b) =>
        a.compareDocumentPosition(b) == Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
      );
    }
    return set.ordered;
  }

  getSet(name: string) {
    if (!this.sets[name]) {
      this.sets[name] = new SelectionSet();
    }
    return this.sets[name];
  }

  register(element: ExmgRadioGroupItem) {
    const set = this.getSet(element.name);
    set.set.add(element);
    set.ordered = null;
  }

  unregister(element: ExmgRadioGroupItem) {
    const set = this.getSet(element.name);
    set.set.delete(element);
    set.ordered = null;
    if (set.selected == element) {
      set.selected = null;
    }
  }

  update(element: ExmgRadioGroupItem) {
    if (this.updating) {
      return;
    }
    this.updating = true;
    if (element.checked) {
      const set = this.getSet(element.name);
      for (const e of set.set) {
        e.checked = (e == element);
      }
      set.selected = element;
    }
    this.updating = false;
  }
}
