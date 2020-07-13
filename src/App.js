import React from 'react';
import classes from './App.css';
import Hierarchy from "./containers/Hierarchy/Hierarchy"
import Store from "./containers/Store/Store"
import firebase from "firebase"

class App extends React.Component {

  state = {
    currentPlace: null,
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

  onPlaceClickHandler = item => {
    this.setState({
      currentPlace: item
    })
    console.log(item)
  }

  render() {
    return (
      <div className={classes.App}>
        <Hierarchy
          places={this.state.places}
          rootItemsId={this.state.rootItemsId}
          onPlaceClick={this.onPlaceClickHandler}
        />
        <Store currentRoom={this.state.currentPlace} />
      </div>
    )
  }
}

export default App;
