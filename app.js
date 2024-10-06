const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database");
const PORT_NUMBER = process.env.PORT_NUMBER || 4443;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const User = require("./models/userModel");

const userRoute= require('./routes/userRoute');

app.use('/api/users',userRoute)

sequelize
  .sync()
  .then((response) => {
    app.listen(PORT_NUMBER, () => {
      console.log(`APP URL http://localhost:${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
