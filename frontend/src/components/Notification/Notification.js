// src/components/Notification.js
import React from "react";
import "./Notification.css"; // ייתכן שצריך לשנות את הנתיב לפי מבנה הפרויקט שלך

const Notification = ({ message, type, onClose }) => {
  if (!message) return null; // אם אין הודעה, אל תציג את הרכיב

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Notification;
