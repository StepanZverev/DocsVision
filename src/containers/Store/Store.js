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

        if (nextProps.currentRoom) {  // Если выбрано помещение

            const tableData = []

            console.log("children", this.getAllChildrenId(nextProps.currentRoom));


            nextProps.inventory.forEach((inventoryItem) => {
                if (this.getAllChildrenId(nextProps.currentRoom).indexOf(inventoryItem.placeId) !== -1) {
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

    getAllChildrenId = (place) => {

        const places = this.props.places

        const result = [place.id]

        if (!place.parts) {
            return result
        } else {
            places.forEach(item => {
                if (place.parts.indexOf(item.id) !== -1) {
                    result.push(...this.getAllChildrenId(item))
                }
            })
        }
        return result
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
                <div className={classes.title}>Оборудование</div>
                <div className={classes.container}>
                    {this.props.currentRoom ?
                        this.props.currentRoom.parts ?
                            [
                                <h2>{this.props.currentRoom.data.name}</h2>,
                                <Table
                                    data={this.state.tableData}
                                    onDeleteClick={this.deleteClickHandler}
                                    isLastChild={false}
                                />
                            ] :
                            [
                                <h2>{this.props.currentRoom.data.name}</h2>,
                                <Table
                                    data={this.state.tableData}
                                    onDeleteClick={this.deleteClickHandler}
                                    isLastChild={true}
                                />,
                                <AddForm onAddItem={this.addItemHandler} />
                            ] :
                        <h2>Выберите комнату</h2>}
                </div>
            </div >
        )
    }
}




export default Store