import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Select from "react-select";
import { DateRangePicker } from 'react-dates';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {cityMarkets, categoryMarkets} from 'constant/locale'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(16),
  },
  section: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(16),
  },
  searchSection: {
    background: grey[200],
  },
  searchBox: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  cityButton:{
    padding: theme.spacing(4),
    width: '100%',
  },
  categoryPaper: {
    width:'100%',
    paddingTop: '100%', /* 1:1 Aspect Ratio */
    position: 'relative', /* If you want text inside of it */

    '& span':{
      position:'absolute',
      bottom:theme.spacing(2),
      left: theme.spacing(2),
    }
  }
}));
const locationStyles = {
  control: styles => ({
    ...styles,
    border: 0,
    width: 200,
  }),
  indicatorSeparator: styles => ({ ...styles, backgroundColor: 0 }),
};


const HomePage = () => {
  const classes = useStyles();
  const [focusedInput, setFocusInput] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null, });

  const onFocusInput = (focusDate) => {
    setFocusInput(focusDate);
  }
  // focusedInput,
  // startDate: props.initialStartDate,
  // endDate: props.initialEndDate,
  return (
    <div className={classes.root}>
      <section className={clsx(classes.searchSection, classes.section)}>
        <Grid
          container
          justify='center'
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
          >
            <Paper
              className={classes.searchBox}
              elevation={6}
            >
              <Select
                placeholder='지역'
                styles={locationStyles}
              // todo: 옵션 설정ㄴ
              />

              <Divider className={classes.divider} orientation="vertical" />

              <DateRangePicker
                //todo: 테두리 빼기 https://github.com/airbnb/react-dates#overriding-styles
                startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => setDateRange({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={onFocusInput} // PropTypes.func.isRequired,
              />

              <Divider className={classes.divider} orientation="vertical" />

              <InputBase
                className={classes.input}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />

              <Divider className={classes.divider} orientation="vertical" />
              <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

        </Grid>
      </section>
      <section className={classes.section}>
        <Typography variant="h5" gutterBottom>
          지역별 마켓 둘러보기
        </Typography>
        <Grid container spacing={2}>
          {
            cityMarkets.map((item) => (
              <Grid key={item.value} item xs={6} sm={4} md={2}>
                <Button className={classes.cityButton} size="large" variant="contained" color="primary" onClick={null}>
                  {item.label}
                </Button>
              </Grid>
            ))
          }
    
        </Grid>
      </section>
      <section className={classes.section}>
        <Typography variant="h5" gutterBottom>
          카테고리 별 둘러보기
        </Typography>
        <Grid container spacing={2}>
          {
            categoryMarkets.map((item) => (
              <Grid key={item.value} item xs={12} sm={3}>
                <Paper className={classes.categoryPaper} style={{background: 'orange'}}>
                  <span>{item.label}</span>
                </Paper>
              </Grid>
            ))
          }
    
        </Grid>
      </section>
    </div>
  )
}

export default HomePage