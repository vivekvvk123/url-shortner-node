const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURL, handleGetURL, handleGetAnalytics} = require("../controllers/url.controller")

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetURL);

router.get("/analytics/:shortId", handleGetAnalytics);




module.exports = router;