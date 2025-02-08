const LoginForm = document.getElementById("LoginForm");
const loginButton = document.getElementById("Button");
const ErrorMessage = document.getElementById("ErrorMessage");

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = LoginForm.username.value;
    const password = LoginForm.password.value;

    //ID PW 
    if (username === "jino__ot" && password === "1234") {
        alert("로그인 성공");
        location.href = "./BlogPage.html";
    } else {
        ErrorMessage.style.opacity = 1;
    }
});