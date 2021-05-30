import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DateRangePicker } from 'react-dates';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';

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
	table: {
		marginTop: theme.spacing(1),
		width: '80%',
	},
}));

export default function FloatingMenu({
	price,
	deposit,
	editable,
	onClickReserve,
	blocked,
	reserved,
}) {
	const classes = useStyles();
	const [alert, setAlert] = useState(false);
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [focusedInput, setFocusInput] = useState(null);
	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};
	const [days, setDays] = useState(1); //선택한 날짜의 일수
	// https://github.com/airbnb/react-dates#overriding-styles

	const onDatesChange = ({ startDate, endDate }) => {
		setDateRange({ startDate, endDate });
		if (startDate && endDate) {
			setDays(endDate.diff(startDate, 'days'), 'days');
			setAlert(false);
		}
	};
	function createData(name, amount) {
		return { name, amount: `${amount}원` };
	}
	const rows = [
		createData('렌탈비', `${days}일 X ${price}`),
		createData('보증금', `${deposit}`),
		createData('총합', parseInt(price) * days + parseInt(deposit)),
	];
	const handleClickReserve = () => {
		if (dateRange.startDate && dateRange.endDate) {
			onClickReserve({
				startDate: dateRange.startDate.format('YYYY-MM-DD'),
				endDate: dateRange.endDate.format('YYYY-MM-DD'),
			});
			setAlert(false);
		}
		// 날짜를 선택하지 않고 예약버튼을 눌렀을 때 처리
		else {
			setAlert(true);
		}
	};

	const isDayBlocked = day => {
		if (blocked.length === 0) {
			return false;
		}
		const fDay = moment(day.format('YYYY-MM-DD'));
		let isBlocked = false;
		for (let b of blocked) {
			const fStart = moment(b.startDate, 'YYYY-MM-DD').subtract(1, 'day');
			const fEnd = moment(b.endDate, 'YYYY-MM-DD').add(1, 'day');
			if (fDay.isBetween(fStart, fEnd)) isBlocked = true;
		}
		return isBlocked;
	};
	return (
		<Paper className={classes.floatingPaper} elevation={8}>
			{alert && (
				<Alert style={{ width: '100%', marginBottom: '4px' }} severity="info">
					먼저 날짜를 선택해 주세요.
				</Alert>
			)}
			{reserved === true && (
				<Alert
					style={{ width: '100%', marginBottom: '4px' }}
					severity="success"
				>
					예약 요청을 보냈습니다.
				</Alert>
			)}
			{reserved === false && (
				<Alert
					style={{ width: '100%', marginBottom: '4px' }}
					severity="error"
				>
					예약 요청에 실패하였습니다. 다시 시도해주세요.
				</Alert>
			)}
			<DateRangePicker
				startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
				startDateId="start_date" // PropTypes.string.isRequired,
				endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
				endDateId="end_date" // PropTypes.string.isRequired,
				onDatesChange={onDatesChange} // PropTypes.func.isRequired,
				focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={onFocusInput} // PropTypes.func.isRequired
				endDatePlaceholderText="반납일"
				startDatePlaceholderText="대여일"
				isDayBlocked={isDayBlocked}
			/>
			<Table className={classes.table} aria-label="price-table" size="small">
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
				disabled={editable || reserved}
				onClick={handleClickReserve}
			>
				예약하기
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="secondary"
				disabled={editable}
			>
				문의하기
			</Button>
		</Paper>
	);
}
