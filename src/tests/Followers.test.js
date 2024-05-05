import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Followers from "../components/profile/Followers.jsx";
import { getAllFollowers, getAllUsers } from "../userServices.js";

// Mock the getAlluser and getAllFollowers route

jest.mock("../userServices", () => ({
  getAllFollowers: jest.fn(),
  getAllUsers: jest.fn(),
}));

describe("Followers component", () => {
  test("renders followers correctly", async () => {
    // Mock data for users and followers
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
    const followers = [{ followerId: "111" }, { followerId: "222" }];

    // Mock the API calls
    getAllUsers.mockResolvedValue(users);
    getAllFollowers.mockResolvedValue(followers);

    render(
      <Router>
        <Followers />
      </Router>
    );

    // Wait for the API calls to resolve
    await waitFor(() => {
      // Check that the followers are rendered
      expect(screen.getByText("test1")).toBeInTheDocument();
      expect(screen.getByText("test2")).toBeInTheDocument();
    });
  });
});
