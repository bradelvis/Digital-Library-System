import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../service/Auth Operations/BookOperations";

const AddBooks = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const handleFormSubmit = async (data) => {
    const formDate = new FormData();
    formDate.append("title", data.title);
    formDate.append("author", data.author);
    formDate.append("description", data.description);
    formDate.append("isbn", data.isbn);
    formDate.append("genre", data.genre);
    formDate.append("copies", data.copies);
    formDate.append("bookImage", data.bookImage[0]);

    const response = await dispatch(addBook(formDate, token));

    //eslint-disable-next-line
  };
  return (
    <div className="w-[92vw] h-full flex justify-center items-center flex-col text-center text-white my-auto px-40 pb-5 font-Poppins mx-auto">
      <h3 className="font-bold text-4xl text-richgreen-300 mb-3">Add Book</h3>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="title"
          required={true}
          {...register("title", { required: true })}
        />
        {/* {errors.name && <p className="text-red-500">Name is required</p>} */}
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="author"
          required={true}
          {...register("author", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="description"
          required={true}
          {...register("description", { required: true })}
        />
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="genre"
          required={true}
          {...register("genre", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="isbn"
          required={true}
          {...register("isbn", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="number"
          placeholder="copies"
          required={true}
          {...register("copies", { required: true })}
        />

        <input
          type="file"
          className="text-white w-[20rem]"
          {...register("bookImage", { required: true })}
        />

        <button
          type="submit"
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
