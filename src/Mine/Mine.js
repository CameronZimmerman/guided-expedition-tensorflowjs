import React, { Component } from 'react'

export default class Mine extends Component {
    render() {
        return (
            <div className = "mine" style = {{left: this.props.x, top: this.props.y}}>
                
            </div>
        )
    }
}
