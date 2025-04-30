import { render, fireEvent, screen } from "../test-utils";
import Item from "./Item";

const getItem = () => ({
  id: Date.now(),
  name: "milk",
  amount: "1",
  unit: "l",
  checked: false,
  listId: 123,
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test("displays the correct item data", () => {
  render(<Item item={getItem()} />);

  expect(screen.getByRole("checkbox")).not.toBeChecked();
  expect(screen.getByText(/1l/i)).toBeInTheDocument();
  expect(screen.getByText(/milk/i)).toBeInTheDocument();
});

test("an item is striked-through when checked", () => {
  render(<Item item={getItem()} />);

  expect(screen.getByRole("heading")).not.toHaveClass("line-through");

  render(<Item item={{ ...getItem(), checked: true }} />, {}, { clean: true });

  expect(screen.getByRole("heading")).toHaveClass("line-through");
});

test("deletes an item when pressing for more than 500 ms", async () => {
  window.navigator.vibrate = jest.fn();

  const spy = jest.fn();
  const item = getItem();

  render(<Item item={item} confirm={jest.fn(() => Promise.resolve(true))} />, { dispatch: spy });

  fireEvent.pointerDown(screen.getByText(/milk/i));

  jest.advanceTimersByTime(400);

  expect(spy).not.toHaveBeenCalled();
  fireEvent.pointerDown(screen.getByText(/milk/i));

  jest.advanceTimersByTime(500);
  await Promise.resolve();

  expect(window.navigator.vibrate).toHaveBeenCalledWith(100);
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ITEM", payload: item });
});

test("does not delete an item if the confirmation is falsy", async () => {
  window.navigator.vibrate = jest.fn();

  const spy = jest.fn();
  const item = getItem();
  render(<Item item={item} confirm={jest.fn(() => Promise.resolve(false))} />, { dispatch: spy });

  fireEvent.pointerDown(screen.getByText(/milk/i));

  jest.advanceTimersByTime(500);
  await Promise.resolve();

  expect(window.navigator.vibrate).toHaveBeenCalled();
  expect(spy).not.toHaveBeenCalled();
});

test("edits an item with a single click", () => {
  const spy = jest.fn();
  const confirm = jest.fn();
  const item = getItem();

  render(<Item item={item} confirm={confirm} />, { dispatch: spy });

  fireEvent.pointerDown(screen.getByText(/milk/i));

  jest.advanceTimersByTime(100);

  fireEvent.pointerUp(screen.getByText(/milk/i));

  expect(spy).toHaveBeenCalledWith({ type: "SELECT_ITEM", payload: item });

  jest.advanceTimersByTime(400);

  expect(confirm).not.toHaveBeenCalled();
});

test("toggles an item on or off", () => {
  const spy = jest.fn();
  const item = getItem();
  render(<Item item={item} />, { dispatch: spy });

  fireEvent.click(screen.getByRole("checkbox"));

  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_CHECK_ITEM", payload: item });

  fireEvent.click(screen.getByRole("checkbox"));

  expect(spy).toHaveBeenCalledTimes(2);
});
