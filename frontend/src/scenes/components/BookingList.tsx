import Booking from "./Booking";
import BookingForm from "./BookingForm";
import '../../styles/components/BookingList.css';
import { useEffect, useRef } from "react";

interface BookingListProps {
    bookings: {
        booking_id: number,
        user_id: number,
        room_id: number,
        first_name: string,
        last_name: string,
        room_name: string,
        start_time: string,
        end_time: string
    }[];
    rooms: {
        room_id: number,
        room_name: string
    }[];
    editBooking: number | null;
    onCancel: () => void
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onSave?: (room_id: number, room_name: string, start_date: string, end_date: string) => void;
    showName?: boolean;
}

const BookingList = ({bookings, rooms, editBooking, onCancel, onEdit, onDelete, onSave, showName}: BookingListProps) => {
    const editRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editBooking != null)
            editRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [editBooking]);
    
    return (
        <div className="booking-table">
            <div className="booking-table-header">
                <h2 className="table-descriptor">Room</h2>
                {showName && <h2 className="table-descriptor">Name</h2>}
                <h2 className="table-descriptor">From</h2>
                <h2 className="table-descriptor">To</h2>
                <div className='padding'>
                    <button className='padding-button'>Edit</button>
                    <button className='padding-button'>Delete</button>
                </div>
            </div>
            <div className="booking-rows">
                {bookings.map((booking, index) => (
                    editBooking !== booking.booking_id ?
                    <Booking key={index} id={booking.booking_id} room_name={booking.room_name} user_id={booking.user_id}
                    start_date={booking.start_time} end_date={booking.end_time} onEdit={onEdit} onDelete={onDelete} /> 
                    :
                    <BookingForm key={index} rooms={rooms} onSave={onSave} onCancel={onCancel} 
                    currentData={{room_id: booking.room_id, room_name: booking.room_name, start_date: booking.start_time, end_date: booking.end_time}} />
                ))}
            </div>
        </div> 
    )
};

export default BookingList;