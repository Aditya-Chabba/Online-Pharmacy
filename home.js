const accountBtn = document.querySelector(".login-button"); 

accountBtn.addEventListener("click", goToUserDashBoard);

function goToUserDashBoard() {
    window.location.href = "userDashboard.html";
}
