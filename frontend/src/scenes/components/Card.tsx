import React from 'react';
import '../../styles/components/Card.css';

interface CardProps {
    roomName: string;
    capacity: number | '';
    status?: string;
    bookings?: number;
    location?: string;
}

const Card = ({ roomName, status = 'Available', capacity, bookings = 0, location }: CardProps) => {
    return (
        <div className='card'>
            <h2>{roomName}</h2>
            <p>Status: <span>{status}</span></p>
            <p>Capacity: <span>{bookings} / {capacity}</span></p>
            {location && <p>Location: <span>{location}</span></p>}
        </div>
    )
};

export default Card;