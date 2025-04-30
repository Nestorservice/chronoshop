import { render, fireEvent, screen } from "../test-utils";
import NewListDialog from "./NewListDialog";

test("renders a form with a label, input, and buttons", () => {
  render(<NewListDialog />, { isNewListDialogVisible: false });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  render(<NewListDialog />, { isNewListDialogVisible: true }, { clean: true });

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText(/provide a name/i)).toBeInTheDocument();
  expect(screen.getByTitle(/create list/i)).toBeInTheDocument();
  expect(screen.getByTitle(/cancel/i)).toBeInTheDocument();
});

test("calls dispatch to create a new list", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01").getTime());
  const spy = jest.fn();

  render(<NewListDialog />, {
    dispatch: spy,
    isNewListDialogVisible: true,
  });

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "List #1" } });
  fireEvent.click(screen.getByTitle(/create list/i));
  expect(spy).toHaveBeenCalledWith({
    type: "ADD_LIST",
    payload: { name: "List #1", id: 1577836800000 },
  });

  jest.useRealTimers();
});

test("calls dispatch to hide the dialog", () => {
  const spy = jest.fn();

  render(<NewListDialog />, {
    dispatch: spy,
    isNewListDialogVisible: true,
  });

  fireEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_NEW_LIST_DIALOG" });
  fireEvent.keyDown(document, { key: "Escape" });
  fireEvent.keyDown(document, { key: "Enter" });
  expect(spy).toHaveBeenCalledTimes(2);
});
