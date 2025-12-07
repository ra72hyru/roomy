import React, { useEffect, useState } from 'react';

interface BookingFormProps {
    rooms: {room_id: number, room_name: string}[];
    onSave: (room_id: number, start_date: string, end_date: string) => void;
    onCancel: (isAddBookingFormOpen: boolean) => void;
    currentData?: {room_id?: number, start_date?: string, end_date?: string};
}

const BookingForm = ({rooms, onSave, onCancel, currentData}: BookingFormProps) => {
    const [startDate, setStartDate] = useState<string>(currentData?.start_date || '');
    const [endDate, setEndDate] = useState<string>(currentData?.end_date || '');
    const [selectedRoomId, setSelectedRoomId] = useState<number>(currentData?.room_id || -1);

    useEffect(() => {
        if (!currentData && rooms.length > 0) {
            setSelectedRoomId(rooms[0].room_id);
        }
    }, [rooms]);
    
    const setRoomData = (e: string) => {
        const id: number = Number(e);
        setSelectedRoomId(id);
    };

    return (
        <div>
            <select value={selectedRoomId} onChange={e => setRoomData(e.target.value)} defaultValue={selectedRoomId}>
                {rooms.map((room, index) => 
                    <option key={index} value={room.room_id}>{room.room_name}</option>
                )}
            </select>
            <label htmlFor='from-date'>From</label>
            <input name='from-date' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label htmlFor='to-date'>To</label>
            <input name='to-date' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={() => onSave(selectedRoomId, startDate, endDate)}>{currentData ? 'Save' : 'Book room'}</button>
            <button onClick={() => onCancel(false)}>Cancel</button>
        </div>
    )
};

export default BookingForm;