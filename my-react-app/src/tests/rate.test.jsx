// Import des fonctions de test depuis React Testing Library
import { render, screen } from "@testing-library/react";

// Import du composant Rates à tester
import Rates from "../component/rating";


// Import des images pour pouvoir vérifier les sources dans les tests

import pinkStar from '../assets/pink-star.svg';
import greyStar from '../assets/grey-star.svg';

// Données fictives (mock) pour le test
const mockDataFullRating = {
  rating: 5,          // 5 étoiles remplies
  titleLength: 20      // titre court (<25)
};

const mockDataPartialRating = {
  rating: 3,          // 3 étoiles remplies
  titleLength: 30      // titre long (>=25)
};

describe("Rates Component", () => {

  // Test pour vérifier l'affichage de toutes les étoiles remplies
  it("renders 5 full stars for rating 5", () => {
    // Affiche le composant avec le rating complet
    render(<Rates data={mockDataFullRating} />);

    // Recherche toutes les images représentant des étoiles remplies
    const fullStars = screen.getAllByAltText("star full");
    // Vérifie qu'il y a exactement 5 étoiles remplies
    expect(fullStars.length).toBe(5);

    // Vérifie qu'il n'y a pas d'étoiles vides
    const emptyStars = screen.queryAllByAltText("star empty");
    expect(emptyStars.length).toBe(0);
  });

  // Test pour vérifier le mélange d'étoiles remplies et vides
  it("renders correct number of full and empty stars for rating 3", () => {
    // Affiche le composant avec un rating partiel
    render(<Rates data={mockDataPartialRating} />);

    // 3 étoiles remplies
    const fullStars = screen.getAllByAltText("star full");
    expect(fullStars.length).toBe(3);

    // 2 étoiles vides (pour compléter 5 étoiles)
    const emptyStars = screen.getAllByAltText("star empty");
    expect(emptyStars.length).toBe(2);
  });

  // Test pour vérifier la classe CSS en fonction de la longueur du titre
  it("applies correct CSS class based on title length", () => {
    // Composant avec titre court
    const { container: shortTitleContainer } = render(<Rates data={mockDataFullRating} />);
    expect(shortTitleContainer.firstChild).toHaveClass("rating");

    // Composant avec titre long
    const { container: longTitleContainer } = render(<Rates data={mockDataPartialRating} />);
    expect(longTitleContainer.firstChild).toHaveClass("rating-long-title");
  });

});
