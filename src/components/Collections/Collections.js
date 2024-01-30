import React, { useState } from "react";

import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Select from "../UI/Input/Select";
import Toast from "../UI/Toast/Toast";

import api from "../../helpers/AxiosClient";

import classes from './Collections.module.css';


const Collections = ({ data }) => {

    const [enteredCollection, setEnteredCollection] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collectionData, setCollectionData] = useState(data);
    const [selectedType, setSelectedType] = useState('name_asc');


    const sortTypeJson = {
        "name_asc": "A-Z",
        "name_desc": "Z-A",
        "created_asc": "Created First",
        "created_desc": "Created Last",
        "updated_asc": "Updated First",
        "updated_desc": "Updated Last"
    };


    const sortTypeOptions = Object.keys(sortTypeJson).map(key => {
        return <option key={key} value={key}>{sortTypeJson[key]}</option>
    });

    
    const sortByName = (order) => {
        
        return function(a, b) {

            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
          
            if (nameA < nameB) {
                return order === "asc" ? -1 : 1; 
            }

            if (nameA > nameB) {
                return order === "asc" ? 1 : -1;
            }

            return 0;
        };

    };

    
    const sortByDate = (field, order) => {
        
        return function(a, b) {

            var date1 = new Date(a[field]);
            var date2 = new Date(b[field]);
          
            if (date1.getTime() < date2.getTime()) {
                return order === "asc" ? -1 : 1; 
            }

            if (date1.getTime() > date2.getTime()) {
                return order === "asc" ? 1 : -1;
            }

            return 0;
        };

    };


    const sortChangeHandler = event => {        
        const value = event.target.value;
        const field = value.split('_')[0];
        const order = value.split('_')[1];

        let data = collectionData;

        if(field === 'name') {
            data = collectionData.sort(sortByName(order));
        } else if(field === 'created') {
            data = collectionData.sort(sortByDate('createdDate', order));
        } else if(field === 'updated') {
            data = collectionData.sort(sortByDate('lastUpdatedDate', order));
        }

        setCollectionData(data);
        setSelectedType(event.target.value);
    };


    const collections = collectionData.map(collection => {

        const createdDate = new Date(collection.createdDate).toLocaleString("en-US", {month: 'short', day: 'numeric', year: 'numeric'});
        const updatedDate = new Date(collection.lastUpdatedDate).toLocaleString("en-US", {month: 'short', day: 'numeric', year: 'numeric'});

        return (
            <div className={classes.collection} key={collection.name}>
                <Link to={`/collections/${collection.name}/edit`}><MdEdit /></Link>
                <Link to={`/collections/${collection.name}`}>
                    { collection.imageUrl && <img src={collection.imageUrl} alt="Collection" /> }
                    { !collection.imageUrl && <div className={classes.noimage}>No Image Found</div> }
                    <div>
                        <h4>{collection.name}</h4>
                        <p><b>Created Date: </b> {createdDate}</p>
                        <p><b>Last Updated Date: </b> {updatedDate}</p>
                    </div>
                </Link>
            </div>
        );
    });


    const addCollection = async () => {

        setIsSubmitting(true);

        const username = localStorage.getItem('user');

        const addCollectionData = {
            userName: username,
            collectionName: enteredCollection
        };


        api.addUserCollection(username, addCollectionData)
        .then(res => {
            const updatedCollections = [...collectionData, res.data];
            setCollectionData(updatedCollections);
            setEnteredCollection('');
            setIsSubmitting(false);

            const message = <span><b>{enteredCollection}</b> collection is added successfully</span>
            Toast('success', message);
        })
        .catch(err => {
            setEnteredCollection('');
            setIsSubmitting(false);
            Toast('error', err.response ? err.response.data.message : err.message);
        });

    };


    const nameChangeHandler = event => {
        setEnteredCollection(event.target.value);

        if(event.target.value.length > 2) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }

    };


    const clearHandler = event => {
        event.preventDefault();
        setEnteredCollection('');
        setIsFormValid(false);
    }


    const submitHandler = event => {
        event.preventDefault();
        addCollection();
        setIsFormValid(false);
    };


    return (
        <Card className={classes.collections}>

            <div className={classes['collection-sort']}>
                <Select
                    id="type"
                    name="type"
                    value={selectedType}
                    onChange={sortChangeHandler}
                    options={sortTypeOptions}
                    class=""
                />
            </div>
            
            <form onSubmit={submitHandler}>
                <div className={classes.row}>
                    <Input
                        type="text"
                        id="add"
                        name="add"
                        placeholder="Enter collection name here"
                        value={enteredCollection}
                        onChange={nameChangeHandler}
                        class=""
                    />
                </div>                
                <div className='actions'>
                    <Button type="submit" className={classes.btn} disabled={!isFormValid}>
                        { isSubmitting ? 'Submitting...' : 'Add' }
                    </Button>
                    <Button type="submit" 
                        onClick={clearHandler} 
                        className={classes.btnSecondary} 
                        disabled={enteredCollection.length === 0}
                    >
                        Clear
                    </Button>
                </div>
            </form>

            <hr/>

            <div className={classes['collection-wrapper']}>
                { !collectionData && <p><b>You have not added any collection yet.</b></p> }
                { collectionData && collections }
            </div>

        </Card>
    );
};

export default Collections;