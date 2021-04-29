import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from 'components/common/Header'
import * as baseActions from 'store/modules_x/base'

class HeaderContainer extends Component {
    handleLoginClick = () => {
        const { BaseActions } = this.props
        BaseActions.showModal('login')
    }
    handleLogoutClick = async () => {
        const { BaseActions } = this.props
        try {
            await BaseActions.logout();
            window.location.reload()    //페이지 새로고침
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { logged } = this.props
        const { handleLoginClick, handleLogoutClick } = this
        return (
            <Header onLoginClick={handleLoginClick}
                onLogoutClick={handleLogoutClick}
                logged={logged} />
        )
    }
}

const mapStateToProps = (state) => ({
    logged: state.base.get('logged')
})

const mapDispatchToProps = (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)