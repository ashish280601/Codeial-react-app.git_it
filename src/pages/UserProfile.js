import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
const UserProfile = () => {
  // const location=useLocation();  // by this hook we can grab the user details passed in link inside the home component
  // const {user={}}=location.state;
  // console.log('location',user);
  const [user, setUser] = useState({});
  const [Loading, setLoading] = useState(true);
  const [request, setRequest] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const { addToast } = useToasts();

  // getting user via api call
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return navigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, addToast, navigate]);

  if (Loading) {
    return <Loader />;
  }

  // cheching is user is a freind or not
  const checkIfUserIsAFreind = () => {
    const freinds = auth.user.friends;
    const freindIds = freinds?.map((friend) => friend.to_user._id); // stroing the freind in the array by fetching from to_user
    const index = freindIds?.indexOf(userId);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  // Addfreind functionality
  const handleAddfriendClick = async () => {
    setRequest(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = await response.data;
      auth.updateUserFriends(true, friendship);
      addToast('Freind Added Successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequest(false);
  };

  // remove freind functionality
  const handleRemovefriendClick = async () => {
    setRequest(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship=auth.user.friends?.filter((friend)=>friend.to_user._id===userId );
      auth.updateUserFriends(false, friendship[0]);
      addToast('Freind removed Successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequest(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="profile-pic"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFreind() ? (
          <button className={`button ${styles.saveBtn}`} disabled={request}
          onClick={handleRemovefriendClick}
          >
            {request ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddfriendClick}
            disabled={request}
          >
            {request ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};
export default UserProfile;