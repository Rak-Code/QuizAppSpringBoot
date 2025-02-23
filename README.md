

# Java Quiz Spring Boot Application

Welcome to the Java Quiz Spring Boot Application! This project is a web-based quiz application built with Spring Boot for the backend and a modern frontend using HTML, CSS, Bootstrap, and JavaScript. It provides an interactive quiz on Java Object-Oriented Programming (OOP) principles, tracks user scores, and saves results to a MySQL database.

## Overview

This application allows users to:
- Enter their name and start a quiz with multiple-choice questions about OOP concepts.
- Answer questions interactively, with immediate feedback and a progress bar.
- Submit their quiz to see their score on a "Thank You" page with a "Play Again" option.
- Have their scores saved to a MySQL database for persistence.

The application features a responsive, user-friendly interface with animations and modern styling, powered by Spring Boot’s RESTful API and client-side JavaScript with the Fetch API.

## Features

- **Quiz Interface:** Users enter their name, take a 5-question OOP quiz, and see progress through a visual progress bar.
- **Immediate Feedback:** Users receive feedback on each question (correct/wrong) as they answer.
- **Score Tracking:** Scores are calculated and displayed on a dedicated "Thank You" page after submission.
- **Database Integration:** Scores are saved to a MySQL database for persistence.
- **Responsive Design:** Uses Bootstrap for a mobile-friendly, aesthetically pleasing UI with animations and transitions.
- **Interactivity:** JavaScript handles dynamic question loading, answer tracking, and form submissions via Fetch API.

## Technologies Used

- **Backend:**
  - Spring Boot 3.4.3
  - Spring Data JPA for database operations
  - MySQL for data storage
  - Java 17

- **Frontend:**
  - HTML5 for structure
  - CSS3 with Bootstrap 5.3 for styling
  - JavaScript with Fetch API for client-server communication

- **Development Tools:**
  - Maven for dependency management
  - IntelliJ IDEA or any Java IDE
  - MySQL Workbench or similar for database management

## Project Structure

```
quiz-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/quizapp/
│   │   │       ├── model/           # Entities (Question, Score)
│   │   │       ├── repository/      # JPA repositories
│   │   │       ├── service/         # Business logic
│   │   │       └── controller/      # REST controllers
│   │   │       └── QuizApplication.java  # Main Spring Boot app
│   │   └── resources/
│   │       ├── static/             # Frontend files (HTML, CSS, JS)
│   │       │   ├── css/
│   │       │   ├── js/
│   │       └── application.properties  # Configuration
│   └── test/
└── pom.xml  # Maven configuration
```

## Setup and Installation

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL Server (version 8 or higher)
- IDE (e.g., IntelliJ IDEA, Eclipse)

### Steps to Run Locally

1. **Clone the Repository**
   - If you have the project locally, skip this. Otherwise, create a new directory and copy the project files.

2. **Configure MySQL**
   - Create a database named `quiz_db` in MySQL:
     ```sql
     CREATE DATABASE quiz_db;
     ```
   - Ensure MySQL is running locally on port 3306 (default).

3. **Update `application.properties`**
   - Open `src/main/resources/application.properties` and update the MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
     ```
   - Replace `yourpassword` with your MySQL root password.

4. **Build and Run the Application**
   - Open the project in your IDE or terminal.
   - Build the project using Maven:
     ```bash
     mvn clean package
     ```
   - Run the application:
     ```bash
     java -jar target/quiz-app-0.0.1-SNAPSHOT.jar
     ```
   - Alternatively, use your IDE’s run configuration for `QuizApplication.java`.

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:8080/`.
   - Enter your name, take the quiz, submit it, and explore the "Thank You" page.

## Running the Application

- **Start the Quiz:** Enter your name on the homepage and click "Start Quiz" to begin.
- **Take the Quiz:** Answer the 5 OOP questions, see progress via the progress bar, and receive immediate feedback.
- **Submit Results:** Click "Submit Quiz" to see your score on the "Thank You" page and use the "Play Again" button to restart.
- **Database Persistence:** Your scores are automatically saved to the `quiz_db` MySQL database in the `quiz_scores` table.

## Deployment

The application can be deployed to cloud platforms with free tiers, such as:
- **Heroku:** Use the free tier (requires PostgreSQL or external MySQL).
- **Render:** Free tier with similar constraints.
- **AWS Free Tier:** 12 months free with EC2 and RDS MySQL.
- **Google Cloud Platform:** Free tier with credits for 90 days and limited always-free resources.

For detailed deployment instructions, refer to the platform’s documentation or consult a hosting guide for Spring Boot applications. Ensure your MySQL database is configured or migrated to a compatible database (e.g., PostgreSQL for Heroku/Render).

## Contributing

This project is for educational or personal use. If you’d like to contribute, feel free to fork the repository, make changes, and submit pull requests. However, this README focuses on the current state, and further modifications (e.g., adding new questions) are outside its scope.

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for details (if applicable).

## Contact

For questions or feedback, contact [Rakesh Gupta/rakeshgupta136a@gmail.com] or open an issue in the repository (if hosted on GitHub or similar).

---
