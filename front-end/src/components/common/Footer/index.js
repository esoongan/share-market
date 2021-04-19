import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    footer: {
        display: 'flex',
        marginTop: 'auto',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
}));


export default function Footer() {
    const classes = useStyles();

    return (
        <Paper
            className={classes.footer}
            component='footer'
            elevation={0}
        >
            <Container>
            <Divider />
            <p>© 2021 이승진, 장지영, 정하영 All rights reserved</p>
                {/* <div className={cx('footer-contents')}>
                    <p>© 2021 이승진, 장지영, 정하영 All rights reserved</p>
                    <div className={cx('sns-link')}>
                        <a href='https://www.notion.so/sharemarket2021'>
                            <div className={cx('notion')} />
                        </a>
                        <a href='https://github.com/esoongan/share-market'>
                            <div className={cx('github')} />
                        </a>
                    </div> */}
            </Container>
        </Paper>
    )
}