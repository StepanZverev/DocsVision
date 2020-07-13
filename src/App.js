import React from 'react';
import classes from './App.css';
import Hierarchy from "./containers/Hierarchy/Hierarchy"
import Store from "./containers/Store/Store"


class App extends React.Component {

  state = {
    currentPlace: null
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
        <Hierarchy onPlaceClick={this.onPlaceClickHandler}/>
        <Store currentRoom={this.state.currentPlace}/>
      </div>
    )
  }
}

export default App;
