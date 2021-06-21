//구매자가 보낸 거래 요청 목록

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import {
	Button,
	FormControlLabel,
	IconButton,
	Switch,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SendIcon from '@material-ui/icons/Send';
import ChatModal from 'components/common/ChatModal';
import { Link as RouterLink } from 'react-router-dom';
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
	tableContainer: {
		maxHeight: 300,
		height: 300,
	},
}));

// 내가 보낸 거래 요청을 테이블로 보여주는 컴포넌트
function RequestTable({ row: requests, onClickChat }) {
	const classes = useStyles();

	const columns = [
		{ field: '상태', width: 160, align: 'center', headerAlign: 'center' },
		{
			field: '포스트',
			flex: 1,
			renderCell: params => {
				return (
					<Button
						endIcon={<OpenInNewIcon />}
						size="small"
						component={RouterLink}
						to={`/post/${params.row['채팅'].post_id}`}
					>
						{params.value}
					</Button>
				);
			},
		},
		{ field: '대여 날짜', width: 200, align: 'center', headerAlign: 'center' },
		{ field: '반납 날짜', width: 200, align: 'center', headerAlign: 'center' },
		{
			field: '받는 사람',
			width: 160,
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
	const rows = requests.map(contract => {
		const state = getState({
			state: contract.state,
			start: contract.startDate,
			end: contract.endDate,
		});
		return {
			id: contract.id,
			상태: state,
			포스트: contract.postTitle,
			'대여 날짜': contract.startDate,
			'반납 날짜': contract.endDate,
			'받는 사람': contract.buyer,
			채팅: {
				post_id: contract.postId,
				seller: contract.seller,
				buyer: contract.buyer,
				defaultMsg: `'${
					contract.postTitle
				}' 게시물에 대해 문의드립니다~!${'\n'}`,
			},
		};
	});

	return (
		<div style={{ flexGrow: 1 }}>
			<div className={classes.tableContainer}>
				<DataGrid
					isRowSelectable={false}
					columns={columns}
					rows={rows}
					hideFooter
				/>
			</div>
		</div>
	);
}

export default function Requests({ contracts, openChatModal, mode }) {
	//mode: 전체 내역 보기 (지난 모든 거래 요청들까지) <-> 대기중, 거절됨, 예약됨만 보임 (todo:)
	const classes = useStyles();
	const [chat, setChat] = useState(null); // {post_id, seller, buyer, defaultMsg}

	const handleClickChat = ({ post_id, seller, buyer, defaultMsg }) => {
		setChat({ post_id, seller, buyer, defaultMsg });
		openChatModal();
	};
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography gutterBottom variant="h5" component="h1">
					내가 보낸 요청 내역
				</Typography>
				<FormControlLabel
					control={<Switch checked={mode} name="mode" />}
					label="전체 내역"
				/>
			</div>

			<div className={classes.container}>
				<RequestTable row={contracts} onClickChat={handleClickChat} />

				{chat && (
					<ChatModal
						post_id={chat.post_id}
						seller={chat.seller}
						buyer={chat.buyer}
						defaultMsg={chat.defaultMsg}
					/>
				)}
			</div>
		</div>
	);
}
