import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faApple,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./landing_style.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="content_wrapper">
        <div className="twitter_logo left_side">
          <FontAwesomeIcon
            className="twitter_logo"
            icon={faXTwitter}
            size="10x"
          />
        </div>

        <div className="right_side">
          <div className="join_container">
            <h1>Happening now</h1>
            <h2>Join today.</h2>
          </div>

          <div className="form_container">
            <button type="button" className="google_btn btn btn-outline-dark">
              <FontAwesomeIcon
                icon={faGoogle}
                size="s"
                style={{ color: "#ffb83d" }}
              />
              <span> Sign up with Google </span>
            </button>
            <button className="apple_btn btn btn-outline-dark ">
              <FontAwesomeIcon className="apple_icon" icon={faApple} size="s" />
              <span> Sign up with Apple </span>
            </button>
            <p className="or_divider">
              <span>or</span>
            </p>
            <button
              className="create_account_btn btn btn-primary"
              onClick={goToRegister}
            >
              Create Account
            </button>
            <small className="terms_text">
              By signing up, you agree to the <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>,
            </small>
            <small className="terms_text">
              including <a href="#">Cookie Use</a>.
            </small>
          </div>

          <div>
            <h3>Already have an account?</h3>
            <button
              className="sign_in_btn btn btn-outline-dark"
              onClick={goToLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#download">Download the X app</a>
          </li>
          <li>
            <a href="#help-center">Help Center</a>
          </li>
          <li>
            <a href="#terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="#privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="#cookie-policy">Cookie Policy</a>
          </li>
          <li>
            <a href="#accessibility">Accessibility</a>
          </li>
          <li>
            <a href="#ads-info">Ads info</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#careers">Careers</a>
          </li>
          <li>
            <a href="#brand-resources">Brand Resources</a>
          </li>
          <li>
            <a href="#advertising">Advertising</a>
          </li>
          <li>
            <a href="#marketing">Marketing</a>
          </li>
          <li>
            <a href="#x-for-business">X for Business</a>
          </li>
          <li>
            <a href="#developers">Developers</a>
          </li>
          <li>
            <a href="#directory">Directory</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#copyright">© 2024 X Corp.</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
