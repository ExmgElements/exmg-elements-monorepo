export type Action = {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
};

export type Filter<TConfig extends BaseFilterConfig = BaseFilterConfig> = {
  id: string;
  name: string;
  disabled?: boolean;
  config: TConfig;
};

export enum FilterConfigType {
  SingleSelect = 'single_select',
}

export interface BaseFilterConfig {
  type?: FilterConfigType;
}

export interface FilterSingleSelectConfig extends BaseFilterConfig {
  data: { id: string; title: string }[];
}

export type Setting = {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
};
