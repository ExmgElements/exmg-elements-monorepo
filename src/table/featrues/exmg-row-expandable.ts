import {ExmgQuerySelectors} from '../exmg-query-selectors';

export class ExmgRowExpandable {

  constructor(
    private querySelectors: ExmgQuerySelectors,
    private expandableToggleSelector: string,
  ) {}

  initFeature(): void {
    this.querySelectors.getTableBody().querySelectorAll<HTMLElement>(`${this.expandableToggleSelector}:not([data-is-expandable])`)
      .forEach(triggerElement => {
        triggerElement.setAttribute('data-is-expandable', '');
        this.registerClickListener(triggerElement);
      });
  }

  updateFeature(): void {
    this.initFeature();
  }

  private registerClickListener(triggerElement: HTMLElement): void {
    triggerElement.addEventListener('click', (event: Event) => {
      const parentRow = triggerElement.closest('tr');
      const rowDetail = parentRow && parentRow.nextElementSibling as HTMLTableRowElement;
      if (!parentRow || !rowDetail) {
        console.error(`Cannot find parent <tr> for selector ${this.expandableToggleSelector}`);
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = triggerElement.hasAttribute('data-is-expanded');
      if (isExpanded) {
        triggerElement.removeAttribute('data-is-expanded');
        rowDetail.removeAttribute('data-is-row-expanded');
      } else {
        triggerElement.setAttribute('data-is-expanded', '');
        rowDetail.setAttribute('data-is-row-expanded', '');
      }
    });
  }
}
