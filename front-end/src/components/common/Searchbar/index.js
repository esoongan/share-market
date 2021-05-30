import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { categories, cities } from 'constant/locale';
import { withRouter } from 'react-router';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	searchBox: {
		padding: theme.spacing(1.2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		borderRadius: theme.spacing(2),
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
	field: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));
const selectStyles = {
	container: styles => ({
		...styles,
		width: '100%',
	}),
	control: styles => ({
		...styles,
		flexGrow: 10,
		border: 0,
		width: '100%',
		// minWidth: 120,
	}),
	indicatorSeparator: styles => ({ ...styles, backgroundColor: 0 }),
};
const categoryOption = [{ label: '전체', value: '' }, ...categories];
const cityOption = [{ label: '전체', value: '' }, ...cities];

function Searchbar({ history }) {
	const classes = useStyles();
	const [focusedInput, setFocusInput] = useState(null);
	const [category, setCategory] = useState(null);
	const [city, setCity] = useState(null);
	const [keyword, setKeyword] = useState('');
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};
	const onSelectCategory = ({ value }) => {
		setCategory(value);
	};
	const onSelectCity = ({ value }) => {
		setCity(value);
	};
	const onInputChange = e => {
		setKeyword(e.target.value);
	};
	const onSearch = () => {
		let url = '/list/1?';
		let query = '';
		if (city !== null && city !== '') {
			query += '&addr=' + city;
		}
		if (category !== null && category !== '') {
			query += '&category=' + category;
		}
		if (keyword !== '') {
			query += '&keyword=' + keyword;
		}
		if (dateRange.startDate) {
			let start = dateRange.startDate.format('YYYY-MM-DD'); //2020-12-25
			query += `&start=${start}`;
		}
		if (dateRange.endDate) {
			let end = dateRange.endDate.format('YYYY-MM-DD');
			query += `&end=${end}`;
		}
		history.push(url + query);
	};
	return (
		<Paper className={classes.searchBox} elevation={6}>
			<Grid container spacing={1}>
				<Grid className={classes.field} item xs={6} sm={6} md={2}>
					<Select
						id="city"
						placeholder="도시"
						styles={selectStyles}
						options={cityOption}
						onChange={onSelectCity}
						onSelectResetsInput={false}
						isSearchable
					/>
					<Divider className={classes.divider} orientation="vertical" />
				</Grid>
				<Grid className={classes.field} item xs={6} sm={6} md={3}>
					<Select
						id="category"
						placeholder="카테고리"
						styles={selectStyles}
						options={categoryOption}
						onChange={onSelectCategory}
						onSelectResetsInput={false}
						isSearchable
					/>
					<Divider className={classes.divider} orientation="vertical" />
				</Grid>
				<Grid className={classes.field} item xs={6} sm={6} md={4}>
					<DateRangePicker
						startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
						startDateId="searchbar_start_date_id" // PropTypes.string.isRequired,
						endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
						endDateId="searchbar_end_date_id" // PropTypes.string.isRequired,
						onDatesChange={({ startDate, endDate }) =>
							setDateRange({ startDate, endDate })
						} // PropTypes.func.isRequired,
						focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
						onFocusChange={onFocusInput} // PropTypes.func.isRequired,
						startDatePlaceholderText="대여일"
						endDatePlaceholderText="반납일"
						noBorder
						small
					/>
					<Divider className={classes.divider} orientation="vertical" />
				</Grid>
				<Grid className={classes.field} item xs={6} sm={6} md={3}>
					<InputBase
						className={classes.input}
						placeholder="검색어"
						inputProps={{ 'aria-label': 'keyword' }}
						onChange={onInputChange}
						value={keyword}
					/>
					<div style={{ display: 'flex' }}>
						<IconButton
							color="primary"
							className={classes.iconButton}
							aria-label="directions"
							onClick={onSearch}
						>
							<SearchIcon />
						</IconButton>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}
export default withRouter(Searchbar);
