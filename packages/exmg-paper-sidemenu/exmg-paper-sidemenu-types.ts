export interface MenuItem {
  path: string;
  iconPath: string;
  title: string;
}

export interface MenuGroupItem {
  title: string;
  items: MenuItem[];
}

export type MenuItemOrGroupItem = MenuItem | MenuGroupItem;

export function isItemGroup(i: MenuItemOrGroupItem): i is MenuGroupItem {
  return !!(i as MenuGroupItem).items;
}
