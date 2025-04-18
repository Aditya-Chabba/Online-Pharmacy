const firebaseLoginURL = "https://onlinepharmacy-63387-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"; // Replace with your actual DB URL

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(firebaseLoginURL);
        const users = await response.json();

        let isAuthenticated = false;

        for (let key in users) {
            if (users[key].email === email && users[key].password === password) {
                isAuthenticated = true;
                sessionStorage.setItem("user", email); 
                localStorage.setItem("userId", key);
                window.location.href = "home.html"; 
                break;
            }
        }

        if (!isAuthenticated) {
            document.getElementById("loginStatus").textContent = "Invalid email or password!";
        }

    } catch (error) {
        console.error("Error:", error);
    }
});

