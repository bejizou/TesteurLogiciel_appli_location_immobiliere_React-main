import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carrousel from "../component/carrousel";

// Données fictives pour le test
const mockData = {
  title: "Appartement test",
  pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
};

describe("Carrousel Component", () => {
  
  it("renders the first image and counter correctly", () => {
    render(<Carrousel data={mockData} />);

    // Vérifie que la première image est affichée avec l'attribut alt correct
    const image = screen.getByAltText("Appartement test");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "image1.jpg");

    // Vérifie que le compteur initial est correct
    const counter = screen.getByText("1/3");
    expect(counter).toBeInTheDocument();
  });

  it("renders message if no pictures available", () => {
    render(<Carrousel data={{ title: "Vide", pictures: [] }} />);

    // Vérifie le message affiché lorsqu'il n'y a pas d'images
    const message = screen.getByText(/No pictures available/i);
    expect(message).toBeInTheDocument();
  });

  it("navigates through images when arrows are clicked", () => {
    render(<Carrousel data={mockData} />);

    const nextButton = screen.getByTestId("next-arrow");
    const prevButton = screen.getByTestId("prev-arrow");

    // Clique sur la flèche suivante et vérifie l'image et le compteur
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Appartement test")).toHaveAttribute("src", "image2.jpg");
    expect(screen.getByText("2/3")).toBeInTheDocument();

    // Clique sur la flèche précédente et vérifie l'image et le compteur
    fireEvent.click(prevButton);
    expect(screen.getByAltText("Appartement test")).toHaveAttribute("src", "image1.jpg");
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });
});
