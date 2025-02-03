from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize SQLAlchemy instance
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)  # Added back the username
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)  # Store hashed password
    role = db.Column(db.String(50), default='user')  # Default to 'user'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_approved = db.Column(db.Boolean, default=False)  # 
    is_admin = db.Column(db.Boolean, default=False)  # Assuming it's a boolean to track if user is admin

    # Relationship with Loan model (user can have many loans)
    loans = db.relationship('Loan', back_populates='user')
    
    # Relationship with ReadingList model (user can add many books to their reading list)
    reading_list = db.relationship('ReadingList', back_populates='user')
    
    # Relationship with Rating model (user can rate many books)
    ratings = db.relationship('Rating', back_populates='user')

    def __repr__(self):
        return f"<User(id={self.user_id}, email={self.email}, full_name={self.full_name}, role={self.role})>"

class Book(db.Model):
    __tablename__ = 'book'

    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(150), nullable=False)
    genre = db.Column(db.String(100))
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default="available")  # Default to available
    published_date = db.Column(db.Date, nullable=True)  # New field for the published date
    isbn = db.Column(db.String(13), unique=True, nullable=True)  # New field for ISBN
    cover_image_url = db.Column(db.String(500))
    rating = db.Column(db.Float, default=0.0)  # Average rating of the book

    # Relationship with Loan model (book can be borrowed many times)
    loans = db.relationship('Loan', back_populates='book')

    # Relationship with ReadingList model (book can be added to many users' reading lists)
    reading_list = db.relationship('ReadingList', back_populates='book')

    # Relationship with Rating model (book can have many ratings)
    ratings = db.relationship('Rating', back_populates='book')

    def __repr__(self):
        return f"<Book(id={self.book_id}, title={self.title}, author={self.author}, status={self.status})>"
class Loan(db.Model):
    __tablename__ = 'loan'

    loan_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id', ondelete='CASCADE'), nullable=False)
    loan_date = db.Column(db.DateTime, default=datetime.utcnow)
    return_date = db.Column(db.DateTime)
    due_date = db.Column(db.DateTime)
    status = db.Column(db.String(50), default="active")  # Default to active
    
    # Foreign keys relationships
    user = db.relationship('User', back_populates='loans')
    book = db.relationship('Book', back_populates='loans')

    def __repr__(self):
        return f"<Loan(id={self.loan_id}, user_id={self.user_id}, book_id={self.book_id}, loan_date={self.loan_date}, status={self.status})>"



class ReadingList(db.Model):
    __tablename__ = 'reading_list'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    added_date = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign key relationships
    user = db.relationship('User', back_populates='reading_list')
    book = db.relationship('Book', back_populates='reading_list')

    def __repr__(self):
        return f"<ReadingList(id={self.id}, user_id={self.user_id}, book_id={self.book_id})>"

class Rating(db.Model):
    __tablename__ = 'rating'

    rating_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    rating_value = db.Column(db.Integer, nullable=False)  # Rating out of 5
    comment = db.Column(db.Text)

    # Foreign key relationships
    user = db.relationship('User', back_populates='ratings')
    book = db.relationship('Book', back_populates='ratings')

    def __repr__(self):
        return f"<Rating(id={self.rating_id}, user_id={self.user_id}, book_id={self.book_id}, rating_value={self.rating_value})>"
