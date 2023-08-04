const Error400 = require('../errors/error400');
const Error404 = require('../errors/error404');
const Error403 = require('../errors/error403');
const { ERROR_CODES } = require('../errors/errors');
const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      next(new Error404('Нет фильма с таким id'));
      return;
    }

    if (movie.owner.toString() !== userId) {
      next(new Error403('У вас нет прав'));
      return;
    }

    await Movie.findByIdAndRemove(movieId);
    res.send(movie);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new Error400('false ID'));
    } else {
      next(error);
    }
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description,
      image, trailerLink, thumbnail, movield, nameRU, nameEN,
    } = req.body;

    const newMovie = await Movie.create({
      owner: req.user._id,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movield,
      nameRU,
      nameEN,
    });
    if (!newMovie) {
      next(new Error404('Фильм не создан'));
      return;
    }
    res.status(ERROR_CODES.CREATED).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new Error400('ValidationError'));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, deleteMovie, createMovie };
