import React from 'react';
import Renting from '../components/mypage/Renting';
import Mypost from '../components/mypage/Mypost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import { useDispatch, useSelector } from 'react-redux';


const BorroweePage = ({location, match}) => {
  const dispatch = useDispatch();

  const {success, failure, post, thumbnail, myId } = useSelector(
		({ pender, post, auth }) => ({
      post: post.post,
			images: post.images,
			/* success: pender.success['mypost/GET_POST'] && pender.success['mypost/GET_FILES'],
			failure: pender.failure['mypost/GET_POST'] || pender.failure['mypost/GET_FILES'], */
      success: pender.success['mypost/GET_CONTENT'],
      failure: pender.failure['mypost/GET_CONTENT'],
      
			myId: auth.user.username,		
		}),
	);
/////////////////////////////////////////////////////////////////
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

  
///////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <Navigation/>
    <Renting/>
    <Reservation/>
    <Mypost/>
    </>
  );
};

export default BorroweePage;