import React, { Component } from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class ModalWrapper extends Component {
  render() {
    const {children, visible} = this.props    //visible===true 일 때만 보이도록
    if(!visible)  return null
    
    return (
      <div>
        <div className={cx('gray-background')}/>
        <div className={cx('modal-wrapper')}>
          <div className={cx('custom-modal')}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
export default ModalWrapper;