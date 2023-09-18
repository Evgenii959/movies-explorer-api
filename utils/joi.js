const { Segments, Joi } = require('celebrate');
const validUrl = require('valid-url');

const movieValid = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
    duration: Joi.number().integer().required().messages({
      'number.empty': 'Поле должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('Ошибка');
        }
        return value;
      })
      .messages({
        'string.empty': 'Строка не должна быть пустой',
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('Ошибка');
        }
        return value;
      })
      .messages({
        'string.empty': 'Строка не должна быть пустой',
        'string.uri': 'Не допустимый URL',
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('Ошибка');
        }
        return value;
      })
      .messages({
        'string.empty': 'Строка не должна быть пустой',
        'string.uri': 'Не допустимый URL',
      }),
    movieId: Joi.number().required().messages({
      'number.empty': 'Поле должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
    nameEN: Joi.string().required().messages({
      'string.empty': 'Строка не должна быть пустой',
    }),
  }),
};

const movieValidId = {
  [Segments.PARAMS]: Joi.object()
    .keys({
      movieId: Joi.string().required().length(24).hex(),
    })
    .messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.hex': 'Должно содержать 16 символов',
    }),
};

const userValid = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'минимальное количество символов 2',
      'string.max': 'максимальное количество символов 30',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.email': 'Некорректный email',
    }),
    password: Joi.string().required().min(5).messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.min': 'минимальное количество символов 5',
    }),
  }),
};

const userValidUpdate = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Строка не должна быть пустой',
        'string.min': 'минимальное количество символов 2',
        'string.max': 'максимальное количество символов 30',
      }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.email': 'Некорректный email',
    }),
  }),
};

const userValidLogin = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.email': 'Некорректный email',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Строка не должна быть пустой',
      'string.min': 'минимальное количество символов 8',
    }),
  }),
};

module.exports = {
  movieValid,
  movieValidId,
  userValid,
  userValidUpdate,
  userValidLogin,
};
