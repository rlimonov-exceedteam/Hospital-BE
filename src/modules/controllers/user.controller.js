const User = require('../../db/models/user/index');

// module.exports.getAllTasks = (req, res, next) => {
//   try {
//     Task.find().then(result => {
//       res.send({data: result});
//     });
//   } catch (error) {
//     res.status(error.status || 500).send({
//       error: {
//         status: error.status || 500,
//         message: error.message || "Internal Server Error",
//       },
//     });
//   }
// }

module.exports.createNewUser = (req, res) => {
  const body = req.body;

  if (body.hasOwnProperty('login') && body.hasOwnProperty('password')) {
    const user = new User(req.body);
    user.save().then(result => {
      res.send(result);
    });
  } else {
    res.status(422).send('Data is incorrect, error!');
  }
}

// module.exports.changeTaskInfo = (req, res, next) => {
//   const body = req.body;

//   if (body.hasOwnProperty('_id') && (body.hasOwnProperty('text') || body.hasOwnProperty('isCheck'))) {
//     Task.updateOne({_id: req.body._id}, req.body).then(result => {
//       res.send(result);
//     });
//   } else {
//     res.status(422).send('Data is incorrect, error!');
//   }
// }

// module.exports.deleteTask = (req, res, next) => {
//   if (!req.query._id) {
//     return res.status(422).send('Error! Params not correct');
//   } else {
//     Task.deleteOne({_id: req.query._id}).then(result => {
//       res.send('succesfully deleted');
//     });
//   }
// }