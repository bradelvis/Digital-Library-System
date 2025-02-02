from flask import Blueprint, request, jsonify
from models import User, db
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth_bp", __name__)

# Register User
@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get('username')
    full_name = data.get('full_name')  # Added full_name field
    email = data.get('email')
    password = data.get('password')
    admin = data.get('admin', False)  # Optional admin field, default to False

    if not username or not full_name or not email or not password:  # Checking full_name as well
        return jsonify({"message": "Missing fields"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User with this email already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, full_name=full_name, email=email, password=hashed_password, admin=admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# User Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Email not found"}), 401  

    if not check_password_hash(user.password, password):
        return jsonify({"error": "Incorrect password"}), 401 
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,  # Added full_name to the response
            "admin": user.admin  # Include admin status
        },
        "access_token": access_token
    }), 200


# Get Current User
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,  # Include full_name in the response
            "email": user.email,
            "admin": user.admin  # Include the admin field in the response
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


# Logout
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"message": "Successfully logged out"}), 200


# Update User Profile
@auth_bp.route("/user/update", methods=["PUT"])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    # Fetch the current user from the database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Get the new profile data or keep the old values
    username = data.get('username', user.username)
    full_name = data.get('full_name', user.full_name)  # Handle full_name field
    email = data.get('email', user.email)

    # Check if username or email already exists (excluding current user's data)
    if username != user.username:
        existing_username = User.query.filter_by(username=username).first()
        if existing_username:
            return jsonify({"message": "Username already exists"}), 400

    if email != user.email:
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            return jsonify({"message": "Email already exists"}), 400

    # Update user fields
    user.username = username
    user.full_name = full_name  # Update full_name field
    user.email = email

    db.session.commit()

    return jsonify({
        "message": "User profile updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,  # Include full_name in the response
            "email": user.email
        }
    }), 200


# Update User Password
@auth_bp.route("/user/updatepassword", methods=["PUT"])
@jwt_required()
def update_password():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    # Fetch the current user from the database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Get the old password and new password from the request
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        return jsonify({"message": "Old and new passwords are required"}), 400

    # Check if the old password matches
    if not check_password_hash(user.password, old_password):
        return jsonify({"message": "Incorrect old password"}), 400

    # Hash the new password
    user.password = generate_password_hash(new_password)
    
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


# Delete User Account (Self-deletion Only)
@auth_bp.route("/user/delete_account", methods=["DELETE"])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()

    # Fetch the current user from the database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Delete the user from the database
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User account deleted successfully"}), 200
