document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginPage = document.getElementById("login-page");
    const appContent = document.getElementById("app-content");
    const loginError = document.getElementById("login-error");
    const themeToggle = document.getElementById("theme-toggle");
    const atsForm = document.getElementById("ats-form");
    const decreaseFontBtn = document.getElementById("decrease-font");
    const increaseFontBtn = document.getElementById("increase-font");

    const validUsername = "admin";
    const validPassword = "password123";

    let fontSize = 100;

    // Handle login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredUsername = document.getElementById("username").value.trim();
        const enteredPassword = document.getElementById("password").value;

        if (enteredUsername === validUsername && enteredPassword === validPassword) {
            loginPage.style.display = "none";
            appContent.style.display = "block";
            showSection("home");
        } else {
            loginError.innerText = "Invalid username or password.";
        }
    });

    // Clear error on input
    document.getElementById("username").addEventListener("input", () => {
        loginError.innerText = "";
    });
    document.getElementById("password").addEventListener("input", () => {
        loginError.innerText = "";
    });

    // ATS Score Calculation
    if (atsForm) {
        atsForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const jobDescription = document.getElementById("job-description").value;
            const resume = document.getElementById("resume").value;

            const atsScore = calculateATSScore(jobDescription, resume);
            document.getElementById("ats-result").innerText = `Your ATS Score is: ${atsScore}`;
        });
    }

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeToggle.setAttribute("aria-pressed", isDark.toString());
            themeToggle.innerText = isDark ? "Light Mode" : "Dark Mode";
        });
    }

    // Font Size Accessibility
    if (increaseFontBtn && decreaseFontBtn) {
        increaseFontBtn.addEventListener("click", () => {
            if (fontSize < 150) {
                fontSize += 10;
                document.body.style.fontSize = fontSize + "%";
            }
        });

        decreaseFontBtn.addEventListener("click", () => {
            if (fontSize > 80) {
                fontSize -= 10;
                document.body.style.fontSize = fontSize + "%";
            }
        });
    }
});

// Show selected main section
function showSection(sectionId) {
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = "block";
    }
}

// Show selected subsection
function showSubsection(subsectionId) {
    const subsections = document.querySelectorAll(".subsection");
    subsections.forEach(subsection => {
        subsection.style.display = "none";
    });

    const activeSubsection = document.getElementById(subsectionId);
    if (activeSubsection) {
        activeSubsection.style.display = "block";
    }
}

// ATS Score Calculation
function calculateATSScore(jobDescription, resumeText) {
    const jobWords = jobDescription.toLowerCase().split(/\W+/);
    const resumeWords = resumeText.toLowerCase().split(/\W+/);

    const jobSet = new Set(jobWords.filter(word => word.length > 2));
    const resumeSet = new Set(resumeWords);

    const matched = [...jobSet].filter(word => resumeSet.has(word)).length;
    const total = jobSet.size;

    const score = total > 0 ? (matched / total) * 100 : 0;
    return score.toFixed(2) + "%";
}
