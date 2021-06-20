import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/Mypost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts'
import { useDispatch, useSelector } from 'react-redux';
import { acceptContract, getMyPost, getSellerContract, refuseContract, getSellerRenting } from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';
import { toggleModal } from 'store/modules/base';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
}));
const BorroweePage = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postList, setPostList] = useState([]);

	const { myPosts, sellerContract, sellerrenting, endDate, startDate } = useSelector(({ mypage }) => ({
		myPosts: mypage.myPosts,
		sellerContract: mypage.sellerContract,
		sellerrenting: mypage.sellerrenting,
		endDate: mypage.sellerrenting.endDate,
		startDate: mypage.sellerrenting.startDate,
	}))



	//최초 렌더링 시 실행
	useEffect(() => {
		dispatch(getMyPost());
		dispatch(getSellerContract({state:'default'}));	
	
	}, []);


	useEffect(()=> {
	// TODO: post_id를 postTitle로 바꾸기
	if(sellerContract.length > 0){
			let postList = [...new Set(sellerContract.map(c => (c.postId)))];
			setPostList(postList);
		}
	}, [sellerContract]);

	const onClickAccept = (id) => {
		if(window.confirm('수락하시겠습니까? 수락 시 거래가 성사됩니다.'))
			dispatch(acceptContract({id}));
	}

	const onClickRefuse = (id) => {
		if(window.confirm('거절하시겠습니까? 거절 시 요청이 삭제됩니다.'))
			dispatch(refuseContract({id}));
	}
	const openChatModal = () => {
		dispatch(toggleModal({modal:'chatModal', visible:true}))
	}


	const end = moment(endDate, 'YYYY-MM-DD');
	const start = moment(startDate, 'YYYY-MM-DD');
	const now = moment().format('YYYY-MM-DD');

	//승인 받고, 시작 날짜에 화면에 뜬다, 또한 대여날짜가 끝나면 사라진다.
	useEffect(()=>{
		if((end.diff(now, 'days'))>=0 && (now.diff(start, 'days'))>=0 ){
			dispatch(getSellerRenting({state:'accept'}));
		}
	},[dispatch]);

	return (
		<>
			<Navigation />
      <Contracts rows={sellerContract} postList={postList} onClickAccept={onClickAccept} onClickRefuse={onClickRefuse} openChatModal={openChatModal}/>
			 <Renting items={sellerrenting} history={history} /> 
			{/* <Reservation /> */}
			<MyPost items={myPosts} history={history} />
		</>
	);
};

export default BorroweePage;
