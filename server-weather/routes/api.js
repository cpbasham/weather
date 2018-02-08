const express = require('express');
const router = express.Router();
const request = require('request-promise');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GoogleMapsKey,
  Promise: Promise
});

const DSHead = "https://api.darksky.net/"
const DSKey  = process.env.DarkSkyKey;

function getDSURI(callType, queryParams) {
  return DSHead + callType + "/" + DSKey + "/" + queryParams;
}

/* GET api calls. */
router.get('/forecast', asyncMiddleware( async (req, res, next) => {
  // console.log(req.query);
  const {lat, lng, time=undefined} = req.query;
  let uri;
  if (time !== undefined) { uri = getDSURI("forecast", `${lat},${lng},${time}`) }
  else { uri = getDSURI("forecast", `${lat},${lng}`) }
  const options = {
    uri,
    json: true
  }
  const forecast = await request(options);
  res.send(forecast);
}));

router.get('/geocode/:address', asyncMiddleware( async (req, res, next) => {
    const response = await googleMapsClient.geocode({address: req.params.address}).asPromise();
    res.json(response.json.results);
    /*
    googleMapsClient.geocode({address: req.params.address})
	.asPromise()
	.then((gResponse)=>{return res.json(gResponse.json.results);})
	.catch((e)=>{console.log(e)});
    */
}));

module.exports = router;
