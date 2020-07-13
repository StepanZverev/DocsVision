import React, { Component } from 'react'
import classes from "./Hierarchy.css"
import Place from "../../components/Place/Place"

class Hierarchy extends Component {

    renderRootItems = places => {

        return places.map((item, index) => {
            if (this.props.rootItemsId.indexOf(item.id) !== -1) {

            return (<ul><Place onPlaceClick={this.props.onPlaceClick} key={index} place={item} placeList={places}/></ul>)
            } else {
                return null
            }
        })
    }

    render() {
        return (
            <div className={classes.Hierarchy}>
                {this.props.places ? this.renderRootItems(this.props.places) : null}
            </div>
        )
    }
}

export default Hierarchy