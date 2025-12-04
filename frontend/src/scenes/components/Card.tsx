import React from 'react';
import '../../styles/components/Card.css';

interface CardProps {
    id: number;
    roomName: string;
    capacity: number | '';
    status?: string;
    bookings?: number;
    location?: string;
    onEdit: () => void;
}

const Card = ({ roomName, status = 'Available', capacity, bookings = 0, location, onEdit }: CardProps) => {
    return (
        <div className='card'>
            <h2>{roomName}</h2>
            <p>Status: <span>{status}</span></p>
            <p>Capacity: <span>{bookings} / {capacity}</span></p>
            {location && <p>Location: <span>{location}</span></p>}
            <button id='edit-button' onClick={() => onEdit()}>Edit</button>
        </div>
    )
};

export default Card;