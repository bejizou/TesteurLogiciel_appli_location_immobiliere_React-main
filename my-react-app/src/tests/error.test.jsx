
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../page/erreur404";

// Mock de react-router-dom pour éviter les erreurs liées au <Link>
import { Link } from "react-router-dom";
vi.mock("react-router-dom", () => ({
Link: ({ children, to, className }) => ( <a href={to} className={className}>
{children} </a>
),
}));

describe("Error Component", () => {

it("renders 404 message correctly", () => {
// Rendu du composant
render(<Error />);


// Vérifie la présence du titre "404"
const title = screen.getByText("404");
expect(title).toBeInTheDocument();
expect(title).toHaveClass("error-404");

// Vérifie la présence du texte de description
const description = screen.getByText(
  "Oups! La page que vous demandez n'existe pas."
);
expect(description).toBeInTheDocument();
expect(description).toHaveClass("error-description");

// Vérifie le lien de retour vers l'accueil
const link = screen.getByText("Retourner sur la page d’accueil");
expect(link).toBeInTheDocument();
expect(link).toHaveAttribute("href", "/");
expect(link).toHaveClass("error-link");


});

});
