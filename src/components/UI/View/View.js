import React from "react";

import { MdViewList, MdViewModule, MdViewWeek } from "react-icons/md";

import './View.css';

const View = ({ checkedValue, onChange }) => {
    return (
        <div className='view-icons viewRadioGroup' onChange={onChange}>
            <div className='list'>
                <input type="radio" id="view-list" name="selector" value="list" checked={checkedValue === 'list'} />
                <label htmlFor="view-list"><MdViewList /></label>
            </div>
            <div className='grid'>
                <input type="radio" id="view-grid" name="selector" value="grid" checked={checkedValue === 'grid'}/>
                <label htmlFor="view-grid"><MdViewModule /></label>
            </div>
            <div className='column'>
                <input type="radio" id="view-column" name="selector" value="column" checked={checkedValue === 'column'} />
                <label htmlFor="view-column"><MdViewWeek /></label>
            </div>
        </div>
    )
};

export default View;