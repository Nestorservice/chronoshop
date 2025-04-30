
export type Grocery = {
  id: number;
  name: string;
  amount: string; 
  checked: boolean;
  listId: number;
  createdAt: string;
};

export type GroceryList = {
  id: number;
  name: string;
  budget: number;
};

export type Settings = {
  language: string;
  sortByChecked: boolean;
};

export type GroceryState = {
  lists: GroceryList[];
  groceries: Grocery[];
  editing: Grocery | null;
  settings: Settings;
  isFormVisible: boolean;
  isNewListDialogVisible: boolean;
};


export type GroceryActions =
  // Gestion des articles
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "UPDATE_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "SELECT_ITEM"; payload: Grocery }
  | { type: "DESELECT_ITEM" }
  | { type: "DELETE_ALL" }

  | { type: "ADD_LIST"; payload: GroceryList }
  | { type: "DELETE_LIST"; payload: number }
  | { type: "CLEAR_LIST"; payload: number }
  | { type: "UPDATE_LIST_BUDGET"; payload: { listId: number; newBudget: number } }

  | { type: "CHANGE_LANGUAGE"; payload: string }
  | { type: "CHANGE_SORTING"; payload: boolean }
  | { type: "TOGGLE_FORM" }
  | { type: "TOGGLE_NEW_LIST_DIALOG" };
