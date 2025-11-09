import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "../component/card";
import { vi } from "vitest";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

// Mock global fetch
global.fetch = vi.fn();

const mockCards = [
  { id: "1", title: "Appartement 1", cover: "cover1.jpg" },
  { id: "2", title: "Appartement 2", cover: "cover2.jpg" },
];

// Wrapper simple pour MemoryRouter
const renderWithRouter = (ui) => render(ui, { wrapper: MemoryRouter });

describe("Card Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading initially", () => {
    fetch.mockResolvedValueOnce(new Promise(() => {})); // promise pendante
    renderWithRouter(<Card />);
    expect(screen.getByText(/Chargement des logements/i)).toBeInTheDocument();
  });

  it("renders cards after successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCards,
    });

    renderWithRouter(<Card />);

    for (const card of mockCards) {
      await waitFor(() => expect(screen.getByText(card.title)).toBeInTheDocument());
      expect(screen.getByAltText(card.title)).toHaveAttribute("src", card.cover);
    }
  });

  it("navigates to error page if fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    renderWithRouter(<Card />);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/Error"));
  });

  it("displays error message if fetch throws", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));
    renderWithRouter(<Card />);
    await waitFor(() => {
      expect(screen.getByText(/Impossible de charger les logements/i)).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith("/Error");
    });
  });
});
