/**

* @file Header.test.jsx
* @description Tests unitaires complets pour le composant Header avec mock d'image corrigé.
  */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
//MemoryRouter simule un environnement React Router pour les <Link> sans besoin de navigateur réel.
import { MemoryRouter } from "react-router-dom";
import Header from "../component/header";

// ✅ Mock du logo et du CSS
vi.mock("../assets/logo1.svg", () => ({ default: "mocked-logo.svg" }));
vi.mock("../component/css/header.css", () => ({}));

describe("Header Component", () => {
it("renders logo correctly", () => {
render( <MemoryRouter> <Header /> </MemoryRouter>
);
const logo = screen.getByAltText("Logo Kasa");
expect(logo).toBeInTheDocument();
expect(logo).toHaveAttribute("src", "mocked-logo.svg");
});

it("renders navigation links correctly", () => {
render( <MemoryRouter> <Header /> </MemoryRouter>
);


const homeLink = screen.getByRole("link", { name: /Accueil/i });
const aboutLink = screen.getByRole("link", { name: /À Propos/i });

expect(homeLink).toBeInTheDocument();
expect(homeLink).toHaveAttribute("href", "/");
expect(aboutLink).toBeInTheDocument();
expect(aboutLink).toHaveAttribute("href", "/about");


});

it("applies correct header structure", () => {
render( <MemoryRouter> <Header /> </MemoryRouter>
);
const header = screen.getByRole("banner");
expect(header).toHaveClass("header");
});
});
