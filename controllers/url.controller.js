// const shortid = require("shortid");
const {nanoid} = require("nanoid");
const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId ,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });

  // return res.json({ id: shortId });
  return res.render("home", {id:shortId})
}

async function handleGetURL(req,res){
    const {shortId} = req.params;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {$push: {visitHistory: {timestamp: Date.now()} }},
        {new: true});

    redirectURL = entry.redirectURL;
    if (!/^https?:\/\//i.test(redirectURL)) {
        redirectURL = 'http://' + redirectURL;
    }
    res.redirect(redirectURL);

}

async function handleGetAnalytics(req,res){
    const {shortId} = req.params;
    const result = await URL.findOne({shortId});

    return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
  handleGenerateNewShortURL,
    handleGetURL,
    handleGetAnalytics,
};
