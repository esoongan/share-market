import {
	HomePage,
	JoinPage,
	NotFoundPage,
	EditorPage,
	PostPage,
	ListPage,
	SellerPage,
	BuyerPage,
	ChatPage,
} from 'pages';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
// import Base from 'containers/common/Base'
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { CssBaseline, makeStyles } from '@material-ui/core';
import LoginModal from 'components/common/LoginModal';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column',
	},
}));

const App = () => {
	const classes = useStyles();

	return (
		<BrowserRouter>
			<div className={classes.root}>
				<CssBaseline />
				<Header />
				<Container>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/join" component={JoinPage} />
						<Route exact path="/post/editor/:post_id?" component={EditorPage} />
						<Route exact path="/post/:post_id" component={PostPage} />
						<Route exact path="/mypage/buyer" component={BuyerPage} />
						<Route exact path="/mypage/seller" component={SellerPage} />
						<Route exact path="/list/:page?" component={ListPage} />
						<Route exact path="/mypage/chat" component={ChatPage} />
						<Route component={NotFoundPage} />
					</Switch>
					{/* <Base /> */}
				</Container>
				<Footer />
			</div>
			<LoginModal />
		</BrowserRouter>
	);
};

export default App;
