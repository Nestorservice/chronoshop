import { Grocery, GroceryList } from "../types";

export function getItemsByList(listId: number, items: Grocery[]) {
  return items.filter((item) => item.listId === listId);
}

export function getPageTitle(lists: GroceryList[], listId?: number) {
  if (!listId) {
    return "ChronoShop";
  }

  return lists?.find((list) => list.id === listId)?.name || "Liste vide pour l'instant";
}

export function getListIdFromURL(pathname: string) {
  const [, , listId] = pathname.split(/\//g);

  return listId ? Number(listId) : undefined;
}

export function getSortedItems(items: Grocery[], sortByChecked: boolean): [Grocery[], Grocery[]] {
  if (sortByChecked) {
    const checked = items.filter((item) => item.checked);
    const unchecked = items.filter((item) => !item.checked);

    return [unchecked, checked];
  }

  return [items, []];
}
