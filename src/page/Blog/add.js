import 'editor.md/css/editormd.css'
// import editormd from 'editor.md/editormd.js'
import React, { Component, useEffect } from 'react'

export default class AddBlog extends Component {
    componentDidMount() {
        window.editormd('editormd', {
        })
    }
    
    render() {
        return (
            <div id="editormd">
                <textarea defaultValue="### Hello Editor.md !" style={{display: 'none'}}></textarea>
            </div>
        )
    }
}