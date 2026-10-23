// ===================================
// AZ-900 STUDY COACH
// ===================================

const domainData = [
    { name: "Cloud Concepts", score: 82 },
    { name: "Azure Architecture & Services", score: 61 },
    { name: "Azure Management & Governance", score: 54 },
    { name: "Security", score: 72 }
];

const questions = [
    {
        domain: 0,
        question: "Which cloud model typically gives an organization the greatest control over its cloud infrastructure?",
        options: [
            "Public cloud",
            "Private cloud",
            "Software as a Service",
            "Serverless computing"
        ],
        correct: 1,
        explanation: "A private cloud can provide an organization with greater control over its environment."
    },
    {
        domain: 1,
        question: "Which Azure service allows you to run virtual machines?",
        options: [
            "Azure Virtual Machines",
            "Azure Blob Storage",
            "Azure DNS",
            "Azure Advisor"
        ],
        correct: 0,
        explanation: "Azure Virtual Machines provides on-demand virtualized computing resources."
    },
    {
        domain: 2,
        question: "Which Azure service helps enforce organizational rules across resources?",
        options: [
            "Azure Policy",
            "Azure CDN",
            "Azure Functions",
            "Azure Queue Storage"
        ],
        correct: 0,
        explanation: "Azure Policy helps assess and enforce organizational standards."
    },
    {
        domain: 3,
        question: "Which security principle gives users only the permissions they need?",
        options: [
            "High availability",
            "Least privilege",
            "Elasticity",
            "Redundancy"
        ],
        correct: 1,
        explanation: "Least privilege limits permissions to those required to perform a task."
    },
    {
        domain: 1,
        question: "Which Azure service provides a globally distributed NoSQL database?",
        options: [
            "Azure SQL Database",
            "Azure Cosmos DB",
            "Azure Files",
            "Azure VPN Gateway"
        ],
        correct: 1,
        explanation: "Azure Cosmos DB is a globally distributed database service supporting NoSQL data models."
    }
];

let scores = loadScores();
let currentQuestion = 0;
let questionAnswered = false;


// -----------------------------------
// LOAD AND SAVE PROGRESS
// -----------------------------------

function loadScores() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("az900Scores")
        );

        if (
            Array.isArray(saved) &&
            saved.length === domainData.length &&
            saved.every(
                score => Number.isFinite(score) &&
                    score >= 0 &&
                    score <= 100
            )
        ) {
            return saved;
        }
    } catch (error) {
        console.warn("Could not load saved scores.");
    }

    return domainData.map(domain => domain.score);
}

function saveProgress() {
    localStorage.setItem(
        "az900Scores",
        JSON.stringify(scores)
    );
}


// -----------------------------------
// NAVIGATION
// -----------------------------------

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id === "dashboard") {
        renderDashboard();
    }

    if (id === "quiz") {
        renderQuestion();
    }
}


// -----------------------------------
// SETUP AND PLAN
// -----------------------------------

document.getElementById("setupForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const examDate = document.getElementById("examDate").value;
        const studyMinutes = document.getElementById("studyMinutes").value;
        const confidence = document.getElementById("confidence").value;

        if (!examDate) {
            alert("Please select your exam date.");
            return;
        }

        const selectedDate = new Date(`${examDate}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("Please choose today or a future exam date.");
            return;
        }

        const plan = {
            examDate,
            studyMinutes: Number(studyMinutes),
            confidence: Number(confidence)
        };

        localStorage.setItem("az900Plan", JSON.stringify(plan));

        // Confidence is used as an initial adjustment only.
        // These are demo estimates, not official exam predictions.
        if (plan.confidence === 1) {
            scores = scores.map(score => Math.max(0, score - 10));
        } else if (plan.confidence === 3) {
            scores = scores.map(score => Math.min(100, score + 5));
        }

        saveProgress();
        showScreen("dashboard");
    }
);


// -----------------------------------
// PLAN HELPERS
// -----------------------------------

function getPlan() {
    try {
        return JSON.parse(localStorage.getItem("az900Plan"));
    } catch {
        return null;
    }
}

function getDaysUntilExam() {
    const plan = getPlan();

    if (!plan) return null;

    const exam = new Date(`${plan.examDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Math.max(
        0,
        Math.ceil((exam - today) / 86400000)
    );
}

function getWeakestDomainIndex() {
    return scores.reduce(
        (lowest, score, index) =>
            score < scores[lowest] ? index : lowest,
        0
    );
}

function getReadiness() {
    return Math.round(
        scores.reduce((total, score) => total + score, 0) /
        scores.length
    );
}


// -----------------------------------
// DASHBOARD
// -----------------------------------

function renderDashboard() {
    const plan = getPlan();

    if (!plan) {
        return;
    }

    const weakestIndex = getWeakestDomainIndex();
    const weakestDomain = domainData[weakestIndex];
    const readiness = getReadiness();

    document.getElementById("readiness").textContent =
        `${readiness}%`;

    document.getElementById("readinessProgress").style.width =
        `${readiness}%`;

    document.getElementById("dailyTime").textContent =
        `${plan.studyMinutes} min`;

    document.getElementById("priorityDomain").textContent =
        weakestDomain.name;

    const days = getDaysUntilExam();

    document.getElementById("examCountdown").textContent =
        days === 0
            ? "Your exam is today. Focus on a short review."
            : `${days} days until your exam. Your next session is based on your results.`;

    document.getElementById("sessionTitle").textContent =
        `Review ${weakestDomain.name}`;

    document.getElementById("sessionReason").textContent =
        `Your current demo score for this domain is ${scores[weakestIndex]}%. Start with focused revision, then answer practice questions.`;

    document.getElementById("recommendationText").textContent =
        `${weakestDomain.name} has your lowest current score (${scores[weakestIndex]}%). It is prioritized for your next session.`;

    renderDomains();
}

function renderDomains() {
    const container = document.getElementById("domainList");
    container.innerHTML = "";

    domainData.forEach((domain, index) => {
        const row = document.createElement("div");
        row.className = "domain";

        const label = document.createElement("div");
        label.className = "domain-label";

        const name = document.createElement("span");
        name.textContent = domain.name;

        const score = document.createElement("strong");
        score.textContent = `${scores[index]}%`;

        label.append(name, score);

        const progress = document.createElement("div");
        progress.className = "progress";

        const fill = document.createElement("div");
        fill.style.width = `${scores[index]}%`;

        progress.appendChild(fill);
        row.append(label, progress);
        container.appendChild(row);
    });
}


// -----------------------------------
// QUIZ
// -----------------------------------

function startQuiz() {
    currentQuestion = 0;
    showScreen("quiz");
}

function renderQuestion() {
    const question = questions[currentQuestion];

    questionAnswered = false;

    document.getElementById("questionCount").textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    document.getElementById("questionText").textContent =
        question.question;

    document.getElementById("feedback").textContent = "";

    document.getElementById("nextQuestion").textContent =
        currentQuestion === questions.length - 1
            ? "Finish quiz →"
            : "Next question →";

    const container = document.getElementById("answerOptions");
    container.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        container.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (questionAnswered) return;

    questionAnswered = true;

    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer");
    const correct = selectedIndex === question.correct;

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }
    });

    if (correct) {
        scores[question.domain] = Math.min(
            100,
            scores[question.domain] + 5
        );
    } else {
        scores[question.domain] = Math.max(
            0,
            scores[question.domain] - 3
        );

        buttons[selectedIndex].classList.add("wrong");
    }

    saveProgress();

    document.getElementById("feedback").textContent =
        `${correct ? "Correct! " : "Not quite. "}${question.explanation}`;

    renderDashboard();
}

function nextQuestion() {
    if (!questionAnswered) {
        alert("Choose an answer before continuing.");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
        return;
    }

    showScreen("dashboard");

    alert(
        "Quiz complete! Your domain scores and next recommended topic have been updated."
    );
}


// -----------------------------------
// INITIALIZE
// -----------------------------------

function initializeApp() {
    const plan = getPlan();

    if (plan) {
        showScreen("dashboard");
    } else {
        showScreen("home");
    }
}


initializeApp();