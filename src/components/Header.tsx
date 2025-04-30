import { ArrowLeftIcon, EyeIcon, EyeOffIcon, PlusIcon } from "@heroicons/react/outline";
import { useContext, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import { getListIdFromURL, getPageTitle } from "../utils/helpers";
import __ from "../utils/translate";
import AppMenu from "./AppMenu";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch, settings, lists, isFormVisible } = useContext(GroceryContext);
  const listId = getListIdFromURL(pathname);

  function handleClick(evt: MouseEvent) {
    if (window.history.length > 1) {
      evt.preventDefault();
      navigate(-1);
    }
  }

  return (
    <header className="bg-indigo-500 text-white shadow-md relative z-20">
      <div className="max-w-xl mx-auto px-2 flex h-12 items-center">
        {pathname !== "/" && (
          <Link
            to="/"
            onClick={handleClick}
            title={__("header.goBack", settings.language)}
            className="w-10 h-10 mr-2 -ml-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-indigo-700 rounded-full focus:outline-none"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
        )}

        <h1 className="mr-auto uppercase tracking-wider font-semibold text-xs select-none">
          {getPageTitle(lists, listId)}
        </h1>

        {pathname === "/" && (
          <button
            type="button"
            className="w-10 h-10 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-indigo-700 rounded-full focus:outline-none"
            onClick={() => dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" })}
            title={__("header.createList", settings.language)}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        )}

        {pathname.includes("/list") && (
          <>
            <button
              type="button"
              className="w-10 h-10 mr-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-indigo-700 rounded-full focus:outline-none"
              onClick={() => dispatch({ type: "TOGGLE_FORM" })}
              title={__("header.toggleForm", settings.language)}
            >
              {isFormVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
          </>
        )}

        <AppMenu />
      </div>
    </header>
  );
}

export default Header;
