const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Error401 = require('../errors/error401');
const Error404 = require('../errors/error404');
const Error409 = require('../errors/error409');
const { codeMessage, ERROR_CODES } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      next(new Error401('Неправильная почта или пароль'));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'asdcqwcqwcdqwcq',
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: codeMessage.succes });
  } catch (err) {
    next(err);
  }
};

const getCurentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new Error404('Пользователя не существует'));
      return;
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((newUser) => res.status(ERROR_CODES.OK).send(newUser))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Error409('Такой email уже существует'));
      } else {
        next(err);
      }
    });
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, password, email,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      password: hashPassword,
      email,
    });
    res.status(ERROR_CODES.CREATED).send({
      name,
      email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new Error409('Такой email уже существует'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  login,
  getCurentUser,
  updateUser,
  createUser,
};
