import { render, screen } from "@testing-library/react";
import SearchHeader from "../SearchHeader";
import { withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//snapshots 테스트
describe("SearchHeader", () => {
  it("renders correctly", () => {
    const { container } = render(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );

    expect(container).toMatchSnapshot();
  });

  it("renders with keyword correctly", () => {
    render(
      withRouter(
        <Route path="/:keyword" element={<SearchHeader />} />,
        "/javascript"
      )
    );
    expect(screen.getByDisplayValue("javascript")).toBeInTheDocument();
  });

  it("navigates to results page on search button click", () => {
    const searchKeyword = "fake-keyword";
    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");
    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
