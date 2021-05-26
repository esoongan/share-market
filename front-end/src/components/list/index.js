import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ItemCard from 'components/ItemCard';
import NoResult from './noResult.png';

const useStyles = makeStyles(theme => ({
	subjectSection: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
	},
	listSection: {},
	paginationSection: {
		padding: theme.spacing(4),
		display: 'flex',
		justifyContent: 'center',
	},
	noContents: {
		display: 'flex',
		height: '60vh',
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider: {
		marginBottom: theme.spacing(4),
	},
}));

const List = ({
	city,
	category,
	keyword,
	period,
	items,
	totalElements,
	page,
	onMovePage,
	maximumPage,
	onClickItem,
}) => {
	const classes = useStyles();
	const handleMovePage = (event, value) => {
		onMovePage(value);
	};

	return (
		<>
			<section className={classes.subjectSection}>
				{/* TODO: period */}
				<Typography component="h2" variant="h4">
					{period}, {city}의 {category}
				</Typography>
				<Typography component="h1" variant="h2">
					{keyword}
				</Typography>
			</section>
			<section className={classes.listSection}>
				<Typography
					variant="body2"
					style={{ textAlign: 'end', marginBottom: '8px' }}
				>
					{`검색결과 총 ${totalElements}개`}
				</Typography>
				<Divider className={classes.divider} />
				{totalElements === 0 ? (
					<div className={classes.noContents}>
						<img src={NoResult} alt="no result" height="300" />
					</div>
				) : (
					<Grid container spacing={2}>
						{items.map(item => (
							<Grid key={item.id} item md={3} sm={4} xs={6}>
								<ItemCard {...item} onClickItem={onClickItem} />
							</Grid>
						))}
					</Grid>
				)}
			</section>

			<section className={classes.paginationSection}>
				<Pagination
					page={Number(page)}
					onChange={handleMovePage}
					count={maximumPage}
				/>
			</section>
		</>
	);
};

export default List;
