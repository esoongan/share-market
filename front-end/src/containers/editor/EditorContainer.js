import Editor from 'components/editor/Editor'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import * as editorActions from 'store/modules/editor'


export class EditorContainer extends Component {
    componentDidMount() {
        const { EditorActions } = this.props
        EditorActions.initialize()
    }
    handleSubmit = async ()=>{
        const {title, content, category, price, deposit, history} = this.props
        const { EditorActions } = this.props
        try {
            await EditorActions.writePost({title, content, category, price, deposit})
            history.push(`post/${this.props.post_Id}`)      //포스트 보는 페이지로 이동
        } catch(e){
            console.log(e);
        }
    }
    handleSelect = ({inputValue}) =>{
        const { EditorActions } = this.props
        EditorActions.selectCategory({inputValue})  
    }
    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props
        EditorActions.changeInput({ name, value })
    }
    
    render() {
        const {handleSubmit, handleSelect, handleChangeInput} = this

        return (
            <Editor 
            onSubmit={handleSubmit}
            onSelect={handleSelect}
            onChangeInput={handleChangeInput}/>
        )
    }
}

const mapStateToProps = (state) => ({
    title: state.editor.get('title'),
    content: state.editor.get('content'),
    category: state.editor.get('category'),
    price: state.editor.get('price'),
    deposit: state.editor.get('deposit'),
    post_id: state.editor.get('post_id'),
})

const mapDispatchToProps = (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditorContainer))
