import { render, fireEvent, screen } from "../test-utils";
import Header from "./Header";

test("displays the app name on the homepage", () => {
  render(<Header />);

  expect(screen.getByText(/grocerly/i)).toBeInTheDocument();
});

test("displays the list title on the list page", () => {
  render(<Header />, { lists: [{ id: 123, name: "List #1" }] }, { initialEntries: ["/list/123"] });

  expect(screen.getByText(/list #1/i)).toBeInTheDocument();
  expect(screen.queryByText(/grocerly/i)).not.toBeInTheDocument();
});

test("displays the app menu", () => {
  render(<Header />, {}, { initialEntries: ["/"] });

  expect(screen.getByTitle(/open menu/i)).toBeInTheDocument();
});

test("navigates to the homepage if no history entries exist", () => {
  render(
    <Header />,
    { lists: [{ id: 123, name: "List #1" }] },
    { initialEntries: ["/list/123"], withRoutes: true }
  );

  expect(screen.getByText(/list page/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/back/i));
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});

test("navigates back if history entries exist", () => {
  window.history.pushState({}, "1");

  render(
    <Header />,
    { lists: [{ id: 123, name: "List #1" }] },
    { initialEntries: ["/", "/list/123", "/settings"], withRoutes: true }
  );

  expect(screen.getByText(/settings page/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/back/i));
  expect(screen.getByText(/list page/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/back/i));
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});

test("calls dispatch to toggle the form", () => {
  const spy = jest.fn();
  render(<Header />, { dispatch: spy }, { initialEntries: ["/list/123"] });

  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_FORM" });

  render(<Header />, {}, { initialEntries: ["/settings"], clean: true });

  expect(screen.queryByTitle(/toggle form/i)).not.toBeInTheDocument();

  render(<Header />, {}, { initialEntries: ["/"], clean: true });

  expect(screen.queryByTitle(/toggle form/i)).not.toBeInTheDocument();
});

test("calls dispatch to show the `NewListDialog`", () => {
  const spy = jest.fn();
  render(<Header />, { dispatch: spy }, { initialEntries: ["/"] });

  fireEvent.click(screen.getByTitle(/create new list/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_NEW_LIST_DIALOG" });

  render(<Header />, {}, { initialEntries: ["/settings"], clean: true });

  expect(screen.queryByTitle(/create new list/i)).not.toBeInTheDocument();

  render(<Header />, {}, { initialEntries: ["/list/123"], clean: true });

  expect(screen.queryByTitle(/create new list/i)).not.toBeInTheDocument();
});
