import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as joinFormActions from 'store/modules/joinForm'

import { withRouter } from 'react-router-dom'
import JoinForm from 'components/join/JoinForm'
import { valid } from 'semver'


var emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
var passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //  8~16자 영문, 숫자 조합
var usernameExp = /^[0-9a-zA-Z]{5,16}$/;    //5~16자 영문, 숫자 조합

export class JoinFormContainer extends Component {
    componentDidMount() {
        const { JoinFormActions } = this.props
        JoinFormActions.initialize()
    }
    handleSelect = ({inputValue}) =>{
        const { JoinFormActions } = this.props
        JoinFormActions.selectAddr({inputValue})
    }
    handleChangeInput = ({ name, value }) => {
        const { JoinFormActions } = this.props
        JoinFormActions.changeInput({ name, value })
    }
    handleSubmit = async () => {
        const { username, password, email, addr, history } = this.props
        const { JoinFormActions } = this.props
        let ready = true
        
        //password 조건 불충족 시 isValid_password 상태 변경
        if(!passwordExp.test(password)){
            JoinFormActions.checkValid({
                form:'password',
                valid:false
            })
            ready = false
        }
        else{
            JoinFormActions.checkValid({
                form:'password',
                valid:true
            })
        }

        //username 조건 불충족 시 isValid_username 상태 변경
        if(!usernameExp.test(username)){
            console.log('invalid', username);
            console.log(usernameExp.test(username))
            JoinFormActions.checkValid({
                form:'username',
                valid:false
            })
            ready = false
        }
        else{
            usernameExp.test(username)      //test 한 번 더 호출해줘야 함, 안하면 다음 test가 무조건 false 나옴..
            JoinFormActions.checkValid({
                form:'username',
                valid:true
            })
        }
        //email 조건 불충족 시 isValid_email 상태 변경
        if(!emailExp.test(email)){
            JoinFormActions.checkValid({
                form:'email',
                valid:false
            })
            ready = false
        }
        else{
            JoinFormActions.checkValid({
                form:'email',
                valid:true
            })
        }
        //형식 맞지 않으면 request 안함
        if(!ready){
            return
        }
        try {
            //TODO: 이미 존재하는 아이디면 따로 처리
            await JoinFormActions.postUsers({ username, password, email, addr })
            history.push('/')
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, password, email, addr, valid } = this.props
        const { handleChangeInput, handleSubmit, handleSelect } = this
        return (
            <JoinForm
                onSelect = {handleSelect}
                onChangeInput={handleChangeInput}
                onSubmit={handleSubmit}
                username={username}
                password={password}
                email={email}
                addr={addr}
                valid= {valid}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.joinForm.get('username'),
    password: state.joinForm.get('password'),
    email: state.joinForm.get('email'),
    addr: state.joinForm.get('addr'),
    valid: state.joinForm.get('valid')
})

const mapDispatchToProps = (dispatch) => ({
    JoinFormActions: bindActionCreators(joinFormActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinFormContainer))
