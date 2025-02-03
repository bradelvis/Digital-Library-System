import React, { createContext, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
const cloudinary = require("cloudinary").v2;
const uploadFileToCloudinary = require("../utils/uploadOnCloud");

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  // ================================ FETCH AVAILABLE BOOKS ================================
  const getBooks = async () => {
    const toastId = toast.loading("Fetching Books...");
    try {
      const response = await apiConnector("GET", endpoints.getBooks);
      setBooks(response.data);
      toast.success("Successfully Fetched Books");
    } catch (error) {
      toast.error("Error fetching books");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ FETCH ISSUED BOOKS ================================
  const getIssuedBooks = async (userId, token) => {
    const toastId = toast.loading("Fetching Issued Books...");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await apiConnector("GET", `${endpoints.getIssuedBooks}/get=${userId}`, null, headers);
      setIssuedBooks(response.data.data);
      toast.success("Successfully Fetched Issued Books");
    } catch (error) {
      toast.error("Error fetching issued books");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ BORROW BOOK ================================
  const borrowBook = async (bookId, userId, token) => {
    const toastId = toast.loading("Borrowing Book...");
    const headers = { Authorization: `Bearer ${token}` };
    const data = { bookId, userId };
    try {
      const response = await apiConnector("POST", endpoints.borrowBook, data, headers);
      toast.success("Successfully Borrowed Book");
      return response.data;
    } catch (error) {
      toast.error("Error borrowing book");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ RETURN BOOK ================================
  const returnBook = async (bookId, userId, token) => {
    const toastId = toast.loading("Returning Book...");
    const headers = { Authorization: `Bearer ${token}` };
    const data = { bookId, userId };
    try {
      const response = await apiConnector("POST", endpoints.returnBook, data, headers);
      toast.success("Successfully Returned Book");
      return response.data;
    } catch (error) {
      toast.error("Error returning book");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ================================ ADD BOOK ================================
  const addBook = async (data, token) => {
    const toastId = toast.loading("Adding Book...");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await apiConnector("POST", endpoints.addBook, data, headers);
      toast.success("Successfully Added Book");
      return response.data;
    } catch (error) {
      toast.error("Error adding book");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        issuedBooks,
        getBooks,
        getIssuedBooks,
        borrowBook,
        returnBook,
        addBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the BookContext in components
export const useBook = () => useContext(BookContext);
