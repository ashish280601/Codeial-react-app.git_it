import porpTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { toggleLike } from '../api';
import { useToasts} from 'react-toast-notifications';
const Comment = ({ comment }) => {
  const{addToast}=useToasts();
  const handleLike = async () => {
    const response = await toggleLike('Comment', comment._id);
    if (response.success) {
      if (response.data.deleted) {
        addToast('Like removed Successfully', {
          appearance: 'success',
        });
      } else {
        addToast('Like Added Successfully', {
          appearance: 'success',
        });
      }
      // posts.ToggleLike(post._id);
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };
  return (
    <>
      {/* // <div className={styles.postCommentsItem} key={`comment-${comment._id}`}>
    // </div> */}
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <button onClick={handleLike}>
          <img
            style={{ height: 10, cursor: 'pointer' }}
            src="https://cdn-icons-png.flaticon.com/512/10520/10520531.png"
            alt="likes-icon"
          />
        </button>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </>
  );
};

Comment.propTypes = {
  comment: porpTypes.object.isRequired,
};
export default Comment;