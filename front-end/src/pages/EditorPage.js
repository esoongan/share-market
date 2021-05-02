import React, { useEffect, useState } from 'react';
import Editor from 'components/editor/Editor'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles, writePost } from 'store/modules/editor';
import Alert from '@material-ui/lab/Alert';

//writePost 성공 시 uploadFiles도 성공한다고 가정함.
const EditorPage = () => {
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		category: false,
		title: '',
		content: '',
		price: '',
		deposit: '',
	});
	const [images, setImages] = useState([]);
	const {postFailure, post_id} = useSelector(({ pender, editor }) => ({
		postFailure: pender.failure.WIRTE_POST,
		post_id : editor.post_id,
	}));

	const onSubmit = e => {
		e.preventDefault();
		console.log('onClick!');

		// const {category, title, content, price, deposit} = inputs;
		//하나라도 비워져있으면 submit 못하게 막기
		dispatch(writePost(inputs));
		// POST /user/api/posts
		// 성공 시 post_id 값 채워짐: null -> integer
	};

	useEffect(() => {
		if(post_id !== null){
			//POST /user/api/posts 성공 시
			//해당 id로 이미지 업로드 api 호출 -> POST /uploadMultipleFiles/{id} 
			//dispatch(uploadFiles());
		}
	}, [post_id, dispatch, images]);


	const onChangeInput = ({ value, name }) => {
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const onSelectImage = ({images}) => {
		setImages(images);
	}

	return (
		<>
			<Editor
				title={inputs.title}
				content={inputs.content}
				price={inputs.price}
				deposit={inputs.deposit}
				onChangeInput={onChangeInput}
				onSubmit={onSubmit}
				images={images}
				onSelectImage={onSelectImage}
			/>
			{postFailure && (
				<Alert severity="error" style={{width:'50%', marginRight:'auto', marginLeft: 'auto'}}>업로드 실패. 다시 시도해주세요.</Alert>
			)}
		</>
	);
};
export default EditorPage;
