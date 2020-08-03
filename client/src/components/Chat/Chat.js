// Импортируем библиотеки 
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import {Link} from 'react-router-dom'


// Импортируем Компоненты
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';


// Импортируем стили
import './Chat.css';

// Объявляем переменную сокет
let socket;

// Объявляем функцию чат, куда вносим параметр location
const Chat = ({ location }) => {
  // Определяем стейты
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

//Определяем точку сервера 
  const serverPoint = 'localhost:5000';

  // Определяем функцию useEffect 
  useEffect(() => {
    // Деструктурируем объект и присваиваем из строки url name и room
    const { name, room } = queryString.parse(location.search);

    // Присваиваем перменной socket значение io, с параметром localhost:5000
    socket = io(serverPoint);

    // Обновляем стейт name и room с помощью setName и setRoom
    setRoom(room);
    setName(name)

    // Используем метод emit, и передаем в функцию параметры 'join',name,room, а также колбэк функцию error,и указатель на localhost5000
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [serverPoint, location.search]);
  


  // Определяем функцию useEffect 
  useEffect(() => {
    // При отправке сообщения, передаем его в стейт setMessages, в результате исполнения функции в с помощью spread оператора значения добавляется к массиву сообщений
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    // Рендерим пользователей на странице
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  // Определяем функцию отправить сообщение
  const sendMessage = (event) => {

    // Предотвращаем поведение события по умолчанию, чтобы не перезагружалась страница
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  // Рендерим компонент
  return (
    <div className="outside__container">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          
      </div>
      <Link className="chat__btn" to ={`/Video?name=${name}&room=${room}`}> Перейти к Видео Чату</Link>
      <TextContainer users={users}/>
      
    </div>
  );
}
// Экспортируем компонент Чат
export default Chat;
