import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    profession: "",
    hometown: "",
    description: "",
    website: "",
    picture: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData with the new field value
  };

  const handlePictureChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] }); // Update formData with the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Use FormData for multipart/form-data

    // Append the form fields to formDataToSend
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post("/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }, // Indicate the content type for file uploads
      });

      console.log("Registration successful:", response.data);

      if (response.status === 201) {
        navigate("/login"); // Navigate to the login page upon successful registration
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      console.error("Error during registration:", errorMessage);
      alert("Registration failed: " + errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header text-center">User Registration</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Profession:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="profession"
                    required
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Hometown:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hometown"
                    required
                    value={formData.hometown}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Website:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Profile Picture:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="picture"
                    onChange={handlePictureChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
