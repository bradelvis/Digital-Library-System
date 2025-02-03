import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { borrowBook } from "../service/Auth Operations/BookOperations";

function BookItem({ book }) {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  console.log("Book ITEM : ", book);
  async function borrow(bookId) {
    const response = await borrowBook(bookId, user._id, token);
    console.log("BORROW BOOK RESPONSE : ", response);
  }

  return (
    <div className="book-item border-richYellow border-2 text-white font-saira w-[12rem] px-4 py-2 flex flex-col justify-center items-center">
      <img src={book.bookImage} className="w-[8rem] " />
      <h2 className="font-bold text-base text-center">{book.title}</h2>
      <p className="text-sm line-clamp-1 text-center">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-sm text-center">
        <strong>Genre:</strong> {book.genre}
      </p>
      {/* Add more book details as needed */}
      <button
        onClick={() => borrow(book._id)}
        className="bg-richYellow mt-2 hover:bg-yellow-400 text-richBlue-100 font-saira text-base font-bold p-1 px-4 rounded-full w-fit"
      >
        Borrow
      </button>{" "}
      {/* For borrowers */}
    </div>
  );
}

export default BookItem;
