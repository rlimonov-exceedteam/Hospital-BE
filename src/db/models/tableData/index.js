const mongoose = require("mongoose");

const { Schema } = mongoose;

const tableDataScheme = new Schema({
  login: String,
  patientName: String,
  doctorName: String,
  date: String,
  complaints: String
});

module.exports = TableData = mongoose.model("tableData", tableDataScheme);