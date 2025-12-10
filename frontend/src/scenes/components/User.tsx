import {useState} from 'react';
import '../../styles/components/User.css';

interface UserProps {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    is_admin: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const User = ({ id, first_name, last_name, email, is_admin, onEdit, onDelete }: UserProps) => {

    return (
        <div className='user'>
            <p className='user-info'>{first_name} {last_name}</p>
           {/*  <p className='user-info'>{last_name}</p> */}
            <p className='user-info'>{email}</p>
            <p className='user-info'>{is_admin ? 'Admin' : 'User'}</p>
            <div className='user-buttons'>
                <button onClick={() => onEdit(id)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    )
};

export default User;