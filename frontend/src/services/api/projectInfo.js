import axios from "axios";

export const elevation = async ({ latitude, longitude }) => {
  try {
    // console.log("data to send", { latitude, longitude });
    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`
    );
    // console.log("data received", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const geoapify = async ({ latitude, longitude }) => {
  try {
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=9a27623355584ba5985972b69cf6503b`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
