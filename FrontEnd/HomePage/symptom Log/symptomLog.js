document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.querySelector(".days");
    const weekdaysContainer = document.querySelector(".weekdays");
    const monthLabel = document.getElementById("currentMonth");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const symptomSelect = document.getElementById("symptom-select");
    const saveButton = document.getElementById("save-log");
    const recommendationText = document.getElementById("rec-text");
    const recommendationImage = document.getElementById("rec-image");
    const moodOptions = document.querySelectorAll(".mood");
    const inputs = document.querySelectorAll("input, select");

    const navLinks = document.querySelectorAll(".nav-menu a");  // Add this line to select nav links

    let logs = {}; // Store logs by date { "YYYY-MM-DD": { symptom: "...", mood: "..." } }
    let selectedDate = null;
    let currentDate = luxon.DateTime.local(); // Start with today's date

    // Days of the week (Sunday - Saturday)
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    // Add event listeners to each nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            const page = this.getAttribute("href"); // Get the href value
            if (page) {
                window.location.href = page; // Redirect to the respective page
            }
        });
    });

    function generateCalendar() {
        daysContainer.innerHTML = "";
        weekdaysContainer.innerHTML = ""; // Clear previous weekdays
        monthLabel.innerText = currentDate.toFormat("MMMM yyyy");

        // Add weekday headers
        weekdays.forEach(day => {
            let dayElement = document.createElement("div");
            dayElement.classList.add("weekday");
            dayElement.innerText = day;
            weekdaysContainer.appendChild(dayElement);
        });

        let firstDay = currentDate.startOf("month").weekday % 7; 
        let daysInMonth = currentDate.daysInMonth;

        // Empty slots for previous month's padding
        for (let i = 0; i < firstDay; i++) {
            let emptySlot = document.createElement("div");
            emptySlot.classList.add("day", "empty");
            daysContainer.appendChild(emptySlot);
        }

        // Generate actual days
        for (let i = 1; i <= daysInMonth; i++) {
            let dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerText = i;

            let dateKey = currentDate.toFormat(`yyyy-MM-${String(i).padStart(2, "0")}`);

            // Highlight if a log exists
            if (logs[dateKey]) {
                dayElement.classList.add("logged");
            }

            dayElement.addEventListener("click", () => {
                document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
                dayElement.classList.add("selected");
                selectedDate = dateKey;
                updateUI();
            });

            daysContainer.appendChild(dayElement);
        }
    }

    function updateUI() {
        if (selectedDate && logs[selectedDate]) {
            symptomSelect.value = logs[selectedDate].symptom || "";
            setMood(logs[selectedDate].mood);
            displayRecommendation(logs[selectedDate].symptom);
        } else {
            symptomSelect.value = "";
            setMood(null);
            recommendationText.innerText = "Select a symptom to see recommendations.";
            recommendationImage.src = "images/default.png";
        }
    }

    // Function to display AI-based recommendations
    function displayRecommendation(symptom) {
        const recommendations = {
            "Back Pain": { text: "Try prenatal yoga for relief.", image: "images/yoga.png"},
            "Fatigue": { text: "Ensure proper hydration and rest.", image: "images/rest.jpg" },
            "Mood Swings": { text: "Practice mindfulness and deep breathing exercises.", image: "images/meditation.jpg" },
            "More Urination": { text: "Stay hydrated, but avoid caffeine before bedtime.", image: "images/water.jpg" },
            "Tender": { text: "Wear a supportive maternity bra.", image: "images/bra.jpg" },
            "Food Cravings and Dislikes": { text: "Eat small, frequent meals to manage cravings.", image: "images/food.jpg" },
            "Upset Stomach (vomiting too)": { text: "Ginger tea can help with nausea.", image: "images/ginger.jpg" },
            "Heartburn": { text: "Avoid spicy foods and eat smaller meals.", image: "images/heartburn.jpg" },
            "Constipation": { text: "Increase fiber intake with fruits and vegetables.", image: "images/fiber.jpg" },
            "Serious emotional changes (sadness)": { text: "Talk to a therapist or join a support group.", image: "images/therapy.jpg" },
            "Increased vaginal discharge": { text: "Wear breathable cotton underwear.", image: "images/cotton.jpg" },
            "Skin changes (spider veins)": { text: "Elevate your legs to improve circulation.", image: "images/legs.jpg" },
            "Dental issues (gum bleeding)": { text: "Use a soft-bristled toothbrush and floss gently.", image: "images/toothbrush.jpg" },
            "Larger belly and breasts": { text: "Apply moisturizer to prevent stretch marks.", image: "images/stretchmarks.jpg" },
            "Nosebleeds & stuffiness": { text: "Use a humidifier to keep nasal passages moist.", image: "images/humidifier.jpg" },
            "Skin changes (melasma)": { text: "Apply sunscreen daily to prevent pigmentation.", image: "images/sunscreen.jpg" },
            "Braxton Hicks contractions": { text: "Stay hydrated and change positions.", image: "images/braxton.jpg" },
            "Leg cramps": { text: "Stretch your legs before bed and stay hydrated.", image: "images/legstretch.jpg" },
            "Dizziness": { text: "Stand up slowly and eat iron-rich foods.", image: "images/iron.jpg" },
            "Vaginal discharge (with odor or pain)": { text: "See a doctor to rule out infections.", image: "images/doctor.jpg" },
            "Urinary tract infections": { text: "Drink cranberry juice and see a doctor.", image: "images/cranberry.jpg" },
            "Frequent urination": { text: "Limit fluids before bedtime.", image: "images/bathroom.jpg" },
            "Spider veins": { text: "Wear compression stockings to reduce swelling.", image: "images/compression.jpg" },
            "Shortness of breath": { text: "Practice good posture and take deep breaths.", image: "images/breathe.jpg" },
            "Frequent urination (Leaking)": { text: "Do Kegel exercises to strengthen pelvic muscles.", image: "images/kegel.jpg" },
            "Heart palpitations": { text: "Reduce caffeine intake and monitor stress levels.", image: "images/stress.jpg" },
            "Backaches": { text: "Use a maternity pillow for better support.", image: "images/pillow.jpg" },
            "Nausea and vomiting (if present)": { text: "Eat small meals and avoid strong odors.", image: "images/smallmeal.jpg" },
            "Swelling of hands and feet": { text: "Elevate your feet and reduce salt intake.", image: "images/swelling.jpg" },
            "Severe headaches": { text: "Rest in a dark room and stay hydrated.", image: "images/headache.jpg" },
            "Mood and mental health (depression or anxiety)": { text: "Consider therapy or relaxation techniques.", image: "images/mentalhealth.jpg" },
            "Leaking amniotic fluid": { text: "Seek medical attention immediately.", image: "images/emergency.jpg" }
        };

        if (recommendations[symptom]) {
            recommendationText.innerText = recommendations[symptom].text;
            recommendationImage.src = recommendations[symptom].image;
        }
    }

    // Function to set mood selection
    function setMood(mood) {
        moodOptions.forEach(m => {
            m.classList.toggle("selected", m.dataset.mood === mood);
        });
    }

    // Mood selection event
    moodOptions.forEach(mood => {
        mood.addEventListener("click", () => {
            setMood(mood.dataset.mood);
        });
    });

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                input.classList.add("filled");
            } else {
                input.classList.remove("filled");
            }
        });
    });

    // Save symptom & mood
    saveButton.addEventListener("click", () => {
        if (selectedDate) {
            logs[selectedDate] = { 
                symptom: symptomSelect.value, 
                mood: document.querySelector(".mood.selected")?.dataset.mood 
            };
    
            // Update UI
            updateUI();
            generateCalendar(); // Regenerate to apply the class to the correct day
        }
    });

    // Month Navigation
    prevMonthBtn.addEventListener("click", () => {
        currentDate = currentDate.minus({ months: 1 });
        generateCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate = currentDate.plus({ months: 1 });
        generateCalendar();
    });

    generateCalendar();
});
