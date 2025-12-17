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
            <p className='booking-info'>{room_name}</p>
            {(first_name || last_name) && <p className='booking-info'>{first_name} {last_name}</p>}
            <p className='booking-info'>{start_date.split('-').reverse().join('.')}</p>
            <p className='booking-info'>{end_date.split('-').reverse().join('.')}</p>
            {(user?.user_id === user_id || Boolean(user?.is_admin)) && <div className='booking-buttons'>
                <button onClick={() => onEdit(id)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>}
        </div>
    )
};

export default Booking;