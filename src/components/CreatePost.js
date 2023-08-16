import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';
const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts =usePosts();
  const handleAddPostClick = async () => {
    setAddingPost(true);
    if (post === '') {
      addToast('Post Cannot be Empty', {
        appearance: 'error',
      });
      setAddingPost(false);
      return;
    }
    const response = await addPost(post);
    if(response.success){
      posts.addPostToState(response.data.post);
      setPost('');  
      addToast('Post Added Successfully', {
        appearance: 'success',
      });
    }
    else{
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setAddingPost(false);
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};
export default CreatePost;