// Импортируем библиотеку
import React from 'react';
// Импортируем стили
import './Message.css';

// Компонент сообщения
const Message = ({ message: { text, user }, name }) => {
  // Задаем переменную которая меняется в зависимости было ли отправлено сообщение текущим пользователем
  let isSentByCurrentUser = false;
  // Обрезаем сообщение 
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  // Рендерим компонент
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}
// Экспортируем компонент
export default Message;