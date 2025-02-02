from flask import Blueprint, request, jsonify
from models import db, Loan, User, Book
from datetime import datetime

loan_bp = Blueprint("loan_bp", __name__)

# Borrow a book (create a loan)
@loan_bp.route("/loans", methods=["POST"])
def borrow_book():
    data = request.get_json()
    user_id = data['user_id']
    book_id = data['book_id']

    user = User.query.get(user_id)
    book = Book.query.get(book_id)

    if not user or not book:
        return jsonify({"error": "User or Book does not exist"}), 404
    if book.status == 'borrowed':
        return jsonify({"error": "Book is already borrowed"}), 406

    loan = Loan(user_id=user_id, book_id=book_id, loan_date=datetime.utcnow())
    book.status = 'borrowed'
    db.session.add(loan)
    db.session.commit()

    return jsonify({"success": "Book borrowed successfully"}), 201

# Get all loans (books borrowed by a user)
@loan_bp.route("/loans/<int:user_id>", methods=["GET"])
def get_loans(user_id):
    user = User.query.get_or_404(user_id)
    loans = Loan.query.filter_by(user_id=user.user_id).all()  # Use user.user_id instead of user.id

    loan_list = [{
        'loan_id': loan.loan_id,  # Use loan.loan_id instead of loan.id
        'book_id': loan.book.book_id,  # Use book.book_id instead of book.id
        'title': loan.book.title,
        'loan_date': loan.loan_date,
        'return_date': loan.return_date
    } for loan in loans]

    return jsonify(loan_list)

# Return a borrowed book
@loan_bp.route("/loans/return", methods=["POST"])
def return_book():
    data = request.get_json()
    user_id = data['user_id']
    book_id = data['book_id']

    loan = Loan.query.filter_by(user_id=user_id, book_id=book_id, return_date=None).first()
    book = Book.query.get(book_id)

    if not loan or not book:
        return jsonify({"error": "Loan or Book not found"}), 404

    loan.return_date = datetime.utcnow()
    book.status = 'available'
    db.session.commit()

    return jsonify({"success": "Book returned successfully"}), 200
