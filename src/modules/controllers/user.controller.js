const User = require('../../db/models/user/index');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports.createNewUser = async (req, res) => {
  const { login, password } = req.body;
  const someone = await User.findOne({login});
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send('Ошибка при регистрации');
  } else if (someone) {
    return res.status(400).send('Пользователь с таким имемен уже существует.')
  } else if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({login, password: hashPassword})

    user.save().then(result => {
      res.send(result);
    });
  } else {
    res.status(422).send('Data is incorrect, error!');
  }
}
