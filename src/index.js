import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import store from './Redux/store'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

