import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Collapse from "../component/collapse";

// Mock de l'image 
vi.mock("../assets/arrow-down.svg", () => ({
default: "mock-vector.svg",
}));

describe("Collapse Component", () => {

it("renders title and string description correctly", () => {
const data = "Ceci est une description";
const title = "Description";
render(<Collapse data={data} title={title} />);


// Vérifie le titre
const titleElement = screen.getByText(title);
expect(titleElement).toBeInTheDocument();

// Vérifie le texte de description
const desc = screen.getByText(data);
expect(desc).toBeInTheDocument();

// Vérifie que la classe de description est initialement vide (non ouvert)
const descContainer = desc.parentElement;
expect(descContainer).toHaveClass("description");
expect(descContainer).not.toHaveClass("wrapper");


});

it("renders array description correctly", () => {
const data = ["Item 1", "Item 2"];
const title = "Equipements";
render(<Collapse data={data} title={title} />);


// Vérifie que chaque item est rendu en <li>
data.forEach((item) => {
  const li = screen.getByText(`- ${item}`);
  expect(li).toBeInTheDocument();
});


});

it("toggles collapse state on click", () => {
const data = "Test description";
const title = "Toggle Test";
render(<Collapse data={data} title={title} />);


const container = screen.getByText(title).closest(".about");
const descContainer = screen.getByText(data).parentElement;
const vectorImg = screen.getByAltText("vector");

// Initial state : collapsed false
expect(descContainer).not.toHaveClass("wrapper");
expect(vectorImg).toHaveClass("vector-rotated");

// Click to open
fireEvent.click(container);
expect(descContainer).toHaveClass("wrapper");
expect(vectorImg).toHaveClass("vector");

// Click again to close
fireEvent.click(container);
expect(descContainer).not.toHaveClass("wrapper");
expect(vectorImg).toHaveClass("vector-rotated");


});

});
