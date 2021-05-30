import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, PostTitle } from 'components/post/PostBody';
import ImageViewer from 'components/post/ImageViewer';
import FloatingMenu from 'components/post/FloatingMenu';
import {
	deletePost,
	getFiles,
	getPost,
	reserve,
	getBlockedDates,
	initialize,
} from 'store/modules/post';
import Grid from '@material-ui/core/Grid';
import { toggleEditMode } from 'store/modules/editor';
import { toggleModal } from 'store/modules/base';
import ChatModal from 'components/common/ChatModal';

const PostPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const post_id = match.params.post_id;
	const [editable, setEditable] = useState(false);
	const { success, post, images, failure, myId, blocked, reserved } =
		useSelector(({ pender, post, auth }) => ({
			post: post.post,
			images: post.images,
			success:
				pender.success['post/GET_POST'] && pender.success['post/GET_FILES'],
			failure:
				pender.failure['post/GET_POST'] || pender.failure['post/GET_FILES'],
			myId: auth.user.username, //현재 로그인한 유저의 username -> 내가 작성한 포스트일 때 수정 및 삭제 가능하도록
			blocked: post.blocked,
			reserved: post.reserved,
		}));
	useEffect(() => {
		return dispatch(initialize());
	}, [myId, dispatch]);

	useEffect(() => {
		dispatch(getPost({ post_id })); //POST 게시물 api 호출
		dispatch(getFiles({ post_id })); //POST 파일 api 호출
		dispatch(getBlockedDates({ post_id })); // 이미 예약된 날짜들 불러오기
		if (myId === post.username) {
			//내가 쓴 게시물일 때
			setEditable(true);
		} else {
			setEditable(false);
		}
	}, [dispatch, post_id, myId, post.username]);

	useEffect(() => {
		if (reserved) {
			alert('예약 요청을 보냈습니다.');
		} else if (reserved === false) {
			alert('예약 요청에 실패하였습니다. 다시 시도해주세요.');
		}
	}, [reserved]);

	if (success) {
		const defaultMsg = `'${post.title}' 게시물에 대해 문의드립니다~!${'\n'}`;
		//내가 작성한 게시물 수정
		const onClickEdit = () => {
			dispatch(toggleEditMode(true));
			history.push('/post/editor');
		};

		//내가 작성한 게시물 삭제
		const onClickDelete = post_id => {
			let result = window.confirm('정말 삭제하시겠습니까?');
			if (result) {
				dispatch(deletePost({ post_id })); //DELETE 게시물 api 호출
				history.replace('/');
			}
		};

		// 선택한 기간으로 예약하기
		const onClickReserve = ({ startDate, endDate }) => {
			if (!myId) {
				//로그인 상태가 아니면
				dispatch(toggleModal({ modal: 'loginModal', visible: true })); //로그인 모달 띄우기
				return;
			} else dispatch(reserve({ post_id, startDate, endDate }));
		};

		//문의 하기 -> ChatModal 띄우기
		const onClickChat = () => {
			if (!myId) {
				//로그인 상태가 아니면
				dispatch(toggleModal({ modal: 'loginModal', visible: true })); //로그인 모달 띄우기
				return;
			}
			else dispatch(toggleModal({modal: 'chatModal', visible: true}));
		};

		return (
			<div>
				<PostTitle title={post.title} />
				<ImageViewer images={images} />
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<PostContent
							post_id={post_id}
							writer={post.username}
							category={post.category}
							addr={post.addr}
							editable={editable}
							content={post.content}
							onClickEdit={onClickEdit}
							onClickDelete={onClickDelete}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<FloatingMenu
							deposit={post.deposit}
							price={post.price}
							editable={editable}
							onClickReserve={onClickReserve}
							onClickChat={onClickChat}
							// blocked={testBlocked}
							blocked={blocked}
							reserved={reserved}
						/>
					</Grid>
				</Grid>
				<ChatModal to={post.username} defaultMsg={defaultMsg} />
			</div>
		);
	} else if (failure) {
		return <div> 없는 포스트 </div>;
	} else if (!(success === true)) {
		return <div>Loading...</div>;
	}
};
export default PostPage;
