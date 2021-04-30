import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/modules/store';

const useStyles = makeStyles(theme => ({
	root: {
		flexDirection: 'row',
	},
	title: {
		flexGrow: 1,
	},
}));

export default function Header() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const logged = useSelector(store => store.logged);
	const onClickLogin = () => {
		dispatch(toggleModal('loginModal')); //로그인 모달 열기
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						로고
					</Typography>
					{!logged ? (
						<div>
							<Button color="inherit" onClick={onClickLogin}>
								로그인
							</Button>
							<Button variant="outlined" color="inherit">
								회원가입
							</Button>
						</div>
					) : (
						<div>
							<Button color="inherit" onClick={onClickLogin}>
								로그아웃
							</Button>
							<Button variant="outlined" color="inherit">
								마이페이지
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
