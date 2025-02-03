import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Added axios import

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handleFormSubmit = async (data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      reset(); // Reset form fields if passwords don't match
      return;
    }

    try {
      // Send POST request to backend for user registration
      const response = await axios.post("https://digital-library-system-2.onrender.com/register", {
        username: data.username,
        full_name: data.full_name, // Added full_name field
        email: data.email,
        password: data.password,
        admin: data.admin || false, // Optional admin field
      });

      console.log("Registration response:", response.data);

      // Redirect to login page after successful registration
      navigate("/login");

      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration failed: ", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-[92vw] h-full flex justify-center items-center flex-col text-center text-white my-auto px-40 pb-5 font-Poppins mx-auto">
      <h3 className="font-bold text-4xl text-richgreen-300">Register</h3>
      <h4 className="text-xl my-2">Create your new account</h4>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="Full Name"
          {...register("full_name", { required: "Full Name is required" })}
        />
        {errors.full_name && <p className="text-red-500">{errors.full_name.message}</p>}
        
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email address" } })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="relative">
          <input
            className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <button
            className="absolute top-3 right-3 text-richYellow"
            onClick={(e) => {
              e.preventDefault();
              setPasswordShown(!passwordShown);
            }}
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <div className="relative">
          <input
            className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
            type={confirmPasswordShown ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: "Please confirm your password" })}
          />
          <button
            className="absolute top-3 right-3 text-richYellow"
            onClick={(e) => {
              e.preventDefault();
              setConfirmPasswordShown(!confirmPasswordShown);
            }}
          >
            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        <p className="text-xs my-2">
          By signing up you agree to our{" "}
          <span className="text-richgreen-100 underline">Terms & Conditions</span> and{" "}
          <span className="text-richgreen-100 underline">Privacy Policy</span>
        </p>
        <button
          type="submit"
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
        >
          Sign up
        </button>
      </form>
      <p className="text-base">
        Already have an Account?{" "}
        <Link to="/login">
          <span className="text-richYellow font-semibold">Log in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
