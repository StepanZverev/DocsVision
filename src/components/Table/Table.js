import React from 'react'
import classes from './Table'

const Table = props => {
    return (
        <table>
            <tr>
                <th>№</th>
                <th>Наименование</th>
                <th>Колличество</th>
            </tr>

            {props.data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                    </tr>
                )
            })}

        </table>
    )
}


export default Table