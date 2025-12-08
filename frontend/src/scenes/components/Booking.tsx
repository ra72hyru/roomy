import {useState} from 'react';
import '../../styles/components/Booking.css';
import { useAuthContext } from '../../Authorization';

interface BookingProps {
    id: number;
    room_name: string;
    start_date: string;
    end_date: string;
    user_id?: number
    first_name?: string;
    last_name?: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const Booking = ({ id, room_name, start_date, end_date, user_id, first_name, last_name, onEdit, onDelete }: BookingProps) => {

    const {user} = useAuthContext();

    return (
        <div className='booking'>
            <p className='booking-info'>Room: <span className='booking-data'>{room_name}</span></p>
            <p className='booking-info'>By: <span className='booking-data'>{first_name} {last_name}</span></p>
            <p className='booking-info'>From: <span className='booking-data'>{start_date.split('-').reverse().join('.')}</span></p>
            <p className='booking-info'>To: <span className='booking-data'>{end_date.split('-').reverse().join('.')}</span></p>
            {(user?.user_id === user_id || Boolean(user?.is_admin)) && <div className='booking-buttons'>
                <button onClick={() => onEdit(id)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>}
        </div>
    )
};

export default Booking;