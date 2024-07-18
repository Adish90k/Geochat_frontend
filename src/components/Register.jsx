import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.log("Error getting current location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longitude || !latitude) {
      setError("Latitude or longitude is null. Request not sent.");
      return;
    }

    if (!name || !email || !password) {
      setError("Please fill in all the required fields.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("https://geochat-backend-ttni.onrender.com/api/user/register", {
        name,
        email,
        password,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      });


      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");
      setLongitude("");
      setLatitude("");
      // navigate('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="register-container">
     
      <form className="register-form">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div id="register-button-controller">
        <button type="button" onClick={handleGetLocation}>Get Location</button>
        <button type="submit" onClick={handleSubmit} disabled={!longitude || !latitude}>
          Register
        </button>
        </div>
      </form>
      
    </div>
  );
};

export default Register;
