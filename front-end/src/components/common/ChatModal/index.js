import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/modules/base';
import SendIcon from '@material-ui/icons/Send';
import { createChatroom, initialize, sendChat } from 'store/modules/chat';

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

export default function ChatModal({post_id, to, defaultMsg}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [input, setInput] = useState(defaultMsg);

	const { open, createdChatroom, myName } = useSelector(({ base, chat, auth }) => ({
		open: base.modals.chatModal,
		createdChatroom: chat.createdChatroom,
		myName: auth.user.username,
	}));

	//모달의 visibility가 바뀌면 폼 초기화
	useEffect(() => {
		dispatch(initialize());
		setInput(defaultMsg);
	}, [open]);

	useEffect(() => {
		if(createdChatroom){
			dispatch(sendChat({room_id: createdChatroom, message: input}));
			alert('메시지를 전송하였습니다. 마이페이지 > 채팅에서 대화를 이어나갈 수 있습니다.')
			handleClose();
		}
	}, [createdChatroom]);

	const onChangeInput = e => {
		const { value } = e.target;
		setInput(value);
	};
	const onSubmit = () => {
		if (input === '') {
			alert('메시지를 입력해주세요.');
			return;
		}
		// 새 채팅방 생성
		dispatch(createChatroom({post_id, seller: to, buyer: myName}));
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
					{to}님과 대화하기
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
						onClick={onSubmit}
					>
						보내기
					</Button>
				</div>
			</div>
		</Modal>
	);
}
