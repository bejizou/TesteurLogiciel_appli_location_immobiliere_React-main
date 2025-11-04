// Import des fonctions nécessaires depuis React Testing Library
// render : pour afficher le composant dans un DOM simulé
// screen : pour rechercher des éléments dans le DOM
// fireEvent : pour simuler des interactions (clics, etc.)
import { render, screen, fireEvent } from "@testing-library/react";

// Import du composant Carrousel à tester
import Carrousel from "../component/carrousel";

// Données fictives (mock) pour le test
// title : titre de l'appartement
// pictures : tableau des images du carrousel
const mockData = {
  title: "Appartement test",
  pictures: ["image1.jpg", "image2.jpg", "image3.jpg"]
};

// Regroupe tous les tests liés au composant Carrousel
describe("Carrousel Component", () => {

  // Premier test : vérifier que la première image et le compteur s'affichent correctement
  it("renders the first image and counter correctly", () => {
    // Affiche le composant Carrousel avec les données mock
    render(<Carrousel data={mockData} />);

    // Recherche l'image par son attribut alt
    const image = screen.getByAltText("Appartement test");
    // Vérifie que l'image est bien présente dans le DOM
    expect(image).toBeInTheDocument();

    // Recherche le compteur affichant "1/3"
    const counter = screen.getByText("1/3");
    // Vérifie que le compteur est bien présent dans le DOM
    expect(counter).toBeInTheDocument();
  });

  // Deuxième test : vérifier le message affiché quand il n'y a pas d'images
  it("renders message if no pictures available", () => {
    // Affiche le composant Carrousel avec un tableau d'images vide
    render(<Carrousel data={{ title: "Vide", pictures: [] }} />);

    // Recherche le message affiché quand aucune image n'est disponible
    const message = screen.getByText("No pictures available");
    // Vérifie que le message est bien présent dans le DOM
    expect(message).toBeInTheDocument();
  });

});
