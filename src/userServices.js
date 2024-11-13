import axios from "axios";
const url = import.meta.env.VITE_MONGODB_URL;

// Functions to interact with the API
const getAllUsers = async () => {
  try {
    const resp = await axios.get(`${url}/users`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

const getOneUser = async (id) => {
  try {
    const resp = await axios.get(`${url}/users/${id}`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

const updateUser = async (id, userData) => {
  try {
    const resp = await axios.put(`${url}/users/${id}`, userData);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server PUT request");
    }
    return resp.data;
  } catch (err) {
    console.error("Error updating data:", err);
    return null;
  }
};

const getAllFollowers = async (id) => {
  try {
    const resp = await axios.get(`${url}/users/${id}/followers`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getAllFollowing = async (id) => {
  try {
    const resp = await axios.get(`${url}/users/${id}/following`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const postAFollower = async (id, newFollower) => {
  try {
    const resp = await axios.post(`${url}/users/${id}/followers`, newFollower);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server POST request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return [];
  }
};

const postAFollowing = async (id, newFollowing) => {
  try {
    const resp = await axios.post(`${url}/users/${id}/following`, newFollowing);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server POST request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return [];
  }
};

const deleteAFollower = async (id, followerId) => {
  try {
    const resp = await axios.delete(`${url}/users/${id}/followers/${followerId}`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server DELETE request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};

const deleteAFollowing = async (id, followingId) => {
  try {
    const resp = await axios.delete(`${url}/users/${id}/following/${followingId}`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server DELETE request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};

export {
  getAllUsers,
  getOneUser,
  updateUser,
  getAllFollowers,
  getAllFollowing,
  postAFollower,
  postAFollowing,
  deleteAFollower,
  deleteAFollowing,
};
