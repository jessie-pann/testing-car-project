import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// test the page is rendered successfully

test("renders the elements on the page", () => {
  render(<App />);
  const headerElement = screen.getByText("Find your next car");
  expect(headerElement).toBeInTheDocument();
  const formElement = screen.getByText("Model");
  expect(formElement).toBeInTheDocument();
});

const makesData = [
  { make: "AUDI", count: 6 },
  { make: "FORD", count: 10 },
];

const modelsData = [
  { model: "A1", count: 100 },
  { model: "A4", count: 20 },
];

const derivativesData = [{ derivative: "1.4 TFSI Sport 5dr" }];

//mocking all the fetch functions

global.fetch = jest.fn();

describe("testing the fetches", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches and displays the makes", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(makesData);
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("AUDI, 6")).toBeInTheDocument();
    expect(screen.getByText("FORD, 10")).toBeInTheDocument();
  });
});
