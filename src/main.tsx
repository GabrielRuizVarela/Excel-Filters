import React from 'react';
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import './index.css';

const store = configureStore;

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
