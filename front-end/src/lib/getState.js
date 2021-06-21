import moment from 'moment';
import { contractState } from 'constant/constant';

// const getDays = ({ start, end }) => {
// 	const startDate = moment(start, 'YYYY-MM-DD');
// 	const endDate = moment(end, 'YYYY-MM-DD');
// 	return endDate.diff(startDate, 'days') + 1;
// };
export const getState = ({ state, start, end }) => {
	const startDate = moment(start, 'YYYY-MM-DD');
	const endDate = moment(end, 'YYYY-MM-DD');

	if (state === 'default') {
		if (startDate.isBefore(moment())) {
			return contractState['expired']; //수락하지 않고 요청 시작 날짜가 지났을 때
		}
		return contractState['waiting'];
	} else if (state === 'accept') {
		if (endDate.isBefore(moment())) {
			return contractState['completed']; //수락되었고 대여 종료 날짜가 지났을 때
		} else if (startDate.isBefore(moment())) {
			return contractState['ing']; //수락되었고 대여 중일 때
		}
		return contractState['reserved'];	//수락되었고 아직 대여 전 예약 중일 떄
	} else if (state === 'refused') {
		if (startDate.isBefore(moment())) {
			return contractState['expired']; //거절하였고 요청 시작 날짜가 지났을 때
		}
		return contractState['refused'];
	}
};
