from models import db, User, Site, Review, TravelGroup, Itinerary
from werkzeug.security import generate_password_hash
from datetime import date  # Import date for conversion

def seed_data():
    # Create Travel Groups
    group1 = TravelGroup(name="Adventure Seekers", description="For thrill-seekers")
    group2 = TravelGroup(name="Cultural Explorers", description="History and culture lovers")
    db.session.add_all([group1, group2])
    db.session.commit()

    # Create Users (use password hashing!)
    user1 = User(
        name="John Doe",
        email="john@example.com",
        password_hash=generate_password_hash("password123"),  # Hash the password
        travel_group_id=group1.id
    )
    user2 = User(
        name="Jane Smith",
        email="jane@example.com",
        password_hash=generate_password_hash("password123"),
        travel_group_id=group2.id
    )
    db.session.add_all([user1, user2])
    db.session.commit()

    # Create Sites
    site1 = Site(name="Mount Everest", location="Nepal", description="World's highest peak")
    site2 = Site(name="Great Wall", location="China", description="Historic landmark")
    db.session.add_all([site1, site2])
    db.session.commit()

    # Create Reviews
    review1 = Review(rating=5, comment="Amazing experience!", user_id=user1.id, site_id=site1.id)
    review2 = Review(rating=4, comment="Highly recommended", user_id=user2.id, site_id=site2.id)
    db.session.add_all([review1, review2])
    db.session.commit()

    # Create Itineraries (convert date strings to date objects)
    itinerary1 = Itinerary(title="Everest Trek", description="7-day trek", date=date(2024, 10, 1), travel_group_id=group1.id)
    itinerary2 = Itinerary(title="Great Wall Tour", description="3-day tour", date=date(2024, 11, 1), travel_group_id=group2.id)
    itinerary1 = Itinerary(
    title="Safari Adventure",
    description="5-day wildlife safari",
    date=datetime.date(2024, 6, 1),
    travel_group_id=group1.id
)
    db.session.add_all([itinerary1, itinerary2])
    db.session.commit()

if __name__ == "__main__":
    from app import app
    with app.app_context():
        seed_data()
