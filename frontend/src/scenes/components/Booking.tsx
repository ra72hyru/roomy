import {useState} from 'react';
import '../../styles/components/Booking.css';

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
            <p className='booking-info'>Room: <span className='booking-data'>{room_name}</span></p>
            <p className='booking-info'>From: <span className='booking-data'>{start_date.split('-').reverse().join('.')}</span></p>
            <p className='booking-info'>To: <span className='booking-data'>{end_date.split('-').reverse().join('.')}</span></p>
            <div className='booking-buttons'>
                <button onClick={() => onEdit(id)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    )
};

export default Booking;