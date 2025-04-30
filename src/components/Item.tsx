import { useContext, useRef } from "react";
import cx from "classnames";

import { GroceryContext } from "../GroceryContext";
import { Grocery } from "../types";
import __ from "../utils/translate";
import Checkbox from "./Checkbox";
import withConfirmation, { ConfirmFunctionType } from "./Confirmable";

type ItemProps = {
  item: Grocery;
} & ConfirmFunctionType;

function Item({ item, confirm }: ItemProps) {
  const { dispatch, settings } = useContext(GroceryContext);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const hasFired = useRef(false);

  function reset() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      hasFired.current = false;
    }
  }

  async function handlePointerDown() {
    timer.current = setTimeout(async () => {
      window.navigator.vibrate?.(100);

      const confirmed = await confirm({
        title: __("list.deleteItem", settings.language),
        content: __("list.confirmDeleteItem", settings.language),
      });

      if (confirmed) {
        dispatch({ type: "DELETE_ITEM", payload: item });
      }

      hasFired.current = true;
    }, 500);
  }

  function handlePointerUp() {
    reset();

    if (!hasFired.current) {
      dispatch({ type: "SELECT_ITEM", payload: item });
      hasFired.current = false;
    }
  }

  return (
    <article
      data-testid="item"
      className="transition-transform duration-300 hover:scale-[1.01] hover:shadow-md bg-white rounded-md my-2 border border-gray-200 px-3 py-3 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="flex-1 text-left focus:outline-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={reset}
        >
          <h2
            className={cx(
              "text-base font-medium text-gray-800 transition-colors duration-300",
              { "line-through text-gray-400": item.checked }
            )}
          >
            {item.name}
          </h2>
          {item.amount && (
            <p className="text-xs text-gray-500 mt-1">
              {item.amount} &middot;{" "}
              <span className="italic opacity-70">{item.createdAt}</span>
            </p>
          )}
        </button>

        <div className="flex-shrink-0">
          <Checkbox
            checked={item.checked}
            onChange={() =>
              dispatch({ type: "TOGGLE_CHECK_ITEM", payload: item })
            }
            aria-label={__(
              item.checked ? "list.uncheck" : "list.check",
              settings.language
            )}
          />
        </div>
      </div>
    </article>
  );
}

export default withConfirmation(Item);
