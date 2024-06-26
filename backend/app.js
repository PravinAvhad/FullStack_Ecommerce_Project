const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());
//Routes Imports
const itemRoute = require("./routes/ItemRoute");
const userRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
app.use("/api/v1",itemRoute);
app.use("/api/v2",userRoute);
app.use("/api/v3",OrderRoute);

//Error Middlerware
app.use(ErrorMiddleware);

module.exports = app;