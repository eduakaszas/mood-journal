import React, { Component } from 'react'

import './Tags.scss'
class Tags extends Component {
    render() {
        return (
            <div className="tagContainer m-4 text-center">
                { this.props.showTags() }
            </div>
        )
    }
}

export default Tags;