import React, { useEffect } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost } from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	myPostSection: {},
}));
const BorroweePage = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { content } = useSelector(({ mypage }) => ({
		content: mypage.content,
	}));

	useEffect(() => {
		dispatch(getMyPost());
	}, []);

	return (
		<>
			<Navigation />
			{/* <Renting /> */}
			{/* <Reservation /> */}
			<section className={classes.myPostSection}>
				<MyPost items={content} history={history} />
			</section>
		</>
	);
};

export default BorroweePage;
