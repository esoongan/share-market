import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import image from 'pages/1000.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	imageViewer: {
		marginBottom: theme.spacing(4),
	},
	carouselImage: {
		width: '100%',
	}
}));

const imageList = [
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
];

const ImageViewer = ({images}) => {
	const classes = useStyles();

	return (
		<section className={classes.photoSection}>
			{/* photo  */}
			<Hidden mdUp>
				<Carousel autoPlay={false}>
					{imageList.map((image, index) => (
						<img
							className={classes.carouselImage}
							key={index}
							src={image.data_url}
							alt=""
						/>
					))}
				</Carousel>
			</Hidden>
			<Hidden smDown>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<img
							className={classes.carouselImage}
							src={imageList[0].data_url}
							alt=""
						/>
					</Grid>
					<Grid container spacing={2} item md={6}>
						{imageList.slice(1).map((image, index) => (
							<Grid key={index} item md={6}>
								<img
									className={classes.carouselImage}
									src={image.data_url}
									alt=""
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Hidden>
		</section>
	);
};

export default ImageViewer;
