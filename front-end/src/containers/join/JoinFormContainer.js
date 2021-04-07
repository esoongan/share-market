import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as joinFormActions from 'store/modules/joinForm'

import { withRouter } from 'react-router-dom'
import JoinForm from 'components/join/JoinForm'


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

        try {
            await JoinFormActions.postUsers({ username, password, email, addr })
            history.push('/')
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, password, email, addr } = this.props
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
            />
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.joinForm.get('username'),
    password: state.joinForm.get('password'),
    email: state.joinForm.get('email'),
    addr: state.joinForm.get('addr')
})

const mapDispatchToProps = (dispatch) => ({
    JoinFormActions: bindActionCreators(joinFormActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinFormContainer))
