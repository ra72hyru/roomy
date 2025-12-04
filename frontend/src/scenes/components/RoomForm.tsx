import React, { useState } from 'react';
import '../../styles/components/RoomForm.css';

interface RoomFormProps {
    onCancel: (isRoomFormOpen: boolean) => void;
    onSave: (roomName: string, capacity: number | '') => void;
}

const RoomForm = ({ onCancel, onSave }: RoomFormProps) => {
    const [roomName, setRoomName] = useState<string>('');
    const [capacity, setCapacity] = useState<number | ''>('');

    return (
        <div className='room-form'>
            <input type='text' placeholder='Room Name' onChange={e => {setRoomName(e.target.value)}} />
            <input type='number' placeholder='Capacity' onChange={e => {setCapacity(e.target.value === '' ? '' : Number(e.target.value))}} />
            <div className='room-form-buttons'>
                <button onClick={() => onSave(roomName, capacity)}>Save</button>
                <button onClick={() => onCancel(false)}>Cancel</button>
            </div>
        </div>
    )
};

export default RoomForm;