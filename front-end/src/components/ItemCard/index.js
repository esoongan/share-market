import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import RoomIcon from '@material-ui/icons/Room';
import { getLabel } from 'lib/util';
import { categories } from 'constant/locale';

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

const ItemCard = ({ id, title, category, addr, createdDate, userId, onClickItem, img='https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=559&q=80' }) => {
	const classes = useStyles();
  const categoryLabel = getLabel(categories, category);
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
          <Chip color='primary' label={categoryLabel} size="small"/>
          <div className={classes.addr}><RoomIcon/><Typography component='span'>{addr}</Typography></div>
        </div>
        <div className={classes.itemInfo}>
          <Typography color='textSecondary'>{userId}</Typography> 
          <Typography color='textSecondary'>{createdDate.substring(0,10)} </Typography>
        </div>
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </div>
      </CardContent>
		</Card>
	);
};

export default ItemCard;
