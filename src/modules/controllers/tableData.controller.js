const TableData = require('../../db/models/tableData/index');

module.exports.getAllTableData = async (req, res) => {
  try {
    TableData.find().then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
}

module.exports.addTableData = async (req, res) => {
  const { 
    patientName, 
    doctorName,
    complaints,
    date 
  } = req.body;
  
  if (
    patientName &&
    doctorName &&
    complaints &&
    date 
    ) {
    const tableData = new TableData(req.body);
    tableData.save().then(result => {
      res.send(result);
    });
  } else {
    res.status(422).send('Data is incorrect, error!');
  }
}
