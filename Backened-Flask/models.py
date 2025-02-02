from extensions import db
from datetime import datetime, time

# Many-to-Many Association Table for Users and TravelGroups
user_group = db.Table(
    'user_group',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('travel_groups.id'), primary_key=True)
)

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        """Convert model instance to dictionary using its columns."""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class User(BaseModel):
    __tablename__ = 'users'
    
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Many-to-Many relationship with TravelGroup
    groups = db.relationship('TravelGroup', secondary=user_group, backref='members')
    reviews = db.relationship('Review', back_populates='user')

    def to_dict(self):
        data = super().to_dict()
        # Return only shallow details for groups and review IDs to avoid recursion
        data['groups'] = [{'id': group.id, 'name': group.name} for group in self.groups]
        data['reviews'] = [review.id for review in self.reviews]
        return data

class TravelGroup(BaseModel):
    __tablename__ = 'travel_groups'
    
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255))
    
    itineraries = db.relationship('Itinerary', back_populates='travel_group')
    reviews = db.relationship('Review', back_populates='travel_group')

    def to_dict(self):
        data = super().to_dict()
        # Include full itinerary objects (which include formatted date)
        data['itineraries'] = [itinerary.to_dict() for itinerary in self.itineraries]
        # Shallow details for members and review IDs
        data['members'] = [{'id': member.id, 'name': member.name} for member in self.members]
        data['reviews'] = [review.id for review in self.reviews]
        return data

class Site(BaseModel):
    __tablename__ = 'sites'
    
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    
    reviews = db.relationship('Review', back_populates='site')

    def to_dict(self):
        data = super().to_dict()
        data['reviews'] = [review.id for review in self.reviews]
        return data

class Review(BaseModel):
    __tablename__ = 'reviews'
    
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False)
    travel_group_id = db.Column(db.Integer, db.ForeignKey('travel_groups.id'))
    
    user = db.relationship('User', back_populates='reviews')
    site = db.relationship('Site', back_populates='reviews')
    travel_group = db.relationship('TravelGroup', back_populates='reviews')

    def to_dict(self):
        data = super().to_dict()
        # Include shallow details for user, site, and travel group
        data['user'] = {'id': self.user.id, 'name': self.user.name} if self.user else None
        data['site'] = {'id': self.site.id, 'name': self.site.name} if self.site else None
        data['travel_group'] = {'id': self.travel_group.id, 'name': self.travel_group.name} if self.travel_group else None
        return data

class Itinerary(BaseModel):
    __tablename__ = 'itineraries'
    
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    
    travel_group_id = db.Column(db.Integer, db.ForeignKey('travel_groups.id'), nullable=False)
    travel_group = db.relationship('TravelGroup', back_populates='itineraries')

    def to_dict(self):
        data = super().to_dict()
        # Format the date as "Tue, 20 May 2025 00:00:00 GMT"
        if self.date:
            dt = datetime.combine(self.date, time.min)
            data['date'] = dt.strftime("%a, %d %b %Y %H:%M:%S GMT")
        else:
            data['date'] = None
        # Include shallow travel group info
        data['travel_group'] = {'id': self.travel_group.id, 'name': self.travel_group.name} if self.travel_group else None
        return data
