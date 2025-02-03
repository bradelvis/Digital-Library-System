import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser, setToken } from "../../slices/userSlice";
import toast from "react-hot-toast";

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    try {
      // Send login request to backend
      const response = await apiConnector(
        "POST",
        endpoints.login,
        data
      );

      if (response.status === 200) {
        console.log("LOGIN RESPONSE: ", response);

        // Dispatch the user and token to Redux store
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.access_token));

        toast.success("Successfully Logged in");
        navigate("/dashboard");  // Redirect to dashboard after successful login
      }
    } catch (err) {
      console.log(err);
      toast.error("Error logging in");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function signUp(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    try {
      // Send sign-up request to backend
      const response = await apiConnector(
        "POST",
        endpoints.signup,
        data
      );

      if (response.status === 201) {
        console.log("SIGNUP RESPONSE: ", response);
        toast.success("Successfully Signed up");
        navigate("/login");  // Redirect to login page after successful signup
      }
    } catch (err) {
      console.error("Error signing up:", err);
      toast.error("Error signing up");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
