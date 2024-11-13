import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

axios.defaults.baseURL = "https://twitter-clone-backend-jdzg.onrender.com/";

const RegisterUser = () => {

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", formData, {
        headers: { "Content-Type": "application/json" }, // Send as JSON
      });
      console.log("Registration response:", response);
      console.log("Registration successful:", response.data);

      if (response.status === 201) {
        navigate("/"); // Navigate to the login page upon successful registration
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      console.error("Error during registration:", errorMessage);
      alert("Registration failed: " + errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="card-header text-center">
              {" "}
              <p>
                <strong>X</strong>
              </p>
              <p>User Registration</p>
            </h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm slim-input"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <label>Username</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="password"
                    className="form-control form-control-sm slim-input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label>Password</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control form-control-sm slim-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm slim-input"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <label>Full Name</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm slim-input"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  />
                  <label>Profession</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm slim-input"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                    required
                  />
                  <label>Hometown</label>
                </div>

                <div className="form-floating mb-2">
                  <textarea
                    className="form-control form-control-sm slim-input"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <label>Description</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control form-control-sm slim-input"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                  <label>Website</label>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn register_btn btn-outline-dark"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
