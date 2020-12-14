import json from "./structure.json"
// import jsonError from "./errorStructure.json"

const axios = require("axios");
const endpoint = "https://immense-river-16385.herokuapp.com/demo/code-analysis";

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSteps = async (codeData) => {
  try {

    await sleep(2000);
    console.log(codeData)
    const data = await axios({
      method: "post",
      url: endpoint,
      headers: {},
      data: codeData,
    });
    // const data = json;
    console.log(data)
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
