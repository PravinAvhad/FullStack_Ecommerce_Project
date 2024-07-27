const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
//Config
dotenv.config({path:"backend/config.env"});

app.use(express.json({limit:'100mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());
//Routes Imports
const itemRoute = require("./routes/ItemRoute");
const userRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const PaymentRoute = require("./routes/paymentRoute");

app.use("/api/v1",itemRoute);
app.use("/api/v2",userRoute);
app.use("/api/v3",OrderRoute);
app.use("/api/v4",PaymentRoute);
//Error Middlerware
app.use(ErrorMiddleware);

module.exports = app;