import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteAFollower,
  deleteAFollowing,
  getAllFollowers,
  postAFollower,
  postAFollowing,
} from "../../userServices";

function ProfileButton({
  id,
  isFollowingStatus,
  loggedInUserId,
  showButton,
  setTweetComponentVisibility,
  setFollowers,
}) {
  const [isFollowing, setIsFollowing] = useState(isFollowingStatus);

  useEffect(() => {
    setIsFollowing(isFollowingStatus);
  }, [isFollowingStatus]);

  // Function to add follower and following
  const addFollowerFollowing = async (loggedInUserId, id) => {
    const newFollower = { followerId: loggedInUserId };
    const newFollowing = { followingId: id };
    try {
      await postAFollower(id, newFollower);
      await postAFollowing(loggedInUserId, newFollowing);
      setTweetComponentVisibility(false); // Show tweet component after successful deletion
      const updatedFollowers = await getAllFollowers(id);
      setFollowers(updatedFollowers);
    } catch (error) {
      console.error("Error adding follower and following:", error);
    }
  };

  // Function to remove follower and following
  const removeFollowerFollowing = async (id, loggedInUserId) => {
    try {
      await deleteAFollower(id, loggedInUserId);
      await deleteAFollowing(loggedInUserId, id);
      setTweetComponentVisibility(false); // Hide tweet component after successful deletion
      const updatedFollowers = await getAllFollowers(id);
      setFollowers(updatedFollowers);
    } catch (error) {
      console.error("Error deleting follower and following:", error);
    }
  };

  // Function to handle click on follow/unfollow button
  const handleLinkClick = async () => {
    //window.location.reload();
    try {
      if (isFollowing) {
        await removeFollowerFollowing(id, loggedInUserId);
        setIsFollowing(false); // Update isFollowing state after successfull deletion
      } else {
        await addFollowerFollowing(loggedInUserId, id);
        setIsFollowing(true); // Update isFollowing state after successful addition
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <>
      {!showButton && (
        <Link
          className="btn btn-primary text-white flex-col-reverse mt-4 rounded-5 px-4 py-2"
          onClick={handleLinkClick}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Link>
      )}
    </>
  );
}

export default ProfileButton;
