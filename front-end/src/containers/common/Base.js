import LoginModalContainer from 'containers/modal/LoginModalContainer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules_x/base'

//App.js에서 <Switch/> 아래쪽에 렌더링됨
class Base extends Component {
    // TODO: 로그인 상태 확인
    initialize = async () => {

    }
    componentDidMount() {
        this.initialize()
    }
    render() {
        return (
            <div>
                {/* 전역적으로 사용하는 컴포넌트는 여기에 렌더링 */}
                <LoginModalContainer />
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Base)