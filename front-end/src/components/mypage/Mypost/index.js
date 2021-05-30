import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ItemCard from 'components/ItemCard';

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	/*   navTab:{
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }, */

	/*  cardContent: {
      flexGrow: 1,
    }, */
	section: {
		paddingTop: theme.spacing(50),
		paddingBottom: theme.spacing(16),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
	},
}));

const MyPost = ({ items, history }) => {
	const classes = useStyles();

	return (
		<section className={classes.cardGrid} >
			<Typography gutterBottom variant="h5" component="h1">
				MY POST
			</Typography>

			<Grid container spacing={4}>
				{items.length === 0 ? (
					<div className={classes.noContents}>noContents</div>
				) : (
					<Grid container spacing={2}>
						{items.map(item => (
							<Grid key={item.id} item md={3} sm={4} xs={6}>
								<ItemCard
									{...item}
									onClickItem={()=> history.push(`/post/${item.id}`)}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Grid>
		</section>
	);
};

export default MyPost;
