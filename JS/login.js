function login() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    if (!email || !password) {
        alert("אנא מלא את כל השדות");
        return;
    }

    let tempEmail = window.localStorage.getItem(email);
    if (tempEmail) {
        let user = JSON.parse(tempEmail);
        if (user.password === password) {
            window.localStorage.setItem("currentUser", JSON.stringify(user))
            window.location.href = "game.html";
        } else {
            alert("סיסמה שגויה");
        }
    } else {
        alert("המשתמש לא נמצא במערכת");
        window.location.href = "register.html";
    }
}
