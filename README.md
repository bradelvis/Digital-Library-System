# Library-System
Project Overview

The Digital Library System is designed to provide a convenient way for users to access and manage digital books. The system allows users to borrow books, manage their reading lists, and track borrowed books efficiently.

# Problem Statement

Readers often face difficulty accessing books in a convenient way, and managing borrowed books can be a hassle.

# video explanation link
https://drive.google.com/file/d/1Jb-eD3_yz4l0uvHTsHUXyQHe82EPNzjk/view

# Solution

A Digital Library System that allows users to:

Lend digital books.

Manage reading lists.

Track borrowed books efficiently.

Features & User Stories

User Registration

As a user, I want to register to borrow books from the library.

Login

As a user, I want to log in to manage my book borrowings and reading list.

Search Books

As a user, I want to search for books by title, author, or genre.

Borrow Book

As a user, I want to borrow a book from the library.

Return Book

As a user, I want to return a borrowed book.

View Borrowed Books

As a user, I want to see a list of books I've borrowed.

Add to Reading List

As a user, I want to add books to my reading list.

Rate Book

As a user, I want to rate books that I’ve read.

View Book Details

As a user, I want to view the details of a specific book.

Models

User Model

user_id: Unique identifier for each user.

email: User's email address.

password: User's encrypted password.

Book Model

book_id: Unique identifier for each book.

title: Title of the book.

author: Author of the book.

genre: Genre of the book.

description: Brief summary of the book.

status: Indicates whether the book is available or borrowed.

 # Errors Encountered

# Adding to Reading List

Issue: Initially, implementing the reading list feature was difficult due to structuring relationships between users and books.

# Rating System

Issue: Storing ratings and linking them to users and books was challenging.

# Logout Issue

Issue: Users remained logged in even after attempting to log out.

# Technology Stack

Backend: Flask (Python)

Frontend: Vite (React)

Database: SQLite / PostgreSQL

tailwind: tailwind 

 # Installation & Setup

Clone the repository:

git clone https://github.com/your-repo/digital-library.git
cd digital-library

Install dependencies:

pip install -r requirements.txt

Run the Flask backend:

flask run

# Set up the frontend:

cd frontend
npm install
npm run dev

Access the application at http://localhost:5173.

# Contribution

If you wish to contribute, please submit a pull request with detailed explanations of your changes.

# License

This project is licensed under the MIT License.

