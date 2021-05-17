import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link, Route, Switch } from 'react-router-dom';
import BorrowerPage from 'src/pages/mypage/BorrowerPage';
import BorroweePage from 'src/pages/mypage/BorroweePage';



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
        <Tab className={classes.navTab} label="Borrowee" component={Link} to BorroweePage />
        <Tab className={classes.navTab} label="Borrower" component={Link} to BorrowerPage />       
      </Tabs>

      <Switch>
       <Route exact path='src/pages/mypage/BorrowerPage' component={BorrowerPage} /> 
       <Route exact path='src/pages/mypage/BorroweePage' component={BorroweePage} /> 
    </Switch>
         
    </Paper>

   
  );
}