import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getIssuedBooks } from "../service/Auth Operations/BookOperations";
import { returnBook } from "../service/Auth Operations/BookOperations";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  console.log("USER : ", user);
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  async function getBooks() {
    const books = await getIssuedBooks(user?._id, token);
    setBookData(books);
  }
  async function handleReturn(bookId) {
    console.log("RETURNING BOOK : ", bookId);
    const response = await returnBook(bookId, user?._id, token);
    console.log("RETURN BOOK RESPONSE : ", response);
    getBooks();
  }
  console.log("BOOK DATA : ", bookData);
  return (
    <div className="p-28 text-white font-saira w-[92vw]">
      <div className="text-4xl font-semibold">{user?.username}</div>
      <h2 className="text-3xl font-semibold">{user?.email}</h2>
      <table className="table-auto mt-3">
        <thead className="text-richYellow">
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Issued On</th>
            <th className="px-4 py-2">Return</th>
          </tr>
        </thead>
        <tbody>
          {bookData.length >= 1 &&
            bookData.map((book) => {
              return (
                <tr key={book?._id}>
                  <td className="border border-white px-4 py-2">
                    {book?.book?.title}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {book?.book?.author}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {book?.borrowedDate?.substring(0, 10)}
                  </td>
                  <td className="border border-white px-4 py-2">
                    <button
                      onClick={() => handleReturn(book?.book?._id)}
                      className="border-2 border-richYellow px-3 py-1 hover:bg-richYellow hover:text-richBlue-100"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
