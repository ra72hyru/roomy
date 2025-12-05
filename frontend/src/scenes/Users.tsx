import React, { use, useState } from 'react';
import '../styles/Users.css';
import User from './components/User';
import UserForm from './components/UserForm';

const Users = () => {
    //const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email: string, isAdmin: boolean}[]>([]);
    const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email?: string, isAdmin: boolean}[]>([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [editUser, setEditUser] = useState<number | null>(null);
    
    const handleAddUser = async (firstName: string, lastName: string, email: string, isAdmin: boolean): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/add-user', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({first_name: firstName, last_name: lastName, email: email, is_admin: isAdmin, username: firstName, password: lastName})
            });

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                setUsers([...users, {id: retData.id, firstName: firstName, lastName: lastName, email: email, isAdmin: isAdmin}]);
                setIsAddUserFormOpen(false);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleEditUser = async (firstName: string, lastName: string, email: string, isAdmin: boolean) => {
        try {
            const response = await fetch('http://localhost:8000/edit-user', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: editUser, first_name: firstName, last_name: lastName, email: email, is_admin: isAdmin})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setUsers(users.map((user) => user.id === editUser ? {...user, firstName, lastName, email, isAdmin} : user ));
                setEditUser(null);
            }
        } catch (err) {
            console.log({id: editUser, first_name: firstName, last_name: lastName, email: email, is_admin: isAdmin});
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
                        <User key={index} id={user.id} firstName={user.firstName} lastName={user.lastName} 
                                email={user.email} isAdmin={user.isAdmin} onEdit={setEditUser} onDelete={handleDeleteUser} />
                            :
                        <UserForm key={index} onSave={handleEditUser} onCancel={() => setEditUser(null)} 
                                    currentData={{firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin}}/> 
                ))}
                {!isAddUserFormOpen && <button onClick={() => setIsAddUserFormOpen(true)}>Add User</button>}
                {isAddUserFormOpen && (<UserForm onSave={handleAddUser} onCancel={setIsAddUserFormOpen} />)}
            </div>
        </div>
    )
};

export default Users;