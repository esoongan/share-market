import React from 'react';
import styles from './Reservation.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const MypostItem = () => {
    return (
        <div className={cx('item')}>
            <div className={cx('pic')}>사진가져오기</div>
        </div>        

    )
}

const Mypost = () => (
    <div className={cx('Myposts')}>
        <MypostItem/>
        <MypostItem/>
        <MypostItem/>
    </div>
);

export default Mypost;