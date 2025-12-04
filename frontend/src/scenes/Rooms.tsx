import React, { useState } from 'react';
import Card from './components/Card';
import '../styles/Rooms.css';

const Rooms = () => {
    const [rooms, setRooms] = useState<[]>([]);
//TODO: highlight button on top for highlighting full or available rooms
    return (
        <div className='rooms-container'>
            <div className='rooms-header'>
                <h1><span className='header-content'>{rooms.length}</span> Rooms</h1>
            </div>
            <div className='rooms-cards'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
            </div>
        </div>
    )
};

export default Rooms;