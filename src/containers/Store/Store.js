import React, { Component } from 'react'
import classes from "./Store.css"
import Table from '../../components/Table/Table'
import firebase from 'firebase'
import AddForm from '../../components/AddForm/AddForm'

class Store extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tableData: [],
            loading: props.loading
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.currentRoom) {

            const tableData = []

            nextProps.inventory.forEach((inventoryItem) => {
                if (inventoryItem.placeId === nextProps.currentRoom.id) {
                    tableData.push({
                        name: inventoryItem.data.name,
                        count: inventoryItem.data.count,
                        id: inventoryItem.id
                    })
                }
            })

            this.setState({
                tableData
            })

        }
    }

    deleteClickHandler = (index) => {

        this.setState({
            loading: true
        })

        const id = this.state.tableData[index].id

        if (id) {
            firebase.firestore().collection("inventory").doc(id).delete().then(() => {
                console.info("Done");
                this.props.refresh()
                this.setState({
                    loading: false
                })
            });
        }

    }

    addItemHandler = (event, itemName, itemCount) => {
        event.preventDefault()
        let filestore = firebase.firestore();
        filestore.collection("inventory").doc().set({
            name: itemName,
            count: itemCount || 1,
            place: filestore.collection("places").doc(this.props.currentRoom.id) // main-101 – id места
        }).then(() => {
            this.props.refresh()
            console.info("Done");
        });
    }


    render() {
        return (
            <div className={classes.Store} >
                {this.props.currentRoom ? <h2>{this.props.currentRoom.data.name}</h2> : <h2>Выберите комнату</h2>}

                <Table data={this.state.tableData} onDeleteClick={this.deleteClickHandler} />

                <AddForm onAddItem={this.addItemHandler}/>

                {this.state.loading ? <div>LOADING....</div> : null}
            </div >
        )
    }
}




export default Store