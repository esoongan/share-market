import React from 'react'
import styles from './Content1.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Content1 = () => (
  <div>
    <img className={cx('background-image')}
      alt='background'
    />
  </div>
);

/* IF class 
import React, { Component } from 'react';

class Content_1 extends Component {
  render() {
    return (
      <div>
        Content_1
      </div>
    );
  }
}
*/
export default Content1;