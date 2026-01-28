function register() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!name || !email || !password) {
        alert("אנא מלא את כל השדות");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("כתובת אימייל לא תקינה");
        return;
    }

    if (password.length < 6) {
        alert("הסיסמה חייבת להכיל לפחות 6 תווים");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    if (localStorage.getItem(email) === null) {
        window.localStorage.setItem("currentUser", JSON.stringify(user))
        window.location.href = "game.html";
    } else {
        alert("משתמש כבר קיים במערכת");
        window.location.href = "login.html";
    }
}
