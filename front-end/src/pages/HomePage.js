import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { cityMarkets, categories } from 'constant/locale';
import Searchbar from 'components/common/Searchbar';
import RoomIcon from '@material-ui/icons/Room';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
		background: grey[200],
    paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(32),
	},
  cityIcon:{
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    objectFit: 'cover',
  },
  cityLabel:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2)
  },
	categoryPaper: {
		width: '100%',
		paddingTop: '100%' /* 1:1 Aspect Ratio */,
		position: 'relative' /* If you want text inside of it */,

		'& span': {
			position: 'absolute',
			bottom: theme.spacing(2),
			left: theme.spacing(2),
		},
	},
}));

const HomePage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<section className={classes.searchSection}>
				<Grid container justify="center">
					<Grid item xs={12} sm={10} md={8}>
						<Searchbar />
					</Grid>
				</Grid>
			</section>
			<section className={classes.section}>
				<Typography variant="h5" gutterBottom>
					지역별 마켓 둘러보기
				</Typography>
				<Grid container spacing={2}>
					{cityMarkets.map(item => (
						<Grid key={item.value} item xs={6} sm={3} md={3}>
							<Paper className={classes.cityCard} elevation = {1}>
								<Grid container spacing={1} direction='row' justify='flex-start' alignItems='flex-end'>
									<Grid item xs={12} sm={12} md={5}>
										<img className={classes.cityIcon} src="http://imagescdn.gettyimagesbank.com/500/201707/a10907769.jpg" alt={item.label} />
									</Grid>
									<Grid item xs={12} sm={12} md={7}>
										<div className={classes.cityLabel}>
                      <RoomIcon />
                      <Typography variant="h6">{item.label}</Typography>
										</div>
										<div className={classes.cityLabel}>
                    <Typography variant="caption">둘러보기</Typography>
                    <ArrowForwardIcon color='action'/>
                    </div>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					))}
				</Grid>
			</section>
			<section className={classes.section}>
				<Typography variant="h5" gutterBottom>
					카테고리 별 둘러보기
				</Typography>
				<Grid container spacing={2}>
					{categories.map(item => (
						<Grid key={item.value} item xs={12} sm={4}>
							<Paper
								className={classes.categoryPaper}
								style={{ background: 'orange' }}
							>
								<span>{item.label}</span>
							</Paper>
						</Grid>
					))}
				</Grid>
			</section>
		</div>
	);
};

export default HomePage;
