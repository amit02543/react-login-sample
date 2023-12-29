import React from "react";

import classes from './Input.module.css';

const Input = props => {
    return (
        <div className={`${classes.control} ${props.class}`}>
            { props.label && <label htmlFor={props.name || props.id}>{props.label}</label> }
            { props.readonly && <span className={classes.readOnly}>{props.value}</span>}
            { !props.readonly && 
                <input
                    type={props.type || 'text'}
                    id={props.id}
                    name={props.name || props.id}
                    value={props.value}
                    placeholder={props.placeholder || ''}
                    onChange={props.onChange}
                />
            }
        </div>
    );
};

export default Input;