import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from 'react-select';
import { locations } from 'constant/locale';
import { useDispatch } from 'react-redux';
import postUser from 'store/modules/joinForm';

//TODO: <TextField/>에 validation 적용하기
//TODO: username, email에 중복 검사 기능 추가하기 -> api 사용
//TODO: 중복 검사 요청 모달, 회원가입 성공 모달 추가하기

const emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //  8~16자 영문, 숫자 조합
const usernameExp = /^[0-9a-zA-Z]{5,16}$/; //5~16자 영문, 숫자 조합

const exp = {
	email: emailExp,
	password: passwordExp,
	username: usernameExp,
};

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	checkbox: {
		alignSelf: 'flex-start',
	},
}));

const JoinForm = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
		addr: '',
	});
	const [formatError, setFormatError] = useState({
		username: false,
		email: false,
		password: false,
	});
	const [duplicateCheck, setDuplicateCheck] = useState({
		username: false,
		email: false,
	});
	const [modal, setModal] = useState({
		duplicateCheck: false,
		success: false,
	});

	const onSubmit = e => {
		e.preventDefault();

		let ready = true; //포맷 에러가 하나라도 있으면 api 호출 안함
		//중복 확인 체크 -> 중복 체크를 안했으면 체크해달라는 모달 띄우기
		if(duplicateCheck.email || duplicateCheck.username){
			setModal({
				...modal,
				duplicateCheck: true,
			});
			return;
		}
		
		//input 포맷 체크
		for(let field in exp) {
			if (exp[field].test(field)) {
				setFormatError({
					...inputs,
					[field]: true,
				});
				ready = false;
			} else {
				setFormatError({
					...inputs,
					[field]: false,
				});
			}
		}
		//포맷 에러 존재 시 request 안함
		if (!ready) {
			return;
		}
		dispatch(postUser);
	};

	const onChangeInput = e => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});

		//password 포맷 체크
		if (name === 'password') {
			if (!passwordExp.test(value)) {
				setFormatError({
					...inputs,
					password: true,
				});
			} else {
				setFormatError({
					...inputs,
					password: false,
				});
			}
		}
	};
	const onSelect = ({ value }) => {
		setInputs({
			...inputs,
			addr: value,
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					쉐어마켓 시작하기
				</Typography>

				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								id="userName"
								value={inputs.username}
								onChange={onChangeInput}
								error = {formatError.username}
								helperText = ''
								autoComplete="name"
								name="userName"
								variant="outlined"
								required
								fullWidth
								label="아이디"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								value={inputs.email}
								onChange={onChangeInput}
								variant="outlined"
								required
								fullWidth
								label="이메일"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="password"
								value={inputs.password}
								onChange={onChangeInput}
								variant="outlined"
								required
								fullWidth
								name="password"
								label="비밀번호"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<Select
								id="addr"
								options={locations}
								onChange={onSelect}
								placeholder="검색 또는 선택하세요."
								onSelectResetsInput={false}
								isSearchable
							/>
						</Grid>
					</Grid>
					<Button
						onClick={onSubmit}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						가입하기
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default JoinForm;
