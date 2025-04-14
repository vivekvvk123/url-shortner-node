const express = require("express");
const urlRoute = require("./routes/url.route");
const userRoute = require("./routes/user.route");
const connectToMongoDB = require("./connect");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
// const {restrictToLoggedinUserOnly,checkAuth,} = require("./middlewares/auth.middleware");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth.middleware");
const staticRoute = require("./routes/staticRouter");

const path = require("path");

// const User = require("./models/user.model");
const URL = require("./models/url.model");
const app = express();
const PORT = 8001;

connectToMongoDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render('home', {urls:allUrls});
// });

//Routes


app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
