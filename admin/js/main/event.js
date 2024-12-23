const defaultProfileImage = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"
const token = sessionStorage.getItem("token");

let isChanged = false;
document.addEventListener("DOMContentLoaded",async()=>{


    const websiteData = await fetchData(token);

    if(websiteData){
        
        updateEventsDetails(websiteData.data.events);
 
    }


})







function updateEventsDetails(EventsDetails) {
    try {
        const tableBody = document.querySelector("table tbody"); // Get the tbody of the table
        

        if (!Array.isArray(EventsDetails)) {
            throw new Error("Invalid data format. Expected an array of event details.");
        }

        if (EventsDetails.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 20px;">
                        <strong>No Events available to display.</strong>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = ''; // Clear existing table rows

        EventsDetails.forEach((event, index) => {
            const row = document.createElement("tr");

            const imageSrc = event.image?event.image : defaultProfileImage;
            const title = event.title?event.title : 'N/A';
            const description = event.description?event.description : 'N/A';
            const location = event.location?event.location : 'N/A';
            const date = event.date?event.date : 'N/A';
            const time = event.time?event.time : 'N/A';

            row.innerHTML = `
            <td>1</td>
            <td>
              <div class="pro">
                <img
                  src="${imageSrc}"
                  alt=""
                  class="image-size"
                />
              </div>
            </td>
            <td><div class="pro-info">
              <h5>${title}</h5>
          
          </div></td>
            <td>${time}</td>
            <td>${date}</td>
            <td>${location}</td>
            <td>
                <div class="dropdown">
                  <button type="button" class="btn btn-outline-secondary" data-bs-toggle="dropdown">
                  <img src="./images/three-dot-icon.png" alt="icon" style="width: 25px; height: 20px;">
                  </button>
                  <ul class="dropdown-menu">
                  <li><a class="dropdown-item" data-event='${JSON.stringify(event)}' onclick="handleOpenPopup(this)">Edit</a></li>
                  <li><a class="dropdown-item" onclick="handleDelete('${event._id}')">Delete</a></li>
                </ul>
                </div>

            </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error updating event details:", error);
       
    }
}
;

function handleOpenPopup(element) {
    const event = JSON.parse(element.getAttribute('data-event'));
    openPopup(event);
}











function openPopup(event) {
 
    document.getElementById("new-event-modal").style.display = "flex";
    isChanged = false;
    if(event){
       
    document.getElementById("event-heading").value = event.title?event.title :"N/A";
    document.getElementById("content-text").value = event.description?event.description :"N/A";
    document.getElementById("event-place").value = event.location?event.location :"N/A";
    document.getElementById("event-date").value = event.date?event.date :"N/A";
    document.getElementById("event-time").value = event.time?event.time :"N/A";
    document.getElementById("id").value = event?event._id: null;
    document.getElementById("event-image-preview").src= event.image?event.image : defaultProfileImage;
    }
    
    
}


document.getElementById("add-btn").addEventListener("click", async (event) => {
    event.preventDefault();

    const title = document.getElementById("event-heading");
    const description = document.getElementById("content-text");
    const date = document.getElementById("event-date");
    const time = document.getElementById("event-time");
    const location = document.getElementById("event-place");
    const imagePreview = document.getElementById("event-image-preview");
    const image = document.getElementById("event-image");
    const id = document.getElementById("id");

   
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("date", date.value);
    formData.append("time", time.value);
    formData.append("location", location.value);
    formData.append("eventImage", image.files[0]);
  if(!!id){
    formData.append("id",id.value);
  }
    try {
        showLoader(); // Display loading indicator

        const response = await fetch("http://localhost:5000/api/admin/handle-events", {
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
            title.value = "";
            description.value = "";
            date.value = "";
            time.value = "";
            location.value ="";
            imagePreview.src = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg";
        } else {
            showErrorToast(data.message || "An error occurred while adding the event.");
        }
    } catch (error) {
        hideLoader(); // Ensure loader is hidden even on error
        showErrorToast("Failed to add event. Please try again later.");
        console.error("Error:", error);
    }
});


function closeNewPopup() {
    if(isChanged){
        location.reload();
    }
    const title = document.getElementById("event-heading");
    const description = document.getElementById("content-text");
    const date = document.getElementById("event-date");
    const time = document.getElementById("event-time");
    const location = document.getElementById("event-place");
    const imagePreview = document.getElementById("event-image-preview");
    const image = document.getElementById("event-image");
    const id = document.getElementById("id");

    // Clear form fields after successful submission
    title.value = "";
    description.value = "";
    date.value = "";
    time.value = "";
    location.value ="";
    imagePreview.src = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg";


    document.getElementById("new-event-modal").style.display = "none";
    
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
        const response = await fetch(`http://localhost:5000/api/admin/event/delete/${id}`, {
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
            showSuccessToast(data.message || "event details deleted successfully");
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
            const response = await fetch("http://localhost:5000/api/admin/get-website-data", {
                method: "GET",
                headers: { token },
            });
            hideLoader()
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
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
