// Firebase Config
const firebaseConfig = {
    databaseURL: "https://onlinepharmacy-63387-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Check if user is logged in
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
  
  // DOM Elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const mobileInput = document.getElementById("mobile");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const userForm = document.getElementById("userForm");
  const orderSection = document.getElementById("orderSection");
  const healthRecords = document.getElementById("healthRecords");
  const logoutBtn = document.getElementById("logoutBtn");
  
  let isEditMode = false;
  
  // Load user profile and data
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      // Get user data directly using the stored userId (Firebase key)
      const userSnapshot = await db.ref(`users/${userId}`).once("value");
      const user = userSnapshot.val();
  
      if (!user) {
        alert("Your profile data was not found.");
        return;
      }
  
      // Populate form fields
      nameInput.value = user.name || "";
      emailInput.value = user.email || "";
      addressInput.value = user.address || "";
      mobileInput.value = user.mobile || "";
  
      // Load orders and health records
      loadOrders();
      loadHealthRecords();
  
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load your data. Please try again later.");
    }
  });
  
  // Toggle edit mode
  editBtn.addEventListener("click", () => {
    isEditMode = true;
    toggleEditMode();
  });
  
  cancelBtn.addEventListener("click", () => {
    isEditMode = false;
    toggleEditMode();
    // Reset form to original values
    db.ref(`users/${userId}`).once("value").then(snapshot => {
      const user = snapshot.val();
      nameInput.value = user.name;
      addressInput.value = user.address;
      mobileInput.value = user.mobile;
    });
  });
  
  function toggleEditMode() {
    nameInput.disabled = !isEditMode;
    addressInput.disabled = !isEditMode;
    mobileInput.disabled = !isEditMode;
    
    editBtn.style.display = isEditMode ? "none" : "block";
    document.querySelector(".form-actions").style.display = isEditMode ? "flex" : "none";
  }
  
  // Save profile changes
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const updatedUser = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      address: addressInput.value.trim(),
      mobile: mobileInput.value.trim()
    };
  
    try {
      await db.ref(`users/${userId}`).update(updatedUser);
      alert("Profile updated successfully!");
      isEditMode = false;
      toggleEditMode();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  });
  
  // Load orders function
  async function loadOrders() {
    try {
      const ordersSnapshot = await db.ref("orders").orderByChild("userId").equalTo(userId).once("value");
      const orders = ordersSnapshot.val();
  
      if (!orders) {
        orderSection.innerHTML = '<div class="no-orders">No orders found.</div>';
        return;
      }
  
      let ordersHTML = "";
      let count = 0;
      
      for (let key in orders) {
        if (count >= 3) break;
        const order = orders[key];
        ordersHTML += `
          <div class="order-item">
            <div class="order-info">
              <h3>Order #${order.orderId || key}</h3>
              <p>${order.itemsCount || 0} items • ₹${order.totalAmount || 0}</p>
            </div>
            <div class="order-status ${order.status === 'completed' ? 'status-completed' : 'status-pending'}">
              ${order.status || 'pending'}
            </div>
          </div>
        `;
        count++;
      }
  
      orderSection.innerHTML = ordersHTML;
    } catch (error) {
      console.error("Error loading orders:", error);
      orderSection.innerHTML = '<div class="error">Failed to load orders. Please try again later.</div>';
    }
  }
  
  // Load health records function
  async function loadHealthRecords() {
    try {
      const recordsSnapshot = await db.ref("healthRecords").orderByChild("userId").equalTo(userId).once("value");
      const records = recordsSnapshot.val();
  
      if (!records) {
        healthRecords.innerHTML = '<div class="no-records">No health records found.</div>';
        return;
      }
  
      let recordsHTML = "";
      let count = 0;
      
      for (let key in records) {
        if (count >= 3) break;
        const record = records[key];
        recordsHTML += `
          <div class="record-item">
            <div class="record-info">
              <h3>${record.title || 'Untitled Record'}</h3>
              <p>Uploaded on: ${formatDate(record.timestamp)}</p>
            </div>
            <a href="${record.fileUrl}" target="_blank" class="view-btn">View</a>
          </div>
        `;
        count++;
      }
  
      healthRecords.innerHTML = recordsHTML;
    } catch (error) {
      console.error("Error loading health records:", error);
      healthRecords.innerHTML = '<div class="error">Failed to load health records. Please try again later.</div>';
    }
  }
  
  // Helper function to format date
  function formatDate(timestamp) {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  
  // Logout function
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  });