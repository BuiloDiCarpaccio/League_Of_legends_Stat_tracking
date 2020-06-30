const axios = require("axios");
const championsUri =
  "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json";

exports.getItems = async function getItems() {
  try {
    let response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json"
    );
    response = response.data.data;
    for (const element in response) {
      let detailResponse = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion/${response[element].id}.json`
      );
      response[element]["passive"] =
        detailResponse.data.data[response[element].id].passive;
      response[element]["spells"] =
        detailResponse.data.data[response[element].id].spells;
      console.log(`Loading ${response[element].name}...`);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
