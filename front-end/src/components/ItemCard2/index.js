import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import RoomIcon from '@material-ui/icons/Room';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		
	},
	media: {
		height: 200,
    width: 300,
	},
  itemInfo:{
    display:'flex',
    justifyContent:'space-between',
    marginBottom: theme.spacing(1),
  },
  addr:{
    display:'flex',
    alignItems:'center',
  }
}));


/* const nowTime = moment().format('YYYY-MM-DD'); */

const getDday = ({ end }) => {
	const endDate = moment(end, 'YYYY-MM-DD');
    const nowTime = moment().format('YYYY-MM-DD');
	return (endDate.diff(nowTime, 'days'));
};

const ItemCard2 = ({ id, seller,  startDate, endDate, createdDate, postTitle, onClickItem, img='https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=559&q=80' }) => {
const classes = useStyles();
 /*  const categoryLabel = getLabel(categories, category); */
  const handleClickItem = () => {
    onClickItem(id);
  }
  return (
	<Card className={classes.root}>
	  <CardActionArea>
		<CardMedia
          className={classes.media}
		  image={img}
          onClick= {handleClickItem}
		/>
	  </CardActionArea>
      <CardContent>
        <div className={classes.itemInfo}>
          <Typography color='textSecondary'>{seller}님의 물건</Typography> 
        {/*   <Typography color='textSecondary'>{createdDate.substring(0,10)} </Typography>  */}
        </div>
        <div className={classes.itemInfo}>
        <Typography>{startDate}~{endDate}</Typography>
        <Typography component="h2">
            D-  
        {getDday({	
		end:endDate,})}
            </Typography>
        {/* 이곳에 나는 디데이를 넣을 것이다. */}
        </div>
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            {postTitle}
          </Typography>
        </div>
        
      </CardContent>
	</Card>
	);
};

export default ItemCard2;
