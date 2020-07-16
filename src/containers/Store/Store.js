import React, { Component } from 'react'
import classes from "./Store.css"
import Table from '../../components/Table/Table'
import firebase from 'firebase'
import Form from '../../components/Form/Form'

class Store extends Component {


    state = {
        tableData: [],   // Данные для вывода в таблие
        editing: false,  // Режим редактирования оборудования
        editItem: null   // Редактируемый элемент
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.currentRoom) {  // Если выбрано помещение

            const tableData = []

            nextProps.inventory.forEach((inventoryItem) => {   // Ищем все оборудование которое хранится в этой комнате и в дочерних
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

    getAllChildrenId = (place) => {  // Метод поиска дочерних комнатах. Возвращает массив ID текущей комнаты и всех дочерних

        const places = this.props.places

        const result = [place.id]  // ID текущей комнаты

        if (!place.parts) {  // Если нет дочерних
            return result
        } else {        // если есть
            places.forEach(item => {   
                if (place.parts.indexOf(item.id) !== -1) {  // Если ID комнаты из массива parts совпадает с id дочерней комнаты
                    result.push(...this.getAllChildrenId(item))  // Рекурсия
                }
            })
        }
        return result
    }

    deleteClickHandler = (index) => {    // Обработчик удаления комнаты в таблице. index - номер элемента

        const id = this.state.tableData[index].id

        if (id) {
            firebase.firestore().collection("inventory").doc(id).delete().then(() => {  // Удаление с сервера
                this.props.refresh()            // Обновление 
            });
        }
    }

    editClickHandler = (index) => {     // Обработчик нажатия на кнопку редактирования в таблице.
        this.setState({             // Включение режима редактирования
            editing: true,
            editItem: this.state.tableData[index]
        })

    }

    addItemHandler = (event, itemName, itemCount) => {  // Обработчик добавления комнаты
        event.preventDefault()
        let filestore = firebase.firestore();
        filestore.collection("inventory").doc().set({       // Добавление на сервер
            name: itemName,
            count: itemCount || 1,
            place: filestore.collection("places").doc(this.props.currentRoom.id)
        }).then(() => {
            this.props.refresh()
        });
    }

    editItemHandler = (event, itemName, itemCount) => {  // Обработчик изменения комнаты
        event.preventDefault()

        let filestore = firebase.firestore();

        filestore.collection("inventory").doc(this.state.editItem.id).set({  // Изменения комнаты на сервере
            name: itemName,
            count: itemCount,
            place: filestore.collection("places").doc(this.props.currentRoom.id)
        }).then(() => {
            this.setState({   // Выключение режима редактирвания
                editing: false,
                editItem: null
            })
            this.props.refresh()
        });
    }

    cancelClickHandler = event => {  // Обработка нажатия кнопки отмены
        event.preventDefault()
        this.setState({
            editing: false,
            editItem: null
        })
    }


    render() {
        return (
            <div className={classes.Store} >
                <div className={classes.title}>Оборудование</div>
                <div className={classes.container}>
                    {this.props.currentRoom ?  // Если выбрано помещение
                        this.props.currentRoom.parts ? // Если помещение имеет дочерние комнаты
                            [
                                <h2>{this.props.currentRoom.data.name}</h2>,
                                <Table                              // Компенент таблицы
                                    data={this.state.tableData}
                                    onDeleteClick={this.deleteClickHandler}
                                    isLastChild={false}
                                />
                            ] : // Если дочерних комнат нет
                            [
                                <h2>{this.props.currentRoom.data.name}</h2>,
                                <Table
                                    data={this.state.tableData}
                                    onDeleteClick={this.deleteClickHandler}
                                    onEditClick={this.editClickHandler}
                                    isLastChild={true}
                                />,
                                <Form               // Компенент формы
                                    editItem={this.state.editItem}
                                    editing={this.state.editing}
                                    onAddItem={this.addItemHandler}
                                    onEditItem={this.editItemHandler}
                                    onCancelClick={this.cancelClickHandler}
                                />
                            ] : // Если комната не выбрана
                        <h2>Выберите комнату</h2>}
                </div>
            </div >
        )
    }
}

export default Store