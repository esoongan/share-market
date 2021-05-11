import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Navigation from 'components/mypage/Navigation';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  navTab:{
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },



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

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
     
 <main>

<section className={classes.navTab}>
{/**이곳에 탭 두어야 한다 */}
<Navigation/>
</section>        
  
      

<section className={classes.borrowing}>
  <Container className={classes.cardGrid} maxWidth="md">

    <Typography gutterBottom variant="h5" component="h1">
                      내가 빌린 상품
    </Typography>
        
         
    <Grid container spacing={4}>
            {cards.map((card) => (
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
             />
             
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                      포스트 제목을 이곳에
                 </Typography>      
            </CardContent>
                 
            <CardActions>
                    <Button size="small" color="primary">
                      Category
                    </Button>
            </CardActions>
               
        </Card>
      </Grid>
            ))}
    </Grid>
  </Container>
 </section>



 <section className={classes.reservation}>
  <Container className={classes.cardGrid} maxWidth="md">

    <Typography gutterBottom variant="h5" component="h1">
                      예약
    </Typography>
        
         
    <Grid container spacing={4}>
            {cards.map((card) => (
      <Grid item key={card} xs={6} sm={3} md={2}>
        <Card className={classes.card}>
            <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
             />
               
        </Card>
      </Grid>
            ))}
    </Grid>
  </Container>
 </section>

 <section className={classes.mypost}>
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
                    image="https://source.unsplash.com/random"
                    title="Image title"
             />
                           
        </Card>
      </Grid>
            ))}
    </Grid>
  </Container>


 </section>
</main>


    </React.Fragment>
  );
}
