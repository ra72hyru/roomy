import {useEffect, useState} from 'react';
import '../styles/Bookings.css';
import BookingForm from './components/BookingForm';
import Booking from './components/Booking';

interface BookingsProps {
    user_id: number;
}

const Bookings = ({user_id}: BookingsProps) => {
    const [bookings, setBookings] = useState<{id: number, user_id: number, room_id: number, start_time: string, end_time: string}[]>([]);
    const [rooms, setRooms] = useState<{room_id: number, room_name: string}[]>([]);
    const [editBooking, setEditBooking] = useState<number | null>(null);
    const [isAddBookingFormOpen, setIsAddBookingFormOpen] = useState<boolean>(false);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await fetch(`http://localhost:8000/bookings/${user_id}`);
                const retData = await response.json();
 
                if (!response.ok)
                    throw new Error(retData.message);
                else {
                    setBookings(retData.bookings);
                    console.log(bookings);
                }
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, []);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                console.log('Send all the rooms please');
                const response = await fetch(`http://localhost:8000/rooms`);
                const retData = await response.json();

                if (!response.ok)
                    throw new Error(retData.message);
                else {
                    console.log(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => ({room_id: room.id, room_name: room.name})));
                    setRooms(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => ({room_id: room.id, room_name: room.name})));
                }
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, []);

    const handleSaveBooking = async (room_id: number, start_date: string, end_date: string) => {
        try {
            const response = await fetch('http://localhost:8000/bookings/add', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: user_id, room_id: room_id, start_time: start_date, end_time: end_date})
            });

            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                setBookings([...bookings, {id: retData.id, user_id: user_id, room_id: room_id, start_time: start_date, end_time: end_date}]);
                setIsAddBookingFormOpen(false);
            }
        } catch (err) {
            console.log('Added new booking, should display', (err as Error).cause);
            console.log((err as Error).message);
        }
    };
    
    const handleEditBooking = async (room_id: number, start_date: string, end_date: string) => {
        try {
            const response = await fetch(`http://localhost:8000/bookings/${editBooking}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({room_id: room_id, start_time: start_date, end_time: end_date})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setBookings(bookings.map((booking) => booking.id === editBooking ? {...booking, room_id, start_time: start_date, end_time: end_date} : booking ));
                setEditBooking(null);
            }
        } catch (err) {
            console.log({id: editBooking, start_date: start_date, end_date: end_date});
            console.log((err as Error).message);
        }
    };

    const handleDeleteBooking = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/bookings/${id}`, {
                method: "DELETE"
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setBookings(bookings.filter(booking => booking.id !== id));
            }
        } catch (err) {
            console.log(id);
            console.log((err as Error).message);
        }
    } 

    return (
        <div className='bookings-container'>
            <div className='bookings-header'>
                <h1><span className='header-content'></span> Bookings</h1>
                <h1 id='header-add-booking' onClick={() => setIsAddBookingFormOpen(true)}>Booking a room</h1>
            </div>
            <div className='bookings-rows'>
                {bookings.map((booking, index) => (
                    editBooking !== booking.id ?
                        <Booking key={index} id={booking.id} room_name={rooms.find(r => r.room_id === booking.room_id)?.room_name ?? ''} 
                                start_date={booking.start_time} end_date={booking.end_time} onEdit={setEditBooking} onDelete={handleDeleteBooking} /> 
                    :
                        <BookingForm key={index} rooms={rooms} onSave={handleEditBooking} onCancel={() => setEditBooking(null)} 
                                    currentData={{room_id: booking.room_id, start_date: booking.start_time, end_date: booking.end_time}} />
                ))}
                {!isAddBookingFormOpen && <button onClick={() => setIsAddBookingFormOpen(true)}>Book a room</button>}
                {isAddBookingFormOpen && <BookingForm rooms={rooms} onSave={handleSaveBooking} onCancel={setIsAddBookingFormOpen}/>}
            </div>
        </div>
    )
};

export default Bookings;