import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import {
	Button,
	Divider,
	FormControlLabel,
	Hidden,
	IconButton,
	Switch,
} from '@material-ui/core';
import moment from 'moment';
import { grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SendIcon from '@material-ui/icons/Send';
import ChatModal from 'components/common/ChatModal';
import { contractState } from 'constant/constant';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { getState } from 'lib/getState';

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(20),
		height: 350,
	},
	header: {
		display: 'flex',
		'& h1': {
			marginRight: theme.spacing(6),
		},
	},
	container: {
		display: 'flex',
	},
	divider: {
		margin: theme.spacing(0, 2, 0, 0),
		height: 350,
		maxHeight: 350,
	},
	tableContainer: {
		maxHeight: 300,
		height: 300,
		'& .duplicatedRow': {
			color: theme.palette.error.dark,
		},
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
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
		paddingRight: theme.spacing(2),
		'& div': {
			display: 'flex',
			alignItems: 'flex-end',
		},
	},
	contractTable: {
		width: '100%',
		overflow: 'auto',
	},
	buttons: {
		display: 'flex',
		marginTop: theme.spacing(2),
		justifyContent: 'flex-end',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	hide: {
		visibility: 'hidden',
	},
}));

// 포스트 별 들어온 거래 요청을 테이블로 보여주는 컴포넌트
function ContractTable({
	row: contracts,
	selectedContract,
	setSelectedContract,
	duplicated,
	setDuplicated,
	onClickPrev,
	onClickNext,
	onClickAccept,
	onClickRefuse,
	onClickChat,
}) {
	const classes = useStyles();

	const columns = [
		{ field: '상태', width: 160, align: 'center', headerAlign: 'center' },
		{ field: '대여 날짜', width: 200, align: 'center', headerAlign: 'center' },
		{ field: '반납 날짜', width: 200, align: 'center', headerAlign: 'center' },
		{
			field: '보낸 사람',
			flex: 1,
			align: 'right',
			headerAlign: 'right',
			sortable: false,
		},
		{
			field: '채팅',
			sortable: false,
			width: 100,
			renderCell: params => (
				<IconButton aria-label="send" onClick={() => onClickChat(params.value)}>
					<SendIcon fontSize="small" />
				</IconButton>
			),
		},
	];
	const rows = contracts.map(contract => {
		const state = getState({
			state: contract.state,
			start: contract.startDate,
			end: contract.endDate,
		});
		return {
			id: contract.id,
			상태: state,
			'대여 날짜': contract.startDate,
			'반납 날짜': contract.endDate,
			'보낸 사람': contract.buyer,
			채팅: {
				seller: contract.seller,
				buyer: contract.buyer,
				defaultMsg: `${
					contract.postTitle
				} 게시물에 거래 요청해주셔서 감사합니다~!${'\n'}`,
			},
		};
	});

	const onRowSelected = param => {
		//select되지 않았으면 상태 초기화 (아무것도 선택하지 않은 상태로)
		if (param.row['상태'] !== contractState.waiting) {
			param.api.selectRows(param.api.getAllRowIds(), false, true);
			setSelectedContract(-1);
			setDuplicated([]);
			return;
		}

		//중복되는 기간을 가진 행은 모두 빨간 글씨로 바꾸기
		let start = param.row['대여 날짜'];
		let end = param.row['반납 날짜'];
		const startDate1 = moment(start, 'YYYY-MM-DD');
		const endDate1 = moment(end, 'YYYY-MM-DD');

		let duplicatedRows = rows.filter(row => {
			// 자기 자신은 duplicated x, 상태가 '대기중'인 것에서만 검사
			if (row.id === param.row.id || row['상태'] !== contractState.waiting)
				return false;

			const startDate2 = moment(row['대여 날짜'], 'YYYY-MM-DD');
			const endDate2 = moment(row['반납 날짜'], 'YYYY-MM-DD');

			return (
				moment(startDate1).isSameOrBefore(endDate2) &&
				moment(startDate2).isSameOrBefore(endDate1)
			);
		});
		duplicatedRows = duplicatedRows.map(row => row.id);
		setDuplicated(duplicatedRows);
		setSelectedContract(param.row.id);
	};

	return (
		<div style={{ flexGrow: 1 }}>
			<header className={classes.contractHeader}>
				<div>
					<IconButton aria-label="next post" onClick={onClickPrev}>
						<NavigateBeforeIcon />
					</IconButton>
					<Typography variant="h6" gutterBottom component="div">
						{contracts[0].postTitle}
					</Typography>
					<IconButton aria-label="next post" onClick={onClickNext}>
						<NavigateNextIcon />
					</IconButton>
				</div>

				<Button
					endIcon={<OpenInNewIcon />}
					size="large"
					color="primary"
					component={RouterLink}
					to={`/post/${contracts[0].id}`}
				>
					자세히
				</Button>
			</header>
			<div className={classes.tableContainer}>
				<DataGrid
					onRowClick={onRowSelected}
					isRowSelectable={params =>
						params.row['상태'] === contractState.waiting
					}
					columns={columns}
					rows={rows}
					hideFooter
					getRowClassName={params =>
						duplicated.includes(params.row.id) ? 'duplicatedRow' : ''
					}
				/>
				{duplicated.length > 0 && (
					<Alert severity="warning">
						<AlertTitle>{duplicated.length}개의 요청과 중복됩니다.</AlertTitle>
						이 요청을 수락하면 중복되는 요청은 자동으로 거절 처리 됩니다.
					</Alert>
				)}
			</div>
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
					variant="outlined"
					className={classes.button}
					onClick={onClickRefuse}
				>
					거절
				</Button>
			</div>
		</div>
	);
}

const ALL_MODE = true;
const ONLY_MODE = false;
export default function Contracts({
	contracts,
	postList,
	onClickAccept,
	onClickRefuse,
	openChatModal,
	// mode,		//전체 내역 보기 <-> 대기중, 예약중만 보임 (todo:)
}) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0); //postList에서 선택한 게시글의 index
	const [selectedContract, setSelectedContract] = useState(-1); //선택한 거래 요청의 id (거래 pk)
	const [duplicated, setDuplicated] = useState([]); //선택한 거래 요청과 기간이 중복되는 요청을 저장 [id(거래 pk)]
	const [chat, setChat] = useState(null); // {seller, buyer, defaultMsg}
	const [mode, setMode] = useState(ONLY_MODE);
	// 다른 포스트를 클릭했으면 selectedContract 초기화
	React.useEffect(() => {
		setSelectedContract(-1);
	}, [selectedIndex]);

	// 좌측 포스트 목록(postList)에서 아이템을 클릭했을 때, postList의 index 저장
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
	const handleClickChat = ({ seller, buyer, defaultMsg }) => {
		setChat({ seller, buyer, defaultMsg });
		openChatModal();
	};
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography gutterBottom variant="h5" component="h1">
					거래 요청 내역
				</Typography>
				<FormControlLabel
					control={
						<Switch
							checked={mode}
							name="mode"
							onChange={event => setMode(event.target.checked)}
						/>
					}
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
						{postList.titles.length > 0 ? (
							postList.titles.map((title, index) => (
								<ListItem
									key={index}
									button
									selected={selectedIndex === index}
									onClick={event => handleListItemClick(event, index)}
								>
									<ListItemText primary={title} />
								</ListItem>
							))
						) : (
							<ListItem>
								<ListItemText primary="비어있음" />
							</ListItem>
						)}
					</List>
				</Hidden>
				<Divider className={classes.divider} orientation="vertical" />
				{postList.ids.length > 0 && (
					<ContractTable
						row={contracts.filter(
							contract => contract.postId === postList.ids[selectedIndex],
						)}
						selectedContract={selectedContract}
						setSelectedContract={setSelectedContract}
						duplicated={duplicated}
						setDuplicated={setDuplicated}
						onClickPrev={handleClickPrev}
						onClickNext={handleClickNext}
						onClickAccept={handleClickAccept}
						onClickRefuse={handleClickRefuse}
						onClickChat={handleClickChat}
					/>
				)}
				{chat && (
					<ChatModal
						post_id={postList.ids[selectedIndex]}
						seller={chat.seller}
						buyer={chat.buyer}
						defaultMsg={chat.defaultMsg}
					/>
				)}
			</div>
		</div>
	);
}
