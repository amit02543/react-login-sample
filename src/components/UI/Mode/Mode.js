import React, { useEffect, useState } from "react";

import classes from './Mode.module.css';

const Mode = () => {

    const darkMode = localStorage.getItem('spotify-mode');

    const [isDarkMode, setIsDarkMode] = useState(darkMode);
    const [checkedValue, setCheckedValue] = useState(isDarkMode === 'true' ? true : false);
    
    
    const toggleHandler = (event) => {
        setIsDarkMode(event.target.checked);

        if(event.target.checked) {
            localStorage.setItem('spotify-mode', event.target.checked);
            setCheckedValue(true);
        } else {
            localStorage.removeItem('spotify-mode');
            setCheckedValue(false);
        }
        
    };


    return (
        <div className={classes.toggleSwitch}>
            <label className={classes.toggle}>
                <input 
                    className={classes.toggleCheckbox} 
                    type="checkbox" 
                    checked={checkedValue} 
                    onChange={toggleHandler} 
                />
                <div className={classes.toggleSwitch}></div>
            </label>
        </div>
    );
}

export default Mode;