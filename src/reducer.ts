import { GroceryState, GroceryActions } from "./types";

function reducer(state: GroceryState, action: GroceryActions): GroceryState {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.groceries.find(
        (grocery) => grocery.name === action.payload.name
      );

      if (existing) {
        return {
          ...state,
          groceries: state.groceries.map((grocery) => {
            if (existing.id === grocery.id) {
              return {
                ...grocery,
                amount: String(Number(grocery.amount) + Number(action.payload.amount)),
              };
            }

            return grocery;
          }),
        };
      }

      return { ...state, groceries: [...state.groceries, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        editing: null,
        groceries: state.groceries.map((grocery) => {
          if (grocery.id === action.payload.id) {
            return action.payload;
          }

          return grocery;
        }),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        editing: null,
        groceries: state.groceries.filter((grocery) => grocery.id !== action.payload.id),
      };
    case "DELETE_ALL":
      return { ...state, groceries: [] };
    case "SELECT_ITEM":
      return { ...state, editing: action.payload, isFormVisible: true };
    case "DESELECT_ITEM":
      return { ...state, editing: null };
    case "TOGGLE_CHECK_ITEM":
      return {
        ...state,
        groceries: state.groceries.map((grocery) => {
          if (grocery.id === action.payload.id) {
            return { ...grocery, checked: !grocery.checked };
          }

          return grocery;
        }),
      };
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload,
        },
      };
    case "CHANGE_SORTING":
      return {
        ...state,
        settings: {
          ...state.settings,
          sortByChecked: action.payload,
        },
      };
    case "TOGGLE_FORM":
      return {
        ...state,
        isFormVisible: !state.isFormVisible,
      };
    case "TOGGLE_NEW_LIST_DIALOG":
      return {
        ...state,
        isNewListDialogVisible: !state.isNewListDialogVisible,
      };
    case "ADD_LIST":
      return {
        ...state,
        lists: [...state.lists, action.payload],
        isFormVisible: true,
        isNewListDialogVisible: false,
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        groceries: state.groceries.filter((grocery) => grocery.listId !== action.payload),
      };
    case "CLEAR_LIST":
      return {
        ...state,
        groceries: state.groceries.filter((grocery) => grocery.listId !== action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
