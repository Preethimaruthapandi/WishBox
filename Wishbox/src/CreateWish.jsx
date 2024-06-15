import React, { useState } from 'react';
import axios from 'axios';

function CreateWish({ setWishes, wishes }) {
    const [wish, setWish] = useState('');

    const handleAdd = () => {
        axios.post('http://localhost:3002/wish/add', { wish })
            .then(result => {
                setWishes([...wishes, result.data]);
                setWish(''); // Clear the input field after adding
            })
            .catch(err => console.log('Error adding wish:', err));
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter Wish"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default CreateWish;
