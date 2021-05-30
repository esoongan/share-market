import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from 'components/ItemCard';

const useStyles = makeStyles(theme => ({
	itemsContainer: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'scroll',
		transform: 'translateZ(0)',
	},
	item: {
		margin: theme.spacing(0, 1),
		width: 'fit-content',
	},
	section: {
		paddingTop: theme.spacing(50),
		paddingBottom: theme.spacing(16),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
	},
}));

export default function MyPost({ history, items }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography gutterBottom variant="h5" component="h1">
				MY POST
			</Typography>

			<div className={classes.itemsContainer}>
				{items.map(item => (
					<div className={classes.item} key={item.id}>
						<ItemCard
							{...item}
							onClickItem={() => history.push(`/post/${item.id}`)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
