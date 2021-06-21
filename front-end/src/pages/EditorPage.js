import React, { useEffect, useState } from 'react';
import Editor from 'components/Editor';
import { useDispatch, useSelector } from 'react-redux';
import {
	editFiles,
	editPost,
	uploadFiles,
	writePost,
} from 'store/modules/editor';
import { post } from 'store/modules';

//writePost 성공 시 uploadFiles도 성공한다고 가정함.
const EditorPage = ({ history, match }) => {
	const matchId = match.params.post_id;
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
	const { logged, username, old_post, old_img } = useSelector(
		({ auth, post }) => {
			return {
				logged: auth.logged,
				username: auth.user.username,
				old_post: post.post, //수정모드일 때 대상 post 정보
				old_img: post.images,
			};
		},
	);

	useEffect(() => {
		// 수정모드일 때는 원래 데이터 모두 불러오기
		if (matchId) {
			//내가 쓴 글이 아닌데 접근했을 때
			console.log(old_post, username);
			if (!old_post.id || username !== old_post.username) {
				alert('허용되지 않은 접근입니다.');
				history.replace('/');
			}
			setInputs({
				title: old_post.title,
				content: old_post.content,
				price: old_post.price,
				deposit: old_post.deposit,
			});
		}
	}, []);

	useEffect(() => {
		//로그인 상태가 아니면 홈페이지로
		if (!logged) {
			alert('먼저 로그인을 해주세요.');
			history.replace('/');
		}
	}, [logged, history]);

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

	//POST or PUT /uauth/api/post 성공 시 콜백
	const cb = ({ data }) => {
		//해당 post id로 이미지 업로드 api 호출
		const post_id = matchId ? matchId : data.data.id;
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		const formData = new FormData();
		for (let i = 0; i < images.length; i++) {
			formData.append('files', images[i].file);
		}
		// POST /api/file/${post_id}
		dispatch(uploadFiles({ post_id, formData, config }))
			.then(() => {
				history.replace(`/post/${post_id}`); //게시물 페이지로 이동
			})
			.catch(reason => {
				console.log(reason);
			});
	};
	const onSubmit = e => {
		e.preventDefault();
		const { category, title, content, price, deposit } = inputs;

		/* 포맷 확인 */
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

		/* api 호출 */
		if (matchId && old_post.id)
			//edit mode
			// PUT /uauth/api/post
			dispatch(editPost({ ...inputs, post_id: old_post.id }))
				.then(cb)
				.catch(reason => console.log(reason));
		else {
			// POST /uauth/api/post
			dispatch(writePost(inputs))
				.then(cb)
				.catch(reason => console.log(reason));
		}
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
				editMode={matchId}
				error={error}
			/>
		</>
	);
};
export default EditorPage;
