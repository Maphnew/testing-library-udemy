import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("button enabled or disabled on checkbox unchecked or checked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test("Disabled button has gray background color reverts to MediumVioletRed", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked disabled button has gray background color reverts to MidnightBlue", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
