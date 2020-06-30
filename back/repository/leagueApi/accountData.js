const config = require("../../configuration/configApi");
const axios = require("axios");

exports.getAccountIds = async function getAccountIds(username) {
  let uri = config.APIURI + config.SUMBYNAME + username;
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
