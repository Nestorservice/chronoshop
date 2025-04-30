import reducer from "./reducer";
import { Grocery, GroceryList, Settings } from "./types";

type StateProps = {
  lists?: GroceryList[];
  groceries?: Grocery[];
  editing?: Grocery | null;
  settings?: Settings;
  isFormVisible?: boolean;
  isNewListDialogVisible?: boolean;
};

function getItems(amount: number = 2): Grocery[] {
  return [
    {
      id: 1,
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
      listId: 1,
    },
    {
      id: 2,
      name: "bread",
      amount: "",
      unit: "",
      checked: true,
      listId: 2,
    },
  ].slice(0, amount);
}

function getLists(amount: number = 2): GroceryList[] {
  return [
    {
      id: 1,
      name: "List #1",
    },
    {
      id: 2,
      name: "List #2",
    },
  ].slice(0, amount);
}

function getState({
  groceries = [],
  editing = null,
  settings = { language: "en", sortByChecked: true },
  isFormVisible = false,
  isNewListDialogVisible = false,
  lists = [],
}: StateProps = {}) {
  return {
    editing,
    groceries,
    settings,
    isFormVisible,
    isNewListDialogVisible,
    lists,
  };
}

test("adds a new item", () => {
  const [item] = getItems(1);
  const state = reducer(getState(), { type: "ADD_ITEM", payload: item });

  expect(state.groceries).toMatchObject([item]);
});

test("sums up the same item's amount", () => {
  const [item] = getItems(1);
  const state = reducer(getState({ groceries: getItems() }), {
    type: "ADD_ITEM",
    payload: item,
  });

  expect(state.groceries[0].amount).toEqual("2");
});

test("removes an item and clears the currently editing", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items, editing: items[0] }), {
    type: "DELETE_ITEM",
    payload: items[0],
  });

  expect(state.groceries).toMatchObject([items[1]]);
  expect(state.editing).toEqual(null);
});

it("clears all items", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), { type: "DELETE_ALL" });

  expect(state.groceries.length).toEqual(0);
});

test("toggles an item's checked state", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), {
    type: "TOGGLE_CHECK_ITEM",
    payload: items[0],
  });

  expect(state.groceries[0].checked).toEqual(true);
  expect(state.groceries[1].checked).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(newState.groceries[0].checked).toEqual(false);
  expect(newState.groceries[1].checked).toEqual(true);
});

test("selects an item", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), {
    type: "SELECT_ITEM",
    payload: items[0],
  });

  expect(state.editing).toMatchObject(items[0]);
});

test("deselects an item", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items, editing: items[0] }), {
    type: "DESELECT_ITEM",
  });

  expect(state.editing).toBeNull();
});

test("updates an existing item", () => {
  const items = getItems();
  const updated = { ...items[0], name: "water", unit: "ml" };
  const state = reducer(getState({ groceries: items, editing: items[0] }), {
    type: "UPDATE_ITEM",
    payload: updated,
  });

  expect(state.editing).toEqual(null);
  expect(state.groceries[0]).toMatchObject({
    id: items[0].id,
    name: "water",
    amount: "1",
    unit: "ml",
    checked: false,
  });
});

test("changes the language", () => {
  const state = reducer(getState(), { type: "CHANGE_LANGUAGE", payload: "de" });

  expect(state.settings.language).toEqual("de");
});

test("changes the item sort order", () => {
  const state = reducer(getState(), { type: "CHANGE_SORTING", payload: false });

  expect(state.settings.sortByChecked).toEqual(false);
});

test("toggles the form", () => {
  const state = reducer(getState(), { type: "TOGGLE_FORM" });

  expect(state.isFormVisible).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_FORM" });

  expect(newState.isFormVisible).toEqual(false);
});

test("toggles the new list dialog", () => {
  const state = reducer(getState(), { type: "TOGGLE_NEW_LIST_DIALOG" });

  expect(state.isNewListDialogVisible).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_NEW_LIST_DIALOG" });

  expect(newState.isNewListDialogVisible).toEqual(false);
});

test("adds a new list", () => {
  const state = reducer(getState(), {
    type: "ADD_LIST",
    payload: {
      id: 123,
      name: "List #1",
    },
  });

  expect(state.lists).toHaveLength(1);
  expect(state.lists[0].name).toEqual("List #1");
  expect(state.isFormVisible).toEqual(true);

  const newState = reducer(state, {
    type: "ADD_LIST",
    payload: {
      id: 456,
      name: "List #2",
    },
  });

  expect(newState.lists.length).toEqual(2);
});

test("removes a list", () => {
  const lists = getLists();
  const groceries = getItems();

  const state = reducer(getState({ lists, groceries }), {
    type: "DELETE_LIST",
    payload: lists[0].id,
  });

  expect(state.lists).toHaveLength(1);
  expect(state.lists[0].id).toEqual(2);
  expect(state.groceries).toHaveLength(1);
  expect(state.groceries[0].id).toEqual(2);
});

test("clears all items from a list", () => {
  const lists = getLists();
  const groceries = getItems();

  const state = reducer(getState({ lists, groceries }), {
    type: "CLEAR_LIST",
    payload: 1,
  });

  expect(state.groceries).toHaveLength(1);
});

test("returns the default state", () => {
  const state = reducer(getState(), {
    // @ts-ignore
    type: "INVALID",
  });

  expect(state).toEqual(getState());
});
