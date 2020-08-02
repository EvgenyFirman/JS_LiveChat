// Импортируем библиотеки
import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Импортируем стили
import './Join.css';

// Экспортируем функцию Логин
export default function LogIn() {
  // Используем useState() для определения стейта name,room
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  // Рендерим компонент
  return (
    // Разметка для внешнего контейнера
    <div className="join__out--container">
      <div className="join__inside--container">
        <h1 className="heading">Чат</h1>
        <div>
         {/*Разметка для инпута, плюс определение setName() функции при внесении информации в поле */}
          <input placeholder="Имя" className="join__input" type="text" onChange={(evt) => setName(evt.target.value)} />
        </div>
        <div>
          {/*Разметка для инпута, плюс определение setRoom() функции при внесении информации в поле */}
          <input placeholder="Комната" className="join__input margintop-20" type="text" onChange={(evt) => setRoom(evt.target.value)} />
        </div>
        {/*Ссылка для перехода к чату */}
        <Link onClick={evt => (!name || !room) ? evt.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button margintop-20'} type="submit">Войти</button>
        </Link>
        <span> By Evgeny Firman</span>
      </div>
    </div>
  );
}
