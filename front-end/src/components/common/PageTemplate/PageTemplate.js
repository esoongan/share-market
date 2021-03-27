import React from 'react';
import styles from './PageTemplate.scss'
import classNames from 'classnames/bind'
import Header from 'components/common/Header'
import Footer from '../Footer';

const cx = classNames.bind(styles)

function PageTemplate({children}) {
    return (
        <div className={cx('page-template')}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default PageTemplate;