import React, {Component} from 'react'
import classes from './Table'
import firebase from 'firebase'

class Table extends Component {

    state = {
        inventory: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inventory:nextProps.data
        })
    }

    render() {
        return (
            <table>
                <tr>
                    <th>№</th>
                    <th>Наименование</th>
                    <th>Колличество</th>
                    <th></th>
                </tr>

                {this.props.data.map((item, index) => {
                return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td><button onClick={() => this.props.onDeleteClick(index)}>Delete</button></td>
                </tr>
                )
            })}

            </table>
        )
    }
}

export default Table