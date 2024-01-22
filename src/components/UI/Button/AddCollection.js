import React from "react";

import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs";

import './AddCollection.css';


const AddCollection = (props) => {
    return (
        <div className='add-collection'>
            <span>
                <abbr title="Add to collection">
                    <BsCollectionPlay onClick={props.onClick} />
                </abbr>
            </span>
            {/* <span> */}
                <select 
                    name='collection'
                    id={props.track.id}
                    value={props.selectedType}
                    onChange={props.collectionChangeHandler}
                    disabled={props.isDisabled}
                >
                    {/* {props.collectionOptions} */}
                    <option> -- Select Collection -- </option>
                </select>
            {/* </span> */}
        </div>
    )
};


export default AddCollection;