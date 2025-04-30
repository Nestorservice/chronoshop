import { render, screen } from "@testing-library/react";

import Button from "./Button";

test("buttons display all given content", () => {
  render(
    <Button>
      Hello <span data-testid="span">World </span>
    </Button>
  );

  expect(screen.getByRole("button")).toHaveTextContent(/hello world/i);
  expect(screen.getByTestId("span")).toBeInTheDocument();
});

test("buttons merge their props with provided props", () => {
  render(
    <Button className="bg-red" type="submit" form="form1">
      Hello World
    </Button>
  );

  expect(screen.getByRole("button")).toHaveClass("bg-red outline-none");
  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  expect(screen.getByRole("button")).toHaveAttribute("form", "form1");
});
