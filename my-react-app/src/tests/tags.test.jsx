/**

* @file Tags.test.jsx
* @description Version corrigée pour le composant Tags utilisant <ul> et <li>.
  */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tags from "../component/tags";

// Mock du CSS
vi.mock("../component/css/tags.css", () => ({}));

const mockShort = { title: "Studio", titleLength: 10, tags: ["Wifi", "Vue mer"] };
const mockLong = { title: "Appartement spacieux avec terrasse", titleLength: 40, tags: ["Garage", "Piscine"] };

describe("Tags Component", () => {
it("renders short title tags correctly", () => {
render(<Tags data={mockShort} />);


// Le conteneur est maintenant une <ul>
const list = screen.getByRole("list");
expect(list).toHaveClass("tags");

// Vérifie que chaque tag est bien affiché
mockShort.tags.forEach(tag => {
  expect(screen.getByText(tag)).toBeInTheDocument();
});


});

it("renders long title tags correctly", () => {
render(<Tags data={mockLong} />);
const list = screen.getByRole("list");
expect(list).toHaveClass("long-title-tags");
});

it("renders correct number of tags", () => {
render(<Tags data={mockShort} />);
const tagElements = screen.getAllByRole("listitem");
expect(tagElements).toHaveLength(mockShort.tags.length);
});
});
