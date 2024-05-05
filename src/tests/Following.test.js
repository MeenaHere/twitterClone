import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Following from "../components/profile/Following";
import { getAllFollowing, getAllUsers } from "../userServices";

// Mock the getAlluser and getAllFollowing route
jest.mock("../userServices", () => ({
  getAllFollowing: jest.fn(),
  getAllUsers: jest.fn(),
}));

describe("Following component", () => {
  test("renders following correctly", async () => {
    // Mock data for users and following
    const users = [
      {
        _id: "111",
        fullName: "test 1",
        username: "test1",
        email: "test1@test.com",
      },
      {
        _id: "222",
        fullName: "test 2",
        username: "test2",
        email: "test2@test.com",
      },
    ];
    const following = [{ followingId: "111" }, { followingId: "222" }];

    // Mock the API calls
    getAllUsers.mockResolvedValue(users);
    getAllFollowing.mockResolvedValue(following);

    render(
      <Router>
        <Following />
      </Router>
    );

    // Wait for the API calls to resolve
    await waitFor(() => {
      // Check that the following are rendered correctly
      expect(screen.getByText("test1")).toBeInTheDocument();
      expect(screen.getByText("test2")).toBeInTheDocument();
    });
  });
});
