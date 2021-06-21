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
import { logout } from 'store/modules/auth';

const useStyles = makeStyles(theme => ({
	
	title: {
		flexGrow: 1,
		'&:visited':{
			color: 'white',
		},
		textDecoration: 'none',
	},
}));

export default function Header({children}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { logged } = useSelector(({ auth }) => ({ logged: auth.logged }));
	const onClickLogin = () => {
		dispatch(toggleModal({modal:'loginModal', visible: true})); //로그인 모달 열기
	};
	const onClickLogout = () =>{
		dispatch(logout());
	}
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					{children}

					<Typography component={RouterLink} to='/' variant="h6" className={classes.title}>
						SHARE MARKET
					</Typography>
					{!logged ? (
						<div>
							<Button color="inherit" onClick={onClickLogin}>
								로그인
							</Button>
							<Button
								variant="outlined"
								component={RouterLink}
								to="/join"
								color="inherit"
							>
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
							<HeaderMenu anchorEl={anchorEl} onClose={handleClose} onClickLogout={onClickLogout}/>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
