import logo from './logo.svg';
import styles from './App.scss';
import React, { Component } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div className={cx('App')}>
      <header className={cx("App-header")}>
        <img src={logo} className={cx("App-logo")} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={cx("App-link")}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    );
  }
}

export default App;