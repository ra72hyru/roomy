import { useState } from 'react';
import Card from './components/Card';
import RoomForm from './components/RoomForm';
import AddRoomButton from './components/AddRoomButton';
import '../styles/Rooms.css';
import { useAuthContext } from '../Authorization';
import Booking from './components/Booking';
import { useBookings } from '../../hooks/useBookings.ts';
import { useRooms } from '../../hooks/useRooms.ts';
import BookingForm from './components/BookingForm.tsx';

const Rooms = () => {
    const [isRoomFormOpen, setIsRoomFormOpen] = useState<boolean>(false);
    const [editRoom, setEditRoom] = useState<number | null>(null);

    //states for bookings per room
    const [showRoomBookings, setShowRoomBookings] = useState<boolean>(false);
    const [currentRoom, setCurrentRoom] = useState<string>('');
    const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
    const [editBooking, setEditBooking] = useState<number | null>(null);

    const {user} = useAuthContext();

    //handle the rooms using the hook
    const {rooms, handleAddRoom, handleEditRoom, handleDeleteRoom} = useRooms();

    const handleAddRoomWrapper = async (room_name: string, capacity: number, location?: string) => {
        await handleAddRoom(room_name, capacity, location);
        setIsRoomFormOpen(false);
    };

    const handleEditRoomWrapper = async (room_name: string, capacity: number, location?: string) => {
        await handleEditRoom(editRoom ?? -1, room_name, capacity, location);
        setEditRoom(null);
    };

    //handle the bookings for a room using the hook
    const {bookings, handleEditBooking, handleDeleteBooking} = useBookings({room_id: currentRoomId ?? -1});

    const handleEditBookingWrapper = async (room_id: number, room_name: string, start_time: string, end_time: string) => {
        await handleEditBooking(editBooking ?? -1, room_id, room_name, start_time, end_time);
        setEditBooking(null);
    };

    const showRoomBookingsWrapper = (id: number, room_name: string) => {
        setCurrentRoomId(id);
        setShowRoomBookings(true);
        setCurrentRoom(room_name);
    };

    return (
        <div className='rooms-container'>
            <div className='rooms-header'>
                {showRoomBookings ? 
                    (<h3>Bookings for room: {currentRoom}</h3>) 
                :
                    <>
                        <h1><span className='header-content'>{rooms.length}</span> {rooms.length !== 1 ? 'Rooms' : 'Room'}</h1>
                        {Boolean(user?.is_admin) && <h1 id='header-add-room' onClick={() => setIsRoomFormOpen(true)}>Add Room</h1>}
                    </>
                }
            </div>
            {showRoomBookings ? 
                <div>
                    {bookings.length !== 0 ? 
                            (bookings.map((booking, index) => (booking.room_id === currentRoomId && (
                                editBooking !== booking.booking_id ? 
                                        <Booking key={index} id={booking.booking_id} user_id={booking.user_id} room_name={booking.room_name} start_date={booking.start_time} end_date={booking.end_time}
                                            first_name={booking.first_name} last_name={booking.last_name} onDelete={handleDeleteBooking} onEdit={setEditBooking} />
                                    :
                                        <BookingForm key={index} rooms={rooms.map(r => ({room_id: r.id, room_name: r.name}))} 
                                            onSave={handleEditBookingWrapper} onCancel={() => setEditBooking(null)}
                                            currentData={{room_id: booking.room_id, room_name: booking.room_name, start_date: booking.start_time, end_date: booking.end_time}} />
                            ))) )
                        : 
                            (<div>
                                <h1>This room has no bookings</h1>
                            </div>)
                    }
                    <button onClick={() => setShowRoomBookings(false)}>Go back</button>
                </div> 
            :
                <div className='rooms-cards'>
                    {rooms.map((room, index) => (
                        room.id !== editRoom ?
                        <Card key={index} id={room.id} roomName={room.name} capacity={room.capacity} location={room.location}
                                onEdit={setEditRoom} onDelete={() => handleDeleteRoom(room.id)} onShowBookings={showRoomBookingsWrapper} />
                                :
                        <RoomForm key={index} currentData={{room_id: editRoom, room_name: room.name, capacity: room.capacity, location: room.location}}
                            onSave={handleEditRoomWrapper}
                            onCancel={() => setEditRoom(null)}
                        />
                    ))}
                    {(!isRoomFormOpen && Boolean(user?.is_admin)) && <AddRoomButton addRoom={setIsRoomFormOpen} />}
                    {isRoomFormOpen && <RoomForm onCancel={setIsRoomFormOpen} onAdd={handleAddRoomWrapper} />}
                </div>
            }
        </div>
    )
};

export default Rooms;