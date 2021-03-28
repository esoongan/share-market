import React from 'react'
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';

const cx = classNames.bind(styles);

const LoginModal = () => (
  <ModalWrapper>
    <div className={cx('modal-header')}>
      <h1 className={cx('title')}>로그인하기</h1>
    </div>
    <div className={cx('modal-contents')}>
      
    </div>
  </ModalWrapper>
);

export default LoginModal;