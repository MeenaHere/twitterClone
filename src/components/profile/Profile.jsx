/* import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";
<<<<<<< HEAD
 */
function Profile() {
  return (
    <div className="container">
      <div className="">
        {/* <ProfileInfo /> */}
        {/* Add Trend component here */}
=======
import Trends from "./Trends";
import Tweets from "./Tweets";

function Profile() {
  return (
    <div className="container">
      <div className="row">
        <ProfileInfo />
        <Trends />
>>>>>>> b74b016fc01f8ac5113310a1f3d17cd690636057
      </div>
      <Tweets />
    </div>
  );
}

export default Profile;
