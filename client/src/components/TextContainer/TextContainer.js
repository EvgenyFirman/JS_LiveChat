// Импортируем библиотеку React
import React from 'react';
// Импортируем иконку 
import onlineIcon from '../../icons/onlineIcon.png';
// Импортируем стили
import './TextContainer.css';
// Рендерим правый блок сайта, с информацией
const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Чат приложение в реальном времени</h1>
      <h2>By Evgeny Firman &copy;</h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>Люди в чате</h1>
            <div className="activeContainer">
              <h2>
                {/*Перебираем массив и выводим данные о пользователях*/}
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);
// Экспортируем компонент
export default TextContainer;