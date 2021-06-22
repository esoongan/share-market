import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { imagePath } from 'constant/constant';

const useStyles = makeStyles(theme => ({
	root: {},
	media: {
		height: 200,
		width: 300,
	},
	itemInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
	},
	addr: {
		display: 'flex',
		alignItems: 'center',
	},
}));

const today = moment().format('YYYY-MM-DD');

//반납일 - 오늘 을 구하는 함수 --> D데이 구하기, 이 값이 0 보다 커야 대여중
const getDday = ({ end }) => {
	const endDate = moment(end, 'YYYY-MM-DD');
	const nowTime = moment().format('YYYY-MM-DD');
	return endDate.diff(nowTime, 'days');
};

//오늘 - 시작날 을 구하는 함수 --> 이 값이 0보다 커야 대여중
const getSday = ({ start }) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const nowTime = moment().format('YYYY-MM-DD');
	return startDate.diff(nowTime, 'days');
};

const now = moment().format('YYYY-MM-DD'); //오늘의 날짜
const ItemCard2 = ({
	id,
	seller,
	buyer,
	startDate,
	endDate,
	createdDate,
	postTitle,
	onClickItem,
	thumbnail,
}) => {

  ;
	if (startDate <= today && endDate >= today) {
		console.log('하하ㅏ하핳하대여중이다');
	}
	if (startDate > today) {
		console.log('하하ㅏ하핳하아직떄가 아니오');
	}

	const classes = useStyles();
	const handleClickItem = () => {
		onClickItem(id);
	};

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={imagePath + thumbnail.filename}
					onClick={handleClickItem}
					component="img"
				></CardMedia>
			</CardActionArea>

			<CardActionArea>
				<CardContent>
					<div className={classes.itemInfo}>
						<Typography color="textSecondary">{seller}님의 물건</Typography>
					</div>
					<div className={classes.itemInfo}>
						<Typography>
							{startDate} ~ {endDate}
						</Typography>
						<Typography component="h2">
							반납까지 D-
							{getDday({
								end: endDate,
							})}
						</Typography>
						{/* 이곳에 나는 디데이를 넣을 것이다. */}
					</div>
					<div>
						<Typography gutterBottom variant="h5" component="h2">
							{postTitle}
						</Typography>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ItemCard2;
