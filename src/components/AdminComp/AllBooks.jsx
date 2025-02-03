import React, { useEffect, useState } from "react";
import { getBooks } from "../../service/Auth Operations/BookOperations";

const AllBooks = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    getBook();
  }, []);
  async function getBook() {
    const response = await getBooks();
    console.log(response.data);
    setBookList(response.data);
  }
  return (
    <div className="ml-16 pt-16 w-[90vw] p-8 h-screen overflow-x-hidden overflow-y-scroll">
      <h1 className="text-3xl text-white font-orbitron font-bold">All Books</h1>
      <table className="table-auto mt-3">
        <thead className="text-richYellow">
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Issued Books</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {bookList.length >= 1 &&
            bookList.map((book) => {
              return (
                <tr key={book._id}>
                  <td className="border border-white px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {book.author}
                  </td>
                  <td className="border border-white px-4 py-2">{book.isbn}</td>
                  <td className="border border-white px-4 py-2">
                    {book.issued}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooks;
