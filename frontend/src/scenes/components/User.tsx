import {useState} from 'react';
import '../../styles/components/User.css';

interface UserProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    onEdit: (id: number) => void;
}

const User = ({ id, firstName, lastName, email, isAdmin, onEdit }: UserProps) => {

    return (
        <div className='user'>
            <p className='user-info'>{firstName}</p>
            <p className='user-info'>{lastName}</p>
            <p className='user-info'>{email}</p>
            <p className='user-info'>{isAdmin ? 'Admin' : 'User'}</p>
            <button onClick={() => onEdit(id)}>Edit</button>
        </div>
    )
};

export default User;