const router = require('express').Router();
const { celebrate } = require('celebrate');
const authMiddle = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValid, movieValidId } = require('../utils/joi');

router.get('/movies', authMiddle, getMovies);
router.post('/movies', authMiddle, celebrate(movieValid), createMovie);
router.delete(
  '/movies/:movieId',
  authMiddle,
  celebrate(movieValidId),
  deleteMovie,
);

module.exports = router;
