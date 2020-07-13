import React from 'react'
import classes from "./Store.css"
import Table from '../../components/Table/Table'

const Store = props => {

    const tableData = []

    if (props.currentRoom) {
        

        props.inventory.forEach(inventoryItem => {
            if (inventoryItem.placeId === props.currentRoom.id) {
                tableData.push({
                    name: inventoryItem.data.name,
                    count: inventoryItem.data.count
                })
            }
        })
        
    }



    return (
        <div className={classes.Store}>
            <h2>{props.currentRoom ? props.currentRoom.data.name : null}</h2>
            {tableData.length !== 0? <Table data={tableData}/>: <div>Пустая комната</div>}
        </div>
    )
}

export default Store