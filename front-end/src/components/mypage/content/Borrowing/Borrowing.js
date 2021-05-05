import React from 'react';
import styles from './Borrowing.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const BorrowingItem = () => {
    return (
        <div className={cx('item')}>
            <div className={cx('pic')}>사진가져오기</div>
            <div className={cx('title')}>제목</div>
            <div className={cx('category')}>카테고리</div>
        </div>        

    )
}

const Borrowing = () => (
    <div className={cx('borrowings')}>
        <BorrowingItem/>
        <BorrowingItem/>
        <BorrowingItem/>
    </div>
);

export default Borrowing;