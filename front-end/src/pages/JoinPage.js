import React, { useState } from 'react';
import JoinForm from 'components/JoinForm';
import { useDispatch } from 'react-redux';
import { postUser } from 'store/modules/joinForm';

const emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //  8~16자 영문, 숫자 조합
const usernameExp = /^[0-9a-zA-Z]{5,16}$/; //5~16자 영문, 숫자 조합

const exp = {
	email: emailExp,
	password: passwordExp,
	username: usernameExp,
};

const JoinPage = () => {
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
		addr: '',
	});
	const [formatError, setFormatError] = useState({
		username: false,
		email: false,
		password: false,
	});
	const [duplicateCheck, setDuplicateCheck] = useState({
		username: false,
		email: false,
	});
	const [modal, setModal] = useState({
		duplicateCheck: false,
		success: false,
	});

	const onSubmit = e => {
		e.preventDefault();

		//포맷 에러가 있거나 입력하지 않은 필드가 있으면 바로 리턴
		if(formatError.username || formatError.password || formatError.username){
			return;
		} 
		if(inputs.username === '' || inputs.email === '' || inputs.password === ''){
			return;
		}


		//중복 확인 체크 -> 중복 체크를 안했으면 체크해달라는 모달 띄우기
		// if (duplicateCheck.email || duplicateCheck.username) {
		// 	setModal({
		// 		...modal,
		// 		duplicateCheck: true,
		// 	});
		// 	return;
		// }
		// dispatch(postUser);
	};

	const onChangeInput = ({ value, name }) => {
		setInputs({
			...inputs,
			[name]: value,
		});
		if(name === 'addr'){	//주소는 포맷 체크 x
			return;
		}
		//input 포맷 체크
		let ok = exp[name].test(inputs[name]);
			if (ok) {
				//포맷에 맞으면
				setFormatError({
					...formatError,
					[name]: false,
				});
			} else {
				//포맷이 틀리면
				setFormatError({
					...formatError,
					[name]: true,
				});
			}
	};

	return (
		<JoinForm
			username={inputs.username}
			email={inputs.email}
			password={inputs.password}
			formatError={formatError}
			onSubmit={onSubmit}
			onChangeInput={onChangeInput}
		/>
	);
};

export default JoinPage;
