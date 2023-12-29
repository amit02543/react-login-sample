import React, { useEffect, useState } from "react";

import classes from './Style.module.css';

const Style = () => {

    const darkMode = localStorage.getItem('spotify-mode');
    const fontSize = localStorage.getItem('spotify-font-size');

    const [isFontSize, setIsFontSize] = useState(fontSize);
    const [checkedValue, setCheckedValue] = useState(isFontSize ? isFontSize : 'fsNormal');
    
    
    const fontSizeHandler = (event) => {
        localStorage.setItem('spotify-font-size', event.target.value);

        // var bodyClasses = document.body.classList.value;
        // bodyClasses = bodyClasses.replace('fsSmall', '').replace('fsNormal', '').replace('fsBig', '').trim();
        // bodyClasses = bodyClasses + ' ' + event.target.value;
        // console.log('Body Classes: ', bodyClasses);

        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  event.target.value;

        setCheckedValue(event.target.value);

        // if('fsSmall' === event.target.value) {
        //     debugger;
        //     var bodyClasses = document.body.classList.value;
        //     bodyClasses = bodyClasses.replace('fsNormal', '').replace('fsBig', '').trim();
        //     bodyClasses += ' fsSmall';
        //     setCheckedValue(bodyClasses);
        // } else if('fsNormal' === event.target.value) {
        //     var bodyClasses = document.body.classList.value;
        //     bodyClasses = bodyClasses.replace('fsSmall', '').replace('fsBig', '').trim();
        //     bodyClasses += ' fsSmall';
        //     setCheckedValue(bodyClasses);
        //     document.body.classList.remove('fsSmall');
        //     document.body.classList.remove('fsBig');
        //     setCheckedValue(document.body.classList.add('fsNormal'));
        // } else if('fsBig' === event.target.value) {
        //     document.body.classList.remove('fsSmall');
        //     document.body.classList.remove('fsNormal');
        //     setCheckedValue(document.body.classList.add('fsBig'));
        // } 
        
        setIsFontSize(event.target.value);
        console.log('inside font change handler: ', checkedValue);
        // setCheckedValue(event.target.value);
    };


    useEffect(() => {
        console.log('Before use effect checkedvalue: ', checkedValue, ' & ', document.body.classList.value);
        // var bodyClasses = document.body.classList.value;
        // bodyClasses = bodyClasses.replace('fsSmall', '').replace('fsNormal', '').replace('fsBig', '').trim();
        // bodyClasses = bodyClasses + ' ' + checkedValue;

        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  (fontSize ? isFontSize : 'fsNormal');

        document.body.className = bodyClasses;
        console.log('After use effect checkedvalue: ', checkedValue, ' & ', document.body.classList.value);
    });


    return (
        <div class={classes.radioGroup} onChange={fontSizeHandler}>
            <div className={classes.small}>
                <input type="radio" id="option-one" name="selector" value="fsSmall" checked={checkedValue === 'fsSmall'} />
                <label htmlFor="option-one">A-</label>
            </div>
            <div className={classes.normal}>
                <input type="radio" id="option-two" name="selector" value="fsNormal" checked={checkedValue === 'fsNormal'}/>
                <label htmlFor="option-two">A</label>
            </div>
            <div className={classes.big}>
                <input type="radio" id="option-three" name="selector" value="fsBig" checked={checkedValue === 'fsBig'} />
                <label htmlFor="option-three" className={classes.big}>A+</label>
            </div>
        </div>
    );
};

export default Style;