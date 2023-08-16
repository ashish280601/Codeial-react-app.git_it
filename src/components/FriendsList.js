import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
const FriendsList = () => {
  const auth = useAuth();
  // destructing the friends array
  const { friends = [] } = auth.user;
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends&&friends.length===0&&<div className={styles.noFriends}>Make Some Friends !</div>}
      {friends&& friends?.map((friend)=><div key={`Friend-${friend._id}`}>
        <Link className={styles.friendsItem}to={`/user/${friend._id}`}>
          <div className={styles.friendsImg}>
              <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt=''/>
          </div>
          <div className={styles.friendsName}>{friend.to_user.email}</div>
        </Link>
      </div>)}
    </div>
  );
};
export default FriendsList;