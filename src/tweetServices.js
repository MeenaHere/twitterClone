import axios from "axios";

const url = "http://localhost:4000/tweets";

const getTop5Hash = async (id) => {
  try {
    const resp = await axios.get(`${url}/hashtags/most/`);
    if (resp.status !== 200) {
      throw new Error("Malfunctioning server GET request");
    }
    return resp.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export { getTop5Hash };
