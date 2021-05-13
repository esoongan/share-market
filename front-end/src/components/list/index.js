import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ItemCard from 'components/list/ItemCard';

const useStyles = makeStyles(theme => ({
	root: {},
	subjectSection: {
    marginTop:theme.spacing(4),
    marginBottom:theme.spacing(4),
  },
	listSection: {},
	paginationSection: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));
const items = [
	{
		id: 1,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:37:47.744107',
	},
	{
		id: 2,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:05.245538',
	},
	{
		id: 3,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:05.604616',
	},
	{
		id: 4,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:06.086739',
	},
	{
		id: 5,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:52.164932',
	},
	{
		id: 6,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:52.597659',
	},
	{
		id: 7,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:53.047871',
	},
	{
		id: 8,
		title: '제일 위에 보여야함',
		user_id: 'sjinlee',
		category: '스포츠용품',
		addr: '서울',
		createdDate: '2021-04-17T23:38:53.395167',
	},
];

const List = ({city, category, keyword, period, items, totalElements, page, onMovePage, maximumPage}) => {
	const classes = useStyles();
	const handleMovePage = (event, value) =>{
		onMovePage(value);
	}

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
				<Typography variant='body2' style={{textAlign:'end'}}>
					{`검색결과 총 ${totalElements}개`}
				</Typography>
				<Grid container spacing={2}>
					{items.map(item => (
						<Grid key={item.id} item md={3} sm={4} xs={6}>
							<ItemCard {...item}  />
						</Grid>
          ))}
				</Grid>
			</section>

			<section className={classes.paginationSection}>
				<Pagination page={Number(page)} onChange={handleMovePage} count = {maximumPage}/>
			</section>
		</>
	);
};

export default List;
