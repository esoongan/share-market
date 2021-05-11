import React from 'react';
import List from 'components/list';
import qs from 'qs'
import { categories, cities } from 'constant/locale';
import { getLabel } from 'lib/util';


const ListPage = ({ location }) => {
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,	//문자열 앞의 '?'는 생략
	});		//쿼리 파싱 결과의 value는 string
	const {city, category, keyword, period} = query		//없는 key에는 undefined가 들어감
	//period 포맷: 
	return (
		<>
			<List
				city={city ? getLabel(cities, city): '모든 도시'}
				category={category ? getLabel(categories, category): '모든 카테고리'}
				keyword={keyword ? keyword: '전체'}
				period={period ? period: null}
			/>
		</>
	);
};

export default ListPage;
