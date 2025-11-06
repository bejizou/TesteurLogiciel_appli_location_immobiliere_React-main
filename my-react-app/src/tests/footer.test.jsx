/**

* @file Footer.test.jsx
* @description Tests unitaires complets pour le composant Footer avec mock d'image corrigé.
  */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../component/footer";

// Mock de l'image et du CSS
vi.mock("../assets/logo_footer.png", () => ({ default: "mocked-footer-logo.png" }));
vi.mock("../component/css/footer.css", () => ({}));

describe("Footer Component", () => {
it("renders logo correctly", () => {
render(<Footer />);
const logo = screen.getByAltText("Logo footer");
expect(logo).toBeInTheDocument();
expect(logo).toHaveAttribute("src", "mocked-footer-logo.png");
});

it("renders copyright text", () => {
render(<Footer />);
const text = screen.getByText(/© 2025 Kasa. All rights reserved/i);
expect(text).toBeInTheDocument();
expect(text).toHaveClass("footer-txt");
});

it("applies correct footer structure", () => {
render(<Footer />);
const footer = screen.getByRole("contentinfo");
expect(footer).toHaveClass("footer");
});
});
