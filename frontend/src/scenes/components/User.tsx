import {useState} from 'react';
import '../../styles/components/User.css';

interface UserProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
}

const User = ({ id, firstName, lastName, email, isAdmin }: UserProps) => {
    const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);

    return (
        <div className='user'>
            {isBeingEdited ? <input /> : <p>{firstName}</p>}
            {isBeingEdited ? <input /> : <p>{lastName}</p>}
            {isBeingEdited ? <input /> : <p>{email}</p>}
            {isBeingEdited ? <input /> : <p>{isAdmin ? 'Admin' : 'User'}</p>}
            {!isBeingEdited && <button onClick={() => setIsBeingEdited(true)}>Edit</button>}
        </div>
    )
};

export default User;