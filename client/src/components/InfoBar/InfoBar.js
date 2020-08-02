// Импортируем React библиотеку
import React from 'react';
// Импортируем иконки онлайн офлайн
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
//Импортируем стили
import './InfoBar.css';

// Рендерим компонент
const InfoBar = ({ room }) => (
  <div className="info__bar">
    <div className="left__inside--container">
      <img className="onlineIcon" src={onlineIcon} alt="иконка онлайн" />
      {/* Передаем значение комнаты*/ }
      <h3>{room}</h3>
    </div>
    <div className="right__inside--container">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);
// Экспортируем компонент
export default InfoBar;