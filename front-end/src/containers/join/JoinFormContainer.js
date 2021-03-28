import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as joinFormActions from 'store/modules/joinForm'
import * as locationSelectorActions from 'store/modules/locationSelector'

import { withRouter } from 'react-router-dom'
import JoinForm from 'components/join/JoinForm'


export class JoinFormContainer extends Component {
    handleSelect = ({inputValue}) =>{
        const {LocationSelectorActions } = this.props
        LocationSelectorActions.select({inputValue})
    }
    handleChangeInput = ({ name, value }) => {
        const { JoinFormActions } = this.props
        JoinFormActions.changeInput({ name, value })
    }
    handleSubmit = async () => {
        const { username, password, email, location, history } = this.props
        const { JoinFormActions } = this.props

        try {
            await JoinFormActions.postUsers({ username, password, email, location })
            history.push('/')
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, password, email, location } = this.props
        const { handleChangeInput, handleSubmit, handleSelect } = this
        return (
            <JoinForm
                onSelect = {handleSelect}
                onChangeInput={handleChangeInput}
                onSubmit={handleSubmit}
                username={username}
                password={password}
                email={email}
                location={location}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.joinForm.get('username'),
    password: state.joinForm.get('password'),
    email: state.joinForm.get('email'),
    location: state.locationSelector.get('location')
})

const mapDispatchToProps = (dispatch) => ({
    JoinFormActions: bindActionCreators(joinFormActions, dispatch),
    LocationSelectorActions : bindActionCreators(locationSelectorActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinFormContainer))
