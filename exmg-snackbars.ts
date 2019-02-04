import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-toast';
import './exmg-snackbars-icons';

export interface ExmgSnackbarsOptionsInterface {
  showCloseButton?: boolean;
  duration?: number;
  toastContainerNodeId?: string;
}

function _getToastContainerNode(originalOptions?: ExmgSnackbarsOptionsInterface): Node {
  const options = {
    toastContainerNodeId: 'paper-toast-container',
    ...originalOptions
  };

  const existingNode = document.querySelector('#' + options.toastContainerNodeId);

  if (existingNode) {
    return existingNode;
  }

  let toastContainerNode = document.createElement('div');
  toastContainerNode.id = options.toastContainerNodeId;
  document.body.appendChild(toastContainerNode);

  return toastContainerNode;
}

function _getToastCloseBtnNode() {
  const node = document.createElement('paper-icon-button');

  node.icon = 'exmg-icons:close';
  node.onclick = function() {
    const that = <HTMLElement>this;
    (<any>that.parentElement).toggle();
  };

  return node;
}

function _getToastNode(message: string, originalOptions?: ExmgSnackbarsOptionsInterface) {
  const node = document.createElement('paper-toast');
  const options = {
    showCloseButton: false,
    duration: 3000,
    ...originalOptions
  };

  node.text = message;
  node.duration = options.duration;

  if (options.showCloseButton) {
    node.appendChild(_getToastCloseBtnNode());
  }

  return node;
}

export function showSnackBar(message: string, originalOptions?: ExmgSnackbarsOptionsInterface) {
  const toastContainerNode = _getToastContainerNode(originalOptions);
  const toastNode = _getToastNode(message, originalOptions);

  toastContainerNode.appendChild(toastNode);

  toastNode.open();

  (new MutationObserver((_mutationsList: MutationRecord[], observer: MutationObserver) => {
    if (!toastNode.opened) {
      observer.disconnect();
      toastContainerNode.removeChild(toastNode);
    }
  })).observe(toastNode, { attributes: true });
}
