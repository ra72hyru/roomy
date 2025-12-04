import React, { useState } from 'react';
import '../../styles/components/RoomForm.css';

interface RoomFormProps {
    onCancel: (isRoomFormOpen: boolean) => void;
    onSave: (roomName: string, capacity: number | '', location?: string) => void;
}

const RoomForm = ({ onCancel, onSave }: RoomFormProps) => {
    const [roomName, setRoomName] = useState<string>('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [location, setLocation] = useState<string>('');

    return (
        <div className='room-form'>
            <input type='text' placeholder='Room Name' onChange={e => {setRoomName(e.target.value)}} />
            <input type='number' placeholder='Capacity' onChange={e => {setCapacity(e.target.value === '' ? '' : Number(e.target.value))}} />
            <input type='text' placeholder='Location' onChange={e => {setLocation(e.target.value)}} />
            <div className='room-form-buttons'>
                <button onClick={() => onSave(roomName, capacity, location)}>Save</button>
                <button onClick={() => onCancel(false)}>Cancel</button>
            </div>
        </div>
    )
};

export default RoomForm;