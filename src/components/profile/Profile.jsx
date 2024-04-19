import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";
import Trends from "./Trends";
import Tweets from "./Tweets";

function Profile() {
  return (
    <div className="container">
      <div className="row">
        <ProfileInfo />
        <Trends />
      </div>
      <Tweets />
    </div>
  );
}

export default Profile;
