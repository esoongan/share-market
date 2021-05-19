import React from 'react';
import Renting from '../components/mypage/Renting';
import Mypost from '../components/mypage/Mypost';
import Reservation from '../components/mypage/Reservation';


const BorrowerPage = () => {
  return (
    <>
    <Renting/>
    <Reservation/>
    <Mypost/>
    </>
  );
};

export default BorrowerPage;