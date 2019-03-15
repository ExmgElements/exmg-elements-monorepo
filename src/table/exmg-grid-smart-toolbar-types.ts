export type ActionWithCondition<TCondition> = {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
  // conditionType: ConditionType;
  condition?: TCondition;
};

export enum ConditionType {
  AmountOfSelectedItemsRange = 'amount_of_items_range',
}

export type ActionAmountSelectedItemsCondition = {
  min?: number;
  max?: number;
};
