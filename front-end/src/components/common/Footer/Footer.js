import React from 'react'
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles);


const Footer = () => (
  <footer className={cx('footer')}>
    <div className={cx('divider')} />
    <div className={cx('footer-contents')}>
      <p>© 2021 이승진, 장지영, 정하영 All rights reserved</p>
      <div className={cx('sns-link')}>
        <a href='https://www.notion.so/sharemarket2021'>
          <div className={cx('notion')} />
        </a>
        <a href='https://github.com/esoongan/share-market'>
          <div className={cx('github')} />
        </a>
      </div>
    </div>

  </footer>
);

export default Footer;