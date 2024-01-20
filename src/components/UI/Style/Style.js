import React, { useEffect, useState } from "react";

import classes from './Style.module.css';

const Style = () => {

    const darkMode = localStorage.getItem('spotify-mode');
    const fontSize = localStorage.getItem('spotify-font-size');

    const [isFontSize, setIsFontSize] = useState(fontSize);
    const [checkedValue, setCheckedValue] = useState(isFontSize ? isFontSize : 'fsNormal');
    
    
    const fontSizeHandler = (event) => {
        localStorage.setItem('spotify-font-size', event.target.value);

        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  event.target.value;

        setCheckedValue(event.target.value);
        
        setIsFontSize(event.target.value);
    };


    useEffect(() => {
        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  (fontSize ? isFontSize : 'fsNormal');

        document.body.className = bodyClasses;
    });


    return (
        <div className={classes.radioGroup} onChange={fontSizeHandler}>
            <div className={classes.small}>
                <input type="radio" id="option-one" name="selector" value="fsSmall" defaultChecked={checkedValue === 'fsSmall'} />
                <label htmlFor="option-one">A-</label>
            </div>
            <div className={classes.normal}>
                <input type="radio" id="option-two" name="selector" value="fsNormal" defaultChecked={checkedValue === 'fsNormal'}/>
                <label htmlFor="option-two">A</label>
            </div>
            <div className={classes.big}>
                <input type="radio" id="option-three" name="selector" value="fsBig" defaultChecked={checkedValue === 'fsBig'} />
                <label htmlFor="option-three" className={classes.big}>A+</label>
            </div>
        </div>
    );
};

export default Style;