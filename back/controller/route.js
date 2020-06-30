const express = require("express");
const app = express();

const accountModule = require("../repository/leagueApi/accountData");
const matchHistoryModule = require("../repository/leagueApi/matchHistoryData");
const matchDetailsModule = require("../repository/leagueApi/matchDetailsData");

app.get("/summoner-name", async function(req, res) {
  let accountIds = await accountModule.getAccountIds(req.query.name);
  console.log(accountIds.data);
  res.status(accountIds.status).send(accountIds.data);
});

app.get("/match-frame", async function(req, res) {
  let matchFrame = await matchFrameModule.getMatchFrame(req.query.id);
  res.status(matchFrame.status).send(matchFrame.data);
});

app.get("/match-history", async function(req, res) {
  let matchHistory = await matchHistoryModule.getMatchHistory(
    req.query.id,
    req.query.champion
  );
  for (var element of matchHistory.data["matches"]) {
    element["detail"] = await matchDetailsModule
      .getMatchDetails(element["gameId"])
      .then(response => response.data);
    console.log(element["detail"]);
  }
  console.log("done");
  res.status(matchHistory.status).send(matchHistory.data);
});

app.get("/match-details", async function(req, res) {
  let matchDetails = await matchDetailsModule.getMatchDetails(req.query.id);
  console.log(matchDetails.data);
  res.status(matchDetails.status).send(matchDetails.data);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
