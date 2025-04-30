import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Select from "./Select";

test("selects merge their props with provided props", () => {
  const spy = jest.fn();
  render(
    <Select className="bg-red" onChange={spy}>
      <option>Option #1</option>
      <option>Option #2</option>
    </Select>
  );

  expect(screen.getByRole("combobox")).toHaveClass("bg-red outline-none");
  expect(screen.getAllByRole("option").length).toEqual(2);

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

  expect(spy).toHaveBeenCalled();
});

test("refs are forwarded to the DOM node", () => {
  const selectRef = createRef<HTMLSelectElement>();

  render(<Select ref={selectRef} />);

  expect(selectRef.current).toEqual(screen.getByRole("combobox"));
});
