
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accomodation from "../page/information";
import { vi } from "vitest";

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
useNavigate: () => mockNavigate,
useParams: () => ({ id: "123" }),
}));

//  Mock des composants enfants pour simplifier le test
vi.mock("../component/carrousel", () => ({ default: () => <div data-testid="carrousel" /> }));
vi.mock("../component/title", () => ({ default: () => <div data-testid="title" /> }));
vi.mock("../component/tags", () => ({ default: () => <div data-testid="tags" /> }));
vi.mock("../component/rating", () => ({ default: () => <div data-testid="rates" /> }));
vi.mock("../component/host", () => ({ default: () => <div data-testid="host" /> }));
vi.mock("../component/collapse", () => ({ default: ({ title }) => <div data-testid={`collapse-${title}`} /> }));

//  Mock de fetch global
global.fetch = vi.fn();

describe("Accomodation Component", () => {
beforeEach(() => {
vi.clearAllMocks();
});

it("renders loading state initially", () => {
fetch.mockResolvedValueOnce(new Promise(() => {})); // promise pendante
render(<Accomodation />);
expect(screen.getByText(/Chargement en cours.../i)).toBeInTheDocument();
});

it("renders all child components when fetch succeeds", async () => {
const mockData = {
id: "123",
title: "Test Title",
titleLength: 10,
location: "Test Location",
tags: ["tag1", "tag2"],
rating: 4,
host: { name: "Host Name" },
description: "Test description",
equipments: ["eq1", "eq2"],
cover: "cover.jpg",
};


fetch.mockResolvedValueOnce({
  status: 200,
  json: async () => mockData,
});

render(<Accomodation />);

//  On attend que les composants enfants soient rendus
await waitFor(() => {
  expect(screen.getByTestId("carrousel")).toBeInTheDocument();
  expect(screen.getByTestId("title")).toBeInTheDocument();
  expect(screen.getByTestId("tags")).toBeInTheDocument();
  expect(screen.getByTestId("rates")).toBeInTheDocument();
  expect(screen.getByTestId("host")).toBeInTheDocument();
  expect(screen.getByTestId("collapse-Description")).toBeInTheDocument();
  expect(screen.getByTestId("collapse-Equipements")).toBeInTheDocument();
});


});

it("navigates to error page if fetch fails", async () => {
fetch.mockResolvedValueOnce({ status: 404 });
render(<Accomodation />);
await waitFor(() => {
expect(mockNavigate).toHaveBeenCalledWith("/Error");
});
});
});
