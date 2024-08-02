import { render, screen, waitFor } from "@testing-library/react";
import { fakeVideo, fakeVideos } from "../../tests/videos";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import Videos from "../Videos";

describe("Videos", () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it("renders all videos when keyword is not specified", async () => {
    renderWithPath("/");
    // 특정 인자와 함께 호출되었는지 확인
    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
    await waitFor(() =>
      //길이 검증
      expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length)
    );
  });

  it("when keyword is specified, renders search results", async () => {
    const searchKeyword = "fake-keyword";
    renderWithPath(`/${searchKeyword}`);
    // 특정 인자와 함께 호출되었는지 확인
    expect(fakeYoutube.search).toHaveBeenCalledWith(searchKeyword);
    await waitFor(() =>
      //길이 검증
      expect(screen.getAllByRole("listitem")).toHaveLength(1)
    );
  });

  it("renders loading state when items are being fetched", () => {
    renderWithPath("/");

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders loading state when fetching items fails", async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error("error");
    });

    renderWithPath("/");

    await waitFor(() => {
      expect(screen.getByText(/Something is wrong/i)).toBeInTheDocument();
    });
  });

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }
});
