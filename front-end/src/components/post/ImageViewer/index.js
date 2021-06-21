import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import {imagePath} from 'constant/constant'

const useStyles = makeStyles(theme => ({
	imageViewer: {
		marginBottom: theme.spacing(4),
	},
	photoSection: {
		height: 'max-content',
	},
	photosContainer: {
		height: 'max-content',
		overflow: 'hidden',
	},
	carouselImage: {
		width: '100%',
		height: '100%',
		maxHeight: '25vh',
		objectFit: 'contain',
		backgroundColor: grey[300]
	},
	carouselImage_1: {
		width: '100%',
		height: '100%',
		maxHeight: '50vh',
		objectFit: 'contain',
		backgroundColor: grey[300]
	}
}));

const ImageViewer = ({ images }) => {
	const classes = useStyles();

	if(!images){
		return <></>;
	}
	return (
		<section className={classes.photoSection}>
			{/* photo  */}
			<Hidden mdUp>
				<Carousel autoPlay={false}>
					{images.map((image, index) => (
						<img
							className={classes.carouselImage_1}
							key={index}
							src={imagePath + image.filename}
							alt=""
						/>
					))}
				</Carousel>
			</Hidden>
			<Hidden smDown>
				<Grid className={classes.photosContainer} container alignContent='stretch' spacing={1}>
					<Grid item md={6}>
						<img
							className={classes.carouselImage_1}
							src={imagePath + images[0].filename}
							alt=""
						/>
					</Grid>
					<Grid className={classes.photosContainer} container spacing={1} item md={6}>
						{images.slice(1).map((image, index) => (
							<Grid key={index} item md={6}>
								<img
									className={classes.carouselImage}
									src={imagePath + image.filename}
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
