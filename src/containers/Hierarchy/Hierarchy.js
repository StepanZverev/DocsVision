import React, { Component } from 'react'
import classes from "./Hierarchy.css"
import Place from "../../components/Place/Place"

class Hierarchy extends Component {


    renderRootItems = places => {

        return places.map((item, index) => {
            if (this.props.rootItemsId.indexOf(item.id) !== -1) {
                return (<ul key={index}>
                    <Place
                        currentRoom={this.props.currentRoom} 
                        onPlaceClick={this.props.onPlaceClick}
                        isRootPlace={true}
                        place={item}
                        placeList={places}
                    />
                </ul>)
            } else {
                return null
            }
        })
    }

    render() {
        return (
            <div className={classes.Hierarchy}>
                <div className={classes.title}>Структура компании</div>
                <div className={classes.container}>
                    {this.props.loading ? <div>LOADING...</div> : this.renderRootItems(this.props.places)}
                </div>
            </div>
        )
    }
}

export default Hierarchy