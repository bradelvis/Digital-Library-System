import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-richYellow">
      <div className="my-56 flex flex-col items-center px-2 gap-4 font-saira text-3xl font-bold text-richBlue-100">
        <Link to={"/"}>
          <button className="hover:text-blue-600">
            <FaHome />
          </button>
        </Link>

        {user && user.role == "Borrower" && (
          <Link to={"/books"} className="hover:text-blue-600">
            <IoLibrary />
          </Link>
        )}

        {user && user.role == "Borrower" && (
          <Link to={"/profile"}>
            <button className="hover:text-blue-600">
              <FaUser />
            </button>
          </Link>
        )}
        {user && user.role == "Librarian" && (
          <Link to={"/addBook"}>
            <MdOutlineAddCircle />
          </Link>
        )}
        {user && user.role == "Librarian" && (
          <Link to={"/allBooks"}>
            <FaClipboardList />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
