import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/common/Header';
import ChatRooms from 'components/chat/ChatRooms';
import ChatHeader from 'components/chat/ChatHeader';
import ChatMain from 'components/chat/ChatMain';
import { useDispatch, useSelector } from 'react-redux';
import { getChatrooms, getChats, sendChat } from 'store/modules/chat';

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

function ChatPage({ window }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const container =
		window !== undefined ? () => window().document.body : undefined;

	const [mobileOpen, setMobileOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);		//{ room_id, post_id, username(상대방) }
	const [version, setVersion] = useState('seller');
	const [chats, setChats] = useState([]);		// { id, roomId, username, message, createdDate }

	const { chatRooms, totalElements } = useSelector(({ chat }) => ({
		chatRooms: chat.chatRooms,
		/*chatRoom
	{
		"id": 3,
    "seller": "hayoung",
    "buyer": "sjinlee97",
    "postId": 1,
    "lastMessage": "this is last3"
	}
*/
		totalElements: chat.totalElements,
	}));

	useEffect(() => {
		dispatch(getChatrooms({ version, page: 0 }));
	}, []);
	useEffect(() => {
		if (selectedRoom) {
			dispatch(getChats({ room_id: selectedRoom.room_id }))
				.then(({ data }) => {
					const chats = data.data.content;
					setChats(chats);
					setMobileOpen(false);
				})
				.catch(reason => console.log(reason));
		}
	}, [selectedRoom]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const onClickRoom = ({ room_id, post_id, username }) => {
		setSelectedRoom({ room_id, post_id, username });
	};

	const onSend = ({message})=>{
		dispatch(sendChat({room_id:selectedRoom.room_id, message})).then(({data})=> {
			const newChat = data.data;
			setChats([newChat, ...chats]);
		});
	}

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
						<ChatRooms
							chatRooms={chatRooms}
							onClickRoom={onClickRoom}
							version={version}
						/>
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
						<ChatRooms
							chatRooms={chatRooms}
							onClickRoom={onClickRoom}
							version={version}
						/>
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
				<ChatMain
					username={selectedRoom && selectedRoom.username}
					chatList={chats}
					onSend={onSend}
				/>
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
