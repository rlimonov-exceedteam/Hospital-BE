const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  createNewUser,
  authorise
} = require('../controllers/user.controller');

router.post('/createNewUser', [
  check('login', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль не может быть пустым").notEmpty()
], createNewUser);
router.post('/authorise', authorise);

module.exports = router;