const User = require('../../db/models/user/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../../../config')

const generateAccessToken = (id) => {
  const payload = {id};

  return jwt.sign(payload, secret, {expiresIn: '24h'});
}

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
    res.status(422).send('Data is incorrect, error');
  }
}

module.exports.authorise = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({login});
    
    if (!user) {
      return res.status(400).send(`Пользователь ${login} не найден`);
    } else {
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).send(`Пароль неверный`);
      }

      const token = generateAccessToken(user._id);
      res.send({token});
    }
  } catch(e) {
    console.log(e);
    res.status(400).send('Data is incorrect, error');
  }
}