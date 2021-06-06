import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
	AccordionActions,
	Button,
	Chip,
	Divider,
	useTheme,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import ItemCard from 'components/ItemCard';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RoomIcon from '@material-ui/icons/Room';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
	},
	contentHeader: {
		position: 'sticky',
		top: '60px',
		// display: 'flex',
		justifyContent: 'space-between',
		height: '120px',
		background: 'white',
		'& p': {
			padding: theme.spacing(4),
		},
	},
	chat: {
		borderRadius: theme.spacing(2),
		padding: theme.spacing(1, 3),
		width: 'fit-content',
		maxWidth: '60%',
		marginBottom: theme.spacing(2),
	},
	accordianDetails: {
		borderTop: `1.5px solid ${theme.palette.divider}`,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(3, 4),
	},
	postInfo: {
		display: 'flex',
		marginBottom: theme.spacing(1),
	},
	addr: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: theme.spacing(2),
	},
	priceInfo: {
		display: 'flex',
		alignItems: 'center',
		borderLeft: `1px solid ${theme.palette.divider}`,
		padding: theme.spacing(0, 2),
		'& h6':{
			marginRight: theme.spacing(2),
		}
	},
}));

const ChatHeader = ({ username, post, onClickItem }) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.contentHeader}>
			<Typography variant="h5" component="p">
				{username}
			</Typography>
			{/* <Chip color="primary" label={yourAddr} size="small" /> */}
			<div>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						id="post-accordian-header"
					>
						<Typography variant="h6">포스트 정보</Typography>
					</AccordionSummary>
					<AccordionDetails className={classes.accordianDetails}>
						<div>
							<div className={classes.postInfo}>
								<Chip
									color="primary"
									label={post.category}
									size="small"
								/>
								<div className={classes.addr}>
									<RoomIcon />
									<Typography component="span">{post.addr}</Typography>
								</div>
							</div>
							<Typography gutterBottom variant="h5" component="h2">
								{post.title}
							</Typography>
						</div>
						<div className={classes.priceInfo}>
							<div>
								<Typography variant="caption" color="textSecondary">
									1일 렌탈료
								</Typography>
								<br />
								<Typography variant="h6">{post.price}₩</Typography>
							</div>
							<div>
								<Typography variant="caption" color="textSecondary">
									보증금
								</Typography>
								<br />
								<Typography variant="h6">{post.deposit}₩</Typography>
							</div>
						</div>
					</AccordionDetails>
					<AccordionActions style={{ padding: theme.spacing(0, 4, 1) }}>
						<Button endIcon={<OpenInNewIcon/>} size="large" color="primary" component={RouterLink} to={`/post/${post.id}`}>
							자세히
						</Button>
					</AccordionActions>
				</Accordion>
			</div>
			<Divider style={{ margin: '8px 0px 8px 0px', height: '1px' }} />
		</div>
	);
};
export default ChatHeader;
