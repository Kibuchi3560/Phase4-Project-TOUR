from extensions import db

# Association table for many-to-many relationship
user_group = db.Table('user_group',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('travel_groups.id'))
)

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class User(BaseModel):
    __tablename__ = 'users'
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    groups = db.relationship('TravelGroup', secondary=user_group, backref='members')

class TravelGroup(BaseModel):
    __tablename__ = 'travel_groups'
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255))

class Site(BaseModel):
    __tablename__ = 'sites'
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)

class Review(BaseModel):
    __tablename__ = 'reviews'
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), nullable=False)
    user = db.relationship('User', backref='reviews')
    site = db.relationship('Site', backref='reviews')

class Itinerary(BaseModel):
    __tablename__ = 'itineraries'
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    travel_group_id = db.Column(db.Integer, db.ForeignKey('travel_groups.id'), nullable=False)
    travel_group = db.relationship('TravelGroup', backref='itineraries')