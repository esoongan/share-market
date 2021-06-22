import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';

//todo: 각 메뉴별 페이지로 이동하기
const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));
const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function HeaderMenu({
	anchorEl,
	onClose,
	onClickLogout,
}) {
	return (
		<div>
			<StyledMenu
				id="header-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={onClose}
			>
				<StyledMenuItem component={RouterLink} to='/mypage/buyer'>
					<ListItemIcon>
						<SendIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="마이페이지" />
				</StyledMenuItem>
				<StyledMenuItem component={RouterLink} to='/mypage/chat'>
					<ListItemIcon>
						<DraftsIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="채팅" />
				</StyledMenuItem>
				<Divider />
				<StyledMenuItem onClick={onClickLogout}>
					<ListItemIcon></ListItemIcon>
					<ListItemText primary="로그아웃" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
