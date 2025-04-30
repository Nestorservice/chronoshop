import { render, screen } from "../test-utils";
import ListCard from "./ListCard";

test("renders a link with the list title and items", () => {
  render(<ListCard list={{ id: 1, name: "List #1" }} />, {
    groceries: [
      { id: 1, listId: 1, name: "Item #1", checked: false, unit: "", amount: "" },
      { id: 2, listId: 1, name: "Item #2", checked: true, unit: "", amount: "" },
      { id: 3, listId: 2, name: "Item #3", checked: false, unit: "", amount: "" },
    ],
  });

  expect(screen.getByRole("link")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", "/list/1");
  expect(screen.getByText(/list #1/i)).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/item #1/i);
  expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(/item #2/i);
  expect(screen.getAllByRole("listitem")[0]).not.toHaveClass("line-through");
  expect(screen.getAllByRole("listitem")[1]).toHaveClass("line-through");
});

test("doesn't render more than 10 items", () => {
  render(<ListCard list={{ id: 1, name: "List #1" }} />, {
    groceries: [
      { id: 1, listId: 1, name: "Item #1", unit: "", amount: "", checked: false },
      { id: 2, listId: 1, name: "Item #2", unit: "", amount: "", checked: false },
      { id: 3, listId: 1, name: "Item #3", unit: "", amount: "", checked: false },
      { id: 4, listId: 1, name: "Item #4", unit: "", amount: "", checked: false },
      { id: 5, listId: 1, name: "Item #5", unit: "", amount: "", checked: false },
      { id: 6, listId: 1, name: "Item #6", unit: "", amount: "", checked: false },
      { id: 7, listId: 1, name: "Item #7", unit: "", amount: "", checked: false },
      { id: 8, listId: 1, name: "Item #8", unit: "", amount: "", checked: false },
      { id: 9, listId: 1, name: "Item #9", unit: "", amount: "", checked: false },
      { id: 10, listId: 1, name: "Item #10", unit: "", amount: "", checked: false },
      { id: 11, listId: 1, name: "Item #11", unit: "", amount: "", checked: false },
    ],
  });

  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

test("displays an empty state", () => {
  render(<ListCard list={{ id: 1, name: "List #1" }} />);

  expect(screen.getByText(/this list is empty/i)).toBeInTheDocument();
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});
