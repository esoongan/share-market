import React, { useEffect, useState } from 'react';
import Editor from 'components/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles, writePost } from 'store/modules/editor';
import Alert from '@material-ui/lab/Alert';
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
	const [error, setError] = useState(null);
	const [images, setImages] = useState([]);
	const { postFailure, post_id } = useSelector(({ pender, editor }) => ({
		postFailure: pender.failure['editor/WRITE_POST'],
		post_id: editor.post_id,
	}));

	const onSubmit = e => {
		e.preventDefault();
		const { category, title, content, price, deposit } = inputs;

		if (
			!category ||
			title === '' ||
			content === '' ||
			price === '' ||
			deposit === ''
		) {
			setError('모든 필드를 입력해주세요.');
			return;
		} else if (isNaN(price) || isNaN(deposit)) {
			setError('가격은 숫자만 입력가능합니다.');
			return;
		} else if (images.length === 0) {
			setError('최소 1장 이상의 사진을 등록해주세요.');
			return;
		} else {
			setError(null);
		}

		dispatch(writePost(inputs)); // POST /user/api/posts
		// 성공 시 post_id 값 채워짐: null -> integer
	};

	useEffect(() => {
		if (post_id !== null) {
			//POST /user/api/posts 성공 시
			//해당 id로 이미지 업로드 api 호출 -> POST /uploadMultipleFiles/{id}
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			for (let i = 0; i < images.length; i++) {
				formData.append('files', images[i].file);
			}
			dispatch(uploadFiles({ post_id, formData, config }));
		}
	}, [post_id, dispatch, images]);

	//POST /user/api/posts 실패 시 alert 띄움
	useEffect(() => {
		if (postFailure) {
			alert('업로드 실패. 다시 시도해주세요');
		}
	}, [postFailure]);

	const onChangeInput = ({ value, name }) => {
		if (name === 'price' || name === 'deposit') {
			if (isNaN(inputs[name])) {
				value = ''; //숫자가 아닐 시 지우기
			}
		}
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const onSelectImages = imageList => {
		setImages(imageList);
	};

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
				onSelectImages={onSelectImages}
				error={error}
			/>
		</>
	);
};
export default EditorPage;
