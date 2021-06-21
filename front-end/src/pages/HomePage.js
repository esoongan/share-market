import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { cities, categories } from 'constant/locale';
import Searchbar from 'components/common/Searchbar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(16),
	},
	section: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(16),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
	},
	searchSection: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(32),
	},
	background: {
		// backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg)',
		backgroundSize: 'cover',
		background: grey[200],
	},
	cityIcon: {
		width: 60,
		height: 60,
		objectFit: 'fill',
		borderRadius: theme.spacing(1),
		marginRight: theme.spacing(2),
	},
	clickable: {
		'&:hover': {
			backgroundColor: grey[100],
			cursor: 'pointer',
		},
		'&:active': {
			backgroundColor: grey[200],
		},
	},
	category: {
		width: '100%',
		height: 200,
		position: 'relative' /* If you want text inside of it */,
		borderRadius: theme.spacing(1),
	},
	categoryCover: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '98%',
		background: 'rgba(0,0,0,0.4)',
		zIndex: 100,
		opacity: 0,
		'&:hover': {
			opacity: 1,
			zIndex: 10,
		},
	},
	categoryLabel: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		color: 'white',
		textAlign: 'center',
		opacity: 0,
		zIndex: 50,
		'&:hover': {
			opacity: 1,
		},
	},
	categoryImg: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: theme.spacing(1),
	},
}));

const HomePage = ({ history }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.background}>
				<section className={classes.searchSection}>
					<Grid container justify="center">
						<Grid item xs={12} sm={10} md={8}>
							<Searchbar />
						</Grid>
					</Grid>
				</section>
			</div>
			<section className={classes.section}>
				<Typography variant="h5" gutterBottom>
					지역별 마켓 둘러보기
				</Typography>
				<Grid container spacing={1}>
					{cities.map(item => (
						<Grid item key={item.value} xs={6} sm={3} md={3}>
							<div
								id={item.value}
								className={classes.clickable}
								onClick={() => history.push(`list/1?addr=${item.label}`)}
							>
								<Grid
									container
									spacing={0}
									direction="row"
									justify="flex-start"
									alignItems="flex-end"
								>
									<Grid item>
										<img
											className={classes.cityIcon}
											src={item.img}
											alt={item.label}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={7}>
										<Typography variant="h6">{item.label}</Typography>
										<div style={{ display: 'flex' }}>
											<Typography variant="caption">둘러보기</Typography>
											<ArrowForwardIcon color="action" />
										</div>
									</Grid>
								</Grid>
							</div>
						</Grid>
					))}
				</Grid>
			</section>
			<section className={classes.section}>
				<Typography variant="h5" gutterBottom>
					카테고리 별 둘러보기
				</Typography>
				<Grid container spacing={2}>
					{categories.map((item, index) => {
						if (index === categories.length - 1) return null;
						return (
							<Grid key={item.value} item xs={12} sm={6} md={4}>
								<Paper
									className={clsx(classes.category, classes.clickable)}
									elevation={3}
									onClick={() => history.push(`list/1?category=${item.value}`)}
								>
									<img
										className={classes.categoryImg}
										src={item.img}
										alt={item.label}
									/>
									<div className={classes.categoryCover}>
										<Typography
											variant="h4"
											component="span"
											className={classes.categoryLabel}
										>
											{item.label}
										</Typography>
									</div>
								</Paper>
							</Grid>
						);
					})}
				</Grid>
			</section>
		</div>
	);
};

export default HomePage;
