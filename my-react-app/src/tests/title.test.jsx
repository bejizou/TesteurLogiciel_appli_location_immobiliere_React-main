

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "../component/title";

// Mock  CSS
vi.mock("../component/css/title.css", () => ({}));

const mockData = {
title: "Appartement au centre-ville",
location: "Paris, France",
titleLength: 18,
};

describe("Title Component", () => {
it("renders title and location", () => {
render(<Title data={mockData} />);
expect(screen.getByText(mockData.title)).toBeInTheDocument();
expect(screen.getByText(mockData.location)).toBeInTheDocument();
});

it("applies correct classes", () => {
const { container } = render(<Title data={mockData} />);
expect(container.firstChild).toHaveClass("informationx");
expect(screen.getByText(mockData.title)).toHaveClass("information-title");
expect(screen.getByText(mockData.location)).toHaveClass("information-location");
});

it("sets title attribute", () => {
render(<Title data={mockData} />);
expect(screen.getByText(mockData.title)).toHaveAttribute("title", mockData.title);
});
});
