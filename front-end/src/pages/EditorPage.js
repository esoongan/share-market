import React, { useEffect, useState } from 'react';
import Editor from 'components/Editor'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles, writePost } from 'store/modules/editor';
// import Alert from '@material-ui/lab/Alert';

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
		postFailure: pender.failure['editor/WRITE_POST'],
		post_id : editor.post_id,
	}));

	const onSubmit = e => {
		e.preventDefault();
		// const {category, title, content, price, deposit} = inputs;
		//하나라도 비워져있으면 submit 못하게 막기
		dispatch(writePost(inputs));	// POST /user/api/posts
		// 성공 시 post_id 값 채워짐: null -> integer
	};

	useEffect(() => {
		if(post_id !== null){
			const config = {
				headers: {
					"content-type": "multipart/form-data"
				}
			};
			//POST /user/api/posts 성공 시
			//해당 id로 이미지 업로드 api 호출 -> POST /uploadMultipleFiles/{id} 
			const formData = new FormData();
			for(let i=0; i<images.length; i++){
				formData.append('files', images[i].file)
			}
			dispatch(uploadFiles({post_id, formData, config}));
		}
	}, [post_id, dispatch, images]);

	//POST /user/api/posts 실패 시 alert 띄움
	useEffect(() => {
		if(postFailure){
			alert('업로드 실패. 다시 시도해주세요');
		}
	}, [postFailure]);


	const onChangeInput = ({ value, name }) => {
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const onSelectImages = (imageList) => {
		setImages(imageList);
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
				onSelectImages ={onSelectImages}
			/>
		</>
	);
};
export default EditorPage;
