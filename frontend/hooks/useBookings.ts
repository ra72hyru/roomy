import { useState, useEffect } from "react";

const url: string = 'http://localhost:8000';

interface BookingType {
    booking_id: number;
    user_id: number;
    room_id: number;
    first_name: string;
    last_name: string;
    room_name: string;
    start_time: string;
    end_time: string;
}

export const useBookings = ({user_id, room_id}: {user_id?: number, room_id?: number}) => {
    const [bookings, setBookings] = useState<BookingType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [rooms, setRooms] = useState<{room_id: number, room_name: string}[]>([]);

    //Get all bookings for the current user
    useEffect(() => {
        if (user_id && user_id < 0 || room_id && room_id < 0) return;
        (async (): Promise<void> => {
            try {
                //if user_id is given as parameter use that, otherwise the room_id if it is given, otherwise nothing
                let specified_url: string = user_id ? `${url}/bookings/user/${user_id}` : (room_id ? `${url}/bookings/room/${room_id}` : '');
                
                const response = await fetch(specified_url);
                const retData = await response.json();
 
                if (!response.ok)
                    throw new Error(retData.message);
                else {
                    setBookings(retData.bookings);
                    console.log(bookings);
                }
            } catch (err) {
                console.log((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user_id, room_id]);

    //get all room IDs and names for the booking form
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                console.log('Send all the rooms please');
                const response = await fetch(`${url}/rooms`);
                const retData = await response.json();

                if (!response.ok)
                    throw new Error(retData.message);
                else {
                    console.log(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => ({room_id: room.id, room_name: room.name})));
                    setRooms(retData.rooms.map((room: {id: number, name: string, capacity: string, location?: string}) => ({room_id: room.id, room_name: room.name})));
                }
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, []);

    /**
     * Handles adding a new booking and sends it to the database.
     * @param room_id ID of the booked room
     * @param start_date date of the first booked day 
     * @param end_date date of the last booked day
     */
    const handleAddBooking = async (room_id: number, start_date: string, end_date: string) => {
        try {
            const response = await fetch(`${url}/bookings/add`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: user_id, room_id: room_id, start_time: start_date, end_time: end_date})
            });

            const retData = await response.json();

            if (!response.ok)
                throw new Error(retData.message);
            else {
                console.log(retData.booking);
                setBookings(prev => [...prev, retData.booking]);
                //setIsAddBookingFormOpen(false);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };
    
    /**
     * Handles editing a booking and sends it to the database.
     * @param editBookingID the ID of the booking to be edited
     * @param room_id the ID of the new room
     * @param room_name the name of the new room
     * @param start_date the new date of the first booked day
     * @param end_date the new date of the last booked day
     */
    const handleEditBooking = async (editBookingID: number, room_id: number, room_name: string, start_date: string, end_date: string) => {
        if (editBookingID < 0)
            return;
        
        try {
            console.log(editBookingID, room_id, room_name);
            const response = await fetch(`${url}/bookings/${editBookingID}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({room_id: room_id, start_time: start_date, end_time: end_date})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setBookings(prev => prev.map(b => b.booking_id === editBookingID ? {...b, room_id: room_id, room_name: room_name, start_time: start_date, end_time: end_date} : b));
                //setBookings(bookings.map((booking) => booking.id === editBooking ? {...booking, room_id, start_time: start_date, end_time: end_date} : booking ));
                //setEditBooking(null);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    /**
     * Handles deleting a room and sends the request to the database.
     * @param id ID of the booking to be deleted
     */
    const handleDeleteBooking = async (id: number) => {
        try {
            const response = await fetch(`${url}/bookings/${id}`, {
                method: "DELETE"
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setBookings(prev => prev.filter(b => b.booking_id !== id));
                //setBookings(bookings.filter(booking => booking.id !== id));
            }
        } catch (err) {
            console.log(id);
            console.log((err as Error).message);
        }
    };

    return {bookings, rooms, isLoading, handleAddBooking, handleEditBooking, handleDeleteBooking};
};