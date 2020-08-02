//Импортируем React библиотеку
import React from 'react';

//Импортируем стили
import './Input.css';

// Рендерим Input
const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Напишите сообщение..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.keyCode === 13 ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Отправить</button>
  </form>
)

export default Input;