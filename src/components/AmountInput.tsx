import { useContext } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

import { GroceryContext } from "../GroceryContext";
import Input from "./Input";
import Button from "./Button";
import __ from "../utils/translate";

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function getUpdatedAmount(amount: number, factor: number, subtract: boolean = false) {
  if (subtract) {
    return amount - factor - ((amount + factor) % factor);
  }

  return amount + factor - ((amount + factor) % factor);
}

function AmountInput({ value, onChange }: AmountInputProps) {
  const { settings } = useContext(GroceryContext);

  function increase() {
    const amountAsNumber = Number(value);

    if (amountAsNumber < 10) {
      onChange(String(amountAsNumber + 1));
    } else if (amountAsNumber >= 10 && amountAsNumber < 100) {
      onChange(String(getUpdatedAmount(amountAsNumber, 10)));
    } else {
      onChange(String(getUpdatedAmount(amountAsNumber, 50)));
    }
  }

  function decrease() {
    const amountAsNumber = Number(value);

    if (amountAsNumber <= 10 && amountAsNumber > 0) {
      onChange(String(amountAsNumber - 1));
    } else if (amountAsNumber > 10 && amountAsNumber <= 100) {
      onChange(String(getUpdatedAmount(amountAsNumber, 10, true)));
    } else {
      onChange(String(getUpdatedAmount(amountAsNumber, 50, true)));
    }
  }

  return (
    <div className="relative max-w-[120px]">
      <Button
        type="button"
        className="w-8 absolute flex items-center justify-center left-1 top-1"
        variant="secondary"
        size="small"
        onClick={decrease}
        disabled={value === "" || value === "0"}
        title={__("form.decrease", settings.language)}
      >
        <MinusIcon className="w-5 h-5" />
      </Button>
      <Input
        className="text-center w-full"
        type="number"
        placeholder={__("form.quantity", settings.language)}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
      <Button
        type="button"
        className="w-8 absolute flex items-center justify-center right-1 top-1"
        variant="secondary"
        size="small"
        onClick={increase}
        title={__("form.increase", settings.language)}
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default AmountInput;
