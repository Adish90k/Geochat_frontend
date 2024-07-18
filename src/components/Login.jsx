import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          alert(error.message);
          console.log("Error getting current location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!longitude || !latitude) {
      setError("Latitude and longitude are required for registration.");
      return;
    }

    try {
      const response = await axios.post(
        "https://geochat-backend-ttni.onrender.com/api/user/login",
        {
          email,
          password,
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.name));
      localStorage.setItem("userId", JSON.stringify(response.data._id));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setEmail("");
      setPassword("");
      setLongitude("");
      setLatitude("");
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
      console.log(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" value={longitude} disabled />
        </div>
        <div>
          <label>Latitude:</label>
          <input type="text" value={latitude} disabled />
        </div>

        <div id="login-button-controller">
          <button type="button" onClick={handleGetLocation}>
            Get Location
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!longitude || !latitude}
          >
            Login
          </button>
        </div>
        <div className="Register-btn-container">
          <span>New here ❓</span>
          <button onClick={()=>navigate("/register")}>Register Now</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
