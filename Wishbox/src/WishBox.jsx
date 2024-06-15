import React, { useEffect, useState } from 'react';
import CreateWish from './CreateWish';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function WishBox() {
    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/wishes')
            .then(result => setWishes(result.data))
            .catch(err => console.log('Error fetching wishes:', err));
    }, []);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3002/wish/update/${id}`)
            .then(result => {
                setWishes(wishes.map(wish => (wish._id === id ? result.data : wish)));
            })
            .catch(err => console.log('Error updating wish:', err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3002/wish/delete/${id}`)
            .then(() => {
                setWishes(wishes.filter(wish => wish._id !== id));
            })
            .catch(err => console.log('Error deleting wish:', err));
    };

    return (
        <div className="wishbox">
            <h2>Wish Box</h2>
            <CreateWish setWishes={setWishes} wishes={wishes} />
            {wishes.length === 0 ? (
                <div><h2>Make a Wish</h2></div>
            ) : (
                wishes.map(wish => (
                    <div className='wish' key={wish._id}>
                        <div className='checkbox' onClick={() => handleEdit(wish._id)}>
                            {wish.fulfilled ? 
                                <BsFillCheckCircleFill className='icon' /> :
                                <BsCircleFill className='icon' />
                            }
                            <p className={wish.fulfilled ? "line_through" : ""}>{wish.wish}</p>
                        </div>
                        <span><BsFillTrashFill className='icon' onClick={() => handleDelete(wish._id)} /></span>
                    </div>
                ))
            )}
        </div>
    );
}

export default WishBox;
