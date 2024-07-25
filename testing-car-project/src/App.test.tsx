import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    jest.resetAllMocks();
  });

  it("should fetch and display the makes when the app is rendered", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => makesData,
    });
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const textElement = await screen.findByText("FORD 10");

    expect(textElement).toBeInTheDocument();
  });

  it("should fetch and display models after make is chosen", async () => {
    //mock functions should be all called at the very top
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => makesData,
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => modelsData,
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => derivativesData,
    });

    render(<App />);

    // await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledTimes(1);

    // why findAllByRole('option') does not work? Because there are two options without value available, so findByRole wont wait until the data is populated.
    // const listElement = await screen.findAllByRole("option");
    // expect(listElement).toHaveLength(4);

    const listElement = await screen.findByText(/AUDI/i);
    const otherElement = screen.getAllByRole("option");
    const optionElements = screen.getAllByRole("combobox");

    expect(otherElement).toHaveLength(4);

    expect(listElement).toBeInTheDocument();

    //selectOptions returns a promise, why await is not necessary?
    await userEvent.selectOptions(optionElements[0], "AUDI");
    //why value'AUDI' not found in options?
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    const bothSelectElements = screen.getAllByRole("combobox");
    const [firstSelect, secondSelect] = bothSelectElements;

    const modelElement = await screen.findByText(/A1/i);
    expect(modelElement).toBeInTheDocument();

    await userEvent.selectOptions(secondSelect, "A1");
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));

    const vehicleElement = await screen.findByText(/1.4 TFSI Sport 5dr/i);
    expect(vehicleElement).toBeInTheDocument();
  });
});
