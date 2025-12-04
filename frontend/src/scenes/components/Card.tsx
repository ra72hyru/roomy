import React from 'react';
import '../../styles/components/Card.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CardProps {
    id: number;
    roomName: string;
    capacity: number | '';
    status?: string;
    bookings?: number;
    location?: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const Card = ({ id, roomName, status = 'Available', capacity, bookings = 0, location, onEdit, onDelete }: CardProps) => {
    return (
        <div className='card'>
            <h2>{roomName}</h2>
            <p>Status: <span>{status}</span></p>
            <p>Capacity: <span>{bookings} / {capacity}</span></p>
            {location && <p>Location: <span>{location}</span></p>}
            {/* <button id='edit-button' onClick={() => onEdit(id)}>Edit</button> */}
            <RiDeleteBin6Line id='delete-card-button' size={24} onClick={() => onDelete(id)} />
            <MdOutlineModeEdit id='edit-card-button' size={24} onClick={() => {onEdit(id)}} />
        </div>
    )
};

export default Card;