// const firebaseURL = "https://onlinepharmacy-63387-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"; 

// document.getElementById("signupForm").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const newUser = { email, password };

//     try {

//         const registeredUsers = await fetch(firebaseURL);
//         const allRegisteredUsers = await registeredUsers.json();

//         let isRegistered = false;

//         for (let key in allRegisteredUsers) {
//             if (allRegisteredUsers[key].email === email) {
//                 isRegistered = true;
//                 alert("user is already registered!");
//                 break;      
//             }
//         }
//         if(isRegistered===true){
//             window.location.href = "login.html";
            
//         }
        
        
//         const response = await fetch(firebaseURL, {
//             method: "POST",
//             body: JSON.stringify(newUser),
//             headers: { "Content-Type": "application/json" }
//         });

//         if (response.ok) {
//             alert("Signup successful!");
//             window.location.href = "login.html";
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// });




const firebaseURL = "https://onlinepharmacy-63387-default-rtdb.asia-southeast1.firebasedatabase.app/users.json";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    

   

    try {
        // Check if user already exists
        const res = await fetch(firebaseURL);
        const data = await res.json();

        for (let key in data) {
            if (data[key].email === email) {
                alert("User already registered! Redirecting to login.");
                window.location.href = "login.html";
                return;
            }
        }

       
        // New user object
        const newUser = {
            name,
            email,
            password,
            mobile,
            address,
            
        };

        const response = await fetch(firebaseURL, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            alert("Signup successful!");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error:", error);
    }
});


