const config = require("../../configuration/configApi");
const axios = require("axios");

exports.getTopLadder = async function getTopLadder() {
  let uri = config.APIURI + config.TOPLAD + "RANKED_SOLO_5x5/CHALLENGER/I";
  let response = await axios
    .get(uri, {
      headers: {
        "X-Riot-Token": config.APIKEY
      }
    })
    .then(response => response)
    .catch(e => console.log(e));
  return response;
};
