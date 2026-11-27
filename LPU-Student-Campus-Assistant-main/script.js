// 1. DARK AND LIGHT MODE


var themeButton = document.getElementById("themeButton");


var savedTheme = localStorage.getItem("lpuTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.textContent = "☀️ Light Mode";

} else {

    themeButton.textContent = "🌙 Dark Mode";

}



themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("lpuTheme", "dark");

        themeButton.textContent = "☀️ Light Mode";

    } else {

        localStorage.setItem("lpuTheme", "light");

        themeButton.textContent = "🌙 Dark Mode";

    }

});



// 2. LOCATION SEARCH

var searchForm = document.getElementById("searchForm");

var searchInput = document.getElementById("searchInput");

var locationCards = document.querySelectorAll(".location-card");

var resultCount = document.getElementById("resultCount");

var noResults = document.getElementById("noResults");



function searchLocations(searchText) {

    searchText = searchText.toLowerCase().trim();

    var visibleCount = 0;

    
    for (var i = 0; i < locationCards.length; i++) {

        var placeName = locationCards[i].getAttribute("data-place-name");

        var heading = locationCards[i].querySelector("h3").textContent;

        placeName = placeName.toLowerCase();

        heading = heading.toLowerCase();


        
        if (
            searchText === "" ||
            placeName.indexOf(searchText) !== -1 ||
            heading.indexOf(searchText) !== -1
        ) {

            locationCards[i].style.display = "block";

            visibleCount++;

        } else {

            locationCards[i].style.display = "none";

        }

    }



    resultCount.textContent = visibleCount + " locations";


    
    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    searchLocations(searchInput.value);

    document.getElementById("locations").scrollIntoView({
        behavior: "smooth"
    });

});

// 3. CAMPUS MAP


var campusMap = document.getElementById("campusMap");

var mapSearchForm = document.getElementById("mapSearchForm");

var mapSearchInput = document.getElementById("mapSearchInput");

var mapStatus = document.getElementById("mapStatus");

var openFullMap = document.getElementById("openFullMap");


function showOnMap(placeName) {

    var fullPlaceName = placeName;

    
    if (
        fullPlaceName.toLowerCase().indexOf("lovely professional university") === -1
    ) {

        fullPlaceName = fullPlaceName +
            ", Lovely Professional University, Phagwara, Punjab, India";

    }


    
    var mapLink = "https://www.google.com/maps?q=" +
        encodeURIComponent(fullPlaceName) + "&output=embed";

    campusMap.src = mapLink;



    mapStatus.textContent = "Showing results for: " + placeName;



    openFullMap.href =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(fullPlaceName);

}


mapSearchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var place = mapSearchInput.value.trim();

    if (place === "") {

        mapStatus.textContent = "Please enter a location name.";

    } else {

        showOnMap(place);

    }

});


//  location 
var mapButtons = document.querySelectorAll(".map-place, .view-map");

for (var i = 0; i < mapButtons.length; i++) {

    mapButtons[i].addEventListener("click", function() {

        var placeName = this.getAttribute("data-place");

        showOnMap(placeName);

        document.getElementById("campus-map").scrollIntoView({
            behavior: "smooth"
        });

    });

}



// 4. EXAM REMINDER SYSTEM


var examForm = document.getElementById("examForm");

var examNameInput = document.getElementById("examName");

var examDateInput = document.getElementById("examDate");

var examList = document.getElementById("examList");

var examAlert = document.getElementById("examAlert");

var examAlertText = document.getElementById("examAlertText");



var exams = JSON.parse(localStorage.getItem("lpuExams")) || [];



function getTodayDate() {

    var today = new Date();

    var year = today.getFullYear();

    var month = String(today.getMonth() + 1).padStart(2, "0");

    var day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;

}



examDateInput.min = getTodayDate();

function getDaysLeft(examDate) {

    var today = new Date();

    today.setHours(0, 0, 0, 0);

    var examDay = new Date(examDate + "T00:00:00");

    var difference = examDay.getTime() - today.getTime();

    var days = Math.round(
        difference / (1000 * 60 * 60 * 24)
    );

    return days;

}

function saveExams() {

    localStorage.setItem("lpuExams", JSON.stringify(exams));

}
examForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var examName = examNameInput.value.trim();

    var examDate = examDateInput.value;


    if (examName === "" || examDate === "") {

        alert("Please enter exam name and date.");

        return;

    }


    if (getDaysLeft(examDate) < 0) {

        alert("Please select a future exam date.");

        return;

    }


    for (var i = 0; i < exams.length; i++) {

        if (
            exams[i].name.toLowerCase() === examName.toLowerCase() &&
            exams[i].date === examDate
        ) {

            alert("This exam is already added.");

            return;

        }

    }


    
    var newExam = {

        name: examName,

        date: examDate

    };


    
    exams.push(newExam);


    
    saveExams();

    showExams();

    updateReminder();


    
    examForm.reset();

    examDateInput.min = getTodayDate();

    alert("Your exam has been added successfully!");

});



//5. SHOW EXAM LIST


function showExams() {

    // Clear old list
    examList.innerHTML = "";


    // Check empty list
    if (exams.length === 0) {

        var message = document.createElement("p");

        message.textContent = "No exams added yet.";

        examList.appendChild(message);

        return;

    }


    // Sort exams by date
    exams.sort(function(a, b) {

        return a.date.localeCompare(b.date);

    });


    // Display all exams
    for (var i = 0; i < exams.length; i++) {

        var examItem = document.createElement("div");

        examItem.className = "exam-item";


        // Exam details
        var examDetails = document.createElement("div");

        var examTitle = document.createElement("strong");

        examTitle.textContent = exams[i].name;


        var examDateText = document.createElement("p");

        var daysLeft = getDaysLeft(exams[i].date);

        var statusText = "";


        if (daysLeft === 0) {

            statusText = "Exam is today!";

        } else if (daysLeft === 1) {

            statusText = "Tomorrow";

        } else if (daysLeft > 1) {

            statusText = "In " + daysLeft + " days";

        } else {

            statusText = "Exam date has passed";

        }


        examDateText.textContent =
            "Date: " + exams[i].date + " | " + statusText;


        examDetails.appendChild(examTitle);

        examDetails.appendChild(examDateText);


        // Delete button
        var deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.setAttribute("data-index", i);


        deleteButton.addEventListener("click", function() {

            var index = Number(this.getAttribute("data-index"));

            exams.splice(index, 1);

            saveExams();

            showExams();

            updateReminder();

        });


        examItem.appendChild(examDetails);

        examItem.appendChild(deleteButton);

        examList.appendChild(examItem);

    }

}



//6. SEVEN DAY EXAM REMINDER


function updateReminder() {

    var nearestExam = null;

    var nearestDays = 8;


    // Find nearest upcoming exam
    for (var i = 0; i < exams.length; i++) {

        var daysLeft = getDaysLeft(exams[i].date);


        if (daysLeft >= 0 && daysLeft <= 7) {

            if (daysLeft < nearestDays) {

                nearestDays = daysLeft;

                nearestExam = exams[i];

            }

        }

    }


    // Show reminder
    if (nearestExam !== null) {

        var reminderMessage = "";


        if (nearestDays === 0) {

            reminderMessage = " is today!";

        } else if (nearestDays === 1) {

            reminderMessage = " is tomorrow!";

        } else {

            reminderMessage = " is in " + nearestDays + " days.";

        }


        examAlertText.textContent =
            "Upcoming Exam: " + nearestExam.name + reminderMessage;


        examAlert.style.display = "flex";

    } else {

        examAlert.style.display = "none";

    }


    // Check browser notifications
    checkNotifications();

}



// 7. BROWSER NOTIFICATION

var notificationButton =
    document.getElementById("notificationButton");

var notificationStatus =
    document.getElementById("notificationStatus");


// Check notification support
function checkNotificationSupport() {

    if (!("Notification" in window)) {

        notificationStatus.textContent =
            "Your browser does not support notifications.";

        notificationButton.disabled = true;

        return false;

    }

    return true;

}


// Enable notifications
notificationButton.addEventListener("click", function() {

    if (!checkNotificationSupport()) {

        return;

    }


    Notification.requestPermission().then(function(permission) {

        if (permission === "granted") {

            notificationStatus.textContent =
                "Notifications are enabled!";

            checkNotifications();

        } else {

            notificationStatus.textContent =
                "Notification permission was not granted.";

        }

    });

});


// Send notification for upcoming exams
function checkNotifications() {

    if (!("Notification" in window)) {

        return;

    }

    if (Notification.permission !== "granted") {

        return;

    }


    for (var i = 0; i < exams.length; i++) {

        var daysLeft = getDaysLeft(exams[i].date);


        if (daysLeft >= 0 && daysLeft <= 7) {

            var notificationKey =
                "lpuNotified_" + exams[i].name + "_" + exams[i].date;


            
            if (localStorage.getItem(notificationKey) !== "yes") {

                var message = "";


                if (daysLeft === 0) {

                    message = "Your exam is today!";

                } else if (daysLeft === 1) {

                    message = "Your exam is tomorrow!";

                } else {

                    message = "Your exam is in " + daysLeft + " days.";

                }


                //  browser notification
                new Notification("LPU Exam Reminder", {

                    body: exams[i].name + " - " + message

                });


                // status
                localStorage.setItem(notificationKey, "yes");

            }

        }

    }

}



// notificaton
if (checkNotificationSupport()) {

    if (Notification.permission === "granted") {

        notificationStatus.textContent =
            "Browser notifications are enabled.";

    }

}



// 8. LOAD SAVED DATA WHEN PAGE OPEN

// Show saved exams
showExams();

// Check upcoming exams
updateReminder();
