export type Action = {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
};

export type Filter<TExtraOptions> = {
  id: string;
  type: FilterType;
  name: string;
  extraOptions: TExtraOptions;
};

export enum FilterType {
  SingleSelect = 'single_select',
}

export type FilterSingleSelectExtraOptions = {
  data: { id: string; title: string }[];
};
