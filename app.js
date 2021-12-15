require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const app = express();

const apiRoutes = require('./src/modules/routes/routes');

try {
  const url = process.env.DB_URL;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch(error) {
  console.log(error);
}

app.use(bodyParser());
app.use(cookieParser());
app.use(cors());
app.use("/", apiRoutes);


app.listen(PORT, () => {
  console.log('App listening');
});