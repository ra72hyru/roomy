import React, { use, useState } from 'react';
import '../styles/Users.css';
import User from './components/User';
import UserForm from './components/UserForm';

const Users = () => {
    //const [users, setUsers] = useState<{id: number, firstName: string, lastName: string, email: string, isAdmin: boolean}[]>([]);
    const [users, setUsers] = useState<{firstName: string, lastName: string, email?: string, isAdmin: boolean}[]>([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [id, setId] = useState<number>(0);
    const [editUser, setEditUser] = useState<number | null>(null);

    const handleAddUser = async (firstName: string, lastName: string, email: string, isAdmin: boolean): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/add-user', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({first_name: firstName, last_name: lastName, email: email, is_admin: isAdmin, username: firstName, password: lastName})
            })

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                setUsers([...users, {firstName: retData.first_name, lastName: retData.last_name, email: retData.email, isAdmin: retData.is_admin}]);
                setIsAddUserFormOpen(false);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    /* const handleEditUser = (firstName: string, lastName: string, email: string, isAdmin: boolean) => {
        setUsers(users.map((user, index) => user.id === editUser ? {...user, firstName, lastName, email, isAdmin} : user ));
        setEditUser(null);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    } */

    return (
        <div className='users-container'>
            <div className='users-header'>

            </div>
            <div className='users-rows'>
                {users.map((user, index) => (
                    //editUser !== 100 ?
                        <User key={index} firstName={user.firstName} lastName={user.lastName} 
                                email={user.email} isAdmin={user.isAdmin} onEdit={setEditUser} /* onDelete={handleDeleteUser} */ />
                            //:
                        /* <UserForm key={index} onSave={handleEditUser} onCancel={() => setEditUser(null)} 
                                    currentData={{firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin}}/> */
                ))}
                {!isAddUserFormOpen && <button onClick={() => setIsAddUserFormOpen(true)}>Add User</button>}
                {isAddUserFormOpen && (<UserForm onSave={handleAddUser} onCancel={setIsAddUserFormOpen} />)}
            </div>
        </div>
    )
};

export default Users;