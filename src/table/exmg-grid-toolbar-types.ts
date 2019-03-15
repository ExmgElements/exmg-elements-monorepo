export type Action = {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
  condition?: any;
};

export type Filter<ExtraOptionsType> = {
  id: string;
  type: FilterType;
  name: string;
  extraOptions: ExtraOptionsType;
};

export enum FilterType {
  SingleSelect = 'single_select',
}

export type SingleSelectFilterExtraOptions = {
  data: { id: string; title: string }[];
};
