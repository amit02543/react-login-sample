import React, { useEffect, useState } from "react";

import classes from './Mode.module.css';

const Mode = () => {

    const darkMode = localStorage.getItem('spotify-mode');
    const fontSize = localStorage.getItem('spotify-font-size');

    const [isDarkMode, setIsDarkMode] = useState(darkMode);
    const [checkedValue, setCheckedValue] = useState(isDarkMode === 'true' ? true : false);
    
    
    const toggleHandler = (event) => {
        setIsDarkMode(event.target.checked);

        if(event.target.checked) {
            localStorage.setItem('spotify-mode', event.target.checked);

            var bodyClasses = fontSize ? fontSize : 'fsNormal';
            bodyClasses = bodyClasses + ' ' +  event.target.value;
            document.body.className = bodyClasses;
        } else {
            localStorage.removeItem('spotify-mode');
            
            document.body.className = fontSize ? fontSize : 'fsNormal';
        }

        setCheckedValue(event.target.checked);
    };


    useEffect(() => {
        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  (fontSize ? fontSize : 'fsNormal');

        document.body.className = bodyClasses;
    });


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