// ГЛАВНЫЙ ФАЙЛ СЕРВЕРА

// Присваиваем переменным http,express,socketIO,cors соответствующие названию пакеты NPM 
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

// Функции, импортируемые из файла Users.js
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Импортируем переменную роутер из файла router.js
const router = require('./router');

// Объявляем переменную app и присваиваем ей значение express()
const app = express();
// Объявляем переменную сервер, передаем в функцию createServer() в качестве аргумента app
const server = http.createServer(app);
// Объявляем переменную io и присваиваем ей в качестве значения функцию socketio() в которую передаем значение server
const io = socketio(server);

// Используем метод use в переменной app, и в качестве агрумента передаем колбэк функцию cors, и значение router, импортируемое из router.js
app.use(cors());
app.use(router);

// Используем метод on на переменной io, в который передаем в качестве аргумента информацию о том что мы подключаем сокет
io.on('connect', (socket) => {
  // При присоединении cокета в качестве аргументов передаем имя и название комнаты, а также колбэк функцию
  socket.on('join', ({ name, room }, cb) => {
    // Деструктурируем объект с error и user  и присваем ему значение функции добавить пользователя, в которую передаем id сокета, имя и комнаты 
    const { error, user } = addUser({ id: socket.id, name, room });

    // В случае ошибки передаем значение error в колбэк функцию 
    if(error) return cb(error);

    // Используем метод join на сокете и в качестве аргумента передаем данные о комнате в которую направляется пользователь
    socket.join(user.room);

    // Отправляем текстовое сообщение "Пользователь, добро пожаловать в комнату" от пользователя "админ"
    socket.emit('message', { user: 'админ', text: `${user.name}, добро пожаловать в комнату ${user.room}.`});
    // Отправляем текстовое сообщение всем пользователям в комнату, куда присоединился пользователь "Пользователь присоединился"
    socket.broadcast.to(user.room).emit('message', { user: 'админ', text: `${user.name} присоединился к чату!` });

    // Выводим количество пользователей в комнате
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // Коллбэк функция
    cb();
  });


  // Используем метод on на сокете с параметром отправить сообщение, для отправки сообщения в чат, в качестве параметра также используем колбэк функцию
  socket.on('sendMessage', (message, cb) => {
    // Присваем значению user результат выполнения функции getUser с параметром id сокета
    const user = getUser(socket.id);
    // Отправляем пользователям в комнате сообщение
    io.to(user.room).emit('message', { user: user.name, text: message });
    // Колбэк функция
    cb();
  });

  // Определям функцию которая будет выключать соединение через сокет
  socket.on('disconnect', () => {
    // Определяем переменную пользователь и присваем ей значение функции удалить пользователя с параметром айди сокета
    const user = removeUser(socket.id);
    // Если пользователь существует, то
    if(user) {
      // Выводим сообщение пользователь покинул чат
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} покинул чат.` });
      // Обновляем данные о количестве пользователей в комнате
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
// Запускаем сервер на локалхост 5000, и подготавливаем к деплою на удаленный хостинг
server.listen(process.env.PORT || 5000, () => console.log(`Сервер запущен`));