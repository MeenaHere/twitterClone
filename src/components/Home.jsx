import Tweetbox from './Tweetbox.jsx';
import GetAllPosts from './GetAllPosts.jsx';
const Home = () => {
    return (
        <div className="container-home">
            <Tweetbox />
            <GetAllPosts />
        </div>
    );
} 

export default Home;