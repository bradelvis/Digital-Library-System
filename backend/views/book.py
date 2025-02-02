from flask import Blueprint, request, jsonify
from datetime import datetime
from models import db, Book

book_bp = Blueprint("book_bp", __name__)

# Add a book
@book_bp.route("/books", methods=["POST"])
def add_book():
    data = request.get_json()
    title = data['title']
    author = data['author']
    genre = data['genre']
    description = data['description']
    status = data['status']  # 'available' or 'borrowed'
    published_date = data.get('published_date')  # Optional, make sure it's passed in the correct format (YYYY-MM-DD)
    isbn = data['isbn']

    # Convert published_date from string to date object if provided
    if published_date:
        published_date = datetime.strptime(published_date, '%Y-%m-%d').date()

    new_book = Book(
        title=title, 
        author=author, 
        genre=genre, 
        description=description, 
        status=status,
        published_date=published_date, 
        isbn=isbn
    )
    db.session.add(new_book)
    db.session.commit()

    return jsonify({"success": "Book added successfully"}), 201

# Get all books
@book_bp.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    return jsonify([{
        'book_id': book.book_id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'description': book.description,
        'status': book.status,
        'published_date': book.published_date,  # Include the published_date
        'isbn': book.isbn  # Include the isbn
    } for book in books])

# Get a single book by book_id
@book_bp.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = Book.query.get_or_404(book_id)
    return jsonify({
        'book_id': book.book_id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'description': book.description,
        'status': book.status,
        'published_date': book.published_date,  # Include the published_date
        'isbn': book.isbn  # Include the isbn
    })

# Update book
@book_bp.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()
    book = Book.query.get_or_404(book_id)

    title = data.get('title', book.title)
    author = data.get('author', book.author)
    genre = data.get('genre', book.genre)
    description = data.get('description', book.description)
    status = data.get('status', book.status)
    published_date = data.get('published_date', book.published_date)
    isbn = data.get('isbn', book.isbn)

    # Convert published_date from string to date object if provided
    if published_date:
        published_date = datetime.strptime(published_date, '%Y-%m-%d').date()

    book.title = title
    book.author = author
    book.genre = genre
    book.description = description
    book.status = status
    book.published_date = published_date
    book.isbn = isbn

    db.session.commit()

    return jsonify({"success": "Book updated successfully"}), 200

# Delete book
@book_bp.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book:
        db.session.delete(book)
        db.session.commit()
        return jsonify({"success": "Book deleted successfully"}), 200
    else:
        return jsonify({"error": "Book not found"}), 404
