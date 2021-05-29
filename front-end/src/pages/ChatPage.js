import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Badge, Paper } from '@material-ui/core';
import { testRooms } from 'constant/test';
import { grey } from '@material-ui/core/colors';
import Header from 'components/common/Header';

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
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

	chatRoom: {
		display: 'flex',
    listStyleType:'none',
    overflowY:'scroll',
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

	chat: {
		borderRadius: theme.spacing(2),
		padding: theme.spacing(1, 3),
		width: 'fit-content',
		maxWidth: '60%',
		marginBottom: theme.spacing(2),
	},
}));

function ChatPage(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

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
		<div>
			<Paper
				className={classes.chat}
				style={
					send
						? { marginLeft: 'auto', background: 'blue' }
						: { background: 'white' }
				}
				elevation={2}
			>
				<Typography variant="body1">{message}</Typography>
				<Typography variant="caption">{time}</Typography>
			</Paper>
		</div>
	);

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			{Rooms}
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
					<Header>

					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					</Header>

			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden mdUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} >
						
				</div>
				<div className={classes.chatContainer}>
					<Chat message="안녕하세요" time="2021.5.24 12:00:23" send />
					<Chat
						message="네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지"
						time="2021.5.24 12:00:23"
					/>
				</div>
			</main>
		</div>
	);
}

ChatPage.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ChatPage;
