import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, PostTitle } from 'components/post/PostBody';
import ImageViewer from 'components/post/ImageViewer';
import FloatingMenu from 'components/post/FloatingMenu';
import { getFiles, getPost } from 'store/modules/post';
import Grid from '@material-ui/core/Grid';

const NewPostPage = ({ match }) => {
	const dispatch = useDispatch();
	const post_id = match.params.post_id;
	const [editable, setEditable] = useState(false);
	const { success, post, images, failure, myId } = useSelector(
		({ pender, post, auth }) => ({
			post: post.post,
			images: post.images,
			success: pender.success['post/GET_POST'] && pender.success['post/GET_FILES'],
			failure: pender.failure['post/GET_POST'] || pender.failure['post/GET_FILES'],
			myId: auth.user.username,		//현재 로그인한 유저의 username -> 내가 작성한 포스트일 때 수정 및 삭제 가능하도록
		}),
	);

	useEffect(() => {
		dispatch(getPost({ post_id }));
		dispatch(getFiles({ post_id }));
		if(myId === post.user_id){	//내가 쓴 게시물일 때
			setEditable(true);
		}
	}, [dispatch, post_id, myId, post.user_id]);

	if (success) {
		return (
			<div>
				<PostTitle 
					title={post.title}
				/>
				<ImageViewer images={images} />
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<PostContent
							writer={post.user_id}
							category={post.category}
							addr={post.addr}
							editable={editable}
							content={post.content}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<FloatingMenu deposit={post.deposit} price={post.price} editable={editable} />
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
