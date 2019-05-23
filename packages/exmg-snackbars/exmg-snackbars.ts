import '@polymer/paper-toast';
import {closeIcon} from './exmg-snackbars-icons';

export interface ExmgSnackbarsOptionsInterface {
  showCloseButton?: boolean;
  duration?: number;
  toastContainerNodeId?: string;
}

const getToastContainerNode = (originalOptions?: ExmgSnackbarsOptionsInterface): Node => {
  const options = {
    toastContainerNodeId: 'paper-toast-container',
    ...originalOptions,
  };

  const existingNode = document.querySelector(`#${options.toastContainerNodeId}`);

  if (existingNode) {
    return existingNode;
  }

  const toastContainerNode = document.createElement('div');
  toastContainerNode.id = options.toastContainerNodeId;
  document.body.appendChild(toastContainerNode);

  return toastContainerNode;
};

const getToastCloseBtnNode = () => {
  const node = document.createElement('div');

  node.className = 'close-btn';
  node.style.display = 'inline-block';
  node.style.padding = '8px';
  node.style.position = 'relative';
  node.style.outline = 'none';
  node.style.userSelect = 'none';
  node.style.cursor = 'pointer';
  node.style.zIndex = '0';
  node.style.lineHeight = '1';
  node.style.boxSizing = 'border-box !important';

  node.innerHTML = closeIcon;

  node.onclick = function () {
    const that = <HTMLElement>this;
    (<any>that.parentElement).toggle();
  };

  return node;
};

const getToastNode = (message: string, originalOptions?: ExmgSnackbarsOptionsInterface) => {
  const node = document.createElement('paper-toast');
  const options = {
    showCloseButton: false,
    duration: 3000,
    ...originalOptions,
  };

  node.text = message;
  node.duration = options.duration;

  if (options.showCloseButton) {
    node.appendChild(getToastCloseBtnNode());
  }

  return node;
};

export const showSnackBar = (message: string, originalOptions?: ExmgSnackbarsOptionsInterface) => {
  const toastContainerNode = getToastContainerNode(originalOptions);
  const toastNode = getToastNode(message, originalOptions);

  toastContainerNode.appendChild(toastNode);

  toastNode.open();

  const mutationObserver = new MutationObserver((_: MutationRecord[], observer: MutationObserver) => {
    if (!toastNode.opened) {
      observer.disconnect();
      toastContainerNode.removeChild(toastNode);
    }
  });

  mutationObserver.observe(toastNode, {attributes: true});
};
