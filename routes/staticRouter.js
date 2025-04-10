const express= require("express")
const router= express.Router();

const URL = require("../models/url.model")

router.get("/", async(req,res)=>{
    // console.log(req.user)
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("home", {urls: allUrls});
})

router.get("/signup", (req, res)=>{
    return res.render("signup")
});

router.get("/login", (req,res)=>{
    return res.render("login")
});

module.exports = router;