import React, { Component } from 'react'

export default class Submarine extends Component {

    render() {
        return (
            <div className = "sub" style = {{left: this.props.x, top: this.props.y}}>
                
            </div>
        )
    }
}
