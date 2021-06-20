import React, { useEffect, useState } from 'react';
import Editor from 'components/editor';
import { useDispatch, useSelector } from 'react-redux';
import {
	editFiles,
	editPost,
	uploadFiles,
	writePost,
} from 'store/modules/editor';

//writePost 성공 시 uploadFiles도 성공한다고 가정함.
const EditorPage = ({ history }) => {
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
	const {
		logged,
		post_id,
		postFailure,
		uploadSuccess,
		editMode,
		old_post,
		old_img,
	} = useSelector(({ pender, editor, auth, post }) => {
		let action = { post: 'editor/WRITE_POST', files: 'editor/UPLOAD_FILES' };
		if (editor.editMode) {
			action = {
				post: 'editor/EDIT_POST',
				files: 'editor/EDIT_FILES',
			};
		}
		return {
			logged: auth.logged,
			postFailure: pender.failure[action.post],
			post_id: editor.post_id, //POST 게시물 api 성공 시 새로 작성한 post의 pk
			uploadSuccess: pender.success[action.files],
			editMode: editor.editMode,
			old_post: post.post, //수정모드일 때 대상 post 정보
			old_img: post.images,
		};
	});

	useEffect(() => {
		// 수정모드일 때는 원래 데이터 모두 불러오기
		if (editMode) {
			setInputs({
				// category: old_post.category,
				title: old_post.title,
				content: old_post.content,
				price: old_post.price,
				deposit: old_post.deposit,
			});
		}
	}, []);

	useEffect(() => {
		//로그인 상태가 아니면 로그인 모달 띄우기
		if (!logged) {
			alert('먼저 로그인을 해주세요.');
			history.replace('/');
		}
	}, [logged, history]);

	useEffect(() => {
		if (post_id) {
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
			if (editMode) dispatch(editFiles({ post_id, formData, config }));
			else dispatch(uploadFiles({ post_id, formData, config }));
		}
	}, [post_id]);

	useEffect(() => {
		//사진 업로드까지 완료하면 해당 포스트 페이지로 이동
		if (uploadSuccess === true) {
			history.replace(`/post/${post_id}`);
		}
	}, [history, uploadSuccess, post_id]);

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
		if (editMode && old_post.id)
			dispatch(editPost({ ...inputs, post_id: old_post.id }));
		// PUT /user/api/posts
		else dispatch(writePost(inputs)); // POST /user/api/posts
		// 성공 시 post_id 값 채워짐: null -> integer
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
				editMode={editMode}
				error={error}
			/>
		</>
	);
};
export default EditorPage;