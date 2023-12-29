import React from "react";

import classes from './Input.module.css';

const Select = props => {
    return (
        <div className={`${classes.control} ${props.class}`}>
            { props.label && <label htmlFor={props.name || props.id}>{props.label}</label> }
            <select 
                name={props.name || props.id}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options}
            </select>
        </div>
    );
};

export default Select;