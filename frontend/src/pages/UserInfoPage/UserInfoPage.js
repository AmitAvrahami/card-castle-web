import React, { useState } from "react";
import "../../pages/UserInfoPage/UserInfoPage.css";
import UserInfo from "../../components/UserInfo/UserInfo";
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../components/context/userContext";
import { deleteUser } from "../../services/userService";
import Notification from "../../components/Notification/Notification";

const UserInfoPage = () => {
  const { user, setUser } = useUserContext();
  const [message, setMessage] = useState({
    message: "",
    messageType: "",
  });

  const handleOnClickRemoveAccount = async () => {
    try {
      const response = await deleteUser(user._id);
      console.log("Delete response:", response);
      if (response.message === "User not found") {
        setMessage({ message: response.message, messageType: "error" });
      } else {
        setMessage({ message: response.message, messageType: "success" });
        setUser(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage({
        message: "An error occurred while deleting the user.",
        messageType: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setMessage({ message: "", messageType: "" });
  };

  return (
    <div className="user-info-page-container">
      <NavScrollBar />
      <div className="user-info-container">
        {user && <UserInfo user={user} setUser={setUser} />}
        {!user && (
          <h2 className="no-user-message" style={{ marginTop: "10%" }}>
            There is no user logged in.
          </h2>
        )}
      </div>
      <div className="remove-account-btn">
        {user && (
          <Button onClick={handleOnClickRemoveAccount}>Remove Account</Button>
        )}
      </div>
      {message.message && (
        <Notification
          message={message.message}
          type={message.messageType}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default UserInfoPage;
