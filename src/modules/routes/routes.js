const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  createNewUser,
  authorise
} = require('../controllers/user.controller');

const {
  addTableData,
  getAllTableData,
  updateTableData,
  deleteTableData
} = require('../controllers/tableData.controller');

router.post('/createNewUser', [
  check('login', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль не может быть пустым").notEmpty()
], createNewUser);
router.post('/authorise', authorise);

router.get('/getAllTableData', getAllTableData);
router.post('/addTableData', addTableData);
router.patch('/updateTableData', updateTableData);
router.delete('/deleteTableData', deleteTableData);

module.exports = router;