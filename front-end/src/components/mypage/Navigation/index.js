import React from 'react';
import {Link, Route} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { BorroweePage, BorrowerPage } from 'pages';


const useStyles = makeStyles((theme) => ({
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
      <div className={classes.root}>
        <ButtonGroup sizs='large' variant="text" color="primary" aria-label="text primary button group">
         <Link to="/mypage/borrower">
          <Button>BUYER</Button>
          </Link>
          <Link to='/mypage/borrowee'>
          <Button>SELLER</Button> 
          </Link>
        </ButtonGroup>
        <hr/>
        <Route path = '/mypage/borrower' component={BorrowerPage}/>
        <Route path ='/mypage/borrowee' component={BorroweePage}/>
      </div>
    );
  };



