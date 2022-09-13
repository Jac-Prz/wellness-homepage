import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoContextProvider } from './context/TodoContext';
import { TimeProvider } from './context/TimeContext'
import { CalendarProvider } from './context/CalendarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CalendarProvider>
    <TodoContextProvider>
      <TimeProvider>
        <App />
      </TimeProvider>
    </TodoContextProvider>
  </CalendarProvider>
);
