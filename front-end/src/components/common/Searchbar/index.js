import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { categories } from 'constant/locale';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
	searchBox: {
		padding: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
    borderRadius: theme.spacing(2),
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
    minWidth: theme.spacing(8)
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	cityButton: {
		padding: theme.spacing(4),
		width: '100%',
	},
	categoryPaper: {
		width: '100%',
		paddingTop: '100%' /* 1:1 Aspect Ratio */,
		position: 'relative' /* If you want text inside of it */,

		'& span': {
			position: 'absolute',
			bottom: theme.spacing(2),
			left: theme.spacing(2),
		},
	},
}));
const categoryStyles = {
	control: styles => ({
		...styles,
		border: 0,
		width: 140,
	}),
	indicatorSeparator: styles => ({ ...styles, backgroundColor: 0 }),
};
const categoryOption = [{label: '전체', value:''}, ...categories];

function Searchbar({history}) {
	const classes = useStyles();
	const [focusedInput, setFocusInput] = useState(null);
	const [category, setCategory] = useState(null);
	const [keyword, setKeyword] = useState('');
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};
	const onSelect = ({value}) => {
		setCategory(value);
	}
	const onInputChange = (e) => {
		setKeyword(e.target.value);
	}
	const onSearch = () => {
		let url = '/list/1?';
		let query = '';
		if(category!==null && category !== ''){
			query+='&category='+category;
		}
		if(keyword!==''){
			query+='&keyword=' +keyword;
		}
		if(dateRange.startDate){
			let start = dateRange.startDate.toJSON().substring(0,9);	//2020-12-25
			query+=`&start=${start}`
		}
		if(dateRange.endDate){
			let end = dateRange.endDate.toJSON().substring(0,9);
			query+=`&end=${end}`
		}
		history.push(url+query);
	}
	return (
		<Paper className={classes.searchBox} elevation={6}>
			<Select
        id="category"
				placeholder="카테고리"
				styles={categoryStyles}
        options={categoryOption}
        onChange={onSelect}
        onSelectResetsInput={false}
        isSearchable
			/>

			<Divider className={classes.divider} orientation="vertical" />

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
				startDatePlaceholderText='대여일'
				endDatePlaceholderText='반납일'
        noBorder
				small
			/>

			<Divider className={classes.divider} orientation="vertical" />

			<InputBase
				className={classes.input}
				placeholder="검색어"
				inputProps={{ 'aria-label': 'keyword' }}
				onChange={onInputChange}
				value={keyword}
			/>

			<Divider className={classes.divider} orientation="vertical" />
			<IconButton
				color="primary"
				className={classes.iconButton}
				aria-label="directions"
				onClick={onSearch}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
export default withRouter(Searchbar);
