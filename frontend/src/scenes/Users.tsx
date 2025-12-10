import React, { useEffect, useState } from 'react';
import '../styles/Users.css';
import User from './components/User';
import UserForm from './components/UserForm';
import { useUsers } from '../../hooks/useUsers.ts';

const Users = () => {
    //const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email: string, isAdmin: boolean}[]>([]);
    //const [users, setUsers] = useState<{id: number, first_name: string, last_name: string, email?: string, is_admin: boolean}[]>([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [editUser, setEditUser] = useState<number | null>(null);
    
    const {users, handleAddUser, handleEditUser, handleDeleteUser} = useUsers();

    const handleAddUserWrapper = async (first_name: string, last_name: string, email: string, is_admin: boolean) => {
        await handleAddUser(first_name, last_name, email, is_admin);
        setIsAddUserFormOpen(false);
    };

    const handleEditUserWrapper = async (first_name: string, last_name: string, email: string, is_admin: boolean) => {
        await handleEditUser(editUser ?? -1, first_name, last_name, email, is_admin);
        setEditUser(null);
    };

    return (
        <div className='users-container'>
            <div className='users-header'>
                <h1><span className='header-content'>{users.length}</span> {users.length !== 1 ? 'Users' : 'User'}</h1>
                <h1 id='header-add-user' onClick={() => setIsAddUserFormOpen(true)}>Add a user</h1>
            </div>
            <div className='users-table-header'>
                <p className='users-table-descriptor'>Name</p>
                <p className='users-table-descriptor'>Email</p>
                <p className='users-table-descriptor'>Authorization</p>
                <div className='padding'>
                    <button className='padding-button'>Edit</button>
                    <button className='padding-button'>Delete</button>
                </div>
            </div>
            <div className='users-rows'>
                {users.map((user, index) => (
                    editUser !== user.id ?
                        <User key={index} id={user.id} first_name={user.first_name} last_name={user.last_name} 
                                email={user.email} is_admin={user.is_admin} onEdit={setEditUser} onDelete={handleDeleteUser} />
                            :
                        <UserForm key={index} onSave={handleEditUserWrapper} onCancel={() => setEditUser(null)} 
                                    currentData={{first_name: user.first_name, last_name: user.last_name, email: user.email, is_admin: user.is_admin}}/> 
                ))}
                {!isAddUserFormOpen && <button onClick={() => setIsAddUserFormOpen(true)}>Add User</button>}
                {isAddUserFormOpen && (<UserForm onSave={handleAddUserWrapper} onCancel={setIsAddUserFormOpen} />)}
            </div>
        </div>
    )
};

export default Users;