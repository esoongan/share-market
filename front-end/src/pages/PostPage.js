import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import image from './1000.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button, Paper, Grid } from '@material-ui/core';
import { DateRangePicker } from 'react-dates';

const useStyles = makeStyles(theme => ({
	root: {},
	titleSection: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	photoSection: {
		marginBottom: theme.spacing(4),
	},
	carouselImage: {
		width: '100%',
	},
	contentSection: {
  },
	content: {
    padding: theme.spacing(4),
    minHeight: 300,
  },
	floatingPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  dateRangePicker: {
    marginBottom: theme.spacing(4),
  },
  button: {
    width: '80%',
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }

}));

const imageList = [
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
	{ data_url: image },
];

const PostPage = () => {
	const classes = useStyles();
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});
	const [focusedInput, setFocusInput] = useState(null);

	const onFocusInput = focusDate => {
		setFocusInput(focusDate);
	};

	return (
		<div>
			<section className={classes.titleSection}>
				<Typography component="h2" variant="h4" gutterBottom>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
					blanditiis tenetur
				</Typography>
			</section>

			<section className={classes.photoSection}>
				{/* photo  */}
				<Hidden mdUp>
					<Carousel>
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

			<section className={classes.contentSection}>
				{/* contents  */}
				<Grid container spacing={4}>
					<Grid item md={8}>
						<Paper className={classes.content}>              
              <Typography component='p' variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur, dui vel consequat gravida, lectus nulla consectetur mauris, in viverra urna augue ac arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla lorem neque, sagittis eu molestie at, ultrices et ipsum. Ut blandit ullamcorper consequat. Aenean maximus odio eget cursus aliquet. In in varius lectus. Nulla sit amet efficitur magna. Praesent ut felis quis nisl mattis convallis vel id elit. Morbi pulvinar egestas hendrerit. Fusce rhoncus fermentum risus. Phasellus auctor tempus cursus. Suspendisse potenti. Aliquam urna nunc, sollicitudin eu venenatis in, porta non eros. In eget lobortis purus. Nam a neque sit amet enim pulvinar vulputate. Morbi congue, libero et pretium rhoncus, sem mauris mattis orci, id convallis tellus massa et orci.
              Donec luctus mi nec hendrerit tincidunt. Duis sed risus nec lorem vulputate dapibus. Nulla facilisi. Maecenas quis dictum dolor, eu fermentum arcu. Vestibulum pretium augue eget nibh dignissim euismod. Nulla rutrum porta ipsum et sodales. Curabitur nec dui pellentesque, consectetur nibh eget, imperdiet ex. Phasellus nec massa vehicula, aliquet nibh nec, vestibulum dolor. Sed tincidunt tincidunt velit, faucibus semper enim aliquet vel. Integer eu sapien sem. Fusce lacinia urna in viverra vestibulum.
              </Typography>

              <Divider className={classes.divider} />


            
            </Paper>
					</Grid>
					<Grid item md={4}>
						<Paper className={classes.floatingPaper}>
              <Typography>$5,500</Typography>
              <Divider className={classes.divider} />
							<DateRangePicker
                className={classes.dateRangePicker}
								//todo: 테두리 빼기 https://github.com/airbnb/react-dates#overriding-styles
								startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
								startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
								endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
								endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
								onDatesChange={({ startDate, endDate }) =>
									setDateRange({ startDate, endDate })
								} // PropTypes.func.isRequired,
								focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
								onFocusChange={onFocusInput} // PropTypes.func.isRequired
                endDatePlaceholderText='반납일'
                startDatePlaceholderText='대여일'
							/>
							<Button className={classes.button} variant="contained" color="primary" style={{'margin-top' : '64px'}}>
								예약하기
							</Button>
              <Button className={classes.button} variant="contained" color="secondary">
								쪽지보내기
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</section>
		</div>
	);
};

export default PostPage;
