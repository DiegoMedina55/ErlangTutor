import json from "./structure.json"

const axios = require("axios");
const endpoint = "127.0.0.1"

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSteps = async (codeData) => {
  try {

    await sleep(2000);
    // const { data } J= await axios.post(`${endpoint}`, input); 
    const data = json;
    return data;
  } catch (error) {
    console.log(error)
    // throw new Error(
    //   JSON.stringify({
    //     message: error.response.data,
    //     status: error.response.status,
    //   })
    // );
  }
};
