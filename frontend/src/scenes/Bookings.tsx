import {useEffect, useState} from 'react';
import '../styles/Bookings.css';

interface BookingsProps {
    user_id: number;
}

const Bookings = ({user_id}: BookingsProps) => {
    const [bookings, setBookings] = useState<{id: number, user_id: number, room_id: number, start_time: string, end_time: string}[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);

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
                    console.log(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => room.name));
                    setRooms(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => room.name));
                }
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, []);
    
    return (
        <div className='bookings-container'>
            <div className='bookings-header'>
                <h1><span className='header-content'></span> Bookings</h1>
                <h1 id='header-add-booking' onClick={() => {}}>Add Booking</h1>
            </div>
            <div className='bookings-rows'>
                <select>
                    {rooms.map((room, index) => 
                        (<option key={index} value={room}>
                            {room}
                        </option>)
                    )}
                </select>
            </div>
        </div>
    )
};

export default Bookings;