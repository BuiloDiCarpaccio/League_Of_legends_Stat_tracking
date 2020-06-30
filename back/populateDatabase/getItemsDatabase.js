const axios = require("axios");
const championsUri =
  "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json";

exports.getItems = async function getItems() {
  try {
    let response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/item.json"
    );
    response = response.data.data;
    for (const element in response) {
      let detailResponse = await axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/10.6.1/img/item/${response[element].image.full}`,
          {
            responseType: "arraybuffer"
          }
        )
        .then(response =>
          Buffer.from(response.data, "binary").toString("base64")
        );
      response[element]["id"] = element;
      response[element]["png"] = detailResponse;
      console.log(`Loading ${response[element].name}...`);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
