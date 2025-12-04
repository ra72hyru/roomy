import React, { useState } from 'react';
import Card from './components/Card';
import RoomForm from './components/RoomForm';
import AddRoomButton from './components/AddRoomButton';
import '../styles/Rooms.css';

const Rooms = () => {
    const [rooms, setRooms] = useState<{id: number, roomName: string, capacity: number | '', status?: string, bookings?: number, location?: string}[]>([]);
    const [isRoomFormOpen, setIsRoomFormOpen] = useState<boolean>(false);
    const [idCounter, setIdCounter] = useState<number>(0);
    const [editRoom, setEditRoom] = useState<number | null>(null);

    const handleSaveRoom = (roomName: string, capacity: number | '', location?: string) => {
        setIsRoomFormOpen(false);
        setRooms([...rooms, {id: idCounter, roomName: roomName, capacity: capacity, location: location}]);
        setIdCounter(prev => prev + 1);
    }

    const handleEditRoom = (roomName: string, capacity: number | '', location?: string) => {
        setRooms(rooms.map((room, index) => 
            room.id === editRoom ? {...room, roomName: roomName, capacity: capacity, location: location} : room
        ));
        setEditRoom(null);
    };

    const handleDeleteRoom = (id: number) => {
        setRooms(rooms.filter(room => room.id !== id));
    }

    return (
        <div className='rooms-container'>
            <div className='rooms-header'>
                <h1><span className='header-content'>{rooms.length}</span> Rooms</h1>
                <h1 id='header-add-room' onClick={() => setIsRoomFormOpen(true)}>Add Room</h1>
            </div>
            <div className='rooms-cards'>
                {rooms.map((room, index) => (
                    room.id !== editRoom ?
                    <Card key={index} id={room.id} roomName={room.roomName} capacity={room.capacity} 
                            status={room.status} bookings={room.bookings} location={room.location}
                            onEdit={setEditRoom} onDelete={() => handleDeleteRoom(room.id)}/>
                            :
                    <RoomForm key={index} currentData={{roomName: room.roomName, capacity: room.capacity, location: room.location}}
                        onSave={handleEditRoom}
                        onCancel={() => setEditRoom(null)}
                    />
                ))}
                {!isRoomFormOpen && <AddRoomButton addRoom={setIsRoomFormOpen} />}
                {isRoomFormOpen && <RoomForm onCancel={setIsRoomFormOpen} onSave={handleSaveRoom} />}
            </div>
        </div>
    )
};

export default Rooms;