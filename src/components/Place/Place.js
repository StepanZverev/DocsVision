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
                    {renderIcon(props.isRootPlace)}
                    <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>

                    {children.map(child =>
                        <Place
                            onPlaceClick={props.onPlaceClick}
                            place={child}
                            isRootPlace={false}
                            placeList={props.placeList}
                        />)}

                </ul>
            </li>
        )

    } else {
        return (<li className={classes.Place} >
            <i className={"fa fa-level-up-alt"} style={{ transform: "rotate(90deg)" }} />
            <span onClick={() => props.onPlaceClick(props.place)}>{props.place.data.name}</span>
        </li>)
    }
}

function renderIcon(isRoot) {
    const cls = ["fa"]

    let style = {}

    if (isRoot) {
        
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