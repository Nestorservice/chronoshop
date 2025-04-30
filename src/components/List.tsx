import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import Form from "./Form";
import __ from "../utils/translate";
import { getItemsByList, getListIdFromURL, getSortedItems } from "../utils/helpers";
import EmptyState from "./EmptyState";

function List() {
  const { pathname } = useLocation();
  const { groceries, settings } = useContext(GroceryContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const groceriesRef = useRef(groceries);
  const items = getItemsByList(getListIdFromURL(pathname)!, groceries);
  const [uncheckedItems, checkedItems] = getSortedItems(items, settings.sortByChecked);

  useEffect(() => {
    if (groceries.length > groceriesRef.current.length) {
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    groceriesRef.current = groceries;
  }, [groceries]);

  return (
    <>
      <Form />

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-lg shadow-inner space-y-6 custom-scrollbar"
      >
        {uncheckedItems.length > 0 && (
          <section className="max-w-2xl mx-auto">
            {checkedItems.length > 0 && (
              <h4 className="uppercase text-xs font-semibold text-gray-500 tracking-widest mb-2">
                {__("list.uncheckedItems", settings.language)} ({uncheckedItems.length})
              </h4>
            )}
            <div className="space-y-2">
              {uncheckedItems.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {checkedItems.length > 0 && (
          <section className="max-w-2xl mx-auto border-t pt-4 border-gray-300">
            <h4 className="uppercase text-xs font-semibold text-gray-500 tracking-widest mb-2">
              {__("list.checkedItems", settings.language)} ({checkedItems.length})
            </h4>
            <div className="space-y-2 opacity-70">
              {checkedItems.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {items.length === 0 && (
          <div className="max-w-md mx-auto mt-10">
            <EmptyState
              title={__("list.emptyState.title", settings.language)}
              text={__("list.emptyState.subtitle", settings.language)}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default List;
