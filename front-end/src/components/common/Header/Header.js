import React from 'react'
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';

const cx = classNames.bind(styles);

//PageTemplate 컴포넌트에 들어감
const Header = ({ onLoginClick, onLogoutClick, logged }) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/"> Share Market </Link>
      </div>
      {!logged &&
        <div className={cx('right')}>
          <Button theme='text' onClick={onLoginClick} >로그인</Button>
          <Button theme='outline' to='/join'>회원가입</Button>
        </div>
      }
      {logged &&
        <div className={cx('right')}>
          TODO: 로그인 상태일 때
        </div>
      }

    </div >
  </header>
);

export default Header;