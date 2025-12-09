import {useEffect, useState} from 'react';
import '../styles/Bookings.css';
import BookingForm from './components/BookingForm';
import Booking from './components/Booking';
import { useBookings } from '../../hooks/useBookings.ts';

interface BookingsProps {
    user_id: number;
}

const Bookings = ({user_id}: BookingsProps) => {
    const [editBooking, setEditBooking] = useState<number | null>(null);
    const [isAddBookingFormOpen, setIsAddBookingFormOpen] = useState<boolean>(false);

    const {bookings, rooms, isLoading, handleAddBooking, handleEditBooking, handleDeleteBooking} = useBookings({user_id});

    const handleAddBookingWrapper = async (room_id: number, start_time: string, end_time: string) => {
        await handleAddBooking(room_id, start_time, end_time);
        setIsAddBookingFormOpen(false);
    };

    const handleEditBookingWrapper = async (room_id: number, room_name: string, start_time: string, end_time: string) => {
        await handleEditBooking(editBooking ?? -1, room_id, room_name, start_time, end_time);
        setEditBooking(null);
    };

    return (
        <div className='bookings-container'>
            <div className='bookings-header'>
                <h1><span className='header-content'>{bookings.length}</span> {bookings.length !== 1 ? 'Bookings' : 'Booking'}</h1>
                <h1 id='header-add-booking' onClick={() => setIsAddBookingFormOpen(true)}>Book a room</h1>
            </div>
            <div className='bookings-rows-container'>

                {!isLoading ? <div className='bookings-rows'>
                    {!isAddBookingFormOpen && <button onClick={() => setIsAddBookingFormOpen(true)}>Book a room</button>}
                    {isAddBookingFormOpen && <BookingForm rooms={rooms} onBook={handleAddBookingWrapper} onCancel={setIsAddBookingFormOpen}/>}
                    {bookings.map((booking, index) => (
                        editBooking !== booking.booking_id ?
                            <Booking key={index} id={booking.booking_id} room_name={booking.room_name} user_id={booking.user_id}
                                start_date={booking.start_time} end_date={booking.end_time} onEdit={setEditBooking} onDelete={handleDeleteBooking} /> 
                        :
                            <BookingForm key={index} rooms={rooms} onSave={handleEditBookingWrapper} onCancel={() => setEditBooking(null)} 
                                currentData={{room_id: booking.room_id, room_name: booking.room_name, start_date: booking.start_time, end_date: booking.end_time}} />
                    ))}
                </div> : <h1>Loading bookings</h1>}
            </div>
        </div>
    )
};

export default Bookings;