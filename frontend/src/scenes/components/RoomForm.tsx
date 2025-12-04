import React, { useState } from 'react';
import '../../styles/components/RoomForm.css';

interface RoomFormProps {
    onCancel: (isRoomFormOpen: boolean) => void;
    onSave: (roomName: string, capacity: number | '', location?: string) => void;
    currentData?: {roomName?: string, capacity?: number | '', location?: string};
}

const RoomForm = ({ onCancel, onSave, currentData }: RoomFormProps) => {
    const [roomName, setRoomName] = useState<string>(currentData?.roomName || '');
    const [capacity, setCapacity] = useState<number | ''>(currentData?.capacity || '');
    const [location, setLocation] = useState<string>(currentData?.location || '');

    return (
        <div className='room-form'>
            <input type='text' placeholder='Room Name' onChange={e => {setRoomName(e.target.value)}} value={roomName} />
            <input type='number' placeholder='Capacity' onChange={e => {setCapacity(e.target.value === '' ? '' : Number(e.target.value))}} value={capacity}/>
            <input type='text' placeholder='Location' onChange={e => {setLocation(e.target.value)}} value={location} />
            <div className='room-form-buttons'>
                <button onClick={() => onSave(roomName, capacity, location)}>Save</button>
                <button onClick={() => onCancel(false)}>Cancel</button>
            </div>
        </div>
    )
};

export default RoomForm;