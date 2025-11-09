import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Accomodation from "../page/information";

// Mock navigate et useParams
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "123" }),
  };
});

// Mock des composants enfants
vi.mock("../component/carrousel", () => ({
  default: () => <div data-testid="carrousel" />,
}));
vi.mock("../component/title", () => ({
  default: () => <div data-testid="title" />,
}));
vi.mock("../component/tags", () => ({
  default: () => <div data-testid="tags" />,
}));
vi.mock("../component/rating", () => ({
  default: () => <div data-testid="rates" />,
}));
vi.mock("../component/host", () => ({
  default: () => <div data-testid="host" />,
}));
vi.mock("../component/collapse", () => ({
  default: ({ title }) => <div data-testid={`collapse-${title}`} />,
}));

// Mock global de fetch
global.fetch = vi.fn();

const mockData = {
  id: "123",
  title: "Appartement test",
  titleLength: 10,
  location: "Paris",
  tags: ["wifi", "parking"],
  rating: 4,
  host: { name: "Zayn Ghali", picture: "host.jpg" },
  description: "Très bel appartement",
  equipments: ["TV", "Wi-Fi"],
  cover: "cover.jpg",
};

describe("Accomodation Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    fetch.mockResolvedValueOnce(new Promise(() => {})); // promesse pendante
    render(
      <MemoryRouter>
        <Accomodation />
      </MemoryRouter>
    );
    expect(screen.getByText(/Chargement en cours/i)).toBeInTheDocument();
  });

  it("renders all child components when fetch succeeds", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <MemoryRouter>
        <Accomodation />
      </MemoryRouter>
    );

    // Attente du rendu des composants enfants
    await waitFor(() => {
      expect(screen.getByTestId("carrousel")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toBeInTheDocument();
      expect(screen.getByTestId("host")).toBeInTheDocument();
      expect(screen.getByTestId("collapse-Description")).toBeInTheDocument();
      expect(screen.getByTestId("collapse-Equipements")).toBeInTheDocument();
    });
  });

  it("navigates to error page if fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    render(
      <MemoryRouter>
        <Accomodation />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/Error");
    });
  });

  it("handles fetch rejection gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Accomodation />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/Error");
    });
  });
});
