import SearchBar from 'components/common/SearchBar'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchBarContainer extends Component {
    render() {
        return (
            <div>
                <SearchBar/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)
