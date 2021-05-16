import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, PostTitle } from 'components/post/PostBody';
import ImageViewer from 'components/post/ImageViewer';
import FloatingMenu from 'components/post/FloatingMenu';
import { deletePost, getFiles, getPost, reserve } from 'store/modules/post';
import Grid from '@material-ui/core/Grid';
import { toggleEditMode } from 'store/modules/editor';
import { toggleModal } from 'store/modules/base';

const NewPostPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const post_id = match.params.post_id;
	const [editable, setEditable] = useState(false);
	const { success, post, images, failure, myId, } = useSelector(
		({ pender, post, auth }) => ({
			post: post.post,
			images: post.images,
			success: pender.success['post/GET_POST'] && pender.success['post/GET_FILES'],
			failure: pender.failure['post/GET_POST'] || pender.failure['post/GET_FILES'],
			myId: auth.user.username,		//현재 로그인한 유저의 username -> 내가 작성한 포스트일 때 수정 및 삭제 가능하도록
		}),
	);

	useEffect(() => {
		dispatch(getPost({ post_id }));		//POST 게시물 api 호출
		dispatch(getFiles({ post_id }));	//POST 파일 api 호출
		if(myId === post.username){	//내가 쓴 게시물일 때
			setEditable(true);
		}
		else{
			setEditable(false);
		}
	}, [dispatch, post_id, myId, post.username]);

	// useEffect(() => {
	// 	if(deleteSuccess){
	// 		history.replace('/');
	// 	}
	// }, [deleteSuccess, history]);

	if (success) {
		//내가 작성한 게시물 수정
		const onClickEdit = () =>{
			dispatch(toggleEditMode(true));
			history.push('/post/editor');
		}

		//내가 작성한 게시물 삭제
		const onClickDelete = (post_id) =>{	
			let result = window.confirm('정말 삭제하시겠습니까?');
			if(result){
				dispatch(deletePost({post_id}));		//DELETE 게시물 api 호출
				history.replace('/');
			}
		}
		
		const onClickReserve = ({startDate, endDate}) => {
			console.log('myId', myId);

			if(!myId){	//로그인 상태가 아니면
				dispatch(toggleModal({modal:'loginModal', visible:true}));	//로그인 모달 띄우기
				return;
			}
			else
				dispatch(reserve({postId: post_id, startDate, endDate}));
		}

		return (
			<div>
				<PostTitle 
					title={post.title}
				/>
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
							onClickEdit = {onClickEdit}
							onClickDelete = {onClickDelete}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<FloatingMenu deposit={post.deposit} price={post.price} editable={editable} onClickReserve={onClickReserve} />
					</Grid>
				</Grid>
			</div>
		);
	} else if (failure) {
		return <div> 없는 포스트 </div>;
	} else if (!(success === true)) {
		return <div>Loading...</div>;
	}
};
export default NewPostPage;
