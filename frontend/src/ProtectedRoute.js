// frontend/src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./components/context/userContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { user } = useUserContext();

    console.log("User in ProtectedRoute:", user);

    // Handle the case where user data is still loading
    if (user === null) {
        return <div>Loading...</div>; // or a loading spinner
    }

    // Check if the user is logged in and is an admin
    if (user.role !== "Admin") {
        // Redirect to home page or a forbidden page
        return <Navigate to="/" />;
    }

    return <Element {...rest} />;
};

export default ProtectedRoute;
