import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from '../components/mypage/Mypost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts'
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost, getBuyerContract, getBuyerRenting } from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';
import { toggleModal } from 'store/modules/base';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
}));
const BorrowerPage = ({history}) => {
  const classes = useStyles();
	const dispatch = useDispatch();
	const [postList, setPostList] = useState([]);
	const now = moment().format('YYYY-MM-DD');


	const { myPosts, buyerContract, logged, failure, buyerrenting, startDate, endDate } = useSelector(({ mypage, auth, pender }) => ({
		myPosts: mypage.myPosts,
		buyerContract: mypage.buyerContract,
		logged: auth.logged,
		failure: pender.failure[mypage/'GET_BUYER_CONTRACT'],
		buyerrenting: mypage.buyerrenting,
		startDate: mypage.buyerrenting.startDate,
		endDate: mypage.buyerrenting.endDate,
	}))
	const end = moment(endDate, 'YYYY-MM-DD');
	const start = moment(startDate, 'YYYY-MM-DD');
	//최초 렌더링 시 실행
	useEffect(() => {
		if(logged){
		dispatch(getMyPost());
		dispatch(getBuyerContract({state:'default'}));
       /*  dispatch(getBuyerContract({state:'accept'})); 
		 */
	/* 	dispatch(getBuyerRenting({state:'accept'})); */

	}
		else
		{
			alert('먼저 로그인을 해주세요.');
			history.replace('/');
		}
	}, [logged, dispatch, history]);


	//승인 받고, 시작 날짜에 화면에 뜬다, 또한 대여날짜가 끝나면 사라진다.
	useEffect(()=>{
		if((end.diff(now, 'days'))>=0 && (now.diff(start, 'days'))>=0 ){
			dispatch(getBuyerRenting({state:'accept'}));
		}
	},[dispatch]);


  return (
    <>
    <Navigation/>
	{failure? (<div>리스트 불러오기 실패</div>) :(
    <Renting items={buyerrenting} history={history}/>)} 
	{/* <Reservation 
	items={reservation} history={history}/> )} */}
    <MyPost items={myPosts} history={history}/>
    </>
  );
};

export default BorrowerPage;