// // 1. CHECK CURRENT PAGE


// var currentPage = window.location.pathname;

// var isLoginPage = currentPage.endsWith("login.html");


// // If someone opens homepage without login
// if (
//     !isLoginPage &&
//     sessionStorage.getItem("lpuLoggedIn") !== "true"
// ) {

//     window.location.replace("login.html");

// }


// // If student is already logged in
// if (
//     isLoginPage &&
//     sessionStorage.getItem("lpuLoggedIn") === "true"
// ) {

//     window.location.replace("index.html");

// }




// // 2. LOGIN FORM


// var loginForm = document.getElementById("loginForm");

// var registrationNumber =
//     document.getElementById("registrationNumber");

// var password =
//     document.getElementById("password");

// var loginMessage =
//     document.getElementById("loginMessage");


// // Run when login form is submitted
// if (loginForm) {

//     loginForm.addEventListener("submit", function(event) {

//         event.preventDefault();

//         var regNumber = registrationNumber.value.trim();

//         var userPassword = password.value;


//         // Check empty fields
//         if (regNumber === "" || userPassword === "") {

//             showMessage("Please fill in all fields.", "error");

//             return;

//         }


//         // Check registration number
//         if (!/^[0-9]{6,12}$/.test(regNumber)) {

//             showMessage(
//                 "Enter a valid numeric registration number.",
//                 "error"
//             );

//             return;

//         }


//         // Check password length
//         if (userPassword.length < 6) {

//             showMessage(
//                 "Password must contain at least 6 characters.",
//                 "error"
//             );

//             return;

//         }


//         // Save login session
//         sessionStorage.setItem("lpuLoggedIn", "true");

//         sessionStorage.setItem("lpuStudentNumber", regNumber);


//         showMessage("Login successful! Opening homepage...", "success");


//         // Open homepage
//         window.location.href = "index.html";

//     });

// }



// // 3. SHOW ERROR OR SUCCESS MESSAGE


// function showMessage(message, type) {

//     if (loginMessage) {

//         loginMessage.textContent = message;

//         loginMessage.className = "login-message " + type;

//     }

// }




// // 4. SHOW AND HIDE PASSWORD


// var showPasswordButton =
//     document.getElementById("showPassword");


// if (showPasswordButton) {

//     showPasswordButton.addEventListener("click", function() {

//         if (password.type === "password") {

//             password.type = "text";

//             showPasswordButton.textContent = "Hide";

//         } else {

//             password.type = "password";

//             showPasswordButton.textContent = "Show";

//         }

//     });

// }


// // 5. FORGOT PASSWORD


// var forgotPassword =
//     document.getElementById("forgotPassword");


// if (forgotPassword) {

//     forgotPassword.addEventListener("click", function(event) {

//         event.preventDefault();

//         alert(
//             "For password assistance, please contact your campus support team."
//         );

//     });

// }



// // 6. LOGOUT SYSTEM
 

// var logoutButton =
//     document.getElementById("logoutButton");


// if (logoutButton) {

//     logoutButton.addEventListener("click", function() {

//         var confirmLogout = confirm(
//             "Are you sure you want to logout?"
//         );


//         if (confirmLogout) {

//             // Remove login information
//             sessionStorage.removeItem("lpuLoggedIn");

//             sessionStorage.removeItem("lpuStudentNumber");

//             // Return to login page
//             window.location.href = "login.html";

//         }

//     });

// }



/* --------------------------------
   1. CHECK CURRENT PAGE
-------------------------------- */

var pageName = window.location.pathname.split("/").pop();

var isDashboardPage = pageName === "dashboard.html";

var isLoginPage = pageName === "index.html" || pageName === "";


// Check login before opening dashboard

if (
    isDashboardPage &&
    sessionStorage.getItem("lpuLoggedIn") !== "true"
) {

    window.location.replace("index.html");

}




if (
    isLoginPage &&
    sessionStorage.getItem("lpuLoggedIn") === "true"
) {

    window.location.replace("dashboard.html");

}


//2. LOGIN SYSTEM


var loginForm = document.getElementById("loginForm");

var registrationNumber =
    document.getElementById("registrationNumber");

var password =
    document.getElementById("password");

var loginMessage =
    document.getElementById("loginMessage");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var regNumber = registrationNumber.value.trim();

        var userPassword = password.value;


        if (regNumber === "" || userPassword === "") {

            showMessage("Please fill in all fields.", "error");

            return;

        }


        if (!/^[0-9]{6,12}$/.test(regNumber)) {

            showMessage(
                "Enter a valid registration number.",
                "error"
            );

            return;

        }


        if (userPassword.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }


        // Save login session

        sessionStorage.setItem("lpuLoggedIn", "true");

        sessionStorage.setItem("lpuStudentNumber", regNumber);


        // Open dashboard

        window.location.href = "dashboard.html";

    });

}


//3. SHOW MESSAGE


function showMessage(message, type) {

    if (loginMessage) {

        loginMessage.textContent = message;

        loginMessage.className = "login-message " + type;

    }

}


//4. SHOW / HIDE PASSWORD


var showPasswordButton =
    document.getElementById("showPassword");


if (showPasswordButton) {

    showPasswordButton.addEventListener("click", function() {

        if (password.type === "password") {

            password.type = "text";

            showPasswordButton.textContent = "Hide";

        } else {

            password.type = "password";

            showPasswordButton.textContent = "Show";

        }

    });

}


//5. FORGOT PASSWORD

var forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Please contact the campus support team.");

    });

}


//6. LOGOUT SYSTEM


var logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        var confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            sessionStorage.removeItem("lpuLoggedIn");

            sessionStorage.removeItem("lpuStudentNumber");

            window.location.href = "index.html";

        }

    });

}
