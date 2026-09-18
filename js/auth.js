// ================= AUTHENTICATION =================

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);

    if (element) {
        element.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `;
    }
}

function getUser() {
    return JSON.parse(localStorage.getItem("user")) || null;
}

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function protectPage() {
    if (document.body.dataset.page === "protected" && !isLoggedIn()) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

function signupFun(event) {
    event.preventDefault();

    const form = document.getElementById("signupForm");
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPassword").setCustomValidity("Passwords do not match.");
        form.classList.add("was-validated");
        showMessage("signupMessage", "Passwords do not match.", "danger");
        return;
    }

    document.getElementById("confirmPassword").setCustomValidity("");

    const existingUser = getUser();

    if (existingUser && existingUser.email === email) {
        showMessage("signupMessage", "Email already exists. Please login.", "warning");
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "false");

    showMessage("signupMessage", "Signup successful. Redirecting to login...", "success");

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
}

function loginFun(event) {
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const email = document.getElementById("useremail").value.trim().toLowerCase();
    const password = document.getElementById("userpass").value;

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const user = getUser();

    if (!user) {
        showMessage("loginMessage", "No account found. Please signup first.", "warning");
        return;
    }

    if (email === user.email && password === user.password) {
        localStorage.setItem("isLoggedIn", "true");

        showMessage("loginMessage", "Login successful. Redirecting...", "success");

        setTimeout(function () {
            window.location.href = "home.html";
        }, 700);
    } else {
        showMessage("loginMessage", "Email or password is invalid.", "danger");
    }
}

function updateNavbarCounts() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const cartCount = document.getElementById("cartCount");
    const wishlistCount = document.getElementById("wishlistCount");

    if (cartCount) {
        let totalQuantity = 0;

        cart.forEach(function (item) {
            totalQuantity += item.quantity;
        });

        cartCount.textContent = totalQuantity;
    }

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    protectPage();
    updateNavbarCounts();

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    if (signupForm) {
        signupForm.addEventListener("submit", signupFun);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginFun);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
