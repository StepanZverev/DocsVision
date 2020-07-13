import React, { Component } from 'react'
import classes from "./Hierarchy.css"
import firebase from "firebase"

class Hierarchy extends Component {

    state = {
        rootItemsId: ['main', 'production'],
        places: [],
        inventory: []
    }

    componentWillMount() {

        firebase.firestore().collection("places").get().then(response => {
            let places = response.docs.map(x => {
                try {
                    return {
                        id: x.id,
                        data: x.data(),
                        parts: x.data().parts && x.data().parts.map(part => part.id)
                    }
                } catch {

                }
                return null

            });
            console.info("places", places);
            this.setState({
                places
            })
        });

        firebase.firestore().collection("inventory").get().then(response => {
            let inventory = response.docs.map(x => {
                try {
                    return {
                        id: x.id,
                        data: x.data(),
                        placeId: x.data().place.id
                    }
                } catch { }
                return null

            });
            console.info("inventory", inventory);
            this.setState({
                inventory
            })
        });

    }

    renderRootItems = places => {

        console.log(places)

        return places.map((item, index) => {
            if (this.state.rootItemsId.indexOf(item.id) !== -1) {
                return (<ul key={index}>{item.data.name}</ul>)
            } else {
                return null
            }

        })
    }

    render() {
        return (
            <div className={classes.Hierarchy}>
                {this.state.places ? this.renderRootItems(this.state.places) : null}
            </div>
        )
    }
}

export default Hierarchy