import React from 'react';
import '../../styles/components/Card.css';

interface CardProps {
    roomName?: string;
    status?: string;
    capacity?: number;
    bookings?: number;
}

const Card = ({ roomName, status, capacity, bookings }: CardProps) => {
    return (
        <div className='card'>
            <h2>{roomName}</h2>
            <h3>Status: {status}</h3>
            <h3>Capacity: {bookings}/{capacity}</h3>
        </div>
    )
};

export default Card;