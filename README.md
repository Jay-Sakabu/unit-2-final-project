# Budget Now! LaunchCode Application

## Description

Hi! My name is Jay Sakabu, and I’m thrilled to share this budget application I built as a part of my Unit 2 final project. This single-page React and Spring Boot web app helps users with creating budgets and visualizing their spending by separating their budget into categories. Users can manage transactions with a clean, responsive interface. Along the way, I practiced modern frontend-backend integration, working with RESTful APIs, and database modeling.

## Technologies Used

- **Frontend:** React, Axios, Chart.js
- **Styling:** CSS Variables, Flexbox, CSS Grid, Media Queries
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** MySQL (for local development)
- **Authentication:** Spring Security with BCrypt
- **Version Control:** Git

## Installation

1.  **Clone the repo**

```bash
git clone https://github.com/Jay-Sakabu/unit-2-final-project/
```

2.  **Backend setup**

- In IntelliJ navigate to `budgetBackend/`
- Resolve build dependencies by right-clicking `pom.xml` selecting `Add as a Maven Project`
- Create a MySQL database named `budget` and ensure your MySQL instance is running on `Port 3306`, alternatively you may change the URL, username, & password at your discretion by navigating to `/budgetBackend/src/main/resources/application.properties`
- Then navigate to `src/main/java/com/example/demo/DemoApplication.java` and start the application by clicking on the "play" button near the top-right corner
- The backend API will start on `http://localhost:8080`

3.  **Frontend setup**

- Open a new terminal, navigate to `budget-frontend/`
- Install dependencies: by running `npm install`
- Start the dev server: `npm run dev`
- Frontend will be available at `http://localhost:5173`

## Usage

- Register an account or log in to access protected routes
- Check out my LinkedIn account at the footer and send me a message (It's there, it's a feature!)
- Toggle between light and dark themes
- Create a personalized month-to-month budget based on income input
- Create, view, update, and delete budget items in Transaction History
- Log transactions and view graphs to track spending in the categories: Needs, Wants, and Savings

## Wireframes & ER Diagram

- **Wireframes & Diagram:** [Google Drive Link](https://drive.google.com/drive/u/0/folders/1p9uz8AUsH2qJxpOr_l7ZNKkw9vqDk6su)

## Future Improvements

- Add comprehensive unit and integration tests (Jest & JUnit)
- Add an additional feature for functional net-worth adjusting
- Add an additional feature for tracking spending habits, comparing how well a user has stayed with their plan
- Improve security by adding JWT and Cookies and separating passwordEncoder logic from UserController
- Set up CI/CD pipeline (GitHub Actions -> AWS / Some other cloud service provider)
- Deploy frontend to Netlify and backend to AWS

---
