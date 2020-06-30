const config = require("../../configuration/configApi");
const axios = require("axios");

exports.getMatchHistory = async function getMatchHistory(
  id,
  champion,
  beginIndex = 0,
  endIndex = 5
) {
  let uri = config.APIURI + config.MATCHHIS + id;
  let response = await axios
    .get(uri, {
      params: {
        ...(this.champion ? { champion: this.champion } : {}),
        beginIndex: beginIndex,
        endIndex: endIndex
      },
      headers: {
        "X-Riot-Token": config.APIKEY
      }
    })
    .then(response => response)
    .catch(e => console.log(e));
  return response;
};
