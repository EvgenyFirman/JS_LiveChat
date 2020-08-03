// Импортируем библиотеку Реакт, а также компоненты Чат и компонент присоединится
import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Video from './components/Video/Video'

// Импортируем роутеры из реакт-роутер-дом
import { BrowserRouter as Router, Route } from "react-router-dom";

// Объявляем константу App и возвращаем маршрутизацию к компонентам присоединится и чат
const App = () => {
  return (
    <Router>
     {/* Маршрутизация */} 
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/video" component={Video}/>
    </Router>
  );
}
// Экспортируем App 
export default App;
