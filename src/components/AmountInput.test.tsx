import { render, fireEvent, screen } from "../test-utils";
import AmountInput from "./AmountInput";

test("the amount is changed by typing in the input", () => {
  const spy = jest.fn();
  render(<AmountInput value="" onChange={spy} />);

  expect(screen.getByPlaceholderText(/qt/i)).not.toHaveValue();
  fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "100" } });
  expect(spy).toHaveBeenCalledWith("100");
});

test("the amount is increased by 1 if it's smaller than 10", () => {
  const spy = jest.fn();
  render(<AmountInput value="9" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("10");
});

test("the amount is increased by 10 if it's smaller than 100", () => {
  const spy = jest.fn();
  render(<AmountInput value="23" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("30");
});

test("the amount is increased by 50 if it's bigger than 100", () => {
  const spy = jest.fn();
  render(<AmountInput value="141" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("150");
});

test("the amount is decreased by 1 if it's smaller than 10", () => {
  const spy = jest.fn();
  render(<AmountInput value="9" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("8");
});

test("the amount is decreased by 10 if it's smaller than 100", () => {
  const spy = jest.fn();
  render(<AmountInput value="40" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("30");
});

test("the amount is decreased by 50 if it's bigger than 100", () => {
  const spy = jest.fn();
  render(<AmountInput value="200" onChange={spy} />);

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("150");
});
