import React from 'react';
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import store from './app/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
);
