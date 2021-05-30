import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {
	Button,
	Divider,
	Hidden,
	IconButton,
	Paper,
	Popover,
	Radio,
} from '@material-ui/core';
import { testContracts, testContracts2 } from 'constant/test';
import { grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ItemCard from 'components/ItemCard';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root:{
		marginBottom: theme.spacing(10),
	},
	container: {
		display: 'flex',
	},
	divider: {
		margin: theme.spacing(0, 2, 0, 0),
		height: 'inherit',
		maxHeight: 300,
	},
	tableRow: {
		'&:hover': {
			background: grey[100],
		},
	},
	postList: {
		width: 300,
		// backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
		maxHeight: 300,
	},
	contractHeader: {
		display: 'flex',
		alignItems: 'flex-end',
		marginBottom: theme.spacing(1),
	},
	contractTable: {
		width: '100%',
		overflow: 'auto',
		maxHeight: 300,
	},
	buttons: {
		display: 'flex',
		marginTop: theme.spacing(2),
		justifyContent: 'flex-end',
	},
	button: {
		marginLeft: theme.spacing(1),
	},
	hide:{
		visibility:'hidden',
	}
}));

function createData(postTitle, contracts) {
	return {
		postTitle,
		contracts, //array [ contract1, contract2, ...]
		/*
			{
            "id": 1,
            "postId": 1,			//post title도 보내줘야 함
            "sellerId": 1,		//username도 보내줘야 함
            "buyerId": 2,
            "startDate": "2021-05-09",
            "endDate": "2021-05-11",
            "state": "accept"
        },
		*/
	};
}
const getPrice = ({ start, end, price }) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const endDate = moment(end, 'YYYY-MM-DD');
	return price * (endDate.diff(startDate, 'days') + 1);
};

function ContractTable({ row, selectedContract,onClickPrev, onClickNext, onChangeRadio }) {
	const classes = useStyles();


	return (
		<div style={{ flexGrow: 1 }}>
			<header className={classes.contractHeader}>
				<IconButton aria-label="next post" onClick={onClickPrev}>
					<NavigateBeforeIcon />
				</IconButton>
				<Typography variant="h6" gutterBottom component="div">
					{row.postTitle} 요청 내역
				</Typography>
				<IconButton aria-label="next post" onClick={onClickNext}>
					<NavigateNextIcon />
				</IconButton>
			</header>

			<Table
				className={classes.contractTable}
				aria-label="contract-table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell> </TableCell>
						<TableCell>상태</TableCell>
						<TableCell>희망 대여 날짜</TableCell>
						<TableCell>희망 반납 날짜</TableCell>
						<TableCell align="right">총 렌탈료(₩)</TableCell>
						<TableCell align="right">보낸 사람</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{row.contracts.map(contractRow => (
						<TableRow className={classes.tableRow} key={contractRow.date}>
							<TableCell>
								<Radio
									checked={selectedContract === contractRow.id.toString()}
									onChange={onChangeRadio}
									value={contractRow.id}
									name="radio-button-contract"
								/>
							</TableCell>
							<TableCell>{contractRow.state}</TableCell>
							<TableCell>{contractRow.startDate}</TableCell>
							<TableCell>{contractRow.endDate}</TableCell>
							<TableCell align="right">
								{getPrice({
									start: contractRow.startDate,
									end: contractRow.endDate,
									price: 1000,
								})}
							</TableCell>
							<TableCell align="right">{contractRow.buyerId}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={selectedContract!== -1 ? classes.buttons : classes.hide}>
				<Button variant="contained" color="primary" className={classes.button}>
					수락
				</Button>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
				>
					거절
				</Button>
			</div>
		</div>
	);
}

// TODO: 거래목록 조회 api로 받아오기
const rows = [
	createData('post title1', testContracts),
	createData('post title2', testContracts2),
	createData('post title3', testContracts),
	createData('post title4', testContracts2),
	createData('post title5', testContracts),
];

export default function Contracts() {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [selectedContract, setSelectedContract] = React.useState(-1);
	const handleChangeRadio = event => {
		setSelectedContract(event.target.value);
	};

	React.useEffect(() => {
		setSelectedContract(-1);
	}, [selectedIndex])

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};
	const handleClickPrev = () => {
		if (selectedIndex - 1 >= 0) setSelectedIndex(selectedIndex - 1);
	};
	const handleClickNext = () => {
		if (selectedIndex + 1 < rows.length) setSelectedIndex(selectedIndex + 1);
	};
	return (
		<div className={classes.root}>
			<Typography gutterBottom variant="h5" component="h1">
				거래 요청 내역
			</Typography>
			<div className={classes.container}>
				<Hidden smDown>
					<List
						className={classes.postList}
						component="nav"
						aria-label="main mailbox folders"
					>
						{rows.map((row, index) => (
							<ListItem
								key={index}
								button
								selected={selectedIndex === index}
								onClick={event => handleListItemClick(event, index)}
							>
								<ListItemText primary={row.postTitle} />
							</ListItem>
						))}
					</List>
				</Hidden>
				<Divider className={classes.divider} orientation="vertical" />
				<ContractTable
					row={rows[selectedIndex]}
					selectedContract={selectedContract}
					onClickPrev={handleClickPrev}
					onClickNext={handleClickNext}
					onChangeRadio={handleChangeRadio}
				/>
			</div>
		</div>
	);
}
