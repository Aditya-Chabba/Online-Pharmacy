const firebaseURL = "https://onlinepharmacy-63387-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"; // Replace with your actual DB URL

document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = { email, password };

    try {
        const response = await fetch(firebaseURL, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            alert("Signup successful!");
            window.location.href = "login.html"; // Redirect to login page
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

