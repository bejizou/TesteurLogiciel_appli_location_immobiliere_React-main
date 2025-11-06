// Import des fonctions de test depuis React Testing Library
import { render, screen } from "@testing-library/react";

// Import du composant Host à tester
import Host from "../component/host";

// Données fictives (mock) pour le test
const mockDataShortTitle = {
  titleLength: 20, // titre court (<25)
  host: {
    name: "Zayn Ghali",
    picture: "https://example.com/nathalie.jpg"
  }
};

const mockDataLongTitle = {
  titleLength: 30, // titre long (>=25)
  host: {
    name: "ELBEJI Zayn",
    picture: "https://example.com/jean.jpg"
  }
};

describe("Host Component", () => {

  // Test pour vérifier que le nom et la photo s'affichent correctement
  it("renders host name and picture correctly", () => {
    // Affiche le composant avec les données simulées
    render(<Host data={mockDataShortTitle} />);

    // Vérifie que le nom de l’hôte s’affiche
    const hostName = screen.getByText("Zayn Ghali");
    expect(hostName).toBeInTheDocument();

    // Vérifie que la photo est présente avec la bonne source et alt
    const hostImage = screen.getByAltText("Zayn Ghali");
    expect(hostImage).toBeInTheDocument();
    expect(hostImage).toHaveAttribute("src", "https://example.com/nathalie.jpg");
  });

  // Test pour vérifier la classe CSS selon la longueur du titre
  it("applies correct CSS class based on title length", () => {
    // Composant avec titre court
    const { container: shortContainer } = render(<Host data={mockDataShortTitle} />);
    expect(shortContainer.firstChild).toHaveClass("host");

    // Composant avec titre long
    const { container: longContainer } = render(<Host data={mockDataLongTitle} />);
    expect(longContainer.firstChild).toHaveClass("host-long-title");
  });

  // Test pour vérifier le comportement si les données de l’hôte sont absentes
  it("handles missing host data gracefully", () => {
    // Données incomplètes
    const mockDataEmpty = { titleLength: 15, host: {} };

    // Affiche le composant sans planter
    render(<Host data={mockDataEmpty} />);

    // Vérifie que le composant s’affiche toujours même sans nom
    const container = screen.getByRole("img", { hidden: true });
    expect(container).toBeDefined();
  });

});
