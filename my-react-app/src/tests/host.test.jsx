import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Host from "../component/host";

// Mock du composant Rates
vi.mock("../component/rating", () => ({ default: () => <div data-testid="rates" /> }));

describe("Host Component", () => {
  const mockData = {
    title: "Appartement test",
    titleLength: 20,
    host: {
      name: "John Doe",
      picture: "john.jpg",
    },
    rating: 4,
  };

  afterEach(() => {
    cleanup(); // Nettoie le DOM entre chaque test
  });

  it("renders host name, picture and Rates component", () => {
    render(<Host data={mockData} />);

    expect(screen.getByText(mockData.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.host.name)).toHaveClass("host-name");

    const img = screen.getByAltText(mockData.host.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass("host-picture");
    expect(img).toHaveAttribute("src", mockData.host.picture);

    expect(screen.getByTestId("rates")).toBeInTheDocument();
  });

  it("applies correct class for host based on titleLength", () => {
    // titleLength < 25
    render(<Host data={mockData} />);
    let hostDiv = screen.getByText(mockData.host.name).parentElement;
    expect(hostDiv).toHaveClass("host");

    cleanup(); // On nettoie le DOM avant le prochain render

    // titleLength >= 25
    const longTitleData = { ...mockData, titleLength: 30 };
    render(<Host data={longTitleData} />);
    hostDiv = screen.getByText(longTitleData.host.name).parentElement; // <- utiliser longTitleData
    expect(hostDiv).toHaveClass("host-long-title");
  });
});
