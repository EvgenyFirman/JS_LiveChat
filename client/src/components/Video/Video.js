import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import{Link} from 'react-router-dom'

import './Video.css'
 let socket;

const Video = function({name,room,location}){
   
    const serverPoint = 'localhost:5000'
    
    useEffect(() => {
        // Деструктурируем объект и присваиваем из строки url name и room
        const { name, room } = queryString.parse(location.search);
    
        // Присваиваем перменной socket значение io, с параметром localhost:5000
        socket = io(serverPoint);
        // Используем метод emit, и передаем в функцию параметры 'join',name,room, а также колбэк функцию error,и указатель на localhost5000
        socket.emit('join-room', { name, room }, (error) => {
          if(error) {
            alert(error);
          } 
        });
      }, []);
      
    return (
        <div className="outside__video--container">
            <div className="video__grid">
                
            </div>
            <h1>{name}</h1>
            <p>{room}</p>
            <div>
            <Link className="video__btn" to="/">Выйти из беседы</Link>
            </div>
        </div>
       
    )
}

export default Video;