import Uploader from 'components/editor/Uploader'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as editorActions from 'store/modules/editor'

//<input type='files'>에서 사진 선택 시 상태 업데이트
//선택 된 사진 미리보기 제공
class UploaderContainer extends Component {

    handleSelectPhoto = (targetFiles) => {
        const { EditorActions } = this.props
        let count = 1

        const fileList = []     //input태그에서 선택한 사진들의 File 객체 리스트 -> 서버로 보내질 데이터
        const previewUrl = []   //File 객체의 미리보기에 사용 할 url의 리스트
        let reader = new FileReader();
        reader.onloadend = () => {      //reader가 로드를 완료하면 결과url을 리스트에 추가
            previewUrl.push(reader.result)
            console.log(previewUrl);
            if (count < targetFiles.length) {
                reader.readAsDataURL(fileList[0]);
                count++
            }
        }
        for (let i = 0; i < targetFiles.length; i++) {
            fileList.push(targetFiles[i])
        }
        reader.readAsDataURL(fileList[0]);


        EditorActions.selectFiles({ fileList, previewUrl })   //상태 변경, 리렌더링
    }

    render() {
        const { handleSelectPhoto } = this
        const { selectedFiles } = this.props
        const previewUrl = selectedFiles.get('previewUrl')     //미리보기에 사용할 URL의 리스트

        return (
            <Uploader
                onInput={handleSelectPhoto}
                previewUrl={previewUrl}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    selectedFiles: state.editor.get('selectedFiles')
})

const mapDispatchToProps = (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploaderContainer)
