// Импортируем библиотеки
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
// Импортируем компонент Сообщения
import Message from './Message/Message';
//Импортируем стили
import './Messages.css';

// Рендерим сообщения 
const Messages = ({ messages, name }) => (
  /* Пролистываем сообщения вниз*/ 
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);
// Экспортируем сообщения
export default Messages;