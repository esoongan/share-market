import React from  'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
      
    },
  /*   navTab:{
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }, */
  
  
  
   /*  cardContent: {
      flexGrow: 1,
    }, */
    section: {
      paddingTop: theme.spacing(50),
      paddingBottom: theme.spacing(16),
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
  },
  }));
  const cards = [1, 2, 3, 4];

const MyPost = ({thumbnail}) =>{
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">

    <Typography gutterBottom variant="h5" component="h1">
                      MYPOST
    </Typography>
        
         
    <Grid container spacing={4}>
            {cards.map((card) => (
      <Grid item key={card} xs={6} sm={3} md={2}>
        <Card className={classes.card}>
            <CardMedia
                    className={classes.cardMedia}
                   /*  image="https://source.unsplash.com/random" */
                   {...thumbnail.slice(1).map((image, index) => (  //여기 왜 ...이 들어가야 하는 지 모르겠음
                    <Grid key={index} item md={6}>
                      <img
                        className={classes.thumbnailImage}
                        src={image.filepath+'/'+image.filename}
                        alt=""
                      />
                    </Grid>
                  ))}
                    title="Image title"
             />
                           
        </Card>
      </Grid>
            ))}
    </Grid>
  </Container>
        
    );
};

export default MyPost;