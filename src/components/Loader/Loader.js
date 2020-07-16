import React from 'react'
import classes from "./Loader.css"

const Loader = () => {   //https://loading.io/
    return (
        <div className={classes.Loader}><div className={classes.Ld}>
            <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div></div>
    )
}


export default Loader