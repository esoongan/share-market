import React from 'react';
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

const ChatMain = ({ chatList, username }) => {
	const classes = useStyles();

	const Chat = ({ message, time, me }) => (
			<Paper
				className={clsx(classes.chat, me && classes.me)}
				elevation={2}
			>
				<Typography variant="body1" component='h6'>{message}</Typography>
				{/* <br/> */}
				<Typography variant="caption" component='p' color='textSecondary'>{time}</Typography>
			</Paper>
	);

	return (
		<div className={classes.root}>
			<section className={classes.chatSection}>
				{chatList.map((chat) =>(
					<Chat message={chat.message} time={chat.time} me={chat.sender !== username}/>
				))}
			</section>
			<section className={classes.inputSection}>
				<TextField
					variant="filled"
					multiline
					rows={4}
					size="medium"
					fullWidth
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<SendIcon />}
				>
					보내기
				</Button>
			</section>
		</div>
	);
};
export default ChatMain;
