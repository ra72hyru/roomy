import React, {useState} from 'react';

interface UserFormProps {
    addUser: (firstName: string, lastName: string, email: string, isAdmin: boolean) => void;
}

const UserForm = ({ addUser }: UserFormProps) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    return (
        <div>
  
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type='checkbox' name='adminCheckbox' onChange={e => setIsAdmin(e.target.checked)} />
                <label htmlFor='adminCheckbox'>Admin</label>
                <button onClick={() => addUser(firstName, lastName, email, isAdmin)} type="submit">Submit</button>

        </div>
    )
};

export default UserForm;