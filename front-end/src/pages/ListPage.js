import React, { useEffect } from 'react';
import List from 'components/list';
import qs from 'qs';
import { categories } from 'constant/locale';
import { getLabel } from 'lib/util';
import { useDispatch, useSelector } from 'react-redux';
import { search } from 'store/modules/list';
import Searchbar from 'components/common/Searchbar';

const ListPage = ({ location, match, history }) => {
	const dispatch = useDispatch();
	const page = match.params.page;
	
	const { totalElements, content, size, failure } = useSelector(
		({ list, pender }) => ({
			totalElements: list.totalElements,
			content: list.content,
			size: list.size,
			failure: pender.failure['list/SEARCH'],
		}),
	);
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true, //문자열 앞의 '?'는 생략
	}); //쿼리 파싱 결과의 value는 string
	const { addr, category, keyword, start, end } = query; //없는 key에는 undefined가 들어감

	const load = (page) => {
		if(location.search){
			dispatch(search({ params: location.search+'&', page, size}));
		}
		else{
			dispatch(search({params: '?', page, size}));
		}
	}
	//최초 렌더링 시 콘텐츠 불러오기
	useEffect(() => {
		load(page-1);
	}, []);

	useEffect(()=>{
		load(match.params.page-1);
	}, [match]);

	const onMovePage = (value) =>{
		let nextUrl = '/list/';
		nextUrl += (value) + "";
		if(location.search){
			nextUrl+= location.search;
		}
		history.push(nextUrl)
	}
	const onClickItem = (post_id) => {
		history.push(`/post/${post_id}`);
	}
	const searchbarStyle = {
		marginTop:8,
		marginBottom: 8,
		marginLeft:'auto',
		marginRight:'auto',
		width: '60%',
	}

	const maximumPage = parseInt(Number(totalElements)/size) + 1;
	return (
		<>
		<div style = {searchbarStyle}>
			<Searchbar/>
		</div>
			{failure ? (
				<div>리스트 불러오기 실패</div>
			) : (
				<List
					city={addr ? addr : '모든 도시'}
					category={category ? getLabel(categories, category) : '모든 카테고리'}
					keyword={keyword ? keyword : '전체'}
					period={start&&end ? `${start} ~ ${end}` : '모든 기간'}
					items={content}
					totalElements={totalElements}
					page={page}
					onMovePage={onMovePage}
					maximumPage={maximumPage}
					onClickItem = {onClickItem}
				/>
			)}
		</>
	);
};

export default ListPage;
