import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button, Paper } from '@material-ui/core';
import { DateRangePicker } from 'react-dates';

const useStyles = makeStyles(theme => ({
	floatingPaper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(4),
	},
	dateRangePicker: {
		marginBottom: theme.spacing(4),
	},
	button: {
		width: '80%',
		marginBottom: theme.spacing(1),
	},
	divider: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
}));

export default function FloatingMenu({price, deposit}) {
	const classes = useStyles();
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [focusedInput, setFocusInput] = useState(null);
	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};

	return (
		<Paper className={classes.floatingPaper} elevation={8}>
			<Typography>보증금: {deposit} 렌탈비: {price}</Typography>
			<Divider className={classes.divider} />
			<DateRangePicker
				//todo: 테두리 빼기 https://github.com/airbnb/react-dates#overriding-styles
				startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
				startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
				endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
				endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
				onDatesChange={({ startDate, endDate }) =>
					setDateRange({ startDate, endDate })
				} // PropTypes.func.isRequired,
				focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={onFocusInput} // PropTypes.func.isRequired
				endDatePlaceholderText="반납일"
				startDatePlaceholderText="대여일"
			/>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				style={{ 'marginTop': '64px' }}
			>
				예약하기
			</Button>
			<Button className={classes.button} variant="contained" color="secondary">
				쪽지보내기
			</Button>
		</Paper>
	);
}
