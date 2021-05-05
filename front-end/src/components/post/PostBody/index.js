import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	titleSection: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	editableButton:{
		display:'flex',
		justifyContent:'flex-end',
		paddingTop: theme.spacing(1),
	},

	content: {
		padding: theme.spacing(4),
		minHeight: 300,
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	writer:{
		flexGrow:1,
		color: 'grey',
	},
	info: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
}));

export const PostTitle = ({ title }) => {
	const classes = useStyles();
	return (
		<section className={classes.titleSection}>
			<Typography component="h2" variant="h4" gutterBottom>
				{title}
			</Typography>
		</section>
	);
};

export const PostContent = ({ writer, category, addr, content, editable, onClickEdit, onClickDelete}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.content}>
			<div className={classes.info}>
				<Typography className={classes.writer} >작성자 {writer}</Typography>
				<Chip color="primary" label={category} size="small" />
				<RoomIcon />
				<Typography component="span">{addr}</Typography>
			</div>
			{editable && 
			<div className={classes.editableButton}>
				<Button color="primary" onClick={onClickEdit}>수정하기</Button>
				<Button color="secondary" onClick={onClickDelete}>삭제하기</Button>
			</div>}
			<Divider className={classes.divider} />
			<Typography component="p" variant="body1">
				{content}
			</Typography>
		</Paper>
	);
};
