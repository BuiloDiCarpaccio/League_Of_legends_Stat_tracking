const config = require("../../configuration/configApi");
const axios = require("axios");

exports.getMatchFrame = async function getMatchFrame(id) {
  let uri = config.APIURI + config.MATCHFRA + id;
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
