import React, { useEffect, useState } from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from 'components/mypage/MyPost';
import Navigation from 'components/mypage/Navigation';
import Contracts from 'components/mypage/Contracts';
import Requests from 'components/mypage/Requests';

import { useDispatch, useSelector } from 'react-redux';
import {
	acceptContract,
	getMyPost,
	getContracts,
	refuseContract,
	getRenting,
} from 'store/modules/mypage';
import { makeStyles } from '@material-ui/core';
import { toggleModal } from 'store/modules/base';

const useStyles = makeStyles(theme => ({}));
const SellerPage = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postList, setPostList] = useState({ ids: [], titles: [] }); // {ids: [], titles: []}
	const { logged, myPosts, contracts, renting } = useSelector(
		({ mypage, auth }) => ({
			myPosts: mypage.myPosts,
			contracts: mypage.contracts.seller, // [{id, postId, seller }]
			renting: mypage.renting.seller,
			logged: auth.logged,
		}),
	);

	//최초 렌더링 시 실행
	useEffect(() => {
		if (logged) {
			dispatch(getMyPost());
			dispatch(getContracts({ version: 'seller' }));
			dispatch(getRenting({ version: 'seller' }));
		} else {
			alert('로그인이 필요한 서비스입니다.');
			history.replace('/');
		}
	}, [logged]);

	useEffect(() => {
		if (contracts.length > 0) {
			let ids = [...new Set(contracts.map(c => c.postId))];
			let titles = [...new Set(contracts.map(c => c.postTitle))];
			setPostList({ ids, titles });
		}
	}, [contracts]);

	const onClickAccept = id => {
		if (window.confirm('수락하시겠습니까? 수락 시 거래가 성사됩니다.'))
			dispatch(acceptContract({ id })).then(() => {
				//거래 요청 목록 다시 가져오기
				dispatch(getContracts({ version: 'seller' }));
			});
	};

	const onClickRefuse = id => {
		if (window.confirm('거절하시겠습니까? 거절 시 요청이 삭제됩니다.'))
			dispatch(refuseContract({ id })).then(() => {
				//거래 요청 목록 다시 가져오기
				dispatch(getContracts({ version: 'seller' }));
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
			<Renting renting={renting} history={history} />
			<MyPost items={myPosts} history={history} />
		</>
	);
};

export default SellerPage;