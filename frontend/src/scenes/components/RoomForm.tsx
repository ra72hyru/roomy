import React, { useState } from 'react';
import '../../styles/components/RoomForm.css';

interface RoomFormProps {
    onCancel: (isRoomFormOpen: boolean) => void;
    onSave?: (room_name: string, capacity: number, location?: string) => void;
    onAdd?: (room_name: string, capacity: number, location?: string) => void;
    currentData?: {room_id?: number, room_name?: string, capacity?: number, location?: string};
}

const RoomForm = ({ onCancel, onSave, onAdd, currentData }: RoomFormProps) => {
    const [room_name, setRoomName] = useState<string>(currentData?.room_name || '');
    const [capacity, setCapacity] = useState<number>(currentData?.capacity || 0);
    const [location, setLocation] = useState<string>(currentData?.location || '');

    return (
        <div className='room-form'>
            <input type='text' placeholder='Room Name' onChange={e => {setRoomName(e.target.value)}} value={room_name} />
            {/* <input type='number' placeholder='Capacity' onChange={e => {setCapacity(e.target.value === '' ? '' : Number(e.target.value))}} value={capacity}/> */}
            <input type='number' placeholder='Capacity' onChange={e => {setCapacity(Number(e.target.value))}} value={capacity}/>
            <input type='text' placeholder='Location' onChange={e => {setLocation(e.target.value)}} value={location} />
            <div className='room-form-buttons'>
                {onSave && <button onClick={() => onSave(room_name, capacity, location)}>Save</button>}
                {onAdd && <button onClick={() => onAdd(room_name, capacity, location)}>Add</button>}
                <button onClick={() => onCancel(false)}>Cancel</button>
            </div>
        </div>
    )
};

export default RoomForm;