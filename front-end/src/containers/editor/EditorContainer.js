import Editor from 'components/editor/Editor'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import * as editorActions from 'store/modules/editor'


class EditorContainer extends Component {
    componentDidMount() {
        const { EditorActions } = this.props
        EditorActions.initialize()
    }

    handleSubmit = async () => {
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const { title, content, category, price, deposit, history, imageList } = this.props
        const { EditorActions } = this.props
        try {
            /* 게시글 저장 api 호출 */
            await EditorActions.writePost({ title, content, category, price, deposit })
            let post_id = this.props.post_id
            console.log('writePost:', post_id);

            /* 이미지 파일 업로드 api 호출 */
            const formData = new FormData();
            for(let i=0; i<imageList.length; i++){
                formData.append('files', imageList[i].file)
            }
            await EditorActions.uploadFiles({post_id, formData, config})
            history.push(`post/${post_id}`)      //포스트 보는 페이지로 이동
        } catch (e) {
            console.log(e);
        }
    }

    handleSelect = ({ inputValue }) => {
        const { EditorActions } = this.props
        EditorActions.selectCategory({ inputValue })
    }
    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props
        EditorActions.changeInput({ name, value })
    }

    render() {
        const { handleSubmit, handleSelect, handleChangeInput } = this

        return (
            <Editor
                onSubmit={handleSubmit}
                onSelect={handleSelect}
                onChangeInput={handleChangeInput} />
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
    imageList: state.editor.get('imageList')
})

const mapDispatchToProps = (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditorContainer))
