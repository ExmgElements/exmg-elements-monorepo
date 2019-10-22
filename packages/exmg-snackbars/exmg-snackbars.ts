import '@polymer/paper-toast';
import {closeIcon} from './exmg-snackbars-icons';
import {PaperToastElement} from '@polymer/paper-toast';

export interface ExmgSnackbarsOptionsInterface {
  showCloseButton?: boolean;
  copyButton?: string;
  callbackButton?: Function;
  duration?: number;
  toastContainerNodeId?: string;
  position?: {
    top: number;
    left: number;
  };
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

const getToastCloseBtnNode = (): HTMLDivElement => {
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

  node.onclick = function() {
    const that = this as HTMLElement;
    // eslint-disable-next-line
    (that.parentElement as any).toggle();
  };

  return node;
};

const getCustomToastNode = ({copyButton, callbackButton}: {copyButton: string; callbackButton?: Function}): HTMLDivElement => {
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
  node.style.color = 'var(--mdc-theme-primary, #0071dc)';
  node.style.marginLeft = '32px';

  node.innerHTML = `<a>${copyButton}</a>`;

  node.onclick = function() {
    const that = this as HTMLElement;
    if (callbackButton) {
      callbackButton();
    }
    // eslint-disable-next-line
    (that.parentElement as any).toggle();
  };

  return node;
};

const getToastNode = (message: string, originalOptions?: ExmgSnackbarsOptionsInterface): PaperToastElement => {
  const node = document.createElement('paper-toast');
  const options = {
    showCloseButton: false,
    copyButton: undefined,
    callbackButton: undefined,
    duration: 3000,
    position: undefined,
    ...originalOptions,
  };

  if (options.position) {
    node.verticalAlign = 'top';
    node.verticalOffset = options.position.top;
    node.horizontalAlign = 'left';
    node.horizontalOffset = options.position.left;
  }

  node.text = message;
  node.duration = options.duration;

  if (options.showCloseButton) {
    node.appendChild(getToastCloseBtnNode());
  }
  if (options.copyButton) {
    node.appendChild(getCustomToastNode({copyButton: options.copyButton, callbackButton: options.callbackButton}));
  }

  return node;
};

export const showSnackBar = (message: string, originalOptions?: ExmgSnackbarsOptionsInterface): void => {
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
