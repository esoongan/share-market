import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Badge} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		display: 'flex',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: {
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	chatRoom: {
		display: 'flex',
		listStyleType: 'none',
		overflowY: 'scroll',
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

const ChatRooms = ({ roomList }) => {
	const classes = useStyles();
	const ChatRoom = ({ room }) => {
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

	return (
		<>
			<div className={classes.toolbar} />
			<Divider />
			<div>
				{roomList.map(room => (
					<div key={room.room_id}>
						<ChatRoom room={room} />
						<Divider
						style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default ChatRooms;
