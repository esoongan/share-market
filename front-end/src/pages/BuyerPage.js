import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMyPost,
	getContracts,
	getRenting,
} from 'store/modules/mypage';
import { toggleModal } from 'store/modules/base';
import Requests from 'components/mypage/Requests';

const BuyerPage = ({ history }) => {
	const dispatch = useDispatch();

	const { myPosts, contracts, renting } = useSelector(({ mypage }) => ({
		myPosts: mypage.myPosts,
		contracts: mypage.contracts.buyer,
		renting: mypage.renting.buyer,
	}));

	//최초 렌더링 시 실행
	useEffect(() => {
		dispatch(getMyPost());
		dispatch(getContracts({ version: 'buyer' }));
		dispatch(getRenting({ version: 'buyer' }));
	}, []);


	const openChatModal = () => {
		dispatch(toggleModal({ modal: 'chatModal', visible: true }));
	};

	return (
		<>
			<Navigation />
			{/* requests는 buyer 페이지로 이동시키기 */}
			<Requests
				contracts={contracts}
				openChatModal={openChatModal}
			/>
			<Renting renting={renting} history={history} />
		</>
	);
};

export default BuyerPage;
