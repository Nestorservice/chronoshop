import {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useLocation } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/outline";

import { GroceryContext } from "../GroceryContext";
import __ from "../utils/translate";
import AmountInput from "./AmountInput";
import Input from "./Input";
import Button from "./Button";
import { getListIdFromURL } from "../utils/helpers";

function Form() {
  const { pathname } = useLocation();
  const { editing, dispatch, settings, isFormVisible, groceries, lists } = useContext(GroceryContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  

  const listId = getListIdFromURL(pathname);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setAmount(editing.amount);
    } else {
      setName("");
      setAmount("");
    }
  }, [editing]);

  useEffect(() => {
    if (isFormVisible) {
      return () => {
        setName("");
        setAmount("");
        dispatch({ type: "DESELECT_ITEM" });
      };
    }
  }, [isFormVisible, dispatch]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!listId) return;

    const currentList = lists.find((l) => l.id === listId);
    const listItems = groceries.filter((g) => g.listId === listId);
    const currentTotal = listItems.reduce((sum, item) => sum + parseFloat(item.amount || "0"), 0);
    const newItemAmount = parseFloat(amount || "0");

    if (!editing && currentList?.budget !== undefined) {
      if (currentTotal + newItemAmount > currentList.budget) {
        alert("💸 Dépassement de budget ! Vous ne pouvez pas ajouter cet article.");
        return;
      }
    }

    const payload = {
      listId: listId,
      id: editing ? editing.id : Date.now(),
      name,
      amount,
      checked: editing ? editing.checked : false,
      createdAt: editing ? editing.createdAt : new Date().toISOString(),
    };

    dispatch({
      type: editing ? "UPDATE_ITEM" : "ADD_ITEM",
      payload,
    });

    if (!editing) {
      inputRef.current?.focus();
    }

    setName("");
    setAmount("");
  };

  if (!isFormVisible) {
    return null;
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="bg-white shadow-md relative z-10">
      <div className="max-w-xl mx-auto p-2 flex flex-wrap gap-2">
        <AmountInput value={amount} onChange={setAmount} />

        <Input
          ref={inputRef}
          className="flex-1"
          type="text"
          value={name}
          placeholder={__("form.name", settings.language)}
          onChange={(evt) => setName(evt.target.value)}
          autoFocus
        />

        <Button type="submit" disabled={name.length < 1} data-testid="submit" variant="secondary">
          <CheckIcon className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}

export default Form;
