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
		else{
			setAlert(true);
		}
	};

	return (
		<Paper className={classes.floatingPaper} elevation={8}>
			{alert && <Alert style={{width: '100%', marginBottom: '4px'}} severity="info">
				먼저 날짜를 선택해 주세요.
			</Alert>}
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
				disabled={editable}
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
				쪽지보내기
			</Button>
		</Paper>
	);
}
