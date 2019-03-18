import {customElement, html, LitElement, property} from 'lit-element';
import './exmg-grid-toolbar';
import {Filter} from './exmg-grid-toolbar-types';
import {
  ActionAmountSelectedItemsCondition,
  ActionWithCondition,
  ActionConditionType,
  BaseActionCondition
} from './exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-smart-toolbar')
export class ExmgRadioGroup extends LitElement {
  @property({type: String})
  description: string = '';

  @property({type: Object})
  actions: ActionWithCondition[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Number, attribute: 'amount-of-selected-items'})
  amountOfSelectedItems: number = 0;

  private getActions() {
    return this.actions.filter((action) => {
      return this.shouldActionBeVisible(action);
    });
  }

  private shouldActionBeVisible(action: ActionWithCondition) {
    if (this.isActionAmountSelectedItemsCondition(action)) {
      return this.checkAmountOfSelectedItemsRangeCondition(action);
    }

    return true;
  }

  private isActionAmountSelectedItemsCondition(
    action: ActionWithCondition<BaseActionCondition>
  ): action is ActionWithCondition<ActionAmountSelectedItemsCondition> {
    return !!action.condition && (action.condition!.type === ActionConditionType.AmountOfSelectedItemsRange);
  }

  private checkAmountOfSelectedItemsRangeCondition(action: ActionWithCondition<ActionAmountSelectedItemsCondition>): boolean {
    const condition = action.condition;
    const min = condition!.min;

    if (min !== undefined && this.amountOfSelectedItems < min) {
      return false;
    }

    const max = condition!.max;

    if (max !== undefined && this.amountOfSelectedItems > max) {
      return false;
    }

    return true;
  }

  render() {
    return html`
      <exmg-grid-toolbar
        .actions="${this.getActions()}"
        description="${this.description}"
        .filters="${this.filters}"
      ></exmg-grid-toolbar>
    `;
  }
}
