import React, { Component } from 'react'



function isValid(touched, ...validateParam) {
    let isValid = true
    validateParam.forEach(param => {
        isValid = isValid && param
    })

    return touched && isValid
}

class AddForm extends Component {

    state = {
        name: null,
        count: null,
        isValidName: false,
        isValidCount: true,
        toched: false
    }

    onChangeHandler = (event, isName) => {

        if (isName) {
            const name = event.target.value

            this.setState({
                name,
                toched: true,
                isValidName: !!name
            })
        } else {
            const count = event.target.value


            this.setState({
                count,
                toched: true,
                isValidCount: count >= 1
            })
        }
    }

    clickHandler = event => {
        this.props.onAddItem(event, this.state.name, this.state.count)

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
            <form>
                <h3>Добавить оборудование:</h3>
                <label>
                    Название
                <input 
                    type="text" 
                    value={this.state.name ? this.state.name : ""} 
                    onChange={event => this.onChangeHandler(event, true)} 
                />

                </label>
                <label>
                    Колличество

                <input 
                    type="number" 
                    value={this.state.count ? this.state.count : ""} 
                    placeholder={1} 
                    onChange={event => this.onChangeHandler(event, false)} 
                />
                </label>

                <button
                    onClick={event => this.clickHandler(event)}
                    disabled={!isValid(this.state.toched, this.state.isValidName, this.state.isValidCount)}
                >Add</button>

            </form>
        )
    }
}


export default AddForm