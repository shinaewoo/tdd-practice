import { render, screen } from "@testing-library/react";
import ChannelInfo from "../ChannelInfo";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");
    const { asFragment } = renderChannelInfo();

    await screen.findByRole("img");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without URL", () => {
    fakeYoutube.channelImageURL.mockImplementation(() => {
      throw new Error("error");
    });

    renderChannelInfo();

    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders with URL", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    renderChannelInfo();

    await screen.findByRole("img");
  });

  function renderChannelInfo() {
    return render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );
  }
});
