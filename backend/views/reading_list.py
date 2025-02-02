from flask import Blueprint, request, jsonify
from models import db, User, Book, ReadingList

reading_list_bp = Blueprint("readinglist_bp", __name__)

# Add book to reading list
@reading_list_bp.route("/readinglist", methods=["POST"])
def add_to_reading_list():
    data = request.get_json()
    user_id = data.get('user_id')
    book_id = data.get('book_id')

    if not user_id or not book_id:
        return jsonify({"error": "User ID and Book ID are required"}), 400

    # Fetch the user and book from the database
    user = User.query.get(user_id)
    book = Book.query.get(book_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    if not book:
        return jsonify({"error": "Book not found"}), 404

    # Check if book is already in the user's reading list
    existing_entry = ReadingList.query.filter_by(user_id=user_id, book_id=book_id).first()
    if existing_entry:
        return jsonify({"error": "Book already in your reading list"}), 406

    new_entry = ReadingList(user_id=user_id, book_id=book_id)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({"success": "Book added to reading list successfully"}), 201

# Get all books in a user's reading list
@reading_list_bp.route("/readinglist/<int:user_id>", methods=["GET"])
def get_reading_list(user_id):
    user = User.query.get_or_404(user_id)

    # Fetch all books in the user's reading list
    reading_list = ReadingList.query.filter_by(user_id=user.user_id).all()
    
    if not reading_list:
        return jsonify({"error": "No books found in your reading list"}), 404

    book_list = [{
        'book_id': entry.book.book_id,  # Ensure using the correct column name 'book_id'
        'title': entry.book.title,
        'author': entry.book.author,
        'genre': entry.book.genre
    } for entry in reading_list]

    return jsonify(book_list)

# Remove book from reading list
@reading_list_bp.route("/readinglist", methods=["DELETE"])
def remove_from_reading_list():
    data = request.get_json()
    user_id = data.get('user_id')
    book_id = data.get('book_id')

    if not user_id or not book_id:
        return jsonify({"error": "User ID and Book ID are required"}), 400

    user = User.query.get(user_id)
    book = Book.query.get(book_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    if not book:
        return jsonify({"error": "Book not found"}), 404

    # Check if the book is in the user's reading list
    entry = ReadingList.query.filter_by(user_id=user_id, book_id=book_id).first()
    if not entry:
        return jsonify({"error": "Book is not in your reading list"}), 404

    db.session.delete(entry)
    db.session.commit()

    return jsonify({"success": "Book removed from reading list"}), 200
