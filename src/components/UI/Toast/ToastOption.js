import React, { useEffect, useState } from "react";

import classes from './ToastOption.module.css';


const ToastOption = () => {

    const toastPosition = localStorage.getItem('spotify-toast-position');

    const [checkedValue, setCheckedValue] = useState(toastPosition ? toastPosition : 'bottom-center');


    const toastPositionHandler = (event) => {

        localStorage.setItem('spotify-toast-position', event.target.value);
        setCheckedValue(event.target.value);
    };


    useEffect(() => {
        setCheckedValue(toastPosition);
    });


    return (
        <div className={classes.toastGroup} onChange={toastPositionHandler}>
            <div className={classes.toastOption}>
                <input type="radio" id="top-left" name="toast" value="top-left" defaultChecked={checkedValue === 'top-left'} />
                <label htmlFor="top-left">Top Left</label>
            </div>
            <div className={classes.toastOption}>
                <input type="radio" id="top-center" name="toast" value="top-center" defaultChecked={checkedValue === 'top-center'} />
                <label htmlFor="top-center">Top Center</label>
            </div>
            <div className={classes.toastOption}>
                <input type="radio" id="top-right" name="toast" value="top-right" defaultChecked={checkedValue === 'top-right'} />
                <label htmlFor="top-right">Top Right</label>
            </div>
            <div className={classes.toastOption}>
                <input type="radio" id="bottom-left" name="toast" value="bottom-left" defaultChecked={checkedValue === 'bottom-left'} />
                <label htmlFor="bottom-left">Bottom Left</label>
            </div>
            <div className={classes.toastOption}>
                <input type="radio" id="bottom-center" name="toast" value="bottom-center" defaultChecked={checkedValue === 'bottom-center'} />
                <label htmlFor="bottom-center">Bottom Center</label>
            </div>
            <div className={classes.toastOption}>
                <input type="radio" id="bottom-right" name="toast" value="bottom-right" defaultChecked={checkedValue === 'bottom-right'} />
                <label htmlFor="bottom-right">Bottom Right</label>
            </div>
        </div>
    );
};


export default ToastOption;