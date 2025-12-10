import {useState} from 'react';
import '../../styles/components/UserForm.css';

interface UserFormProps {
    onCancel: (isAddUserFormOpen: boolean) => void;
    onSave: (first_name: string, last_name: string, email: string, is_admin: boolean) => void;
    currentData?: {first_name?: string, last_name?: string, email?: string, is_admin?: boolean};
}

const UserForm = ({ onSave, onCancel, currentData }: UserFormProps) => {
    const [first_name, setFirstName] = useState<string>(currentData?.first_name || '');
    const [last_name, setLastName] = useState<string>(currentData?.last_name || '');
    const [email, setEmail] = useState<string>(currentData?.email || '');
    const [is_admin, setIsAdmin] = useState<boolean>(currentData?.is_admin || false);

    return (
        <div className='user-form-container'>
  
                <input className='user-form-input' type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} value={first_name} />
                <input className='user-form-input' type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} value={last_name} />
                <input className='user-form-input' type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                <div className='user-form-checkbox-wrapper'>
                    <input className='user-form-checkbox' type='checkbox' name='adminCheckbox' onChange={e => setIsAdmin(e.target.checked)} checked={is_admin} />
                    <label htmlFor='adminCheckbox'>Admin</label>
                </div>
                <div className='user-form-buttons'>
                    <button onClick={() => onSave(first_name, last_name, email, is_admin)} type="submit">{currentData ? 'Save' : 'Add'}</button>
                    <button onClick={() => onCancel(false)}>Cancel</button>
                </div>

        </div>
    )
};

export default UserForm;