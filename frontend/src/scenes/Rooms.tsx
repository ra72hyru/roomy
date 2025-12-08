import { use, useEffect, useState } from 'react';
import Card from './components/Card';
import RoomForm from './components/RoomForm';
import AddRoomButton from './components/AddRoomButton';
import '../styles/Rooms.css';
import { useAuthContext } from '../Authorization';
import Booking from './components/Booking';

interface BookingType {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    room_id: number;
    start_time: string;
    end_time: string;
}

const Rooms = () => {
    const [rooms, setRooms] = useState<{id: number, name: string, capacity: number, status?: string, location?: string}[]>([]);
    const [isRoomFormOpen, setIsRoomFormOpen] = useState<boolean>(false);
    const [editRoom, setEditRoom] = useState<number | null>(null);
    const [roomBookings, setRoomBookings] = useState<BookingType[]>([]);
    const [showRoomBookings, setShowRoomBookings] = useState<boolean>(false);
    const [currentRoom, setCurrentRoom] = useState<string>('');

    const {user} = useAuthContext();

    const getRooms = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/rooms');

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                console.log(retData.rooms);
                setRooms(retData.rooms);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };
    
    useEffect(() => {
        getRooms();
    }, []);

    /**
     * Handles saving a new room: sends the data to the backend and upon success it adds the new room to the state.
     * @param room_name name of the room
     * @param capacity capacity of the room
     * @param location location of the room (optional)
     */
    const handleSaveRoom = async (room_name: string, capacity: number, location?: string): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/add-room', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: room_name, capacity: capacity, location: location})
            });

            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms([...rooms, {id: retData.id, name: room_name, capacity: capacity, location: location}]);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
        
        setIsRoomFormOpen(false);
    };

    /**
     * Handles editing a room: sends the new data to the backend and upon success the currently edited room id (editRoom) is set to null and the rooms state gets updated.
     * @param room_name new name of the room
     * @param capacity new capacity of the room
     * @param location new location of the room
     */
    const handleEditRoom = async (room_name: string, capacity: number, location?: string) => {
        try {
            const response = await fetch('http://localhost:8000/edit-room', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: editRoom, name: room_name, capacity: capacity, location: location})
            });

            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms(rooms.map(room => room.id === editRoom ? {...room, room_name, capacity, location} : room));
                setEditRoom(null);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    /**
     * Deletes the room specified by the id parameter.
     * @param id id of the room to be deleted
     */
    const handleDeleteRoom = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/delete-room/${id}`, {
                method: "DELETE"
            });

            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms(rooms.filter(room => room.id !== id));
                setEditRoom(null);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleShowRoomBookings = async (room_id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/bookings/rooms/${room_id}`);
            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                console.log('bookings returned are: ', retData.bookings);
                setCurrentRoom(rooms.find(r => r.id === room_id)?.name ?? '');
                setRoomBookings(retData.bookings);
                setShowRoomBookings(true);
                console.log('roomBookings is now: ', roomBookings);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    useEffect(() => {
        console.log('daten sind da', roomBookings);

    }, [roomBookings]);

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
                    {roomBookings.length !== 0 ? 
                        (roomBookings.map((booking, index) => (
                            <Booking key={index} id={booking.id} room_name={rooms.find(r => r.id === booking.room_id)?.name ?? ''} 
                                    start_date={booking.start_time} end_date={booking.end_time} user_id={booking.user_id} 
                                    first_name={booking.first_name} last_name={booking.last_name}
                                    onDelete={() => {}} onEdit={() => {}} />)))
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
                        <Card key={index} id={room.id} roomName={room.name} capacity={room.capacity} 
                                status={room.status} location={room.location}
                                onEdit={setEditRoom} onDelete={() => handleDeleteRoom(room.id)} onShowBookings={handleShowRoomBookings} />
                                :
                        <RoomForm key={index} currentData={{roomName: room.name, capacity: room.capacity, location: room.location}}
                            onSave={handleEditRoom}
                            onCancel={() => setEditRoom(null)}
                        />
                    ))}
                    {(!isRoomFormOpen && Boolean(user?.is_admin)) && <AddRoomButton addRoom={setIsRoomFormOpen} />}
                    {isRoomFormOpen && <RoomForm onCancel={setIsRoomFormOpen} onSave={handleSaveRoom} />}
                </div>
            }
        </div>
    )
};

export default Rooms;