import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts';
import Requests from 'components/mypage/Requests';

import { useDispatch, useSelector } from 'react-redux';
import {
	acceptContract,
	getMyPost,
	getContracts,
	refuseContract,
} from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';
import { toggleModal } from 'store/modules/base';


const useStyles = makeStyles(theme => ({}));
const BorroweePage = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postList, setPostList] = useState({ids: [], titles: []}); // {ids: [], titles: []}
	const { myPosts, contracts } = useSelector(({ mypage }) => ({
		myPosts: mypage.myPosts,
		contracts: mypage.contracts.seller, // [{id, postId, seller }]
	}));

	//최초 렌더링 시 실행
	useEffect(() => {
		dispatch(getMyPost());
		dispatch(getContracts({ version: 'seller'}));
	}, []);

	useEffect(() => {
		if (contracts.length > 0) {
			let ids = [...new Set(contracts.map(c => c.postId))];
			let titles = [...new Set(contracts.map(c => c.postTitle))];
			setPostList({ids, titles});
		}
	}, [contracts]);

	const onClickAccept = id => {
		if (window.confirm('수락하시겠습니까? 수락 시 거래가 성사됩니다.'))
			dispatch(acceptContract({ id })).then(() => {
				//거래 요청 목록 다시 가져오기
				dispatch(getContracts({ state: 'default' }));
			});
	};

	const onClickRefuse = id => {
		if (window.confirm('거절하시겠습니까? 거절 시 요청이 삭제됩니다.'))
			dispatch(refuseContract({ id })).then(() => {
				//거래 요청 목록 다시 가져오기
				dispatch(getContracts({ state: 'default' }));
			});
	};
	const openChatModal = () => {
		dispatch(toggleModal({ modal: 'chatModal', visible: true }));
	};

	return (
		<>
			<Navigation />
			<Contracts
				contracts={contracts}
				postList={postList}
				onClickAccept={onClickAccept}
				onClickRefuse={onClickRefuse}
				openChatModal={openChatModal}
			/>
			{/* requests는 buyer 페이지로 이동시키기 */}
			<Requests
				contracts={contracts}
				openChatModal={openChatModal}
			/>
			{/* <Renting /> */}
			{/* <Reservation /> */}
			<MyPost items={myPosts} history={history} />
		</>
	);
};

export default BorroweePage;
