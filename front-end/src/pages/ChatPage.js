import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { testRooms } from 'constant/test';
import { Avatar, Badge, Button, Hidden, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import HeaderMenu from 'components/common/Header/HeaderMenu';
import ItemCard from 'components/ItemCard';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	roomSection: {
		// todo: 왼쪽에 고정시키기
		marginRight: theme.spacing(1),
		flexGrow:1,
	},
	sectionHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'space-between',
	},

	chatRoom: {
		display: 'flex',
		'&:hover': {
			backgroundColor: grey[100],
			cursor: 'pointer',
		},
		'&:active': {
			backgroundColor: grey[200],
		},
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	chatRoomAvatar: {
		margin: theme.spacing(1),
	},
	chatRoomInfo: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(0.5),
	},

	chatSection: {
		// background: 'black',
		flexGrow:2,
	},

	chatContainer: {
		border: '0.5px solid black',
		borderRadius: theme.spacing(1),
		height: '70vh',
		margin: theme.spacing(3),
		padding: theme.spacing(2),
		// width: '100%',
		overflow:'scroll',
	},

	chat: {
		borderRadius: theme.spacing(2),
		padding: theme.spacing(1, 3),
		width: 'fit-content',
		maxWidth: '60%',
		marginBottom: theme.spacing(2),
	},

	postInfoSection: {
		// background: 'red',
		flexGrow: 4,
	},
}));
export default function ChatPage() {
	const classes = useStyles();

	const ChatRoom = ({ chatRoom: room }) => {
		let lastMsg = room.lastMsg;
		// 12자 이상이면 자르기
		if (room.lastMsg.length >= 16) {
			lastMsg = room.lastMsg.substring(0, 16) + '...';
		}
		return (
			// 왼쪽 사이드의 대화방 목록에 들어가는 아이템
			<div className={classes.chatRoom}>
				<div className={classes.chatRoomAvatar}>
					<Badge color="secondary" variant="dot" invisible={false}>
						<Avatar>{room.user_id.charAt(0).toUpperCase()}</Avatar>
					</Badge>
				</div>
				<div style={{ marginLeft: '4px' }}>
					<div className={classes.chatRoomInfo}>
						<Typography variant="body1">{room.user_id}</Typography>
						<Typography variant="caption" color="textSecondary">
							{room.time}
						</Typography>
					</div>
					<Typography variant="body2" color="textSecondary">
						{lastMsg}
					</Typography>
				</div>
			</div>
		);
	};
	const Rooms = (
		<div>
			<div className={classes.toolbar} />
			{testRooms.map(room => (
				<div key={room.room_id}>
					<ChatRoom chatRoom={room} />
					<Divider
						style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
					/>
				</div>
			))}
		</div>
	);
	const Chat = ({ message, time, send }) => (
		<div style={send? { display: 'flex', justifyContent:'flex-end' } : {}}>
			<Paper
				className={classes.chat}
				style={send ? { background: 'blue' } : { background: 'white' }}
				elevation={2}
			>
				<Typography variant="body1">{message}</Typography>
				<Typography variant="caption">{time}</Typography>
			</Paper>
		</div>
	);

	return (
		<div className={classes.root}>
			<Hidden smDown>
				<section className={classes.roomSection}>
					<header className={classes.sectionHeader}>
						<IconButton>
							<ChevronLeftIcon onClick={null} />
						</IconButton>
					</header>
					<Divider />
					{Rooms}
				</section>
			</Hidden>

			<section className={classes.chatSection}>
				<header className={classes.sectionHeader}></header>
				<Divider />
				<div className={classes.chatContainer}>
					<Chat message="안녕하세요" time="2021.5.24 12:00:23" send />
					<Chat
						message="네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지"
						time="2021.5.24 12:00:23"
					/>
				</div>
			</section>

			{/* <Hidden mdDown> */}
				<section className={classes.postInfoSection}>
					<header className={classes.sectionHeader}>
						<IconButton>
							<ChevronRightIcon onClick={null} />
						</IconButton>
					</header>
					<Divider />
					<div>
						<ItemCard
							id
							title='타이틀임'
							category='carrier'
							addr='주소임'
							createdDate='2020-12-30'
							userId='hy7873'
							onClickItem={null}
							img='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA0MjBfMTcx%2FMDAxNjE4OTI3NTQ1NzUy.d0-ipQ6rWIvYH7lqEPA8o5j8rB7r7yxZ78-QAfBeSfsg.tTSUhUXLva-kdlGMvHkFL9iLt84CO8GAsd1DA7wSFpUg.JPEG.pentoinsoo%2F01-KT%25B0%25B6%25B7%25B0%25BD%25C3%25B3%25EB%25C6%25AE5%25B1%25E2%25B1%25E2%25BA%25AF%25B0%25E6.jpg&type=a340'
						/>
						{/* <Typography variant='h4'>포스트 이름</Typography> */}
						<Divider />
					</div>
				</section>
			{/* </Hidden> */}
		</div>
	);
}
