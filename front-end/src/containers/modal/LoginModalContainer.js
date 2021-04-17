import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as baseActions from 'store/modules/base'

import LoginModal from 'components/modal/LoginModal'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

export class LoginModalContainer extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.logged !== this.props.logged) {
            //로그인 성공 시 localStorage에 토큰 저장, 로그인 유지하기
            const { BaseActions } = this.props
            if (this.props.logged === true) {
                try {
                    localStorage.setItem('JWT', JSON.stringify(this.props.JWT));
                    console.log(localStorage);
                    BaseActions.hideModal('login')
                } catch (e) {
                    console.log('localStorage is not working');
                }
            }
        }
    }
    handleLogin = async () => {
        const { BaseActions, username, password } = this.props
        try {
            await BaseActions.login({ username, password })
        } catch (e) {
            console.log(e);
        }
    }

    handleCancel = () => {
        const { BaseActions } = this.props
        BaseActions.hideModal('login')
        BaseActions.initializeLoginModal()
    }

    handleChangeInput = (e) => {
        const { name, value } = e.target
        const { BaseActions } = this.props
        BaseActions.changeLoginInput({ name, value })
    }

    handleKeyPress = (e) => {
        //엔터키 누르면 로그인
        if (e.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {
        const { visible, error, username, password } = this.props
        const { handleLogin, handleCancel, handleChangeInput, handleKeyPress } = this
        return (
            <LoginModal
                onLogin={handleLogin}
                onCancel={handleCancel}
                onChangeInput={handleChangeInput}
                onKeyPress={handleKeyPress}
                visible={visible} error={error} username={username} password={password}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    username: state.base.getIn(['loginModal', 'username']),
    password: state.base.getIn(['loginModal', 'password']),
    error: state.base.getIn(['loginModal', 'error']),
    logged: state.base.get('logged'),
    JWT : state.base.get('JWT')
})

const mapDispatchToProps = (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginModalContainer))
