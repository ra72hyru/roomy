import {useState} from 'react';
//import '../../styles/components/Booking.css';

interface BookingProps {
    id: number;
    room_name: string;
    start_date: string;
    end_date: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const Booking = ({ id, room_name, start_date, end_date, onEdit, onDelete }: BookingProps) => {

    return (
        <div className='booking'>
            <p className='booking-info'>Room: {room_name}</p>
            <p className='booking-info'>From: {start_date.split('-').reverse().join('.')}</p>
            <p className='booking-info'>To: {end_date.split('-').reverse().join('.')}</p>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
};

export default Booking;