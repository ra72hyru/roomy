import React, { use, useState } from 'react';
import '../styles/Users.css';
import User from './components/User';
import UserForm from './components/UserForm';

const Users = () => {
    const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email: string, isAdmin: boolean}[]>([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [id, setId] = useState<number>(0);

    const handleAddUser = (firstName: string, lastName: string, email: string, isAdmin: boolean) => {
        setUsers([...users, {id: id, firstName, lastName, email, isAdmin}]); 
        setId(prev => prev + 1);
        setIsAddUserFormOpen(false);
    };


    return (
        <div className='users-container'>
            <div className='users-header'>

            </div>
            <div className='users-rows'>
                {users.map((user, index) => (
                    <User key={index} id={user.id} firstName={user.firstName} lastName={user.lastName} 
                            email={user.email} isAdmin={user.isAdmin} />
                ))}
                {!isAddUserFormOpen && <button onClick={() => setIsAddUserFormOpen(true)}>Add User</button>}
                {isAddUserFormOpen && (<UserForm addUser={handleAddUser} />)}
            </div>
        </div>
    )
};

export default Users;