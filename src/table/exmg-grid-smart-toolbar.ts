import {customElement, html, LitElement, property} from 'lit-element';
import './exmg-grid-toolbar';
import {Filter} from './exmg-grid-toolbar-types';
import {ActionAmountSelectedItemsCondition, ActionWithCondition} from './exmg-grid-smart-toolbar-types';

@customElement('exmg-grid-smart-toolbar')
export class ExmgRadioGroup extends LitElement {
  @property({type: String})
  description: string = '';

  @property({type: Object})
  actions: ActionWithCondition<any>[] = [];

  @property({type: Object})
  filters: Filter<any>[] = [];

  @property({type: Number, attribute: 'amount-of-selected-items'})
  amountOfSelectedItems: number = 0;

  private getActions() {
    return this.actions.filter((action) => {
      return this.shouldActionBeVisible(action);
    });
  }

  private shouldActionBeVisible(action: ActionWithCondition<any>) {
    if (this.actionWithSelectedItemsCondition(action)) {
      if ((action.condition!.min! !== undefined) && this.amountOfSelectedItems < action.condition!.min) {
        return false;
      }

      if ((action.condition!.max! !== undefined) && this.amountOfSelectedItems > action.condition!.max) {
        return false;
      }

      return true;
    }

    return true;
  }

  private actionWithSelectedItemsCondition(
    action: ActionWithCondition<any>
  ): action is ActionWithCondition<ActionAmountSelectedItemsCondition> {
    const condition = (<ActionWithCondition<ActionAmountSelectedItemsCondition>>action).condition;

    return condition !== undefined && (condition.min !== undefined || condition.max !== undefined);
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
