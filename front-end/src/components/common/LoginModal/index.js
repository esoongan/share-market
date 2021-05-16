import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/modules/base';
import { checkUser, login} from 'store/modules/auth'
import Alert from '@material-ui/lab/Alert';

//todo: getUser 오류 처리
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
		margin: theme.spacing(3, 0, 0),
	},
}));

export default function LoginModal() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
	});
  const [error, setError] = useState(null);

	const { open, logged, failure } = useSelector(({ auth, base, pender }) => ({
		open: base.modals.loginModal,
		logged: auth.logged,
		failure: pender.failure['auth/LOGIN'],
	}));
	//모달의 visibility가 바뀌면 폼 초기화
	useEffect(() => {
		setInputs({
			username:'',
			password: '',
		})
		setError(null);
	}, [open]);

  useEffect(() => {
    //로그인 성공 시 (logged = true)
    if(logged === true){
      let token = localStorage.getItem('X-AUTH-TOKEN');
      dispatch(checkUser({token})); //토큰으로 유저 정보 가져오기 -> 스토어에 저장
      dispatch(toggleModal({modal:'loginModal', visible: false}));  //모달 닫기
    }
		else if(failure===true){
			setError('다시 시도해보세요.');
		}
  }, [logged, dispatch, failure]);

	const onChangeInput = e => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const onSubmit = () => {
		if (inputs.username === '' || inputs.password === '') {
			return;
		}
		dispatch(login(inputs));
	};

	const handleClose = () => {
		dispatch(toggleModal({modal: 'loginModal', visible: false}));
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<div className={classes.modalBody} style={modalStyle}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					로그인
				</Typography>
				<div className={classes.form} noValidate>
					<TextField
						id="username"
						value={inputs.username}
						onChange={onChangeInput}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="아이디"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						id="password"
						value={inputs.password}
						onChange={onChangeInput}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="비밀번호"
						type="password"
						autoComplete="current-password"
					/>
					<Button
					//todo: 엔터키를 눌러도 로그인 되도록
						onClick={onSubmit}
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						로그인
					</Button>
				</div>
				{error !== null && (
				<Alert severity="error" style={{width:'100%', marginTop:'8px'}}>{error}</Alert>
			)}
			</div>
		</Modal>
	);
}
