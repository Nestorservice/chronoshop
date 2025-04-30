import { act } from "react-dom/test-utils";
import { render, screen, userEvent } from "../test-utils";

import AppMenu from "./AppMenu";

test("opens and closes the menu", () => {
  render(<AppMenu />);

  expect(screen.getByTitle(/open menu/i)).toBeInTheDocument();
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("menu")).toBeInTheDocument();
  userEvent.type(screen.getByRole("menu"), "{esc}");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("always displays the `Settings` entry and navigates to the page", () => {
  render(<AppMenu />, {}, { withRoutes: true });

  userEvent.click(screen.getByRole("button"));
  expect(screen.queryByText(/delete list/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/clear all items/i)).not.toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  userEvent.click(screen.getByText(/settings/i));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/settings page/i);
});

test("clears all items from a list", async () => {
  const spy = jest.fn();
  render(<AppMenu />, { dispatch: spy }, { initialEntries: ["/list/123"], withRoutes: true });

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByText(/clear all items/i));
  expect(screen.getByRole("dialog")).toHaveTextContent(/clear all items/i);
  userEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByText(/clear all items/i));
  userEvent.click(screen.getByTitle(/submit/i));

  await Promise.resolve();

  expect(spy).toHaveBeenCalledWith({ type: "CLEAR_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/list page/i);
});

test("deletes a list and navigates to the homepage", async () => {
  const spy = jest.fn();
  render(<AppMenu />, { dispatch: spy }, { initialEntries: ["/list/123"], withRoutes: true });

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByText(/delete list/i));
  expect(screen.getByRole("dialog")).toHaveTextContent(/delete list/i);
  userEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByText(/delete list/i));
  userEvent.click(screen.getByTitle(/submit/i));

  await act(async () => {
    await Promise.resolve();
  });

  expect(spy).toHaveBeenCalledWith({ type: "DELETE_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
});
