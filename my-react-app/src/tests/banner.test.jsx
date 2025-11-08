
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "../component/banner";

//  Mock CSS
vi.mock("../component/css/banner.css", () => ({}));

describe("Banner Component", () => {
const props = {
bannerImage: "test-image.jpg",
bannerTitle: "Bienvenue sur Kasa",
};

it("renders banner image and title", () => {
render(<Banner {...props} />);
const image = screen.getByAltText("banner image");
expect(image).toHaveAttribute("src", props.bannerImage);
expect(screen.getByText(props.bannerTitle)).toBeInTheDocument();
});

it("renders structure correctly", () => {
const { container } = render(<Banner {...props} />);
expect(container.querySelector("section")).toHaveClass("banner-container");
expect(container.querySelector(".banner")).toBeInTheDocument();
});
});
