import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts'
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost, getSellerContract } from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}));
const BorroweePage = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postList, setPostList] = useState([]);

	const { myPosts, sellerContract } = useSelector(({ mypage }) => ({
		myPosts: mypage.myPosts,
		sellerContract: mypage.sellerContract,
	}));

	//최초 렌더링 시 실행
	useEffect(() => {
		dispatch(getMyPost());
		dispatch(getSellerContract({state:'default'}));		//TODO: 모두 받아오기
	}, []);

	useEffect(()=> {
	// TODO: post_id를 postTitle로 바꾸기
	if(sellerContract.length > 0){
			let postList = [...new Set(sellerContract.map(c => (c.postId)))];
			setPostList(postList);
		}
	}, [sellerContract]);



	return (
		<>
			<Navigation />
      <Contracts rows={sellerContract} postList={postList}/>
			{/* <Renting /> */}
			{/* <Reservation /> */}
			<MyPost items={myPosts} history={history} />
		</>
	);
};

export default BorroweePage;
