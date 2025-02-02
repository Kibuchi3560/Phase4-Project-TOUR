# Safari Adventure

A full‑stack travel platform built with Flask for the backend and React for the frontend. This project lets users view travel groups, join/leave groups, view itineraries, and post reviews—all styled with Bootstrap. Form management and validation are handled via Formik and Yup, and the backend uses SQLAlchemy for data modeling and serialization.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

- **Flask Backend**
  - RESTful API endpoints (GET, POST, PATCH, DELETE) for users, sites, itineraries, travel groups, and reviews.
  - CORS enabled for client-server communication.
  - SQLAlchemy models with one-to-many and many-to-many relationships.
  - Custom serialization (`to_dict()`) for JSON responses.
  - Dedicated endpoints for joining and leaving travel groups.
  
- **React Frontend**
  - Responsive UI built with React and React-Bootstrap.
  - Multiple routes managed by React Router.
  - Components for displaying groups (with itineraries/reviews), membership management, and contact information.
  - Forms styled with Bootstrap and managed/validated using Formik and Yup.
  - Navigation via a modern Bootstrap Navbar.

- **User Authentication**
  - Basic authentication via JWT (login endpoint implemented).

---

## Project Structure

```
/project-root
  ├── backend
  │    ├── app.py               # Flask application entry point
  │    ├── extensions.py        # Flask extensions (e.g., db)
  │    ├── models.py            # SQLAlchemy data models
  │    ├── seed.py              # Script to seed initial data
  │    ├── migrations/          # Flask-Migrate migration scripts
  │    └── requirements.txt     # Python dependencies
  ├── frontend
  │    ├── public/
  │    ├── src/
  │         ├── components/     # React components (e.g., Navbar.jsx, GroupReviewsManager.jsx, GroupMembership.jsx, ContactCard.jsx, etc.)
  │         ├── App.js          # Main React app component
  │         └── index.js        # React entry point
  ├── package.json             # Node.js dependencies
  └── README.md                # This file
```

---

## Installation

### Backend

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```

2. **Set Up a Virtual Environment and Install Dependencies:**

   Using pipenv:
   ```bash
   pipenv install
   pipenv shell
   ```
   Or using virtualenv:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   pip install -r requirements.txt
   ```

3. **Initialize the Database:**

   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

4. **Seed the Database:**

   ```bash
   python seed.py
   ```

5. **Run the Flask Application:**

   ```bash
   flask run
   ```

### Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the React Development Server:**

   ```bash
   npm start
   ```

---

## Configuration

- **Backend Configuration:**  
  The Flask app uses a SQLite database by default. You can change the database URI in `app.py`:
  ```python
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_platform.db'
  ```
- **JWT Secret Key:**  
  Update `app.config["JWT_SECRET_KEY"]` in `app.py` for production use.
- **Frontend Proxy:**  
  In `package.json`, set up a proxy (if needed) to forward API requests to your Flask backend (e.g., `"proxy": "http://localhost:5000"`).

---

## Usage

### Frontend Navigation

- **Navbar:**  
  The Bootstrap Navbar includes links to:
  - Home
  - Destinations (Sites)
  - Itineraries
  - Groups & Reviews
  - A Sign In/Sign Up modal

- **Group Reviews & Membership:**  
  - The **GroupReviewsManager** component displays travel groups with their details and a review snippet.
  - The **GroupMembership** component allows users to join/leave groups and update their wishlist.

- **Contact Information:**  
  (If implemented) A **ContactCard** displays the firm's contact details and social media links.

### Authentication

- **Sign In / Sign Up:**  
  Use the Navbar’s Sign In/Sign Up button to create an account or log in.

---

## API Endpoints

### Users
- `GET /api/users` – Retrieve all users.
- `POST /api/users` – Create a new user.
- `PATCH /api/users/<user_id>` – Update a user's data (e.g., wishlist).

### Travel Groups
- `GET /api/travelgroups` – Retrieve all travel groups.

### Sites
- `GET, POST, PATCH, DELETE /api/sites` – CRUD operations for sites.

### Itineraries
- `GET /api/itineraries` – Retrieve all itineraries.

### Reviews
- `GET, POST /api/reviews` – Retrieve or create reviews.

### Group Membership (Dedicated Endpoints)
- `POST /api/users/<user_id>/groups/<group_id>` – Join a travel group.
- `DELETE /api/users/<user_id>/groups/<group_id>` – Leave a travel group.

---

## Technologies Used

- **Backend:**  
  - Flask, Flask-CORS, Flask-JWT-Extended  
  - SQLAlchemy, Flask-Migrate  
  - Python (with pipenv or virtualenv)

- **Frontend:**  
  - React, React Router DOM  
  - React-Bootstrap, Bootstrap CSS  
  - Formik, Yup  
  - Axios

---

## Future Improvements

- **Enhanced Authentication & Authorization:**  
  Implement role-based access control and token refresh mechanisms.
- **Advanced Form Validation:**  
  Expand Formik validation with custom components and error handling.
- **Improved UI/UX:**  
  Add animations, refine responsiveness, and create additional pages.
- **Testing:**  
  Include unit and integration tests for both the backend and frontend.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

