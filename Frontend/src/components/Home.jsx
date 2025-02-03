import React from "react";
import book from "../assets/BookIcon.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="py-10 relative min-w-[90vw]">
      <button
        onClick={() => nav("/login")}
        className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl w-fit font-bold p-2 px-7 rounded-lg absolute right-5"
      >
        Login
      </button>
      <div className="ml-20 px-16 py-28 text-white flex flex-col gap-6">
        <h1 className="font-orbitron text-5xl font-bold ">
          GOOD <span className="text-richYellow">BOOKS</span>{" "}
        </h1>
        <div className="flex flex-row font-orbitron text-9xl font-bold">
          <h1>LIBR</h1>
          <img src={book} className="w-44" />
          <h1>ARY</h1>
        </div>

        <p className="text-xl font-saira">
          Dive into our extensive collection of literary treasures. From
          timeless classics to <br />
          contemporary bestsellers, we have something for every reader. Whether
          you're <br />
          seeking thrilling mysteries, heartwarming romances, or
          thought-provoking <br />
          non-fiction, our library is your gateway to endless adventures.
        </p>
        <button
          onClick={() => nav("/login")}
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl w-fit font-bold p-2 px-5 rounded-lg"
        >
          Start Borrowing!!
        </button>
      </div>
    </div>
  );
};

export default Home;
