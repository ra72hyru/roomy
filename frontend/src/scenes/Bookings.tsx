import {useEffect, useState} from 'react';
import '../styles/Bookings.css';
import BookingForm from './components/BookingForm';

interface BookingsProps {
    user_id: number;
}

const Bookings = ({user_id}: BookingsProps) => {
    const [bookings, setBookings] = useState<{id: number, user_id: number, room_id: number, start_time: string, end_time: string}[]>([]);
    const [rooms, setRooms] = useState<{room_id: number, room_name: string}[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await fetch(`http://localhost:8000/bookings/${user_id}`);
                const retData = await response.json();
 
                if (!response.ok)
                    throw new Error(retData.message);
                else {
                    setBookings(retData.bookings);
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

            if (!retData.ok)
                throw new Error(retData.message);
            else {
                console.log(retData.message);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };
    
    return (
        <div className='bookings-container'>
            <div className='bookings-header'>
                <h1><span className='header-content'></span> Bookings</h1>
                <h1 id='header-add-booking' onClick={() => {}}>Add Booking</h1>
            </div>
            <div className='bookings-rows'>
                <BookingForm rooms={rooms} onSave={handleSaveBooking} />
            </div>
        </div>
    )
};

export default Bookings;