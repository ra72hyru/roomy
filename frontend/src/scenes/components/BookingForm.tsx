import React, { useEffect, useState } from 'react';

interface BookingFormProps {
    rooms: {room_id: number, room_name: string}[];
    onSave: (room_id: number, start_date: string, end_date: string) => void;
}

const BookingForm = ({rooms, onSave}: BookingFormProps) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedRoomId, setSelectedRoomId] = useState<number>(-1);

    useEffect(() => {
        if (rooms.length > 0) {
            setSelectedRoomId(rooms[0].room_id);
        }
    }, [rooms]);
    
    const setRoomData = (e: string) => {
        const id: number = Number(e);
        setSelectedRoomId(id);
    };

    return (
        <div>
            <select value={selectedRoomId} onChange={e => setRoomData(e.target.value)}>
                {rooms.map((room, index) => 
                    <option key={index} value={room.room_id}>{room.room_name}</option>
                )}
            </select>
            <label htmlFor='from-date'>From</label>
            <input name='from-date' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label htmlFor='to-date'>To</label>
            <input name='to-date' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={() => onSave(selectedRoomId, startDate, endDate)}>Book Room</button>
        </div>
    )
};

export default BookingForm;