import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";
import { withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";

describe("NotFound", () => {
  it("renders correctly", () => {
    render(<NotFound />);

    expect(screen.getByText("Not Found!")).toBeInTheDocument();
  });
});

describe("NotFound2", () => {
  it("renders correctly2", () => {
    const { container } = render(
      withRouter(<Route path="/" element={<NotFound />} />)
    );

    expect(container).toMatchSnapshot();
  });
});
