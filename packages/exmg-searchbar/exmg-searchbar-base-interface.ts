import {TemplateResult} from 'lit-html';
import {ExmgSearchSuggestion} from './exmg-searchbar-base';

export interface ExmgSearchBarBaseInterface {
  filter(data: any[], filterKeys: string[], query: string): ExmgSearchSuggestion[];
  renderSuggestions(suggestions: ExmgSearchSuggestion[]): TemplateResult;
  renderSuggestionsLoading(): TemplateResult;
}
