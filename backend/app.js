require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const { errors } = require("celebrate");
const cors = require("cors");

const helmet = require("helmet");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const app = express();

const allowedCors = [
  "https://annnek.nomoredomains.rocks",
  "http://annnek.nomoredomains.rocks",
  "localhost:3000",
  "localhost:3001",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: allowedCors,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// app.use(cors());

// подключаем логгер запросов
app.use(requestLogger);

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
