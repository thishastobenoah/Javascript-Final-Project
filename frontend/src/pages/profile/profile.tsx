import { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

export function Profile() {
  const [username, setUsername] = useState("User");
  const [newUsername, setNewUsername] = useState("");

  const handleChangeUsername = () => {
    // Here you can implement the logic to update the username
    setUsername(newUsername);
    // You might want to make an API call to update the username on the server
    // After successful update, you can display a success message or perform any other action
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {username || "User"}!</h2>
      <div className="username-form">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter new username"
        />
        <button onClick={handleChangeUsername}>Change Username</button>
      </div>
      <Link className="home" to="/">Go to Home</Link>
    </div>
  );
}
