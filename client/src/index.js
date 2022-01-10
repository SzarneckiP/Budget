import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { Provider } from 'react-redux';
//import configureStore from 'data/store';

// const store = configureStore();
//<React.StrictMode>
// <Provider store={store}>
//       <App />                                           <--- THIS IS NEED IF YOU WANT TO CONNECT REDUX STORE
//     </Provider>
//</React.StrictMode>

ReactDOM.render(<App /> ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
