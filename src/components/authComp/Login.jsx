import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      // Sending POST request to backend
      const response = await axios.post("https://digital-library-system-2.onrender.com/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login response: ", response.data);

      // Store the access token and user info in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Reset the form after successful submission
      reset();

      // Redirect to dashboard
      navigate("/dashboard");

      alert("Login successful!");

    } catch (error) {
      console.error("Login failed: ", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-[93vw] justify-center items-center text-white">
      <div className="text-center my-auto px-32 py-32 font-Poppins">
        <h3 className="font-bold text-4xl text-richgreen-300">Welcome Back</h3>
        <h4 className="text-xl my-2">Login to your account</h4>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
          <input
            className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
            type="email"
            placeholder="Email"
            required={true}
            {...register("email", { required: true })}
          />
          <div className="relative">
            <input
              className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              required={true}
              {...register("password", { required: true })}
            />
            <button
              className="absolute top-3 right-3 text-richYellow"
              onClick={() => setPasswordShown(!passwordShown)}
              type="button"
            >
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
          >
            Log In
          </button>
        </form>
        <p className="text-base">
          Don’t have an Account? <br />
          <Link to="/signup">
            <span className="text-richYellow cursor-pointer">Create Account</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
