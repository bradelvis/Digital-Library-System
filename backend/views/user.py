from flask import jsonify, request, Blueprint
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required

user_bp = Blueprint("user_bp", __name__, url_prefix='/users')


# Fetch all users (GET)
@user_bp.route("/", methods=["GET"])
@jwt_required()  # Protecting the route with JWT authentication (optional)
def fetch_users():
    users = User.query.all()

    user_list = []
    for user in users:
        user_list.append({
            'id': user.user_id,
            'username': user.username,  # Handle username
            'full_name': user.full_name,  # Handle full_name
            'email': user.email,
            'is_approved': user.is_approved,
            'is_admin': user.is_admin
        })

    return jsonify(user_list), 200


# Add a new user (POST)
@user_bp.route("/users", methods=["POST"])  # Use this instead of "/users"
def add_user():
    data = request.get_json()
    username = data['username']  # Handle username
    full_name = data['full_name']  # Handle full_name
    email = data['email']
    password = generate_password_hash(data['password'])

    # Check if the username or email already exists
    check_username = User.query.filter_by(username=username).first()  # Handle username check
    check_email = User.query.filter_by(email=email).first()

    if check_username or check_email:
        return jsonify({"error": "Username/email already exists"}), 406

    # Create a new user and save it to the database
    new_user = User(username=username, full_name=full_name, email=email, password=password)  # Handle full_name
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully!"}), 201


# Update an existing user (PATCH)
@user_bp.route("/<int:user_id>", methods=["PATCH"])
@jwt_required()  # Protecting the route with JWT authentication
def update_user(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        username = data.get('username', user.username)  # Handle username
        full_name = data.get('full_name', user.full_name)  # Handle full_name
        email = data.get('email', user.email)
        password = data.get('password', user.password)

        # Check if the username or email already exists
        check_username = User.query.filter(User.username == username, User.user_id != user.user_id).first()  # Handle username check
        check_email = User.query.filter(User.email == email, User.user_id != user.user_id).first()

        if check_username or check_email:
            return jsonify({"error": "Username/email already exists"}), 406

        # Update user data
        user.username = username  # Handle username
        user.full_name = full_name  # Handle full_name
        user.email = email
        user.password = generate_password_hash(password) if password else user.password
        
        db.session.commit()
        return jsonify({"msg": "User updated successfully!"}), 200
    else:
        return jsonify({"error": "User not found!"}), 404


# Register a new user (user registration)
@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data['username']  # Handle username
    full_name = data['full_name']  # Handle full_name
    email = data['email']
    password = data['password']
    
    # Check if user already exists
    user_exists = User.query.filter((User.username == username) | (User.email == email)).first()  # Handle username check
    if user_exists:
        return jsonify({"error": "Username or Email already exists!"}), 409

    new_user = User(
        username=username,  # Handle username
        full_name=full_name,  # Handle full_name
        email=email,
        password=generate_password_hash(password),
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Registration successful!"}), 201


# User login (JWT token generation)
@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Fetch user by email
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # Generate JWT token
        access_token = create_access_token(identity=user.user_id)
        return jsonify({"msg": "Login successful", "access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid email or password!"}), 401
