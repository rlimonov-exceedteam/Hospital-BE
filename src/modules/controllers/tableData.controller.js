const TableData = require('../../db/models/tableData/index');
const User = require('../../db/models/user/index');
const { secret } = require('../../../config');
const jwt = require('jsonwebtoken');

const verify = async (req, res) => {
  const token = req.headers.token;

  let id;

    try {
      const payload = jwt.verify(token, secret);
      id = payload.id;
    } catch (e) {
      res.status(401).send('token is not sended or is incorrect');
    }

    const someone = await User.findOne({_id: id});

    if (!someone) {
      res.status(401).send('unauthorized');
    }
    
    return id;
}

module.exports.getAllTableData = async (req, res) => {
  try {
    const userId = await verify(req, res);
    
    TableData.find({userId}).then(result => {
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

  const userId = await verify(req, res);

  if (
    userId,
    patientName &&
    doctorName &&
    complaints &&
    date 
  ) {
    const tableData = new TableData({...req.body, userId});
    tableData.save().then(result => {
      res.send(result);
    });
  } else {
    res.status(422).send('Data is incorrect, error!');
  }
}

module.exports.updateTableData = async (req, res) => {
  const body = req.body;
  const { _id } = body;

  try {
    await verify(req, res);
  } catch(e) {
    console.log(e);
  }

  TableData.findOneAndUpdate({_id}, body, {new: true}).then(result => {
    res.send(result);
  });
}

module.exports.deleteTableData = async (req, res) => {
  try {
    await verify(req, res);
  } catch(e) {
    console.log(e);
  }

  const { _id } = req.query;
  
  if (!_id) {
    return res.status(422).send('Data is incorrect, error!');
  } else {
    TableData.deleteOne({_id}).then(() => {
      res.send('Succesfully deleted');
    });
  }
}