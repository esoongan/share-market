import PageTemplate from 'components/common/PageTemplate'
import EditorContainer from 'containers/editor/EditorContainer'
import React from 'react'

const EditorPage = () =>{
    return(
        <div>
            <PageTemplate>
                <EditorContainer/>
            </PageTemplate>
        </div>
    )
}

export default EditorPage