export interface Action {
  id: string;
  icon?: string;
  text?: string;
  tooltip?: string;
}

export interface Filter<TConfig extends BaseFilterConfig = BaseFilterConfig> {
  id: string;
  name: string;
  disabled?: boolean;
  config: TConfig;
}

export enum FilterConfigType {
  SingleSelect = 'single_select',
}

export interface BaseFilterConfig {
  type?: FilterConfigType;
}

export interface FilterSingleSelectConfig extends BaseFilterConfig {
  data: {id: string; title: string}[];
}

export interface Setting<TConfig extends BaseSettingConfig = BaseSettingConfig> {
  id: string;
  icon?: string;
  dialogTitle?: string;
  tooltip?: string;
  config: TConfig;
}

export enum SettingConfigType {
  SelectionList = 'selection_list',
}

export enum SettingConfigId {
  ColumnSelector = 'column-selector',
}

export interface BaseSettingConfig {
  type?: SettingConfigType;
}

export interface SettingSelectionListItem {
  id: string;
  title: string;
  selected?: boolean;
}

export interface SettingSelectionListConfig extends BaseSettingConfig {
  data: SettingSelectionListItem[];
}

export interface EventDetailGridToolbarSettingChanged {
  id: string;
  value: SettingSelectionListItem[];
}
