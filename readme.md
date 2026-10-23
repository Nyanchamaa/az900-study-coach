# AZ-900 Study Coach ☁️

A personalized study-planning web application designed to help learners prepare for the Microsoft Azure Fundamentals (AZ-900) certification exam.

## 📌 Overview

Preparing for a certification exam can be challenging when learners have limited study time and are unsure which topics need more attention.

AZ-900 Study Coach helps learners organize their preparation through a personalized study plan, domain-level progress tracking, and interactive practice questions.

The application uses quiz performance to identify weaker knowledge areas and recommend what to study next.

## ✨ Features

- **Personalized study plan:** Set your exam date, daily study time, and confidence level.
- **Progress dashboard:** View an estimated readiness score and individual domain scores.
- **Interactive practice quiz:** Answer AZ-900 practice questions and receive immediate feedback.
- **Adaptive recommendations:** Prioritize the domain with the lowest current score.
- **Progress persistence:** Save your study plan and scores in the browser using `localStorage`.
- **Responsive design:** Access the application on desktop and mobile screens.

## 🛠️ Technologies Used

- HTML5 — application structure
- CSS3 — styling and responsive layout
- JavaScript — quiz logic, progress calculations, and recommendations
- Browser localStorage — client-side data persistence

## 📂 Project Structure

```text
az900-study-coach/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

You need a modern web browser and a code editor such as Visual Studio Code.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/az900-study-coach.git
   ```

2. Navigate to the project directory:

   ```bash
   cd az900-study-coach
   ```

3. Open the folder in Visual Studio Code:

   ```bash
   code .
   ```

4. Open `index.html` in your browser.

   Alternatively, install the Live Server extension in VS Code and select **Open with Live Server**.

## 🧠 How It Works

1. The learner enters their exam date, daily study availability, and confidence level.
2. The application displays a dashboard with estimated readiness and domain scores.
3. The learner completes practice questions and receives feedback.
4. Correct and incorrect answers adjust the relevant domain score.
5. The dashboard identifies the lowest-scoring domain and recommends it for the next study session.
6. Progress is stored locally in the browser.

## ⚠️ Current Limitations

This is a front-end prototype. It currently uses a small, predefined question bank and simplified score-adjustment rules.

- Readiness scores are illustrative estimates, not official Microsoft exam predictions.
- Progress is stored locally and is not synchronized across devices.
- There is no user authentication or cloud database.
- Recommendations use rule-based logic rather than a trained AI model.
- Practice questions cover only a limited selection of AZ-900 topics.

## 🔮 Future Improvements

- Expand the question bank to cover the complete AZ-900 exam syllabus.
- Incorporate the current official Microsoft exam objectives.
- Develop a more robust performance-based recommendation algorithm.
- Add study reminders and a daily revision calendar.
- Introduce user accounts and cloud-based progress synchronization.
- Add analytics to track improvement over time.
- Integrate curated learning resources for each domain.

## 🎯 Project Objective

The objective of AZ-900 Study Coach is to demonstrate how web technologies can be used to build a personalized learning tool that helps learners allocate study time more effectively and focus on areas where they need improvement.

## 📄 License

This project is available for educational and portfolio purposes. A formal open-source license can be added if the project is released for reuse.

---

**Disclaimer:** AZ-900 Study Coach is an independent learning project and is not affiliated with or endorsed by Microsoft.
