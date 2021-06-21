import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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

	section: {
		paddingTop: theme.spacing(50),
		paddingBottom: theme.spacing(16),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
	},
}));

const cards = [1, 2, 3, 4];

const Renting = ({ post }) => {
	const { startDate, endDate, post_id, _id } = post;
	const classes = useStyles();
	return (
		<section className={classes.borrowing}>
			<Container className={classes.cardGrid} maxWidth="md">
				<Typography gutterBottom variant="h5" component="h1">
					내가 빌린 상품
				</Typography>

				<Grid container spacing={4}>
					{cards.map(card => (
						<Grid item key={card} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardMedia
									className={classes.cardMedia}
									image="https://source.unsplash.com/random"
									title="Image title"
								/>

								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="h5" component="h2">
										{/*  포스트 제목을 이곳에 */}
									</Typography>
								</CardContent>

								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="h5" component="h3">
										{/*  이곳에 날짜를 추가한다.  */}
										{startDate}
										{endDate}
									</Typography>
								</CardContent>

								<CardActions>
									<Button size="small" color="primary">
										Category
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</section>
	);
};

export default Renting;
