import React from 'react'


const Room = props => {
    return (
        <ul>
            {props.name}
            {props.children? props.children.map(child => <li><Room name={child.data.name}/></li>): null}
        </ul>
    )
}


export default Room