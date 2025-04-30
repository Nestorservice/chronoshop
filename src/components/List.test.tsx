import { render, screen } from "../test-utils";
import List from "./List";

test("always displays the form", () => {
  render(<List />, { isFormVisible: true }, { initialEntries: ["/list/1"] });

  expect(screen.getByPlaceholderText(/eggs, milk/i)).toBeInTheDocument();
});

test("displays an empty state if no items exist", () => {
  render(<List />);

  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(screen.getByTestId("shopping-cart-icon")).toBeInTheDocument();
});

test("displays a list of items belonging to the list", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
      listId: 123,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: false,
      listId: 123,
    },
    {
      id: Date.now() + 2,
      name: "eggs",
      amount: "2",
      unit: "",
      checked: false,
      listId: 321,
    },
  ];

  render(<List />, { groceries }, { initialEntries: ["/list/123"] });

  expect(screen.queryByText(/open/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/done/i)).not.toBeInTheDocument();
  expect(screen.getByText(/milk/i)).toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
  expect(screen.queryByText(/eggs/i)).not.toBeInTheDocument();
});

test("sorts items by done and open", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
      listId: 123,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: true,
      listId: 123,
    },
  ];

  render(<List />, { groceries }, { initialEntries: ["/list/123"] });

  expect(screen.getByText(/open \(1\)/i)).toBeInTheDocument();
  expect(screen.getByText(/done \(1\)/i)).toBeInTheDocument();
  expect(screen.getAllByTestId("item")[0]).toHaveTextContent(/milk/i);
  expect(screen.getAllByTestId("item")[1]).toHaveTextContent(/bread/i);
  expect(screen.getByText(/milk/i)).not.toHaveClass("line-through");
  expect(screen.getByText(/bread/i)).toHaveClass("line-through");
});

test("hides the `open` title if all items are checked", () => {
  const groceries = [
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: true,
      listId: 123,
    },
  ];

  render(<List />, { groceries }, { initialEntries: ["/list/123"] });

  expect(screen.queryByText(/open/i)).not.toBeInTheDocument();
  expect(screen.getByText(/done \(1\)/i)).toBeInTheDocument();
});
