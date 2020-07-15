import React, { Component } from 'react'
import classes from './Table.css'

class Table extends Component {

    state = {
        inventory: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inventory: nextProps.data
        })
    }

    render() {
        return (
            <table className={classes.Table}>
                <tr>
                    <th>№</th>
                    <th>Наименование</th>
                    <th>Колличество</th>
                    {this.props.isLastChild ? <th></th> : null}
                </tr>

                {this.props.data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            {this.props.isLastChild
                                ?
                                <td><button onClick={() => this.props.onDeleteClick(index)}><i className={"fa fa-trash-alt"} /></button></td>
                                :
                                null
                            }

                        </tr>
                    )
                })}

            </table>
        )
    }
}

export default Table