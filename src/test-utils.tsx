import { ReactNode, Dispatch } from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { GroceryContext } from "./GroceryContext";
import { GroceryState, GroceryActions } from "./types";

const DEFAULT_CONTEXT_STATE: GroceryState = {
  groceries: [],
  lists: [],
  editing: null,
  isFormVisible: false,
  isNewListDialogVisible: false,
  settings: {
    language: "en",
    sortByChecked: true,
  },
};

type GroceryContextState = GroceryState & {
  dispatch: Dispatch<GroceryActions>;
};

function renderWithContext(
  children: ReactNode,
  props?: Partial<GroceryContextState>,
  options?: { withRoutes?: boolean; initialEntries?: string[]; clean?: boolean }
) {
  const state: GroceryContextState = { ...DEFAULT_CONTEXT_STATE, dispatch: jest.fn(), ...props };

  if (options?.clean) {
    cleanup();
  }

  return render(
    <MemoryRouter initialEntries={options?.initialEntries || ["/"]}>
      <GroceryContext.Provider value={state}>{children}</GroceryContext.Provider>
      {options?.withRoutes && (
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/settings" element={<h1>Settings page</h1>} />
          <Route path="/list/:listId" element={<h1>List page</h1>} />
        </Routes>
      )}
    </MemoryRouter>
  );
}

export * from "@testing-library/react";
export { userEvent };
export { renderWithContext as render };
