import React from 'react'
import classes from './Place.css'


const Place = props => {

    if (props.place.parts) {

        const children = []

        props.placeList.forEach(placeItem => {
            if (props.place.parts.indexOf(placeItem.id) !== -1) {
                children.push(placeItem)
            }
        });

        return (
            <li className={classes.Place}>
                <ul>
                    <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>
                    {children.map(child => <Place onPlaceClick={props.onPlaceClick} place={child} placeList={props.placeList} />)}
                </ul>
            </li>
        )

    } else {
        return (<li className={classes.Place} >
            <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>
        </li>)
    }
}

export default Place