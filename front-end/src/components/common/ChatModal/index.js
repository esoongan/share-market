import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/modules/base';
import Alert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';

const modalStyle = {
	top: `30%`,
	left: `50%`,
	transform: `translate(-50%, -30%)`,
};
const useStyles = makeStyles(theme => ({
	modalBody: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		width: 400,
		height: 400,
		backgroundColor: 'white',
		borderRadius: '16px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(1, 0, 0),
    float:'right',
	},
}));

export default function ChatModal({to, defaultMsg}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [input, setInput] = useState(defaultMsg);

	const { open } = useSelector(({ base }) => ({
		open: base.modals.chatModal,
	}));

	//모달의 visibility가 바뀌면 폼 초기화
	useEffect(() => {
		setInput(defaultMsg);
	}, [open]);

	const onChangeInput = e => {
		const { value } = e.target;
		setInput(value);
	};
	const onSubmit = () => {
		if (input === '') {
			return;
		}
		// dispatch(login(inputs));
	};

	const handleClose = () => {
		dispatch(toggleModal({ modal: 'chatModal', visible: false }));
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<div className={classes.modalBody} style={modalStyle}>
				<Avatar className={classes.avatar}>
					<SendIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{to}님에게 문의하기
				</Typography>
				<div className={classes.form} noValidate>
					<TextField
						value={input}
						onChange={onChangeInput}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="문의 내용"
						name="message"
						autoFocus
						multiline
						rows={8}
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.submit}
						endIcon={<SendIcon />}
					>
						보내기
					</Button>
				</div>
			</div>
		</Modal>
	);
}
