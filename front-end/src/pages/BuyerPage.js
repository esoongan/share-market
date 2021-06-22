import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost, getContracts, getRenting } from 'store/modules/mypage';
import { toggleModal } from 'store/modules/base';
import Requests from 'components/mypage/Requests';

const BuyerPage = ({ history }) => {
	const dispatch = useDispatch();

	const { contracts, renting, logged } = useSelector(({ mypage, auth }) => ({
		contracts: mypage.contracts.buyer,
		renting: mypage.renting.buyer,
		logged: auth.logged,
	}));

	//최초 렌더링 시 실행
	useEffect(() => {
		if (logged) {
			dispatch(getContracts({ version: 'buyer' }));
			dispatch(getRenting({ version: 'buyer' }));
		} else {
			alert('로그인이 필요한 서비스입니다.');
			history.replace('/');
		}
	}, [logged]);

	const openChatModal = () => {
		dispatch(toggleModal({ modal: 'chatModal', visible: true }));
	};

	return (
		<>
			<Navigation />
			{/* requests는 buyer 페이지로 이동시키기 */}
			<Requests contracts={contracts} openChatModal={openChatModal} />
			<Renting renting={renting} history={history} />
		</>
	);
};

export default BuyerPage;
