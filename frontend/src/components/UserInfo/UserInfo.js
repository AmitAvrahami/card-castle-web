// src/components/UserInfo.js
import React, { useState } from "react";
import "./UserInfo.css";
import {
  updateUser,
  verifyPassword,
  getUser,
} from "../../services/userService";
import Notification from "../../components/Notification/Notification";

const UserInfo = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [isEditing, setIsEditing] = useState({
    username: false,
    password: false,
    email: false,
  });

  console.log(password);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = async (field) => {
    try {
      if (field === "password") {
        const response = await verifyPassword(oldPassword, user, newPassword);
        if (!response) {
          setMessage("Old password is incorrect");
          setMessageType("error");
          return;
        }
        setUser(await getUser(user._id));
        setPassword(user.password);
        setOldPassword("");
        setNewPassword("");
        setMessage("Password changed successfully!");
        setMessageType("success");
      } else if (field === "email") {
        if (!validateEmail(email)) {
          setMessage("Invalid email format");
          setMessageType("error");
          return;
        }
        const updatedUser = { ...user, email };
        await updateUser(user._id, updatedUser);
        setMessage("Email changed successfully!");
        setMessageType("success");
        setUser(await getUser(user._id));
      } else {
        const updatedUser = { ...user };
        if (field === "username") {
          updatedUser.name = username;
        }
        await updateUser(user._id, updatedUser);
        setMessage(`${field} changed successfully!`);
        setMessageType("success");
        setUser(await getUser(user._id));
      }

      setIsEditing({ ...isEditing, [field]: false });
    } catch (error) {
      setMessage(`${field} update failed`);
      setMessageType("error");
      console.error("Update failed:", error);
    }
  };

  const handleChange = (e, setField) => {
    setField(e.target.value);
  };

  const handleCloseNotification = () => {
    setMessage("");
    setMessageType("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="user-info">
      <div className="info-item">
        {isEditing.username ? (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e, setUsername)}
            />
            <button onClick={() => handleSave("username")}>Save</button>
          </>
        ) : (
          <>
            <span>Username: {username}</span>
            <button onClick={() => handleEdit("username")}>
              Change Username
            </button>
          </>
        )}
      </div>
      <div className="info-item">
        {isEditing.password ? (
          <>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => handleChange(e, setOldPassword)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => handleChange(e, setNewPassword)}
            />
            <button onClick={() => handleSave("password")}>Save</button>
          </>
        ) : (
          <>
            <span>Password: ********</span>
            <button onClick={() => handleEdit("password")}>
              Change Password
            </button>
          </>
        )}
      </div>
      <div className="info-item">
        {isEditing.email ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
            />
            <button onClick={() => handleSave("email")}>Save</button>
          </>
        ) : (
          <>
            <span>Email: {email}</span>
            <button onClick={() => handleEdit("email")}>Change Email</button>
          </>
        )}
      </div>

      <Notification
        message={message}
        type={messageType}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default UserInfo;
