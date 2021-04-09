import React, { useState } from 'react'
//import styles from './DropdownButton.scss';
//import classNames from 'classnames/bind';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//const cx = classNames.bind(styles);

const DropdownButton = ({text}) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="primary">
        {text}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>마이페이지</DropdownItem>
        <DropdownItem>채팅</DropdownItem>
        <DropdownItem divider />
        <DropdownItem color="red">로그아웃</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}
export default DropdownButton;