from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from extensions import db
from models import User, Site, Review, TravelGroup, Itinerary
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_platform.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this in production

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# User Authentication
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Protected Route Example
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

# User Routes
@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    elif request.method == 'POST':
        data = request.get_json()
        try:
            new_user = User(
                name=data['name'],
                email=data['email'],
                password_hash=generate_password_hash(data['password'])
            )
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

# Site Routes
@app.route('/api/sites', methods=['GET', 'POST'])
@app.route('/api/sites/<int:site_id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_sites(site_id=None):
    if request.method == 'GET':
        if site_id:
            site = Site.query.get_or_404(site_id)
            return jsonify(site.to_dict()), 200
        sites = Site.query.all()
        return jsonify([site.to_dict() for site in sites]), 200
    elif request.method == 'POST':
        data = request.get_json()
        new_site = Site(
            name=data['name'],
            location=data['location'],
            description=data.get('description')
        )
        db.session.add(new_site)
        db.session.commit()
        return jsonify(new_site.to_dict()), 201
    elif request.method == 'PATCH':
        site = Site.query.get_or_404(site_id)
        data = request.get_json()
        site.name = data.get('name', site.name)
        site.location = data.get('location', site.location)
        site.description = data.get('description', site.description)
        db.session.commit()
        return jsonify(site.to_dict()), 200
    elif request.method == 'DELETE':
        site = Site.query.get_or_404(site_id)
        db.session.delete(site)
        db.session.commit()
        return jsonify({"message": "Site deleted"}), 200

# Repeat similar routes for Reviews, TravelGroups, and Itineraries

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{
        'id': review.id,
        'rating': review.rating,
        'comment': review.comment,
        'user': {'id': review.user.id, 'name': review.user.name},
        'site': {'id': review.site.id, 'name': review.site.name}
    } for review in reviews])

@app.route('/api/travelgroups', methods=['GET'])
def get_travelgroups():
    groups = TravelGroup.query.all()
    return jsonify([group.to_dict() for group in groups])

@app.route('/api/sites', methods=['GET'])
def get_sites():
    sites = Site.query.all()
    return jsonify([site.to_dict() for site in sites])

@app.route('/api/itineraries', methods=['GET'])
def get_itineraries():
    itineraries = Itinerary.query.all()
    return jsonify([itinerary.to_dict() for itinerary in itineraries])

if __name__ == '__main__':
    app.run(debug=True)