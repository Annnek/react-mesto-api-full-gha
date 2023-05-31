const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
// подключаем логгер запросов
app.use(requestLogger);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
