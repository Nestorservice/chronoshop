import { render, fireEvent, screen } from "@testing-library/react";

import Checkbox from "./Checkbox";

test("renders the checkbox inside a label", () => {
  render(<Checkbox />);

  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

test("all props are forwarded", () => {
  const spy = jest.fn();
  render(<Checkbox onChange={spy} checked title="testing" />);

  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByTitle(/testing/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("checkbox"));

  expect(spy).toHaveBeenCalled();
});
