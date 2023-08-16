import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Comment from './Comment';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { createComment, toggleLike } from '../api';
const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingCommnet] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingCommnet(true);
      const response = await createComment(comment, post._id);
      if (response.success) {
        setComment('');
        posts.addCommnet(response.data.comment, post._id);
        addToast('Comment Added Successfully', {
          appearance: 'success',
        });
      } else {
        // console.log(response.message);
        addToast(response.message, {
          appearance: 'error',
        });
      }
      setCreatingCommnet(false);
    }
  };

  const handlePostLikeClick=async()=>{
    posts.ToggleLike(post._id);
    const response=await toggleLike('Post',post._id);
    if (response.success) {
      if(response.data.deleted){
        addToast('Like removed Successfully', {
          appearance: 'success',
        });
      }
      else{
        addToast('Like Added Successfully', {
          appearance: 'success',
        });
      }
      posts.ToggleLike(post._id);
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  }


  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/user/${post.user._id}`}
              state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/10520/10520531.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2207/2207562.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Post;