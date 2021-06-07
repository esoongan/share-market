import React from 'react';
import Renting from '../components/mypage/Renting';
import MyPost from '../components/mypage/MyPost';
import Reservation from '../components/mypage/Reservation';
import Navigation from 'components/mypage/Navigation';


const BorrowerPage = () => {
  return (
    <>
    <Navigation/>
    <Renting/>
    <Reservation/>
    <MyPost/>
    </>
  );
};

export default BorrowerPage;