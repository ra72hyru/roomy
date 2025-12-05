import {useState} from 'react';
import '../../styles/components/User.css';

interface UserProps {
    firstName: string;
    lastName: string;
    email?: string;
    isAdmin: boolean;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const User = ({ firstName, lastName, email, isAdmin, onEdit, onDelete }: UserProps) => {

    return (
        <div className='user'>
            <p className='user-info'>{firstName}</p>
            <p className='user-info'>{lastName}</p>
            <p className='user-info'>{email}</p>
            <p className='user-info'>{isAdmin ? 'Admin' : 'User'}</p>
            {/* <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button> */}
        </div>
    )
};

export default User;