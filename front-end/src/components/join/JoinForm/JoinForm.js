import React, { Component, Fragment } from 'react'
import styles from './JoinForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import Select from "react-select";
import { Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { valid } from 'semver';

const cx = classNames.bind(styles);
const options = [
  { value: "서울 광진구 구의동", label: "서울 광진구 구의동" },
  { value: "서울 광진구 화양동", label: "서울 광진구 화양동" },
  { value: "서울 광진구 자양동", label: "서울 광진구 자양동" },
  { value: "인천 연수구 송도1동", label: "인천 연수구 송도1동" },
  { value: "인천 연수구 송도2동", label: "인천 연수구 송도2동" },
  { value: "인천 연수구 송도3동", label: "인천 연수구 송도3동" },
]
//todo: https://react-hook-form.com/get-started#ReactWebVideoTutorial
class JoinForm extends Component {
  handleSelect = ({ value }) => {
    console.log(value);
    const { onSelect } = this.props
    onSelect({ inputValue: value })
  }
  handleChangeInput = (e) => {
    const { onChangeInput } = this.props
    const { value, name } = e.target
    onChangeInput({ name, value })
  }

  render() {
    const { username, password, email, onSubmit, valid } = this.props
    const { handleChangeInput, handleSelect } = this
    //input 컴포넌트의 초기 상태
    const InitialInput = ({ type, name, value }) =>
      <Input type={type} id={name} name={name} value={value} onChange={handleChangeInput} />
    //형식에 맞게 입력했을 때
    const ValidInput = ({ type, name, value }) =>
      <Input valid type={type} id={name} name={name} value={value} onChange={handleChangeInput} />
    //형식에 맞지 않을 때 피드백
    const InvalidInput = ({ type, name, value, feedback }) =>
      <Fragment>
        <Input invalid type={type} id={name} name={name} value={value} onChange={handleChangeInput} />
        <FormFeedback invalid="true">{feedback}</FormFeedback>
      </Fragment>
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            {valid.get('email') === '' && InitialInput({ type: "email", name: 'email', value: email })}
            {
              valid.get('email') !== '' && !valid.get("email") &&
              InvalidInput({ type: "email", name: 'email', value: email, feedback: '유효하지 않은 이메일 형식입니다.' })
            }
            {valid.get("email") && ValidInput({ type: "email", name: 'email', value: email })}
          </FormGroup>
          <FormGroup>
            <Label for="username">아이디</Label>
            {valid.get('username') === '' && InitialInput({ type: "text", name: 'username', value: username })}
            {
              valid.get('username') !== '' && !valid.get("username") &&
              InvalidInput({ type: "text", name: 'username', value: username, feedback: '영문과 숫자 조합으로 5~16자로 입력하세요' })
            }
            {valid.get("username") && ValidInput({ type: "text", name: 'username', value: username })}
          </FormGroup>
          <FormGroup>
            <Label for="password">비밀번호</Label>
            {valid.get('password') === '' && InitialInput({ type: "password", name: 'password', value: password })}
            {
              valid.get('password') !== '' && !valid.get("password") &&
              InvalidInput({ type: "password", name: 'password', value: password, feedback: '다시 입력하세요.' })
            }
            {valid.get("password") && ValidInput({ type: "password", name: 'password', value: password })}
            <FormText>영문과 숫자 조합으로 8~16자로 입력하세요</FormText>
          </FormGroup>
          <FormGroup>
            <Label for='addr'>내 지역(선택)</Label>
            <Select id='addr' placeholder='검색 또는 선택하세요.'
              onSelectResetsInput={false}
              isSearchable options={options}
              onChange={handleSelect}
            />
          </FormGroup>

        </Form>
        <Button onClick={onSubmit}>가입하기</Button>
      </div>

    )
  }
}

export default JoinForm;