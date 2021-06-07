export const testRooms = [
	{
		id: 1,
		buyer: 'buyer1',
		seller: 'seller1',
		postId: 1,
		lastMessage: 'this is last3',
	},
	{
		id: 2,
		buyer: 'buyer2',
		seller: 'seller2',
		postId: 1,
		lastMessage: 'this is last3',
	},
	{
		id: 3,
		buyer: 'buyer3',
		seller: 'seller3',
		postId: 1,
		lastMessage: 'this is last3',
	},
];
export const testChat = [
	{
		message_id: 1,
		room_id: 1,
		sender: 'buyer1',
		time: '2021.5.24 12:00:23',
		message: '안녕하세요 문의드리고 싶어서 연락드렸어요.',
	},
	{
		message_id: 2,
		room_id: 1,
		sender: 'seller1',
		time: '2021.5.24 12:00:23',
		message: '네 안녕하세요 셀러입니다.',
	},
	{
		message_id: 3,
		room_id: 1,
		sender: 'buyer1',
		time: '2021.5.24 12:00:23',
		message: '문의문의 문의문의 문의문의 문의문의 문의문의 문의문의 문의문의 문의문의 ',
	},
	{
		message_id: 4,
		room_id: 1,
		sender: 'buyer1',
		time: '2021.5.24 12:00:23',
		message: '문희 문희 나문희 문희 문희 나문희 문희 문희 나문희 문희 문희 나문희',
	},
	{
		message_id: 5,
		room_id: 1,
		sender: 'seller1',
		time: '2021.5.24 12:00:23',
		message: '답변 답변',
	},
];

export const testMessages = [];

const testBlocked = [
	{
		startDate: '2021-06-09',
		endDate: '2021-06-11',
	},
	{
		startDate: '2021-06-16',
		endDate: '2021-06-20',
	},
	{
		startDate: '2021-07-01',
		endDate: '2021-07-07',
	},
];

export const testContracts = [
	{
		id: 1,
		postId: 1,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-05-09',
		endDate: '2021-05-11',
		state: 'accept',
	},
	{
		id: 2,
		postId: 1,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-05-09',
		endDate: '2021-05-11',
		state: 'accept',
	},
	{
		id: 3,
		postId: 1,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-05-09',
		endDate: '2021-05-11',
		state: 'accept',
	},
];
export const testContracts2 = [
	{
		id: 4,
		postId: 2,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-12-09',
		endDate: '2021-12-11',
		state: 'accept',
	},
	{
		id: 5,
		postId: 2,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-12-09',
		endDate: '2021-12-11',
		state: 'default',
	},
	{
		id: 6,
		postId: 2,
		sellerId: 1,
		buyerId: 2,
		startDate: '2021-12-09',
		endDate: '2021-12-11',
		state: 'accept',
	},
];

export const testPost = {
	id: 1,
	user_id: 'sjinlee',
	title: '제일 위에 보여야함',
	content: '산지얼마안된',
	category: 'carrier',
	addr: '서울',
	price: '30000',
	deposit: '5000',
	createdDate: '2021-05-17T02:30:33.526168',
};
