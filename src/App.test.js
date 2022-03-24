import React from "react";
import Clipboard from "clipboard";
import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import filterEmoji from "./filterEmoji";

test("copy emoji", () => {
  render(<App />);
  const filter = filterEmoji("", 20);
  const div_copy = screen.getAllByTestId("copy");
  const clipboard = new Clipboard(div_copy[1]);
  clipboard.on("success", function(e) {
    expect(e.text).toEqual(filter[1].symbol);
  });
  div_copy[1].click();
});

test("input empty", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "" } });
  const div_copy = screen.getAllByTestId("copy");
  expect(20).toEqual(div_copy.length);
});

test("search Joy", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Joy" } });
  const div_copy = screen.getAllByTestId("copy");
  const joy = screen.queryByText("Joy");
  expect(3).toEqual(div_copy.length);
  expect(joy).toBeInTheDocument();
});
