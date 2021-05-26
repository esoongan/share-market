import React from 'react';
import Renting from '../components/mypage/Renting';
import Mypost from '../components/mypage/Mypost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost } from 'lib/api';
import { mypost } from 'store/modules';


const BorroweePage = ({location, match}) => {
  const dispatch = useDispatch();
  const post_id = match.params.post_id;
 
  const {success, failure, content, thumbnail, myId } = useSelector(
		({ pender, content, auth }) => ({
      content: mypost.content,
	  thumbnail: mypost.content.thumbnail,
			/* success: pender.success['mypost/GET_POST'] && pender.success['mypost/GET_FILES'],
			failure: pender.failure['mypost/GET_POST'] || pender.failure['mypost/GET_FILES'], */
      success: pender.success['mypost/GET_MYPOST'],
      failure: pender.failure['mypost/GET_MYPOST'],
      
	myId: auth.user.username,		
		}),
	);
/////////////////////////////////////////////////////////////////
  useEffect(() => {
		dispatch(getPost({ post_id }));		//POST 게시물 api 호출
		dispatch(getFiles({ post_id }));	//POST 파일 api 호출 
        dispatch(getMyPost({post_id}));
	}, [dispatch, post_id, ]);




	if (success) {

		//사진을 클릭했을 때, 해당 post를 볼 수 있다. 
				
		const onClickItem = (post_id) => {
			history.push(`/post/${post_id}`);
		}
	
	
	
	
	
	
	
	
	
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