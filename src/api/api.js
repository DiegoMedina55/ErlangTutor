import json from "./structure.json"
// import jsonError from "./errorStructure.json"

const axios = require("axios");
const endpoint = "https://immense-river-16385.herokuapp.com/demo/code-analysis";

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSteps = async (codeData) => {
  try {

    console.log(codeData)
    const data = await axios({
      method: "post",
      url: endpoint,
      headers: { 
        'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
        'Content-Type' : 'text/plain' 
      },
      data: codeData,
    });
    await sleep(2000);
    console.log(data.data)
    return data.data;
    // const data = json;
    // return data
  } catch (error) {
    console.log(error)
  }
};
