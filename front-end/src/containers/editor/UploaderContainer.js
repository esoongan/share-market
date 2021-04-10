import Uploader from 'components/editor/Uploader'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as editorActions from 'store/modules/editor'

//<input type='files'>에서 사진 선택 시 상태 업데이트
//선택 된 사진 미리보기 제공
class UploaderContainer extends Component {

    handleSelectPhoto = (imageList) => {
        const { EditorActions } = this.props
        EditorActions.selectFiles({ imageList })   //상태 변경, 리렌더링
    }

    render() {
        const { handleSelectPhoto } = this
        const { imageList } = this.props

        return (
            <Uploader
                onChange={handleSelectPhoto}
                images = {imageList}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    imageList: state.editor.get('imageList')
})

const mapDispatchToProps = (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploaderContainer)
