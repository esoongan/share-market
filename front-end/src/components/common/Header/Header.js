import React from 'react'
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';

const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/"> Share Market </Link>
      </div>
      <div className={cx('right')}>
        {/* 조건에 따라 버튼 렌더링, to=''설정하기 */}
        <Button theme='text'>로그인</Button>
        <Button theme='outline'>회원가입</Button>
      </div>
    </div >
  </header>
);

export default Header;