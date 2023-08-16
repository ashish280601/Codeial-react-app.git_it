import { useState } from 'react';
import { useAuth} from '../hooks';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/settings.module.css'

  
const Settings = () => {
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const { addToast } = useToasts();  // this is the custom hook

    const clearForm=()=>{
        setPassword('');
        setConfirmPassword('');
    }
    const updateProfile = async () => {
        setSavingForm(true);
        let error = false;
        if (!name || !password || !confirmPassword) {
            addToast('Please fill All the fields... ',{
                appearance: 'error'
            })
            error = true;
        }
        if (password !== confirmPassword) {
            addToast('Password And Confirm Password Not Matching...', {
                appearance: 'error'
            })
            error = true;
        }
        if (error) {
            return setSavingForm(false);
        }
        const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);
        console.log('settings response', response);
        if (response.success) {
            setEditMode(false);
            setSavingForm(false);
            clearForm();
            return addToast('Profile Updated ', {
                appearance: 'success'
            })
        } else {
             addToast(response.message, {
                appearance: 'error'
            })
        }
         setSavingForm(false);
    };
    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt='profile-pic' />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {editMode ?
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    :
                    <div className={styles.fieldValue}>{auth.user?.name}</div>
                }
            </div>


            {editMode && <div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Password</div>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Confirm Password</div>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

            </div>}


            {editMode ?
                <>
                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm} >
                            {savingForm ? 'Saving Profile...' : 'Save Profile'}
                        </button>
                    </div>
                    <div className={styles.btnGrp}>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>Go Back</button>
                    </div>
                </>
                :
                <div className={styles.btnGrp}>
                    <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            }



        </div>
    );
}
export default Settings;