import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import Select from "./Select";
import Checkbox from "./Checkbox";
import __, { availableLanguages } from "../utils/translate";

function Settings() {
  const { dispatch, settings } = useContext(GroceryContext);

  return (
    <main className="px-2 mx-auto max-w-xl w-full">
      <form>
        <label htmlFor="language" className="block mb-1 mt-4">
          {__("settings.language", settings.language)}
        </label>

        <Select
          id="language"
          data-testid="language-select"
          value={settings.language}
          onChange={(event) => dispatch({ type: "CHANGE_LANGUAGE", payload: event.target.value })}
        >
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {__(language, language)}
            </option>
          ))}
        </Select>

        <Checkbox
          className="mt-8"
          checked={settings.sortByChecked}
          onChange={() => dispatch({ type: "CHANGE_SORTING", payload: !settings.sortByChecked })}
        >
          {__("settings.sortLabel", settings.language)}
        </Checkbox>
      </form>
    </main>
  );
}

export default Settings;
