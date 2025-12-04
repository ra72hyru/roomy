import React, { useState } from 'react';
import Card from './components/Card';
import RoomForm from './components/RoomForm';
import AddRoomButton from './components/AddRoomButton';
import '../styles/Rooms.css';

const Rooms = () => {
    const [rooms, setRooms] = useState<{id: number, roomName: string, capacity: number | '', status?: string, bookings?: number, location?: string}[]>([]);
    const [isRoomFormOpen, setIsRoomFormOpen] = useState<boolean>(true);
    const [idCounter, setIdCounter] = useState<number>(0);

    const handleSaveRoom = (roomName: string, capacity: number | '', location?: string) => {
        setIsRoomFormOpen(false);
        setRooms([...rooms, {id: idCounter, roomName: roomName, capacity: capacity, location: location}]);
        setIdCounter(prev => prev + 1);
    }

    const handleEditRoom = () => {
        setIsRoomFormOpen(true);
    };

    return (
        <div className='rooms-container'>
            <div className='rooms-header'>
                <h1><span className='header-content'>{rooms.length}</span> Rooms</h1>
                <h1 id='header-add-room' onClick={() => setIsRoomFormOpen(true)}>Add Room</h1>
            </div>
            <div className='rooms-cards'>
                {rooms.map((room, index) => (
                    <Card key={index} id={room.id} roomName={room.roomName} capacity={room.capacity} 
                            status={room.status} bookings={room.bookings} location={room.location}
                            onEdit={handleEditRoom} />
                ))}
                {!isRoomFormOpen && <AddRoomButton addRoom={setIsRoomFormOpen} />}
                {isRoomFormOpen && <RoomForm onCancel={setIsRoomFormOpen} onSave={handleSaveRoom} />}
            </div>
        </div>
    )
};

export default Rooms;