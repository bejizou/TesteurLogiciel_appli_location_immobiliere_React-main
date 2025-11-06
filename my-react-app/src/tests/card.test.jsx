
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Card from "../component/card";

// Mock CSS
vi.mock("../component/css/card.css", () => ({}));

// Mock global.fetch
const mockData = [
{ id: "1", title: "Loft Cosy", cover: "img1.jpg" },
{ id: "2", title: "Villa Luxueuse", cover: "img2.jpg" },
];
global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));

describe("Card Component", () => {
it("fetches and displays cards", async () => {
render( <MemoryRouter> <Card /> </MemoryRouter>
);
await waitFor(() => expect(screen.getByText("Loft Cosy")).toBeInTheDocument());
expect(screen.getAllByRole("heading", { level: 2 }).length).toBe(2);
});

it("renders correct image and link", async () => {
render( <MemoryRouter> <Card /> </MemoryRouter>
);
await waitFor(() => {
const image = screen.getByAltText("Loft Cosy");
expect(image).toHaveAttribute("src", "img1.jpg");
const link = screen.getByText("Loft Cosy").closest("a");
expect(link).toHaveAttribute("href", "/information/1");
});
});
});
