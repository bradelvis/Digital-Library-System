from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, User, Book, Loan, ReadingList, Rating  # Import your models
from flask_jwt_extended import JWTManager
from datetime import timedelta
from views import user_bp, book_bp, reading_list_bp, loan_bp, rating_bp, auth_bp  # Import from views package
# from flask_cors import CORS  # Import CORS
from flask_cors import CORS, cross_origin

# Initialize Flask app
app = Flask(__name__)

# Enable CORS globally for specific origins (this allows cross-origin requests)
CORS(app)
# Configure your database URI and other settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://digital_library_db_user:eFKrRSr6bIxfUgVS3ashiYh3jfUB6kPr@dpg-cuftp3lds78s73fp774g-a.oregon-postgres.render.com/digital_library_db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking to save resources

# Initialize the Migrate extension with app and db
migrate = Migrate(app, db)

# Initialize the database
db.init_app(app)

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"  # Change to your own secret key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)  # Set token expiration
jwt = JWTManager(app)
jwt.init_app(app)

# Import all functions in views (we'll create these views in separate files)
from views import user_bp, book_bp, loan_bp, rating_bp, reading_list_bp  # Import the blueprints for different resources

# Register blueprints to organize the app's views
app.register_blueprint(user_bp)  # User-related routes (e.g., registration, login)
app.register_blueprint(book_bp)  # Book-related routes (e.g., search, borrow, return)
app.register_blueprint(loan_bp)  # Loan-related routes (e.g., borrow, return)
app.register_blueprint(rating_bp)  # Rating-related routes (e.g., rate book)
app.register_blueprint(reading_list_bp)  # Reading list-related routes

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Digital Library System!"})

# Example API route to verify CORS is working
@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

# Enable CORS for login and signup routes specifically
@app.route('/login', methods=['POST'])
@cross_origin(origins="http://localhost:5173")
def login():
    return jsonify({"message": "Login Successful"})

@app.route('/register', methods=['POST'])
@cross_origin(origins="http://localhost:5173")
def register():
    return jsonify({"message": "Signup Successful"})


if __name__ == '__main__':
    app.run(debug=True)
