import React from 'react'
import classes from './Place.css'


const Place = props => {

    if (props.place.parts) {   //Если у текущего помещения есть дочерние

        const children = []       

        props.placeList.forEach(placeItem => {       // Находим все дочерние помещения и добавляем в массив
            if (props.place.parts.indexOf(placeItem.id) !== -1) {
                children.push(placeItem)
            }
        })

        return (
            <li className={classes.Place}>
                <ul>
                    {renderIcon(props.isRootPlace,  props.currentRoom === props.place, classes.active)}

                    <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>

                    {children.map((child,index) =>          // Рендер дочерних комнат
                        <Place
                            key={index}
                            onPlaceClick={props.onPlaceClick}
                            place={child}
                            isRootPlace={false}
                            placeList={props.placeList}
                            currentRoom={props.currentRoom}
                        />)}

                </ul>
            </li>
        )

    } else {    // Если дочерних нет
        return (<li className={classes.Place} >

            {renderIcon(props.isRootPlace, props.currentRoom === props.place, classes.active)}

            <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>
        </li>)
    }
}

function renderIcon(isRoot, isActive, activeClass) {   // Рендер иконки слева от названия комнаты

    const cls = ["fa"]              // Массив классов

    if (isActive) {                 // Если комната активна
        cls.push(activeClass)
    }

    let style = {}

    if (isRoot) {               // Если комната корневая
        cls.push("fa-home")
    } else {
        cls.push("fa-level-up-alt")
        style = {
            transform: "rotate(90deg)" 
        }
    }

    return (
        <i className={cls.join(" ")} style={style} />
    )
}

export default Place