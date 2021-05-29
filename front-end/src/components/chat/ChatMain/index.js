import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

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
}));

const ChatMain = ({ chatList }) => {
	const classes = useStyles();

	const Chat = ({ message, time, me }) => (
		<div>
			<Paper
				className={classes.chat}
				style={
					me
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

	return (
		<div className={classes.root}>
			<section className={classes.chatSection}>
				<Chat message="안녕하세요" time="2021.5.24 12:00:23" me />
				<Chat
					message="네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지네 안녕하세요 받은 메세지"
					time="2021.5.24 12:00:23"
				/>
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
