const config = require("../../configuration/configApi");
const axios = require("axios");

exports.getMatchDetails = async function getMatchDetails(id) {
  let uri = config.APIURI + config.MATCHDET + id;
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
