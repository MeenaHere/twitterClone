import axios from "axios";

const url = import.meta.env.VITE_MONGODB_URL;

const getTop5Hash = async () => {
  try {
    const resp = await axios.get(`${url}/tweets/trends/hashtags/most/`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

const ownTweets = async (id) => {
  try {
    const resp = await axios.get(`${url}/tweets/trends/${id}/`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export { getTop5Hash, ownTweets };
