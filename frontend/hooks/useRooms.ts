import { useEffect, useState } from "react";

const url = 'http://localhost:8000';

interface RoomType {
    id: number;
    name: string;
    capacity: number;
    location?: string
}

export const useRooms = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    
    useEffect(() => {
        (async (): Promise<void> => {
            try {
            const response = await fetch(`${url}/rooms`);
            
            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                console.log(retData.rooms);
                setRooms(retData.rooms);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
        })();
    }, []);
    
    /**
     * Handles saving a new room: sends the data to the backend and upon success it adds the new room to the state.
     * @param room_name name of the room
     * @param capacity capacity of the room
     * @param location location of the room (optional)
    */
   const handleAddRoom = async (room_name: string, capacity: number, location?: string): Promise<void> => {
       try {
           const response = await fetch(`${url}/add-room`, {
               method: "POST",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({name: room_name, capacity: capacity, location: location})
            });
            
            const retData = await response.json();
            
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms(prev => [...prev, {id: retData.id, name: room_name, capacity: capacity, location: location}]);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };
    
    /**
     * Handles editing a room: sends the new data to the backend and upon success the currently edited room id (editRoom) is set to null and the rooms state gets updated.
     * @param room_name new name of the room
     * @param capacity new capacity of the room
     * @param location new location of the room
    */
   const handleEditRoom = async (editRoomID: number, room_name: string, capacity: number, location?: string) => {
        if (editRoomID < 0)
            return;
    
        try {
           const response = await fetch(`${url}/edit-room`, {
               method: "PUT",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({id: editRoomID, name: room_name, capacity: capacity, location: location})
            });
            
            const retData = await response.json();
            
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms(prev => prev.map(room => room.id === editRoomID ? {...room, room_name, capacity, location} : room));
                //setEditRoom(null);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };
    
    /**
     * Deletes the room specified by the id parameter.
     * @param id id of the room to be deleted
    */
   const handleDeleteRoom = async (id: number) => {
       try {
           const response = await fetch(`${url}/delete-room/${id}`, {
               method: "DELETE"
            });
            
            const retData = await response.json();
            
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setRooms(prev => prev.filter(room => room.id !== id));
                //setEditRoom(null);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    return {rooms, handleAddRoom, handleEditRoom, handleDeleteRoom};
}