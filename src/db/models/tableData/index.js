const mongoose = require("mongoose");

const { Schema } = mongoose;

const tableDataScheme = new Schema({
  patientName: String,
  doctorName: String,
  date: String,
  complaints: String
});

module.exports = TableData = mongoose.model("tableData", tableDataScheme);