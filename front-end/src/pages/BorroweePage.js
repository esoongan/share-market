import React, { useEffect } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost } from 'store/modules/mypage';

const BorroweePage = ({history}) => {
	const dispatch = useDispatch();

	const { content } = useSelector(
		({ mypage }) => ({
			content: mypage.content,
		}),
	);

	useEffect(() => {
		dispatch(getMyPost());
	}, []);


	return (
		<>
			{/* <Navigation /> */}
			{/* <Renting /> */}
			{/* <Reservation /> */}
			<MyPost items={content} history={history}/>
		</>
	);
};

export default BorroweePage;
