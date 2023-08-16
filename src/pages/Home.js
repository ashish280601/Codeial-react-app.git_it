import styles from '../styles/home.module.css';
// import propTypes from 'prop-types';
import { CreatePost, FriendsList, Loader, Post } from '../components';
import { useAuth, usePosts } from '../hooks';
// destructuring the props
const Home = () => {
  const auth = useAuth();
   const posts=usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
      <CreatePost/>
        {posts.data?.map((post) => (
          <Post post={post} key={`post-${post._id}`}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

// setting the type of prop we are getting in this object we list all the props we are getting
// Home.propTypes={
//   // here we defining the name of the prop and its type also its required or not when we use the component
//   posts:propTypes.array.isRequired,
// }
export default Home;