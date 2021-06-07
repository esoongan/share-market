import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	chatSection: {
		display: 'flex',
		flexDirection: 'column-reverse',
		background: 'white',
		padding: theme.spacing(2),
		margin: 0,
		listStyleType: 'none',
		overflowY: 'scroll',
		height: '60vh',
		borderTop: '2px solid #fff',
		borderBottom: '2px solid #fff',
	},
	chat: {
		borderRadius: theme.spacing(2),
		padding: theme.spacing(1, 3),
		width: 'fit-content',
		maxWidth: '60%',
		marginBottom: theme.spacing(2),
	},
	inputSection: {
		zIndex: theme.zIndex.drawer - 1,
		background: 'white',
		padding: '20px 30px 10px 20px',
	},
	input: {
		width: '100%',
		height: '80px',
		borderRadius: theme.spacing(1),
		padding: theme.spacing(4),
		marginBottom: theme.spacing(3),
	},
	button: {
		float: 'right',
		margin: theme.spacing(1),
	},
	me: {
		marginLeft: 'auto',
		background: theme.palette.primary.main,
		'& h6': {
			color: theme.palette.primary.contrastText,
		},
		'& p': {
			color: theme.palette.primary.light,
		},
	},
}));

const ChatMain = ({ chatList, username, onSend }) => {
	const classes = useStyles();
	const [message, setMessage] = useState('');
	const onChangeInput = e => {
		const { value } = e.target;
		setMessage(value);
	};

	const Chat = ({ message, datetime, me }) => {
		const date = datetime.substring(0, 10);
		const time = datetime.substring(11, 19);
		return (
			<Paper className={clsx(classes.chat, me && classes.me)} elevation={2}>
				<Typography variant="body1" component="h6">
					{message}
				</Typography>
				{/* <br/> */}
				<Typography variant="caption" component="p" color="textSecondary">
					{date + ' ' + time}
				</Typography>
			</Paper>
		);
	};

	return (
		<div className={classes.root}>
			<section className={classes.chatSection}>
				{chatList.map(chat => (
					<Chat
						key={chat.id}
						message={chat.message}
						datetime={chat.createdDate}
						me={chat.username !== username}
					/>
				))}
			</section>
			<section className={classes.inputSection}>
				<TextField
					name="send message"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
					placeholder="메시지를 입력하세요"
					onChange={onChangeInput}
					value={message}
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<SendIcon />}
					onClick={() => {
						if (message !== '') {
							onSend({ message });
							setMessage('');
						}
					}}
				>
					보내기
				</Button>
			</section>
		</div>
	);
};
export default ChatMain;
