import { render, fireEvent, screen } from "../test-utils";
import Settings from "./Settings";

test("renders null if `isSettingsVisible` is falsy", () => {
  render(<Settings />);

  expect(screen.queryByRole("form")).not.toBeInTheDocument();
});

test("lets a user change the language", () => {
  const spy = jest.fn();
  render(<Settings />, { dispatch: spy });

  expect(screen.getByText(/language/i)).toBeInTheDocument();
  expect(screen.getAllByRole("option").length).toEqual(3);
  fireEvent.change(screen.getByTestId("language-select"), { target: { value: "de" } });
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_LANGUAGE", payload: "de" });
});

test("lets a user change the item sort order", () => {
  const spy = jest.fn();
  render(<Settings />, { dispatch: spy });

  expect(screen.getByLabelText(/sort items/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/sort items/i)).toBeChecked();
  fireEvent.click(screen.getByLabelText(/sort items/i));
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_SORTING", payload: false });
});
