import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, FormControlLabel, Hidden, IconButton, Radio, Switch } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import ChatModal from 'components/common/ChatModal';
import {contractState} from 'constant/constant';

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(10),
		height: 350,
	},
	header: {
		display: 'flex',
		'& h1': {
			marginRight: theme.spacing(6),
		}
	},
	container: {
		display: 'flex',
	},
	divider: {
		margin: theme.spacing(0, 2, 0, 0),
		height: 350,
		maxHeight: 350,
	},
	tableRow: {
		'&:hover': {
			background: grey[100],
		},
	},
	postList: {
		width: 300,
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
	hide: {
		visibility: 'hidden',
	},
}));

const getDays = ({ start, end }) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const endDate = moment(end, 'YYYY-MM-DD');
	return (endDate.diff(startDate, 'days') + 1);
};
const getState = ({state, start, end}) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const endDate = moment(end, 'YYYY-MM-DD');

	if(state === 'default'){
		if(startDate.isBefore(moment())){
			return contractState['expired'];	//수락하지 않고 요청 시작 날짜가 지났을 때
		}
		return contractState['waiting'];
	}
	else if(state === 'accept'){
		if(endDate.isBefore(moment())){
			return contractState['completed'];	//수락되었고 대여 종료 날짜가 지났을 때
		}
		else if(startDate.isBefore(moment())){
			return contractState['ing'];	//수락되었고 대여 중일 때
		}
		return contractState['reserved'];
	}
	else if(state === 'refused'){
		return contractState['refused'];
	}
}

// 포스트 별 들어온 거래 요청을 테이블로 보여주는 컴포넌트
function ContractTable({
	row: contracts,
	selectedContract,
	onClickPrev,
	onClickNext,
	onChangeRadio,
	onClickAccept,
	onClickRefuse,
	onClickChat,
}) {
	const classes = useStyles();
	//TODO: 포스트 정보 가져오기 (렌탈료), 보낸 사람 pk 말고 username으로 넣기
	return (
		<div style={{ flexGrow: 1 }}>
			<header className={classes.contractHeader}>
				<IconButton aria-label="next post" onClick={onClickPrev}>
					<NavigateBeforeIcon />
				</IconButton>
				<Typography variant="h6" gutterBottom component="div">
					{contracts[0].postTitle}
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
						<TableCell>대여 날짜</TableCell>
						<TableCell>반납 날짜</TableCell>
						{/* <TableCell align="right">총 일수</TableCell>  */}
						<TableCell align="right">보낸 사람</TableCell>
						<TableCell>채팅</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{contracts.map(contract => {
						const state = getState({state: contract.state, start:contract.startDate, end:contract.endDate})
						return (
						<TableRow className={classes.tableRow} key={contract.id}>
							<TableCell>
								<Radio
									disabled= {state !== contractState['waiting']}
									checked={selectedContract === contract.id.toString()}
									onChange={onChangeRadio}
									value={contract.id}
									name="radio-button-contract"
								/>
							</TableCell>
							<TableCell>{state}</TableCell>
							<TableCell>{contract.startDate}</TableCell>
							<TableCell>{contract.endDate}</TableCell>
							{/* <TableCell align="right">
								{getDays({
									start: contract.startDate,
									end: contract.endDate,
								})}
							</TableCell> */}
							<TableCell align="right">{contract.buyer}</TableCell>
							<TableCell>
								<IconButton
									aria-label="send"
									onClick={() =>
										onClickChat(
											contract.buyerId,		//todo: 바꾸기
											`${contract.postTitle} 게시물에 거래 요청해주셔서 감사합니다~!${'\n'}`,
										)
									}
								>
									<SendIcon fontSize="small" />
								</IconButton>
							</TableCell>
						</TableRow>
					)})}
				</TableBody>
			</Table>
			<div className={selectedContract !== -1 ? classes.buttons : classes.hide}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={onClickAccept}
				>
					수락
				</Button>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={onClickRefuse}
				>
					거절
				</Button>
			</div>
		</div>
	);
}

export default function Contracts({
	contracts,
	postList,
	onClickAccept,
	onClickRefuse,
	openChatModal,
	mode,
}) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [selectedContract, setSelectedContract] = React.useState(-1);
	const [to, setTo] = useState(null);
	const [defaultMsg, setDefaultMsg] = useState('');

	React.useEffect(() => {
		setSelectedContract(-1);
	}, [selectedIndex]);

	const handleChangeRadio = event => {
		setSelectedContract(event.target.value);
	};
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};
	const handleClickPrev = () => {
		if (selectedIndex - 1 >= 0) setSelectedIndex(selectedIndex - 1);
	};
	const handleClickNext = () => {
		if (selectedIndex + 1 < postList.ids.length)
			setSelectedIndex(selectedIndex + 1);
	};
	const handleClickAccept = () => {
		onClickAccept(selectedContract);
	};
	const handleClickRefuse = () => {
		onClickRefuse(selectedContract);
	};
	//todo: chatroom 요청 바디 바꾸기
	const handleClickChat = (to, defaultMsg) => {
		setTo(to);
		setDefaultMsg(defaultMsg);
		openChatModal();
	};
	return (
		<div className={classes.root}>
			<div className={classes.header}>

			<Typography gutterBottom variant="h5" component="h1">
				거래 요청 내역
			</Typography>
			<FormControlLabel
        control={<Switch checked={mode} name="mode" />}
        label="전체 내역"
      />
			</div>

			<div className={classes.container}>
				<Hidden smDown>
					<List
						className={classes.postList}
						component="nav"
						aria-label="post list"
					>
						{postList.titles.length>0 ? 
						postList.titles.map((title, index) => (
							<ListItem
								key={index}
								button
								selected={selectedIndex === index}
								onClick={event => handleListItemClick(event, index)}
							>
								<ListItemText primary={title} />
							</ListItem>
						)) : 
						<ListItem>
							<ListItemText primary='비어있음' />
						</ListItem>
						}
					</List>
				</Hidden>
				<Divider className={classes.divider} orientation="vertical" />
				{postList.ids.length > 0 && (
					<ContractTable
						row={contracts.filter(contract => contract.postId === postList.ids[selectedIndex])}
						selectedContract={selectedContract}
						onClickPrev={handleClickPrev}
						onClickNext={handleClickNext}
						onChangeRadio={handleChangeRadio}
						onClickAccept={handleClickAccept}
						onClickRefuse={handleClickRefuse}
						onClickChat={handleClickChat}
					/>
				)}
				<ChatModal
					post_id={postList.ids[selectedIndex]}
					to={to}
					defaultMsg={defaultMsg}
				/>
			</div>
		</div>
	);
}
