import React from 'react';
import classes from './App.css';
import Hierarchy from "./containers/Hierarchy/Hierarchy"
import Store from "./containers/Store/Store"
import firebase from "firebase"

class App extends React.Component {

  state = {
    currentPlace: null,                          // Текущая комната
    rootItemsId: ['main', 'production'],         // ID корневых комнат
    places: [],                                  // массив комнат, загруженный с сервера
    inventory: [],                               // массив оборудования, загруженный с сервера
    loadingPlaces: true,                         // Загрузились ли комнаты 
    loadingInventory: true                       // Загрузилось ли оборудование
  }

  componentDidMount() {       // Загрузка данных
    firebase.firestore().collection("places").get().then(response => {
      let places = response.docs.map(x => {
        try {
          return {
            id: x.id,
            data: x.data(),
            parts: x.data().parts && x.data().parts.map(part => part.id)
          }

        } catch (e){
          console.log(e);
          return null
        }
      })

      this.setState({
        places,
        loadingPlaces: false
      })
    })

    firebase.firestore().collection("inventory").get().then(response => {
      let inventory = response.docs.map(x => {
        try {
          return {
            id: x.id,
            data: x.data(),
            placeId: x.data().place.id
          }

        } catch (e) {
          console.log(e);
          return null
        }
      })

      this.setState({
        inventory: inventory.filter(element => element !== null),
        loadingInventory: false
      })
    });
  }

  onPlaceClickHandler = item => {     // Обработка клика по комнате
    this.setState({
      currentPlace: item
    })
  }

  refreshHandler = () => {                      // Обновить данные с сервера 
    firebase.firestore().collection("inventory").get().then(response => {
      let inventory = response.docs.map(x => {
        try {
          return {
            id: x.id,
            data: x.data(),
            placeId: x.data().place.id
          }
        } catch(e) { 
          console.log(e) 
          return null
        }
      })
      this.setState({
        inventory: inventory.filter(element => element !== null),
        loadingInventory: false
      })
    })
  }

  render() {
    return (
      <div className={classes.App}>

        <Hierarchy                                          // Окно вывода иерархии помещений
          loading={this.state.loadingPlaces && this.state.loadingPlaces}
          places={this.state.places}
          rootItemsId={this.state.rootItemsId}
          currentRoom={this.state.currentPlace}

          onPlaceClick={this.onPlaceClickHandler}
        />

        <Store                                          // Окно вывода и редактирования оборудования
          places={this.state.places}
          inventory={this.state.inventory}
          loading={this.state.loadingInventory}
          currentRoom={this.state.currentPlace}

          refresh={this.refreshHandler}
        />
      </div>
    )
  }
}

export default App;
