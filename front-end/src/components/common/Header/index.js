import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/modules/base';
import HeaderMenu from './HeaderMenu';
import { Link as RouterLink } from 'react-router-dom';

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
	const { logged } = useSelector(({ auth }) => ({ logged: auth.logged }));
	const onClickLogin = () => {
		dispatch(toggleModal('loginModal')); //로그인 모달 열기
	};
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						로고
					</Typography>
					{/* !logged로 바꿔야 됨! */}
					{!logged ? (
						<div>
							<Button color="inherit" onClick={onClickLogin}>
								로그인
							</Button>
							<Button
								variant="outlined"
								회원가입
							</Button>
						</div>
					) : (
						<div>
							<Button color="inherit" component={RouterLink} to="/post/editor">
								글 올리기
							</Button>
							<Button
								aria-controls="header-menu"
								aria-haspopup="true"
								variant="outlined"
								color="inherit"
								onClick={handleClick}
							>
								메뉴
							</Button>
							<HeaderMenu anchorEl={anchorEl} onClose={handleClose} />
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
