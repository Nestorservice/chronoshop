import __, { availableLanguages } from "./translate";

test("re-exports all languages", () => {
  expect(availableLanguages.length).toEqual(3);
});

test("returns the proper translation", () => {
  expect(__("list.emptyState.title", "en")).toEqual("Nothing here, yet.");
  expect(__("list.emptyState.title", "de")).toEqual("Diese Liste ist noch leer.");
  expect(__("list.emptyState.title", "es")).toEqual("Nada aquí, todavía.");
  expect(__("does.not.exist", "en")).toEqual(null);
});
