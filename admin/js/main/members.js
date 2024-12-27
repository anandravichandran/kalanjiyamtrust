const defaultProfileImage = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"
const token = sessionStorage.getItem("token");

let isChanged = false;
document.addEventListener("DOMContentLoaded",async()=>{


    const websiteData = await fetchData(token);

    if(websiteData){
        
        updateMembersDetails(websiteData.data.membersInformation);
 
    }


})







function updateMembersDetails(membersDetails) {
    try {
        const tableBody = document.querySelector("table tbody"); // Get the tbody of the table
        console.log(tableBody);

        if (!Array.isArray(membersDetails)) {
            throw new Error("Invalid data format. Expected an array of member details.");
        }

        if (membersDetails.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 20px;">
                        <strong>No Members available to display.</strong>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = ''; // Clear existing table rows

        membersDetails.forEach((member, index) => {
            const row = document.createElement("tr");

            const imageSrc = member.image?member.image : defaultProfileImage;
            const name = member.name?member.name : 'N/A';
            const degree = member.degree?member.degree : 'N/A';
            const designation = member.designation?member.designation : 'N/A';
            const standings = member.standings?member.standings : 'N/A';

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <div class="pro">
                        <img src="${imageSrc}" alt="Profile Image">
                    </div>
                </td>
                <td>
                    <div class="pro-info">
                        <h5>${name}</h5>
                    </div>
                </td>
                <td>${degree}</td>
                <td>${designation}</td>
                <td>${standings}</td>
                <td>
                    <div class="dropdown">
                        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="dropdown">
                            <img src="./images/three-dot-icon.png" alt="icon" style="width: 25px; height: 20px;">
                        </button>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" data-member='${JSON.stringify(member)}' onclick="handleOpenPopup(this)">Edit</a></li>
                            <li><a class="dropdown-item" onclick="handleDelete('${member._id}')">Delete</a></li>
                        </ul>
                    </div>    
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error updating member details:", error);
       
    }
}
;

function handleOpenPopup(element) {
    const member = JSON.parse(element.getAttribute('data-member'));
    openPopup(member);
}











function openPopup(member) {
    
    document.getElementById("popupModal").style.display = "flex";
    isChanged = false;

    if(member){
       
    document.getElementById("heading").innerText = "Edit Member";
    document.getElementById("add-btn").innerText = "Update";
    document.getElementById("name").value = member.name?member.name :"N/A";
    document.getElementById("designation").value = member.designation?member.designation :"N/A";
    document.getElementById("degree").value = member.degree?member.degree :"N/A";
    document.getElementById("standingPosition").value = member.standings?member.standings :"N/A";
    document.getElementById("id").value = member?member._id: null;
    document.getElementById("imagePreview").src= member.image?member.image : defaultProfileImage;
    }
    
    
}


document.getElementById("add-btn").addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const designation = document.getElementById("designation");
    const degree = document.getElementById("degree");
    const standingPosition = document.getElementById("standingPosition");
    const memberImage = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const id = document.getElementById("id");

    // Validate form inputs
    if (!name.value.trim() || !designation.value.trim() || !degree.value.trim() || !standingPosition.value.trim()) {
        showErrorToast("Please fill in all required fields.");
        return;
    }

    

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("designation", designation.value);
    formData.append("degree", degree.value);
    formData.append("standings", standingPosition.value);
    formData.append("memberImage", memberImage.files[0]);
  if(!!id){
    formData.append("id",id.value);
  }
    try {
        showLoader(); // Display loading indicator

        const response = await fetch("https://kalanjiyamtrustbackend.vercel.app/api/admin/add-members", {
            method: "POST",
            headers: {
                token, // Ensure the `token` variable is defined
            },
            body: formData,
        });

        hideLoader(); // Hide loading indicator

        const data = await response.json();

        if (data.success) {
            showSuccessToast(data.message);
            isChanged = true;
            // Clear form fields after successful submission
            name.value = "";
            designation.value = "";
            degree.value = "";
            standingPosition.value = "";
            memberImage.value ="";
            imagePreview.src = "https://static.thenounproject.com/png/65474-200.png";
        } else {
            showErrorToast(data.message || "An error occurred while adding the member.");
        }
    } catch (error) {
        hideLoader(); // Ensure loader is hidden even on error
        showErrorToast("Failed to add member. Please try again later.");
        console.error("Error:", error);
    }
});


function closePopup() {
    if(isChanged){
        location.reload();
    }
    const name = document.getElementById("name");
    const designation = document.getElementById("designation");
    const degree = document.getElementById("degree");
    const standingPosition = document.getElementById("standingPosition");
    const memberImage = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const id = document.getElementById("id");
 
         name.value = "";
            designation.value = "";
            degree.value = "";
            standingPosition.value = "";
            memberImage.value ="";
            imagePreview.src = "https://static.thenounproject.com/png/65474-200.png";

    document.getElementById("popupModal").style.display = "none";

    
  }




async function handleDelete(id) {
    console.log(id)
    if (!id) {
        showErrorToast("Invalid ID provided");
        return;
    }

    try {
        console.log("Deleting ID:", id);
        showLoader();

        // Send the DELETE request
        const response = await fetch(`https://kalanjiyamtrustbackend.vercel.app/api/admin/membersInformation/delete/${id}`, {
            method: "DELETE",
            headers: {
                token,
            },
        });

        hideLoader();

        // Check if the response is not OK (e.g., 4xx or 5xx status)
        if (!response.ok) {
            const errorData = await response.json();
            showErrorToast(errorData.message || "Failed to delete the image");
            return;
        }

        const data = await response.json();

        if (data.success) {
            showSuccessToast(data.message || "Member details deleted successfully");
            // Delay reload for user feedback visibility
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            showErrorToast(data.message || "Deletion failed");
        }
    } catch (error) {
        hideLoader(); // Ensure the loader is hidden in case of an error
        console.error("Error deleting image:", error);
        showErrorToast("An error occurred. Please try again later.");
    }
}























async function fetchData(token) {

    if (token) {
        try {
            showLoader()
            const response = await fetch("https://kalanjiyamtrustbackend.vercel.app/api/admin/get-website-data", {
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
