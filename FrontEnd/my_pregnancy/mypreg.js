document.addEventListener("DOMContentLoaded", function () {
    // 🎯 PROFILE PICTURE UPLOAD FUNCTIONALITY
    const profileUpload = document.getElementById("profile-upload");
    const profilePic = document.getElementById("profile-pic");

    profileUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 🎯 FADE HEADER ON SCROLL
    window.addEventListener("scroll", function () {
        let ageHeader = document.querySelector(".age h3");
        let heightHeaders = document.querySelectorAll(".input-group h3"); // Selects both height & weight
        let scrollY = window.scrollY;
        let fadeValue = Math.max(1 - scrollY / 100, 0); // Adjust for smoother fade

        ageHeader.style.opacity = fadeValue;

        // Loop through all .input-group h3 (height and weight) and apply fade effect
        heightHeaders.forEach(header => {
            header.style.opacity = fadeValue;
        });
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("href");
            if (page) {
                window.location.href = page;
            }
        });
    });

    // 🎯 CONDITION CHECKBOX POP-UP FUNCTIONALITY
    const checkboxes = document.querySelectorAll(".condition-checkbox");
    const popup = document.getElementById("condition-popup");
    const popupTitle = document.getElementById("popup-title");
    const complicationsMother = document.getElementById("complications-mother");
    const complicationsBaby = document.getElementById("complications-baby");
    const prevention = document.getElementById("prevention");
    const closeButton = document.querySelector(".close-btn");

    // ✅ Condition Data (Now Includes Every Condition!)
    const conditionData = {
        diabetes: {
            title: "Diabetes (Type 1 & 2)",
            mother: ["Higher risk of preeclampsia", "C-section delivery", "Preterm labor"],
            baby: ["High birth weight (macrosomia)", "Low blood sugar", "Breathing issues"],
            prevention: ["Monitor blood sugar", "Healthy diet", "Exercise regularly"]
        },
        hypertension: {
            title: "Hypertension (High Blood Pressure)",
            mother: ["Preeclampsia risk", "Placental abruption", "Preterm birth"],
            baby: ["Low birth weight", "Oxygen deprivation", "Restricted growth"],
            prevention: ["Monitor blood pressure", "Reduce salt intake", "Stay active"]
        },
        thyroid: {
            title: "Thyroid Disorders",
            mother: ["Increased miscarriage risk", "Heart issues", "Preterm labor"],
            baby: ["Cognitive issues", "Low birth weight", "Developmental delays"],
            prevention: ["Regular thyroid checks", "Medication", "Proper diet"]
        },
        obesity: {
            title: "Obesity",
            mother: ["Gestational diabetes risk", "High blood pressure", "C-section risk"],
            baby: ["Birth defects", "Higher stillbirth risk", "Childhood obesity"],
            prevention: ["Healthy diet", "Exercise", "Doctor guidance"]
        },
        pcos: {
            title: "PCOS (Polycystic Ovary Syndrome)",
            mother: ["Higher miscarriage risk", "Gestational diabetes", "Preeclampsia"],
            baby: ["Preterm birth", "Higher diabetes risk", "Respiratory issues"],
            prevention: ["Monitor insulin levels", "Follow a healthy lifestyle", "Medication if needed"]
        },
        lupus: {
            title: "Lupus & Autoimmune Disorders",
            mother: ["Preeclampsia", "Blood clot risk", "Organ damage"],
            baby: ["Low birth weight", "Neonatal lupus", "Heart defects"],
            prevention: ["Regular doctor visits", "Safe medications", "Reduce stress"]
        },
        "heart-disease": {
            title: "Heart Disease",
            mother: ["Heart failure risk", "High blood pressure", "Swelling"],
            baby: ["Growth restriction", "Preterm birth", "Low oxygen"],
            prevention: ["Cardiologist monitoring", "Healthy lifestyle", "Medication"]
        },
        "kidney-disease": {
            title: "Kidney Disease",
            mother: ["Higher blood pressure", "Fluid retention", "Organ strain"],
            baby: ["Low birth weight", "Developmental issues", "Preterm birth"],
            prevention: ["Monitor kidney function", "Stay hydrated", "Control blood pressure"]
        },
        epilepsy: {
            title: "Epilepsy",
            mother: ["Seizure risks", "Medication side effects", "Stress impact"],
            baby: ["Delayed development", "Low birth weight", "Oxygen deprivation"],
            prevention: ["Doctor-approved medications", "Stress management", "Seizure tracking"]
        },
        "mental-health": {
            title: "Mental Health Conditions",
            mother: ["Increased anxiety", "Postpartum depression", "Higher stress"],
            baby: ["Delayed bonding", "Lower birth weight", "Developmental impact"],
            prevention: ["Therapy & support", "Self-care routines", "Medication if needed"]
        },
        "gestational-diabetes": {
            title: "Gestational Diabetes",
            mother: ["Preeclampsia", "C-section risk", "High blood sugar"],
            baby: ["High birth weight", "Hypoglycemia", "Breathing issues"],
            prevention: ["Monitor blood sugar", "Healthy eating", "Exercise"]
        },
        preeclampsia: {
            title: "Preeclampsia",
            mother: ["Severe high blood pressure", "Organ damage", "Preterm birth"],
            baby: ["Growth restriction", "Low birth weight", "Oxygen deprivation"],
            prevention: ["Regular check-ups", "Low-sodium diet", "Monitor blood pressure"]
        },
        eclampsia: {
            title: "Eclampsia",
            mother: ["Seizures", "Organ failure", "Blood pressure spikes"],
            baby: ["Stillbirth risk", "Low oxygen", "Preterm birth"],
            prevention: ["Early detection", "Medication", "Hospital monitoring"]
        },
        "placenta-previa": {
            title: "Placenta Previa",
            mother: ["Severe bleeding", "Preterm labor", "Emergency C-section"],
            baby: ["Oxygen deprivation", "Low birth weight", "Premature birth"],
            prevention: ["Regular ultrasounds", "Activity restriction", "Hospital observation"]
        },
        "hellp-syndrome": {
            title: "HELLP Syndrome",
            mother: ["Severe organ damage", "Blood clotting issues", "High BP"],
            baby: ["Growth restriction", "Preterm birth", "Oxygen deprivation"],
            prevention: ["Early detection", "Hospital care", "Blood pressure control"]
        },
        hiv: {
            title: "HIV/AIDS",
            mother: ["Immune suppression", "Higher infection risk", "Long-term health effects"],
            baby: ["HIV transmission", "Low birth weight", "Weakened immunity"],
            prevention: ["Antiretroviral therapy", "Safe delivery methods", "Avoid breastfeeding (if advised)"]
        },
        hepatitis: {
            title: "Hepatitis B or C",
            mother: ["Liver damage", "Jaundice", "Fatigue"],
            baby: ["Hepatitis transmission", "Weakened liver", "Growth issues"],
            prevention: ["Vaccination", "Antiviral medications", "Blood screening"]
        },
        stis: {
            title: "STIs (Sexually Transmitted Infections)",
            mother: ["Infection risk", "Pelvic inflammation", "Complicated delivery"],
            baby: ["Congenital infections", "Low birth weight", "Developmental issues"],
            prevention: ["Routine STI testing", "Safe sex practices", "Antibiotic treatment"]
        },
        anemia: {
            title: "Anemia (Iron Deficiency)",
            mother: ["Extreme fatigue", "Infection risk", "Heart complications"],
            baby: ["Low birth weight", "Preterm birth", "Delayed development"],
            prevention: ["Increase iron intake", "Prenatal vitamins", "Iron-rich foods"]
        },
        "rh-incompatibility": {
            title: "Rh Incompatibility",
            mother: ["Immune system attacks baby's blood", "Severe anemia", "Jaundice"],
            baby: ["Severe anemia", "Brain damage risk", "Organ failure"],
            prevention: ["Rh immunoglobulin shots", "Blood type monitoring", "Regular check-ups"]
        }
    };

    // Function to position pop-up near checkbox
    function positionPopup(target) {
        const rect = target.getBoundingClientRect(); // Get checkbox position
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Position pop-up slightly below and to the right of checkbox
        popup.style.top = `${rect.top + scrollTop + 25}px`;
        popup.style.left = `${rect.left + scrollLeft + 30}px`;
    }

    // Show Pop-up on Click
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function (event) {
            if (this.checked) { // ✅ Only show pop-up when checked
                const conditionKey = this.getAttribute("data-condition");
                const conditionInfo = conditionData[conditionKey];
    
                if (conditionInfo) {
                    popupTitle.textContent = conditionInfo.title;
                    complicationsMother.innerHTML = conditionInfo.mother.map(item => `<li>${item}</li>`).join("");
                    complicationsBaby.innerHTML = conditionInfo.baby.map(item => `<li>${item}</li>`).join("");
                    prevention.innerHTML = conditionInfo.prevention.map(item => `<li>${item}</li>`).join("");
    
                    positionPopup(event.target); // Position pop-up near the clicked checkbox
                    popup.style.display = "block";
                }
            } else {
                popup.style.display = "none"; // ✅ Hide pop-up when unchecked
            }
        });
    });    

    // Close Pop-up on Clicking X
    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Close Pop-up When Clicking Outside
    document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && !event.target.classList.contains("condition-checkbox")) {
            popup.style.display = "none";
        }
    });
});



