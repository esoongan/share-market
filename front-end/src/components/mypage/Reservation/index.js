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

  section: {
    paddingTop: theme.spacing(50),
    paddingBottom: theme.spacing(16),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
},
}));

const cards = [1, 2, 3, 4];

const Reservation = () =>{
    const classes = useStyles();
    return (
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
    );
};

export default Reservation;