import axios from "axios";

const url = "http://localhost:8000/users";

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

const getOneUser = async (_id) => {
  try {
    const resp = await axios.get(`${url}/${_id}`);
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

export {
  getAllUsers,
  getOneUser,
  updateUser,
  getAllFollowers,
  getAllFollowing,
};
