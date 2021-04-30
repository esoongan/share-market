import React from 'react';
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

//TODO: 회원가입 성공 모달 추가하기

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

const JoinForm = ({ username, email, password, formatError, onSubmit, onChangeInput }) => {
	const classes = useStyles();
	const handleChangeInput = e => {
		const { value, name } = e.target;
		onChangeInput({value, name});
	}
	const onSelect = ({value}) => {
		onChangeInput({value, name:'addr'});
	}
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
								id="username"
								value={username}
								onChange={handleChangeInput}
								error = {formatError.username}
								helperText = '6~16자 영문, 숫자 조합으로 입력하세요'
								autoComplete="username"
								name="username"
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
								value={email}
								onChange={handleChangeInput}
								error = {formatError.email}
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
								value={password}
								onChange={handleChangeInput}
								error = {formatError.password}
								helperText = '8~16자 영문, 숫자 조합으로 입력하세요.'
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
								placeholder="검색 또는 선택하세요. (필수)"
								onSelectResetsInput={false}
								isSearchable
							/>
						</Grid>
					</Grid>
					<Button
						onClick={onSubmit}
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
