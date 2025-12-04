import React, {useState} from 'react';

interface UserFormProps {
    onSave: (firstName: string, lastName: string, email: string, isAdmin: boolean) => void;
    onCancel: (isAddUserFormOpen: boolean) => void;
    currentData?: {firstName?: string, lastName?: string, email?: string, isAdmin?: boolean};
}

const UserForm = ({ onSave, onCancel, currentData }: UserFormProps) => {
    const [firstName, setFirstName] = useState<string>(currentData?.firstName || '');
    const [lastName, setLastName] = useState<string>(currentData?.lastName || '');
    const [email, setEmail] = useState<string>(currentData?.email || '');
    const [isAdmin, setIsAdmin] = useState<boolean>(currentData?.isAdmin || false);

    return (
        <div>
  
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={firstName} />
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={lastName} />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type='checkbox' name='adminCheckbox' onChange={e => setIsAdmin(e.target.checked)} checked={isAdmin} />
                <label htmlFor='adminCheckbox'>Admin</label>
                <button onClick={() => onSave(firstName, lastName, email, isAdmin)} type="submit">Save</button>
                <button onClick={() => onCancel(false)}>Cancel</button>

        </div>
    )
};

export default UserForm;