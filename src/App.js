import React, {useState,useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import ChatWindow from './Components/ChatWindow';
import Chat from './Components/Chat';
import Client from './Components/Wit';
import axios from 'axios';

function App() {
  return (
    <div className="App container-fluid">
        <Header />          
        <ChatWindow 
          className="chatWindow" 
          />
      </div>
    );
}

export default App;

