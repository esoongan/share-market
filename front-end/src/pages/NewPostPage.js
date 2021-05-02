import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, PostTitle } from 'components/post/PostBody';
import ImageViewer from 'components/post/ImageViewer';
import FloatingMenu from 'components/post/FloatingMenu';
import { getFiles, getPost } from 'store/modules/post';

const NewPostPage = ({ match }) => {
	const dispatch = useDispatch();
	const post_id = match.params.post_id;

	const { success, post, images, failure } = useSelector(({ pender, post }) => ({
		post: post.post,
		images: post.images,
		success: pender.success['post/GET_POST'],
    failure: pender.failure['post/GET_POST'],
	}));

	useEffect(() => {
		dispatch(getPost({ post_id }));
	}, [dispatch, post_id]);

  useEffect(() => {
    if(success){
    dispatch(getFiles({post_id}));}
  }, [dispatch, post_id, success]);

	if(success){
    return (
      <div>
        <PostTitle title={post.title} />
        <ImageViewer images={images} />
        <PostContent category={post.category} addr={post.addr} content={post.content}/>
        <FloatingMenu deposit={post.deposit} price={post.price} />
      </div>
    );
  }
  else if(failure){
    return <div> 없는 포스트 </div>
  }
  else if (!(success===true)) {
		return <div>Loading...</div>;
	}
  

};
export default NewPostPage;
