import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

import Input from "./Input";
import Button from "./Button";
import { GroceryContext } from "../GroceryContext";
import __ from "../utils/translate";

function NewListDialog() {
  const navigate = useNavigate();
  const { dispatch, isNewListDialogVisible, settings } = useContext(GroceryContext);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState<number | string>("");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const id = Date.now();

    dispatch({
      type: "ADD_LIST",
      payload: {
        id,
        name: name || __("newListDialog.placeholder", settings.language),
        budget: Number(budget) || 0,
      },
    });

    navigate(`/list/${id}`);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" });
      }
    }

    if (isNewListDialogVisible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        setName("");
        setBudget("");
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [dispatch, isNewListDialogVisible]);

  if (!isNewListDialogVisible) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-fadeIn"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {__("newListDialog.title", settings.language) || "Créer une nouvelle liste"}
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              {__("newListDialog.label", settings.language)}
            </label>
            <Input
              type="text"
              id="name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full"
              placeholder={__("newListDialog.placeholder", settings.language)}
            />
          </div>

          <div>
            <label htmlFor="budget" className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              {__("newListDialog.budget", settings.language) || "Budget"}
            </label>
            <Input
              type="number"
              id="budget"
              min="0"
              step="0.01"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="w-full"
              placeholder="0.00"
            />
          </div>
        </div>

        <footer className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
            variant="secondary"
            onClick={() => dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" })}
            title={__("newListDialog.cancel", settings.language)}
          >
            <XIcon className="w-5 h-5" />
            {__("newListDialog.cancel", settings.language)}
          </Button>
          <Button
            type="submit"
            className="flex items-center justify-center gap-1"
            title={__("newListDialog.submit", settings.language)}
          >
            <CheckIcon className="w-5 h-5" />
            {__("newListDialog.submit", settings.language)}
          </Button>
        </footer>
      </form>
    </div>
  );
}

export default NewListDialog;
