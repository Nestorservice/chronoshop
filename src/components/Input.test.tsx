import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Input from "./Input";

test("inputs merge their props with provided props", () => {
  const spy = jest.fn();
  render(<Input className="bg-red" placeholder="Enter your name" onChange={spy} />);

  expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveClass("bg-red outline-none");

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "John Doe" } });

  expect(spy).toHaveBeenCalled();
});

test("refs are forwarded to the DOM node", () => {
  const inputRef = createRef<HTMLInputElement>();

  render(<Input ref={inputRef} />);

  expect(inputRef.current).toEqual(screen.getByRole("textbox"));
});
