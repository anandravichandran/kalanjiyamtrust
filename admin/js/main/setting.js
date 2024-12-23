document.addEventListener("DOMContentLoaded", async() => {

  const data = await fetchData(); // Fetch data from the API
  if (data) {
      updateSettings(data.data)
  }
      allProfiles = data.allProfilesData; // Store all profiles
      updateSettings(data.data); // Update admin settings


    document.getElementById("submitBtn").addEventListener("click", async (e) => {
      e.preventDefault(); // Prevent form default submission if inside a form
      
     
      // Required fields
      const userName = document.getElementById("name")?.value.trim();
      const password = passwordValue;
      const email = document.getElementById("email")?.value.trim();
  

  
      // Validate required fields
      if (!userName || !password || !email) {
        showErrorToast("Please fill out all required fields: Name, Email, and Password.");
        return;
      }
  
     
  
      try {
        // Define headers
        const headers = {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        };
      showLoader()
        // API request for admin credentials
        const credentialResponse = await fetch(
          "http://localhost:5000/api/admin/change-credential",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ userName, email, password }),
          }
        );
  
       
  hideLoader()
        // Parse API responses
        const credentialData = await credentialResponse.json();
      
  
        // Handle success or errors
        if (credentialData.success ) {
          showSuccessToast("Admin credentials  updated successfully!");
        } else {
          showErrorToast(
            `Error: ${credentialData.message || "Updating credentials failed"} `
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showErrorToast("An error occurred. Please try again later.");
      }
    });
  });
  

  let passwordValue;


  function updateSettings(adminData) {
    console.log(adminData);
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    

    if (!name || !password || !email ) {
       
        return;
    }

    name.value = adminData.userName || '';
    email.value = adminData.email || '';
    password.value = adminData.password.slice(0,7); 
    passwordValue = adminData.password;
   
}


function handleChange(event){
  passwordValue = event.target.value.trim();
}











  async function fetchData() {
    const token = sessionStorage.getItem("token");

    if (token) {
        try {
            showLoader()
            const response = await fetch("http://localhost:5000/api/admin/get-website-data", {
                method: "GET",
                headers: { token },
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
              hideLoader()
                return data;
            } else {
                showErrorToast(data.message);
            }
        } catch (error) {
            console.error("Network or server error:", error);
            showErrorToast("An error occurred, please try again later.");
        }
    }
    
   
}



  
// Show and hide loader
function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "flex";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}

function showSuccessToast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    close: true,
  }).showToast();
}

function showErrorToast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    close: true,
  }).showToast();
}