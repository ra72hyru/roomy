import { useEffect, useState } from "react";

const url = 'http://localhost:8000';

interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    username: string;
    password: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
            const response = await fetch(`${url}/users`);

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
        })();
    }, []);

    const handleAddUser = async (first_name: string, last_name: string, email: string, is_admin: boolean): Promise<void> => {
        try {
            const response = await fetch(`${url}/add-user`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({first_name: first_name, last_name: last_name, email: email, is_admin: is_admin, username: first_name, password: last_name})
            });

            if (!response.ok)
                throw new Error();
            else {
                const retData = await response.json();
                setUsers(prev => [...prev, {id: retData.id, first_name: first_name, last_name: last_name, email: email, is_admin: is_admin, username: first_name, password: last_name}]);
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleEditUser = async (editUserID: number, first_name: string, last_name: string, email: string, is_admin: boolean) => {
        try {
            const response = await fetch(`${url}/edit-user`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: editUserID, first_name: first_name, last_name: last_name, email: email, is_admin: is_admin})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setUsers(prev => prev.map((user) => user.id === editUserID ? {...user, first_name, last_name, email, is_admin} : user ));
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            const response = await fetch(`${url}/delete-user`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: id})
            });

            const retData = await response.json();
            if (!response.ok)
                throw new Error(retData.message);
            else {
                setUsers(prev => prev.filter(user => user.id !== id));
            }
        } catch (err) {
            console.log((err as Error).message);
        }
    }; 

    return {users, handleAddUser, handleEditUser, handleDeleteUser};
};