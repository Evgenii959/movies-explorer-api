const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  userValid,
  userValidUpdate,
  userValidLogin,
} = require('../utils/joi');
const authMiddle = require('../middlewares/auth');
const {
  createUser,
  updateUser,
  login,
  getCurentUser,
} = require('../controllers/users');

router.post('/signup', celebrate(userValid), createUser);

router.post('/signin', celebrate(userValidLogin), login);

router.get('/users/me', authMiddle, getCurentUser);

router.patch('/users/me', authMiddle, celebrate(userValidUpdate), updateUser);

module.exports = router;
