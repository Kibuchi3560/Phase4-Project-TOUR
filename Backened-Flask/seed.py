from datetime import datetime
from werkzeug.security import generate_password_hash
from app import db, app  # Ensure that app.py exports both db and app
from models import User, TravelGroup, Site, Itinerary, Review

def seed_data():
    with app.app_context():
        # Clear existing data in the proper order (child tables first)
        db.session.query(Review).delete()
        db.session.query(Itinerary).delete()
        db.session.query(Site).delete()
        db.session.query(TravelGroup).delete()
        db.session.query(User).delete()
        db.session.commit()
        
        # Create Users with hashed passwords
        user1 = User(
            name="traveler1",
            email="traveler1@example.com",
            password_hash=generate_password_hash("password123")
        )
        user2 = User(
            name="traveler2",
            email="traveler2@example.com",
            password_hash=generate_password_hash("password123")
        )
        db.session.add_all([user1, user2])
        db.session.commit()
        
        # Create Travel Groups
        group1 = TravelGroup(name="Europe Explorers", description="Exploring Europe")
        group2 = TravelGroup(name="Asia Adventurers", description="Adventure across Asia")
        db.session.add_all([group1, group2])
        db.session.commit()
        
        # Create Sites
        site1 = Site(name="Eiffel Tower", location="Paris, France")
        site2 = Site(name="Great Wall", location="China")
        db.session.add_all([site1, site2])
        db.session.commit()
        
        # Create Itineraries with proper dates (the date will be stored as a date object)
        itinerary1 = Itinerary(
            title="Paris Getaway",
            description="A weekend in Paris",
            date=datetime.strptime("2025-05-20", "%Y-%m-%d").date(),
            travel_group_id=group1.id
        )
        itinerary2 = Itinerary(
            title="China Expedition",
            description="Exploring China",
            date=datetime.strptime("2025-06-15", "%Y-%m-%d").date(),
            travel_group_id=group2.id
        )
        db.session.add_all([itinerary1, itinerary2])
        db.session.commit()
        
        # Create Reviews (using valid site and travel group IDs)
        review1 = Review(
            rating=5,
            comment="Amazing experience!",
            user_id=user1.id,
            site_id=site1.id,
            travel_group_id=group1.id
        )
        review2 = Review(
            rating=4,
            comment="Great trip!",
            user_id=user2.id,
            site_id=site2.id,
            travel_group_id=group2.id
        )
        db.session.add_all([review1, review2])
        db.session.commit()

if __name__ == "__main__":
    seed_data()
