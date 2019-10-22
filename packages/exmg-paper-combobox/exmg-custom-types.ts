export type GenericPropertyValues<T, V = unknown> = Map<T, V>;

export interface LitEvent extends Event {
  path: HTMLElement[];
}

export const isEventWithPath = (event: Event): event is LitEvent => {
  return !!event && event.hasOwnProperty('path');
};

export interface Token {
  id: number | string;
  text: string;
}

export interface EventSelectPayload {
  value: number | string;
  item: Element;
  token: Token;
}
