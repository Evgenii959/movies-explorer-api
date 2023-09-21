require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    family: 4,
  })
  .then(() => {
    console.log('Подключен');
  });

const app = express();
app.use(
  cors({
    origin: "https://frontend-evgeny.nomoredomains.sbs",
    /* origin: "http://localhost:3001", */
    credentials: true,
  })
);

app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.disable('x-powered-by');

app.listen(PORT, () => {
  console.log(`Ser running ${PORT}`);
});
