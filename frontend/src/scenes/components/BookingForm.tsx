import React, { useEffect, useState } from 'react';

interface BookingFormProps {
    rooms: {room_id: number, room_name: string}[];
    onCancel: (isAddBookingFormOpen: boolean) => void;
    onSave?: (room_id: number, room_name: string, start_date: string, end_date: string) => void;
    onBook?: (room_id: number, start_date: string, end_date: string) => void;
    currentData?: {room_id?: number, room_name?: string, start_date?: string, end_date?: string};
}

const BookingForm = ({rooms, onCancel, onSave, onBook, currentData}: BookingFormProps) => {
    const [startDate, setStartDate] = useState<string>(currentData?.start_date || '');
    const [endDate, setEndDate] = useState<string>(currentData?.end_date || '');
    const [selectedRoomId, setSelectedRoomId] = useState<number>(currentData?.room_id || -1);
    const [selectedRoomName, setSelectedRoomName] = useState<string>(currentData?.room_name || '');

    useEffect(() => {
        if (!currentData && rooms.length > 0) {
            setSelectedRoomId(rooms[0].room_id);
        }
    }, [rooms]);
    
    const setRoomData = (e: string) => {
        const id: number = Number(e);
        setSelectedRoomId(id);
        setSelectedRoomName(rooms.find(r => r.room_id === id)?.room_name ?? '');
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
            {onSave && 
                (<button onClick={() => onSave(selectedRoomId, selectedRoomName, startDate, endDate)}>Save</button>)}
                
            {onBook && 
                (<button onClick={() => onBook(selectedRoomId, startDate, endDate)}>Book room</button>)}
            <button onClick={() => onCancel(false)}>Cancel</button>
        </div>
    )
};

export default BookingForm;