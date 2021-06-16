import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ItemCard2 from 'components/ItemCard2';



const useStyles = makeStyles(theme => ({
	root:{
		marginBottom: theme.spacing(10),
	},
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

/////////////////////////////////////////////////////////

/* const getDday = ({ start, end}) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const endDate = moment(end, 'YYYY-MM-DD');
	return (endDate.diff(startDate, 'days') + 1);
};
console.log(getDday); */


export default function Renting({ history, items }) {
	const classes = useStyles();


	return (
		<div className={classes.root}>
			<Typography gutterBottom variant="h5" component="h1">
				대여중
			</Typography>

			<div className={classes.itemsContainer}>
				{items&&items.map(item => (
					<div className={classes.item} key={item.id}>
						<ItemCard2
							{...item}
							onClickItem={() => history.push(`/post/${item.id}`)}
						/>						
					</div>
				))}
			</div>
		</div>
	);
}


