import { useContext } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import { GroceryList } from "../types";
import { getItemsByList } from "../utils/helpers";
import __ from "../utils/translate";

type ListCardProps = {
  list: GroceryList;
};

function ListCard({ list }: ListCardProps) {
  const { groceries, settings } = useContext(GroceryContext);
  const items = getItemsByList(list.id, groceries);

  return (
    <Link
      to={`/list/${list.id}`}
      className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col p-4 relative h-[250px] overflow-hidden group"
    >
      <div className="mb-3">
        <h2 className="font-bold text-lg text-indigo-800 truncate">{list.name}</h2>
        {list.budget && (
          <p className="text-sm text-gray-600 mt-1">
            Budget : <span className="font-medium text-green-600">{list.budget} FCFA</span>
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <ul className="flex-1 overflow-auto pr-1 custom-scrollbar relative">
          {items.slice(0, 10).map((item) => (
            <li
              key={item.id}
              className={cx(
                "text-sm mb-1 transition-opacity",
                {
                  "line-through text-gray-400": item.checked,
                  "text-gray-700": !item.checked,
                }
              )}
            >
              <span className="font-medium">{item.name}</span>{" "}
              <span className="text-xs text-gray-500">
                ({item.amount}) • {new Date(item.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
        </ul>
      ) : (
        <span className="text-sm text-gray-500 italic">
          {__("card.empty", settings.language)}
        </span>
      )}
    </Link>
  );
}

export default ListCard;
