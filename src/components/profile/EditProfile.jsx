import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getOneUser, updateUser } from "../../userServices";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  //get a user data from db by using userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbuser = await getOneUser(id);
        setUser(dbuser);
        console.log("dbuser", dbuser);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //update user data in backend
    const updatedUser = await updateUser(id, user);

    //set the updated user data in frontend
    setUser(updatedUser);

    //navigate back to user profile with updated data
    navigate(`/users/${id}`);
  };

  return (
    <Container className="mt-4">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your bio"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formWebsite">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your website"
            value={user.webLik}
            onChange={(e) => setUser({ ...user, webLink: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
