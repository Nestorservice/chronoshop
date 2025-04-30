import { render, fireEvent, screen } from "@testing-library/react";

import RadioButton from "./RadioButton";

test("renders the value correctly", () => {
  render(<RadioButton onClick={jest.fn()} onChange={jest.fn()} value="mg" checked={false} />);

  expect(screen.getByLabelText(/mg/i)).toBeInTheDocument();
  expect((screen.getByRole("radio") as HTMLInputElement).value).toEqual("mg");
  expect((screen.getByRole("radio") as HTMLInputElement).type).toEqual("radio");
});

test("calls the `onChange` and `onClick` functions", () => {
  const spy = jest.fn();
  render(<RadioButton onClick={spy} onChange={spy} value="mg" checked={false} />);

  fireEvent.click(screen.getByRole("radio"));
  expect(spy).toHaveBeenCalledTimes(2);
});
