import React, { useState, useEffect } from "react";
import BookItem from "./BookItem"; // Assuming you have a BookItem component to render individual books
import Pagination from "./Pagination"; // Assuming you have a Pagination component
import { getBooks } from "../service/Auth Operations/BookOperations";

function BookCatalogPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const response = await getBooks();
    setBooks(response.data);
  }

  return (
    <div className="md:pl-8 md:py-6 pl-4 py-2 w-[94vw] h-screen overflow-y-scroll">
      <h1 className="text-3xl text-white font-orbitron font-bold">
        Discover Your Next Read: Explore Our Book Catalog
      </h1>

      <div className="book-list md:mt-10 mt-6 flex flex-wrap gap-3">
        {books.length > 0 &&
          books.map((book) => <BookItem key={book._id} book={book} />)}
      </div>
    </div>
  );
}

export default BookCatalogPage;
