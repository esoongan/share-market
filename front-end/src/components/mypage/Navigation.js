import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link, Route, Switch } from 'react-router-dom';
import BorrowerPage from '/pages/mypage/borrower';
import BorroweePage from '/pages/mypage/borrowee';



const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs({history}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.navTab}
      >
        <Tab className={classes.navTab} label="Borrowee" component={Link} to "pages/mypage/borrowee" />
        <Tab className={classes.navTab} label="Borrower" component={Link} to "pages/mypage/borrower" />       
      </Tabs>

      <Switch>
       <Route exact path='/mypage/borrower' component={BorrowerPage} /> 
       <Route exact path='/mypage/borrowee' component={BorroweePage} /> 
    </Switch>
         
    </Paper>

   
  );
}