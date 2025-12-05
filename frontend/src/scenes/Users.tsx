import React, { useEffect, useState } from 'react';
import '../styles/Users.css';
import User from './components/User';
import UserForm from './components/UserForm';

const Users = () => {
    //const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email: string, isAdmin: boolean}[]>([]);
    const [users, setUsers] = useState<{id: number, first_name: string, last_name: string, email?: string, is_admin: boolean}[]>([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [editUser, setEditUser] = useState<number | null>(null);
    
    const getUsers = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/users');

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                console.log(retData.users);
                setUsers(retData.users);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleAddUser = async (first_name: string, last_name: string, email: string, is_admin: boolean): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/add-user', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({first_name: first_name, last_name: last_name, email: email, is_admin: is_admin, username: first_name, password: last_name})
            });

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                setUsers([...users, {id: retData.id, first_name: first_name, last_name: last_name, email: email, is_admin: is_admin}]);
                setIsAddUserFormOpen(false);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleEditUser = async (first_name: string, last_name: string, email: string, is_admin: boolean) => {
        try {
            const response = await fetch('http://localhost:8000/edit-user', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: editUser, first_name: first_name, last_name: last_name, email: email, is_admin: is_admin})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setUsers(users.map((user) => user.id === editUser ? {...user, first_name, last_name, email, is_admin} : user ));
                setEditUser(null);
            }
        } catch (err) {
            console.log({id: editUser, first_name: first_name, last_name: last_name, email: email, is_admin: is_admin});
            console.log((err as Error).message);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            const response = await fetch('http://localhost:8000/delete-user', {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: id})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setUsers(users.filter(user => user.id !== id));
            }
        } catch (err) {
            console.log(id);
            console.log((err as Error).message);
        }
    } 

    return (
        <div className='users-container'>
            <div className='users-header'>

            </div>
            <div className='users-rows'>
                {users.map((user, index) => (
                    editUser !== user.id ?
                        <User key={index} id={user.id} first_name={user.first_name} last_name={user.last_name} 
                                email={user.email} is_admin={user.is_admin} onEdit={setEditUser} onDelete={handleDeleteUser} />
                            :
                        <UserForm key={index} onSave={handleEditUser} onCancel={() => setEditUser(null)} 
                                    currentData={{first_name: user.first_name, last_name: user.last_name, email: user.email, is_admin: user.is_admin}}/> 
                ))}
                {!isAddUserFormOpen && <button onClick={() => setIsAddUserFormOpen(true)}>Add User</button>}
                {isAddUserFormOpen && (<UserForm onSave={handleAddUser} onCancel={setIsAddUserFormOpen} />)}
            </div>
        </div>
    )
};

export default Users;