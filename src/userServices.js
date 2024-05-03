import axios from "axios";

const url = "http://localhost:4000/users";

const getAllUsers = async () => {
  try {
    const resp = await axios.get(url);
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
    const resp = await axios.get(`${url}/${id}`);
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
    const resp = await axios.put(`${url}/${id}`, userData);
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
    const resp = await axios.get(`${url}/${id}/followers/`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

const getAllFollowing = async (id) => {
  try {
    const resp = await axios.get(`${url}/${id}/following/`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

const postAFollower = async (id, newFollower) => {
  try {
    const resp = await axios.post(`${url}/${id}/followers/`, newFollower);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error posting data", error);
  }
};

const postAFollowing = async (id, newFollowing) => {
  try {
    const resp = await axios.post(`${url}/${id}/following/`, newFollowing);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server POST request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error posting data", error);
  }
};

const deleteAFollower = async (id, followerId) => {
  try {
    const resp = await axios.delete(`${url}/${id}/followers/${followerId}`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server DELETE request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error deleting data", error);
  }
};

const deleteAFollowing = async (id, followingId) => {
  try {
    const resp = await axios.delete(`${url}/${id}/following/${followingId}`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server DELETE request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error deleting data", error);
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
