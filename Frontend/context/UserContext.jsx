import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../apiConnector";  // Assuming you've defined this utility
import { endpoints } from "../apis";  // Your API endpoints (like login, signup)

export const UserContext = createContext();

const initialState = {
  authToken: localStorage.getItem("authToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, authToken: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null, authToken: null };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(true); // To handle the initial loading state

  // ================================ LOGIN =====================================
  const login = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await apiConnector("POST", endpoints.login, data);
      if (response.status === 200) {
        // Store user and token in localStorage
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Dispatch to context state
        dispatch({ type: "SET_USER", payload: response.data.user });
        dispatch({ type: "SET_TOKEN", payload: response.data.access_token });

        toast.success("Successfully logged in");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Error logging in");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ SIGNUP =====================================
  const signUp = async (data) => {
    const toastId = toast.loading("Signing up...");
    try {
      const response = await apiConnector("POST", endpoints.signup, data);
      if (response.status === 201) {
        toast.success("Successfully signed up");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      toast.error("Error signing up");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ LOGOUT =====================================
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch({ type: "CLEAR_USER" });
    toast.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  // ================================ FETCH CURRENT USER =====================================
  useEffect(() => {
    if (state.authToken) {
      fetchCurrentUser();
    } else {
      setLoading(false); // If no authToken, stop loading
    }
  }, [state.authToken]);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiConnector("GET", endpoints.currentUser, {
        Authorization: `Bearer ${state.authToken}`,
      });

      if (response.status === 200) {
        // Store user data in context state
        dispatch({ type: "SET_USER", payload: response.data });
        setLoading(false); // Data fetched, stop loading
      } else {
        logout(); // If user not found, log out
      }
    } catch (error) {
      logout(); // If any error occurs, log out
      console.error(error);
    }
  };

  // Provide context to children
  const value = {
    user: state.user,
    authToken: state.authToken,
    login,
    signUp,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext in components
export const useUser = () => useContext(UserContext);
