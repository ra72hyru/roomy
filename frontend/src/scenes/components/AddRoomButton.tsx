import React from 'react';
import '../../styles/components/AddRoomButton.css';
import { CiCirclePlus } from "react-icons/ci";

interface AddRoomButtonProps {
    addRoom: (isRoomFormOpen: boolean) => void;
}

const AddRoomButton = ({ addRoom }: AddRoomButtonProps) => {
    return (
        <div className='add-room-button'>
            <CiCirclePlus size={128} onClick={() => addRoom(true)} id='add-icon' />
        </div>
    )
};

export default AddRoomButton;