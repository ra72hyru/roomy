import '../../styles/components/Card.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthContext } from '../../Authorization';
import { useEffect, useState } from 'react';

interface CardProps {
    id: number;
    roomName: string;
    capacity: number | '';
    status?: string;
    location?: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onShowBookings: (room_id: number, room_name: string) => void;
}

const Card = ({ id, roomName, status = 'Available', capacity, location, onEdit, onDelete, onShowBookings }: CardProps) => {
    const {user} = useAuthContext();

    return (
        <div className='card'>
            <h2>{roomName}</h2>
            <p>Status: <span>{status}</span></p>
            <p>Capacity: <span>{capacity}</span></p>
            {location && <p>Location: <span>{location}</span></p>}
            {/* <button id='edit-button' onClick={() => onEdit(id)}>Edit</button> */}
            {Boolean(user?.is_admin) && <RiDeleteBin6Line id='delete-card-button' size={24} onClick={() => onDelete(id)} />}
            {Boolean(user?.is_admin) && <MdOutlineModeEdit id='edit-card-button' size={24} onClick={() => {onEdit(id)}} />}
            <button onClick={() => onShowBookings(id, roomName)}>Show Bookings</button>
        </div>
    )
};

export default Card;