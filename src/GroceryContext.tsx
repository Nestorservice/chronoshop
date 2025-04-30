import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { LocalStorage } from "./utils/constants";
import { GroceryActions, GroceryState } from "./types";

type GroceryContextState = GroceryState & {
  dispatch: Dispatch<GroceryActions>;
};

const INITIAL_STATE: GroceryState = {
  settings: {
    language: "fr",
    sortByChecked: true,
  },
  groceries: [],
  editing: null,
  isFormVisible: true,
  isNewListDialogVisible: false,
  lists: [],
};

function initState(initialState: GroceryState): GroceryState {
  const groceries = localStorage.getItem(LocalStorage.Groceries);
  const lists = localStorage.getItem(LocalStorage.Lists);
  const settings = localStorage.getItem(LocalStorage.Settings);
  const isFormVisible = localStorage.getItem(LocalStorage.FormVisible);

  return {
    editing: null,
    groceries: groceries ? JSON.parse(groceries) : INITIAL_STATE.groceries,
    lists: lists ? JSON.parse(lists) : INITIAL_STATE.lists,
    settings: settings ? JSON.parse(settings) : INITIAL_STATE.settings,
    isFormVisible: isFormVisible === "true" || isFormVisible === null,
    isNewListDialogVisible: false,
  };
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, initState);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Groceries, JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.FormVisible, String(state.isFormVisible));
  }, [state.isFormVisible]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Settings, JSON.stringify(state.settings));

    document.head.lang = state.settings.language;
  }, [state.settings]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Lists, JSON.stringify(state.lists));
  }, [state.lists]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export default ContextProvider;
export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);
