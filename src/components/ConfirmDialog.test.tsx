import { render, fireEvent, screen } from "@testing-library/react";

import ConfirmDialog from "./ConfirmDialog";

test("doesn't render when `open` is false", () => {
  render(<ConfirmDialog open={false} title="" onCancel={jest.fn()} onSubmit={jest.fn()} />);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("displays the title", () => {
  render(<ConfirmDialog open title="Testing" onCancel={jest.fn()} onSubmit={jest.fn()} />);

  expect(screen.getByRole("heading")).toHaveTextContent(/testing/i);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("displays the content if provided", () => {
  render(
    <ConfirmDialog
      open
      title="Testing"
      content="Hello World"
      onCancel={jest.fn()}
      onSubmit={jest.fn()}
    />
  );

  expect(screen.getByRole("dialog")).toHaveTextContent(/hello world/i);
});

test("calls `onCancel` when the dialog is canceled", () => {
  const spy = jest.fn();
  render(<ConfirmDialog open title="Testing" onCancel={spy} onSubmit={jest.fn()} />);

  fireEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).toHaveBeenCalled();
  fireEvent.keyDown(document.body, { key: "Escape" });
  expect(spy).toHaveBeenCalledTimes(2);
});

test("calls `onSubmit` when the dialog is confirmed", () => {
  const spy = jest.fn();
  render(<ConfirmDialog open title="Testing" onCancel={jest.fn()} onSubmit={spy} />);

  fireEvent.click(screen.getByTitle(/submit/i));
  expect(spy).toHaveBeenCalled();
});
