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
import { chatList } from 'constant/test';
import { Avatar, Badge, Button, Hidden, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import HeaderMenu from 'components/common/Header/HeaderMenu';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	appBarTitle: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	section: {
		border: '0.5px solid grey',
	},
	hide: {
		display: 'none',
	},
	roomList: {
		position: 'absolute',
		left: 0,
		width: drawerWidth,
		height: '100vh',
		flexShrink: 0,
	},
	roomListPaper: {
		width: drawerWidth,
	},
	sectionHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},

	chatRoom: {
		display: 'flex',
		width: '100%',
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
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(true);

	const ChatRoom = ({ chatRoom }) => {
		let lastMsg = chatRoom.lastMsg;
		// 12자 이상이면 자르기
		if (chatRoom.lastMsg.length >= 16) {
			lastMsg = chatRoom.lastMsg.substring(0, 16) + '...';
		}
		return (
			// 왼쪽 사이드의 대화방 목록에 들어가는 아이템
			<div className={classes.chatRoom}>
				<div className={classes.chatRoomAvatar}>
					<Badge color="secondary" variant="dot" invisible={false}>
						<Avatar>{chatRoom.user_id.charAt(0).toUpperCase()}</Avatar>
					</Badge>
				</div>

				<div style={{ marginLeft: '4px' }}>
					<div className={classes.chatRoomInfo}>
						<Typography variant="body1">{chatRoom.user_id}</Typography>
						<Typography variant="caption" color="textSecondary">
							{chatRoom.time}
						</Typography>
					</div>
					<Typography variant="body2" color="textSecondary">
						{lastMsg}
					</Typography>
				</div>
			</div>
		);
	};
	const chatRooms = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			{chatList.map(chatRoom => (
				<div key={chatRoom.room_id}>
					<ChatRoom chatRoom={chatRoom} />
					<Divider
						style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
					/>
				</div>
			))}
		</div>
	);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Hidden xsDown>
				<section
					className={clsx(classes.roomList, classes.roomListPaper, classes.section)}
					open={open}
				>
					<div className={classes.sectionHeader}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					{chatRooms}
				</section>
			</Hidden>
			<Hidden xsUp>
				
			</Hidden>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
			</main>
		</div>
	);
}
