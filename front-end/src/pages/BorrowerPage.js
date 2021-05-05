import React from 'react';

import Borrowing from 'components/mypage/content/Borrowing/Borrowing';
import Reservation from 'components/mypage/content/Reservation/Reservation';
import Mypost from 'components/mypage/content/Mypost/Mypost';
import ListWrapper from 'components/mypage/content/ListWrapper/ListWrapper';

const BorrowerPage = () => {
    return (
       <ListWrapper>
            <Borrowing/>
            <Reservation/>
            <Mypost/>
       </ListWrapper>
           
        
    );
};

export default BorrowerPage;