import React, { Component } from 'react'
import classes from './Form.css'


function isValid(touched, ...validateParam) {  // Функция валидации формы
    let isValid = true
    validateParam.forEach(param => {           // Если все параметры = true
        isValid = isValid && param
    })

    return touched && isValid
}

class Form extends Component {

    state = {
        name: null,          // Название
        count: null,         // Колличество
        isValidName: false,  // Корректное ли имя?
        isValidCount: true,  // Корректное ли колличество?
        toched: false        // Редактировалась ли форма?
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.editing) {            // Если включен режим редактирования
            this.setState({
                name: nextProps.editItem.name,
                count: nextProps.editItem.count,
                isValidName: true,
                isValidCount: true,
                toched: true
            })
        }
    }

    onChangeHandler = (event, isName) => {      // Обработчик изменения значения в форме

        if (isName) {       // Если меняется поле с названием
            const name = event.target.value

            this.setState({
                name,
                toched: true,
                isValidName: !!name     //Если название не пустое
            })
        } else {              // Если меняется поле с колличеством
            const count = event.target.value


            this.setState({
                count,
                toched: true,
                isValidCount: count >= 1
            })
        }
    }

    clickAddHandler = event => {        // Обработчик клика на кнопку "добавить"
        this.props.onAddItem(event, this.state.name, this.state.count)

        this.resetState()   // Сбросить стейт
    }

    clickEditHandler = event => {   // Обработчик клика на кнопку "изменить"
        this.props.onEditItem(event, this.state.name, this.state.count)

        this.resetState()
    }

    onCancelClick(event) {  // Обработчик клика на кнопку "отмена"
        this.props.onCancelClick(event)

        this.resetState()
    }

    resetState = () => {  // Сброс
        this.setState({
            name: null,
            count: null,
            isValidName: false,
            isValidCount: true,
            toched: false
        })
    }

    render() {
        return (
            <form className={classes.Form}>
                {/* Включен ли режим редактирования */}
                {this.props.editing ? <h3>Редактирование:</h3> : <h3>Добавить оборудование:</h3>}
                {/* Поле "название" */}
                <label>
                    Название:
                    <input
                        type="text"
                        value={this.state.name ? this.state.name : ""}
                        onChange={event => this.onChangeHandler(event, true)}
                    />

                </label>
                <br />
                {/* Поле "колличество" */}
                <label>
                    Колличество:
                    <input
                        type="number"
                        value={this.state.count ? this.state.count : ""}
                        placeholder={1}
                        min={1}
                        onChange={event => this.onChangeHandler(event, false)}
                    />
                </label>

                <br />
                {/* Кпопка "добавить"/"изменить" (в зависимости от режима) */}
                <button
                    className={isValid(this.state.toched, this.state.isValidName, this.state.isValidCount) ? null : classes.disabled}
                    onClick={this.props.editing ? event => this.clickEditHandler(event) : event => this.clickAddHandler(event)}
                    disabled={!isValid(this.state.toched, this.state.isValidName, this.state.isValidCount)}
                >
                    {this.props.editing ? "Изменить" : "Добавить"}
                </button>
                {/* Кнопка "отмена" */}
                {this.props.editing ?
                    <button className={classes.cancel} onClick={event => this.onCancelClick(event)}>
                        Отмена
                </button> : null}
            </form>
        )
    }
}


export default Form