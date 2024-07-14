## healthPie: A Health & Fitness Management App

The `healthPie` project : a Node.js application for managing your health and fitness goals. 

### Features

* User Authentication (signup and login)
* Manage Appointments with Doctors
* Search for Recipes based on Nutritional Needs
* Track Meals and View Nutritional Information

### Dependencies

This project uses the following dependencies:

* Express - Web framework for building APIs
* Mongoose - Object Data Modeling (ODM) for MongoDB
* EJS - Templating engine for generating dynamic HTML
* Method-Override - HTTP method override middleware
* dotenv - Load environment variables from a `.env` file
* Cookie-parser - Parses and signs cookie data

### Installation 

1. Clone this repository.
2. Install the dependencies using `npm install`. if this show error then run `yarn install`.
3. Create a `.env` file in the project root directory and add your JWT SECRET KEY:

```
JWT_SECRET_KEY=YOUR_KEY
```

### Running the application

1. Start the server by running `npm start` in your terminal.
2. The application will run on port `8000` by default. You can access it in your browser at `http://localhost:8000`.

### Folder Structure

The project is organized into the following folders:

* `models`: Contains Mongoose models for data structures (e.g., `doctor.js`)
* `routes`: Contains routes for handling user requests (e.g., `user.js`)
* `views`: Contains EJS templates for generating HTML pages
* `public`: Contains static assets like CSS files

### Usage

1. **User Authentication:**
    * Register a new account using the signup route (`/signup`).
    * Login to your account using the login route (`/login`).
2. **Appointments:**
    * View a list of available Doctors (`/appointments`).
    * View Appointments for a specific doctor by email (`/appointments/:email`).
    * Book an appointment with a Doctor by providing your name, message, and contact information (`/appointments/:email/check`).
3. **Meals:**
    * Search for recipes based on your nutritional needs (`/mymeals`).
    * View detailed nutritional information for a specific recipe (`/mymeals/:id/view`).
4. **Exercise and Tasks:**
    * Track your exercise routines (`/exercise`).
    * Manage your daily tasks (`/task`). 
