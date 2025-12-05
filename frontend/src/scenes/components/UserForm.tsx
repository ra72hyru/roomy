import React, {useState} from 'react';

interface UserFormProps {
    onSave: (first_name: string, last_name: string, email: string, is_admin: boolean) => void;
    onCancel: (isAddUserFormOpen: boolean) => void;
    currentData?: {first_name?: string, last_name?: string, email?: string, is_admin?: boolean};
}

const UserForm = ({ onSave, onCancel, currentData }: UserFormProps) => {
    const [first_name, setFirstName] = useState<string>(currentData?.first_name || '');
    const [last_name, setLastName] = useState<string>(currentData?.last_name || '');
    const [email, setEmail] = useState<string>(currentData?.email || '');
    const [is_admin, setIsAdmin] = useState<boolean>(currentData?.is_admin || false);

    return (
        <div>
  
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={first_name} />
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={last_name} />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type='checkbox' name='adminCheckbox' onChange={e => setIsAdmin(e.target.checked)} checked={is_admin} />
                <label htmlFor='adminCheckbox'>Admin</label>
                <button onClick={() => onSave(first_name, last_name, email, is_admin)} type="submit">Save</button>
                <button onClick={() => onCancel(false)}>Cancel</button>

        </div>
    )
};

export default UserForm;