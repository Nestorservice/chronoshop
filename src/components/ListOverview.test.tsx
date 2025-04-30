import { render, screen } from "../test-utils";
import ListOverview from "./ListOverview";

test("it displays all lists", () => {
  render(<ListOverview />, {
    lists: [
      { id: 1, name: "List #1" },
      { id: 2, name: "List #2" },
      { id: 3, name: "List #3" },
    ],
  });

  expect(screen.getAllByRole("link")).toHaveLength(3);
  expect(screen.getAllByRole("link")[0]).toHaveTextContent(/list #1/i);
});
