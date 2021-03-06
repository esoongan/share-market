import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import configure from './store/configure'
import { Provider } from 'react-redux';
import App from 'components/App';
import { tempSetLogged, checkUser } from 'store/modules/auth';


axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = false;    //백엔드로부터 refreshToken cookie를 주고받기

const store = configure()

function loadUser() {
  try {
    const token = localStorage.getItem('X-AUTH-TOKEN');
    if (!token) return; // 로그인 상태가 아니라면 아무것도 안함
    store.dispatch(tempSetLogged(token));
    store.dispatch(checkUser({token}));
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadUser()
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();