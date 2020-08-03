// Роутер для index.js

// Инициализируем EXPRESS.JS
const express = require("express");

// Объявляем переменную Роутер через метод .Router();
const router = express.Router();

// Метод GET передает серверу команду вернуть надпись "Cервер работает" и статус 200
router.get("/", (req, res) => {
  res.send( "Сервер работает" ).status(200);
});



// Экспортируем роутер
module.exports = router;