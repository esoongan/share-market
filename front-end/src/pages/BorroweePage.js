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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import StateTab from 'components/mypage/stateTab'

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
    paddingBottom: '50%',
  },
  cardContent: {
    flexGrow: 1,
  },
  section: {
    paddingTop: theme.spacing(8),
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


     {/*    
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
     
     
     
     
      <main>
   {/*    <StateTab/> */}
        {/* Hero unit */}

   {/*      <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
 */}


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







 {/*Reservation*/}
 <section className={classes.reservation}>
        <Container  className={classes.cardGrid1} maxWidth="md">
          <Typography gutterBottom variant="h5" component="h1">
                      예약
          </Typography>
              {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>

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
        {/*end of reservation */}



         {/*Mypost*/}

         <section className={classes.mypost}>
         <Container  className={classes.cardGrid2} maxWidth="md">

          <Typography gutterBottom variant="h5" component="h1">
                      내가 쓴 글
          </Typography>
              {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>

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
        {/*end of Mypost */}









      </main>



{/* 
      
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
     
 */}


    </React.Fragment>
  );
}
