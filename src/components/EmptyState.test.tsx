import { render, screen } from "@testing-library/react";

import EmptyState from "./EmptyState";

test("displays the title, text, and image", () => {
  render(<EmptyState title="Empty title" text="Empty text" />);

  expect(screen.getByRole("heading")).toHaveTextContent(/empty title/i);
  expect(screen.getByText(/empty text/i)).toBeInTheDocument();
  expect(screen.getByTestId("shopping-cart-icon")).toBeInTheDocument();
});
