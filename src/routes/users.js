var express = require("express");
var router = express.Router();
const sum = require("../util/sum");
const logger = require("../logger");
const tracer = require("../tracer");

/* GET users listing. */

function returnSuccessful(res) {
  logger.info("success");
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify({ msg: "OK" }));
}

function returnServiceUnavailable(res) {
  logger.error("error");
  res.writeHead(503, { "Content-type": "application/json" });
  res.end(JSON.stringify({ error: "Service unavailable" }));
}
router.get("/", function (req, res, next) {
  const span = tracer.scope().active();
  // span.setTag("product", "sample");
  try {
    null.toString();
  } catch (e) {
    span.setTag("error", e);
  }
  if (process.env.SERVICE_VERSION === "v-faulty") {
    // in half of the cases return error,
    // in another half proceed as usual
    let target_rate = parseFloat(process.env.ERROR_RATE) || 0.5;
    var random = Math.random(); // returns [0,1]
    if (random <= target_rate) {
      returnServiceUnavailable(res);
    } else {
      returnSuccessful(res);
    }
  } else if (process.env.SERVICE_VERSION === "v-delayed") {
    // in half of the cases delay for 7 seconds,
    // in another half proceed as usual
    let target_rate = parseFloat(process.env.ERROR_RATE) || 0.5;
    var random = Math.random(); // returns [0,1]
    if (random <= target_rate) {
      setTimeout(returnSuccessful, 7000, res);
    } else {
      returnSuccessful(res);
    }
  } else if (process.env.SERVICE_VERSION === "v-unavailable" || process.env.SERVICE_VERSION === "v-unhealthy") {
    if (unavailable) {
      returnServiceUnavailable(res);
    } else {
      returnSuccessful(res);
    }
  } else {
    returnSuccessful(res);
  }
});

module.exports = router;
