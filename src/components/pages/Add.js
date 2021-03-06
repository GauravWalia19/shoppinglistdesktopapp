import React, { useState } from 'react';
import '../styles/Add.css';
import Alert from '../common/Alert';

const Add = () => {
    const [itemName, setItemName] = useState('');

    const inputHandler = (e) => {
        setItemName(e.target.value);
    }

    // sending values to main.js
    const submitHandler = (e) => {
        e.preventDefault();
        window.api.send('item:add', itemName);
        setItemName("");
    };

    return (
        <>
            <Alert />
            <div className="addScreen">
                <h2>Add Item</h2>
                <form onSubmit={submitHandler}>
                    <input 
                        type="text" 
                        value={itemName}
                        onChange={inputHandler}
                        className="input" 
                        autoFocus/>
                    <br/>
                    <button type="submit" className="submitButton">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default Add;
