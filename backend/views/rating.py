from flask import Blueprint, request, jsonify
from models import db, Rating, User, Book

rating_bp = Blueprint("rating_bp", __name__)

# Rate a book (with optional comment)
@rating_bp.route("/ratings", methods=["POST"])
def rate_book():
    data = request.get_json()
    user_id = data['user_id']
    book_id = data['book_id']
    rating_value = data['rating']  # The rating value passed in the request body
    comment = data.get('comment', None)  # Optionally, you can add a comment

    user = User.query.get(user_id)
    book = Book.query.get(book_id)

    # Check if user and book exist
    if not user or not book:
        return jsonify({"error": "User or Book does not exist"}), 404

    # Check if user has already rated the book
    existing_rating = Rating.query.filter_by(user_id=user_id, book_id=book_id).first()
    if existing_rating:
        return jsonify({"error": "You have already rated this book"}), 406

    # Create the new rating, including the comment
    new_rating = Rating(user_id=user_id, book_id=book_id, rating_value=rating_value, comment=comment)
    db.session.add(new_rating)
    db.session.commit()

    return jsonify({"success": "Rating added successfully"}), 201

# Get all ratings for a book (including comments)
@rating_bp.route("/ratings/<int:book_id>", methods=["GET"])
def get_ratings(book_id):
    book = Book.query.get_or_404(book_id)
    ratings = Rating.query.filter_by(book_id=book.book_id).all()  # Use 'book.book_id' instead of 'book.id'

    rating_list = [{
        'user_id': rating.user.user_id,  # Correct user field name
        'username': rating.user.username,
        'rating': rating.rating_value,  # Correct field name for the rating
        'comment': rating.comment  # Include the comment
    } for rating in ratings]

    return jsonify(rating_list)
