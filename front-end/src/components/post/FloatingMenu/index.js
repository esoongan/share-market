import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DateRangePicker } from 'react-dates';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	floatingPaper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	dateRangePicker: {
		marginBottom: theme.spacing(4),
	},
	button: {
		width: '80%',
		marginBottom: theme.spacing(1),
	},
	table:{
		marginTop: theme.spacing(1),
		width: '80%',
	}
}));

export default function FloatingMenu({ price, deposit }) {
	const classes = useStyles();
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [focusedInput, setFocusInput] = useState(null);
	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};
	const [days, setDays] = useState(1);	//선택한 날짜의 일수

	function createData(name, amount) {
		return { name, amount: `${amount}원` };
	}

	// TODO: days가 변경될 때 다시 계산하도록 hooks 적용하기
	const rows = [
		createData('렌탈비', `${days}일 X ${price}`),
		createData('보증금', `${deposit}`),
		createData('총합', parseInt(price) * days + parseInt(deposit)),
	];

	return (
		<Paper className={classes.floatingPaper} elevation={8}>
			<DateRangePicker
				startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
				startDateId="start_date" // PropTypes.string.isRequired,
				endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
				endDateId="end_date" // PropTypes.string.isRequired,
				onDatesChange={({ startDate, endDate }) =>
					setDateRange({ startDate, endDate })
				} // PropTypes.func.isRequired,
				focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={onFocusInput} // PropTypes.func.isRequired
				endDatePlaceholderText="반납일"
				startDatePlaceholderText="대여일"
			/>
			<Table className={classes.table} aria-label="price-table" size='small'>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				style={{ marginTop: '16px' }}
			>
				예약하기
			</Button>
			<Button className={classes.button} variant="contained" color="secondary">
				쪽지보내기
			</Button>
		</Paper>
	);
}
