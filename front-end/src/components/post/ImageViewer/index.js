import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import image from 'pages/1000.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';

//todo: 이미지 로드 안됨
const useStyles = makeStyles(theme => ({
	imageViewer: {
		marginBottom: theme.spacing(4),
	},
	carouselImage: {
		width: '100%',
		
	},
}));

const ImageViewer = ({ images }) => {
	const classes = useStyles();

	return (
		<section className={classes.photoSection}>
			{/* photo  */}
			<Hidden mdUp>
				<Carousel autoPlay={false}>
					{images.map((image, index) => (
						<img
							className={classes.carouselImage}
							key={index}
							src={image.filepath+'/'+image.filename}
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
							src={'http://localhost:8080/images/'+images[0].filename}
							alt=""
						/>
					</Grid>
					<Grid container spacing={2} item md={6}>
						{images.slice(1).map((image, index) => (
							<Grid key={index} item md={6}>
								<img
									className={classes.carouselImage}
									src={'http://localhost:8080/images/'+image.filename}
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