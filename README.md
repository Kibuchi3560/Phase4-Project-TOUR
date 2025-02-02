Safari Adventure
A full‑stack travel platform built with Flask for the backend and React for the frontend. This project lets users view travel groups, join/leave groups, view itineraries, and post reviews—all styled with Bootstrap. Form management and validation are handled via Formik and Yup, and the backend uses SQLAlchemy for data modeling and serialization.

Table of Contents
Features
Project Structure
Installation
Configuration
Usage
API Endpoints
Technologies Used
Future Improvements
License
Features
Flask Backend

RESTful API endpoints (GET, POST, PATCH, DELETE) for users, sites, itineraries, travel groups, and reviews.
CORS enabled to allow client-server communication.
SQLAlchemy models with one-to-many and many-to-many relationships.
Custom serialization (to_dict()) for JSON responses.
Dedicated endpoints for joining and leaving travel groups.
React Frontend

Responsive UI built with React and React‑Bootstrap.
Multiple routes managed by React Router.
Components for displaying groups (with itineraries/reviews), membership management, and a contact card.
Forms styled with Bootstrap and managed/validated using Formik and Yup.
Navigation via a modern Bootstrap Navbar.
User Authentication

Basic authentication via JWT (login endpoint implemented).
Project Structure
bash
Copy
Edit
/project-root
  ├── backend
  │    ├── app.py               # Flask application entry point
  │    ├── extensions.py        # Flask extensions (e.g., db)
  │    ├── models.py            # SQLAlchemy data models
  │    ├── seed.py              # Seed data for the database
  │    ├── migrations/          # Flask-Migrate migration scripts
  │    └── requirements.txt     # Python dependencies
  ├── frontend
  │    ├── public/
  │    ├── src/
  │         ├── components/     # React components (e.g., Navbar.jsx, GroupReviewsManager.jsx, GroupMembership.jsx, ContactCard.jsx, etc.)\n  │         ├── App.js        # Main React app component\n  │         └── index.js      # React entry point\n  ├── package.json           # Node.js dependencies\n  └── README.md              # This file\n
Installation
Backend
Clone the Repository:

bash
Copy
Edit
git clone <repository-url>
cd <repository-directory>/backend
Set Up Virtual Environment and Install Dependencies:

Using pipenv:

bash
Copy
Edit
pipenv install
pipenv shell
Or using virtualenv:

bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
Initialize the Database:

bash
Copy
Edit
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
Seed the Database:

bash
Copy
Edit
python seed.py
Run the Flask Application:

bash
Copy
Edit
flask run
Frontend
Navigate to the Frontend Directory:

bash
Copy
Edit
cd ../frontend
Install Dependencies:

bash
Copy
Edit
npm install
Start the React Development Server:

bash
Copy
Edit
npm start
Configuration
Backend Configuration:
The Flask app uses a SQLite database by default. You can change the database URI in app.py:

python
Copy
Edit
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_platform.db'
JWT Secret Key:
Update app.config["JWT_SECRET_KEY"] in app.py for production use.

Frontend Proxy:
In package.json, set up a proxy (if needed) to forward API requests to your Flask backend (e.g., "proxy": "http://localhost:5000").

Usage
On the Frontend
Navigation:
Use the Navbar to access different sections:
Home
Destinations (Sites)
Itineraries
Groups & Reviews
Group Reviews & Membership:
The GroupReviewsManager component displays travel groups in Bootstrap cards.
Clicking on a group name navigates to that group's detail page.
The GroupMembership component allows users to join/leave a group and update their wishlist.
Contact Information:
A ContactCard (if implemented) displays the firm's location and social media links.
Authentication
Sign In / Sign Up:
Use the Navbar’s Sign In/Sign Up button to open a modal where you can create an account or log in.
API Endpoints
Users
GET /api/users – Retrieve all users.
POST /api/users – Create a new user.
PATCH /api/users/<user_id> – Update a user's data (e.g., wishlist).
Travel Groups
GET /api/travelgroups – Retrieve all travel groups.
Sites
GET, POST, PATCH, DELETE /api/sites – CRUD operations for sites.
Itineraries
GET /api/itineraries – Retrieve all itineraries.
Reviews
GET, POST /api/reviews – Retrieve or create reviews.
Group Membership (Dedicated Endpoints)
POST /api/users/<user_id>/groups/<group_id> – Join a travel group.
DELETE /api/users/<user_id>/groups/<group_id> – Leave a travel group.
Technologies Used
Backend:

Flask, Flask-CORS, Flask-JWT-Extended
SQLAlchemy, Flask-Migrate
Python (with virtualenv or pipenv)
Frontend:

React, React Router DOM
React-Bootstrap, Bootstrap CSS
Formik, Yup
Axios (for API calls)
Future Improvements
Enhanced Authentication & Authorization:
Improve security by implementing role-based access control and proper token refresh mechanisms.
Enhanced Form Validation:
Use more advanced Formik configurations and custom components.
Improved UI/UX:
Add animations, responsive design improvements, and additional pages.
Testing:
Add unit and integration tests for both backend and frontend.
