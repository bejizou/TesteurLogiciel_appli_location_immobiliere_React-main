import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tags from "../component/tags";

describe("Tags Component", () => {
  it("renders all tags correctly with short title", () => {
    const mockData = {
      title: "Appartement",
      titleLength: 10,
      tags: ["WiFi", "Parking", "Piscine"],
    };

    render(<Tags data={mockData} />);

    // Vérifier la classe du <ul>
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("tags");

    // Vérifier que chaque tag est rendu
    mockData.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
      expect(screen.getByText(tag)).toHaveClass("tag");
    });
  });

  it("applies long-title class when titleLength >= 25", () => {
    const mockData = {
      title: "Appartement très très long au centre-ville",
      titleLength: 30,
      tags: ["WiFi", "Parking"],
    };

    render(<Tags data={mockData} />);

    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("long-title-tags");

    mockData.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("renders empty list if no tags", () => {
    const mockData = {
      title: "Appartement vide",
      titleLength: 12,
      tags: [],
    };

    render(<Tags data={mockData} />);

    const ul = screen.getByRole("list");
    expect(ul).toBeEmptyDOMElement();
  });
});
