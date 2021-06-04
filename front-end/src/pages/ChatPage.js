import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { testChat, testRooms } from 'constant/test';
import Header from 'components/common/Header';
import ChatRooms from 'components/chat/ChatRooms';
import ChatHeader from 'components/chat/ChatHeader';
import ChatMain from 'components/chat/ChatMain';
import { chat } from 'store/modules';
import { useSelector } from 'react-redux';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},

	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	content: {
		flexGrow: 1,
	},
}));

function ChatPage(props) {
	const { window } = props;
	const container =
		window !== undefined ? () => window().document.body : undefined;

	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);
	/*selectedRoom = {
		room_id
		post_id
		username -> 대화 상대의 username
	}*/
	const { chatRooms, totalElements } = useSelector(({ chat }) => ({
		chatRooms: chat.chatRooms,
		totalElements: chat.totalElements,
	}));

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const onClickRoom = ({ room_id, post_id, username }) => {
		setSelectedRoom({ room_id, post_id, username });
	};

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
			<nav className={classes.drawer} aria-label="chat room list">
				<Hidden mdUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<ChatRooms chatRooms={testRooms} onClickRoom={onClickRoom} version='seller'/>
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
						<ChatRooms chatRooms={testRooms} onClickRoom={onClickRoom} version='seller'/>
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<ChatHeader
					username={selectedRoom && selectedRoom.username}
					postContent
					onClickItem
				/>
				<Divider style={{ margin: '8px 0px 8px 0px' }} />
				<ChatMain username={selectedRoom && selectedRoom.username} chatList={testChat}/>
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
