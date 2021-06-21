import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ButtonGroup
        sizs="large"
        variant="text"
        color="primary"
        aria-label="text primary button group"
        /* indicatorColor="primary" */
      >
        <Link to="/mypage/buyer">
          <Button>BUYER</Button>
        </Link>
        <Link to="/mypage/seller">
          <Button>SELLER</Button>
        </Link>
      </ButtonGroup>
      <hr />
    </section>
  );
}