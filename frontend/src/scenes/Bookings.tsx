import { useState } from 'react';
import '../styles/Bookings.css';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList.tsx';
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
            {isAddBookingFormOpen && 
                <div className={`bookings-add-form ${isAddBookingFormOpen ? 'visible' : ''}`}>
                    <BookingForm rooms={rooms} onCancel={() => setIsAddBookingFormOpen(false)} onBook={handleAddBookingWrapper} />
                </div>}
                <div className={`bookings-list-wrapper ${isAddBookingFormOpen ? 'shifted' : ''}`} >
            {!isLoading && <BookingList bookings={bookings} rooms={rooms} editBooking={editBooking} onCancel={() => setEditBooking(null)} 
                                        onDelete={handleDeleteBooking} onEdit={setEditBooking} onSave={handleEditBookingWrapper} />}
                </div>
        </div>
    )
};

export default Bookings;