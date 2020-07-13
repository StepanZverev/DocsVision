import React, { Component } from 'react'
import classes from "./Store.css"

class Store extends Component {
    render() {
        return (
            <div className={classes.Store}>
                <h2>{this.props.currentRoom? this.props.currentRoom.data.name: null}</h2>
            </div>
        )
    }
}

export default Store