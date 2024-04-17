import ProfileInfo from "./ProfileInfo";
import "bootstrap/dist/css/bootstrap.css";

function Profile() {
  return (
    <div className="container">
      <div className="">
        <ProfileInfo />
        {/* Add Trend component here */}
      </div>
      {/* Add Tweet component here */}
    </div>
  );
}

export default Profile;
