import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Trends from "../components/profile/Trends.jsx";
import { getTop5Hash } from "../tweetServices";

// Mock the getTop5Hash route
jest.mock("../tweetServices", () => ({
  getTop5Hash: jest.fn(),
}));

describe("Followers component", () => {
  test("renders top 5 hashtags correctly", async () => {
    // Mock data for top trending hashtags
    const topTrendingHashtags = [
      { _id: "hashtag1", count: 100 },
      { _id: "hashtag2", count: 90 },
      { _id: "hashtag3", count: 80 },
      { _id: "hashtag4", count: 70 },
      { _id: "hashtag5", count: 60 },
    ];

    // Mock the API call
    getTop5Hash.mockResolvedValue(topTrendingHashtags);

    render(<Trends />);

    // Wait for the API call to resolve
    await waitFor(() => {
      // Check that the top trending hashtags are rendered correctly
      topTrendingHashtags.map((hashtag) => {
        const hashtagElement = screen.getByText(`#${hashtag._id}`);
        expect(hashtagElement).toBeInTheDocument(); //check if the hashtag printed as expected using # symbol
        const hashtagCount = screen.getByText(`${hashtag.count}K`);
        expect(hashtagCount).toBeInTheDocument(); //check if the total count printedt as expected
      });
    });
  });
});
