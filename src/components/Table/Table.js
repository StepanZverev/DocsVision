import React, { Component } from 'react'
import classes from './Table.css'

class Table extends Component {

    state = {
        inventory: [] // Массив данных для таблицы для конкретной комнаты
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inventory: nextProps.data
        })
    }

    render() {
        if (this.props.data.length === 0) {                // Если данных для отрисовки нет
            return (<React.Fragment><hr/><h2>В комнате нет оборудования</h2><hr/></React.Fragment>)
        } else {
            return (
                <table className={classes.Table}>
                    {/* Заголовок таблицы */}
                    <tr>
                        <th>№</th>
                        <th>Наименование</th>
                        <th>Колличество</th>        
                        {this.props.isLastChild ? <th></th> : null}  
                    </tr>

                    {/* Тело таблицы */}
                    {this.props.data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.name}</td> 
                                <td>{item.count}</td>
                                {this.props.isLastChild   // Если у помещения нет дочерних комнат, то отрисовать столбец с кнопками
                                    ?
                                    <td><button className={classes.delete} onClick={() => this.props.onDeleteClick(index)}><i className={"fa fa-trash-alt"} /></button>
                                        <button className={classes.edit} onClick={() => this.props.onEditClick(index)}><i className={"fa fa-pencil-alt"} /></button>
                                    </td>
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
}

export default Table