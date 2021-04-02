import React, { Component } from 'react'
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class LoginModal extends Component{

  render() {
    const { visible, error, username, password } = this.props
    const { onLogin, onCancel, onChangeInput, onKeyPress } = this.props
    return (
      <ModalWrapper visible = {visible}>
        <div className={cx('modal-header')}>
          <h1 className={cx('title')}>로그인하기</h1>
        </div>
        <form className={cx('login-form')}>
          <div>
            <input autoFocus type="text" name="username" id="username" placeholder='아이디'
              onChange={onChangeInput}
              value={username} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder='패스워드'
              onChange={onChangeInput}
              value={password} 
              onKeyPress={onKeyPress}/>
          </div>
        </form>
        { error && <div className = {cx('error')}>로그인 실패</div> }
        <div className={cx('options')}>
          <Button onClick={onLogin}>로그인</Button>
          <Button theme="gray-text" onClick={onCancel}>취소</Button>
        </div>

      </ModalWrapper>
    );
  }
}

export default LoginModal;