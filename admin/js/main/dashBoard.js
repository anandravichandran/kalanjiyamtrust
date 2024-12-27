const defaultProfileImage = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"
const token = sessionStorage.getItem("token");


document.addEventListener("DOMContentLoaded",async()=>{


    const websiteData = await fetchData(token);

    if (websiteData) {
        let originalEvents = websiteData.data.events; // Store the original unmodified events
        let events = [...originalEvents]; // Work with a copy to prevent overwriting
        const yearDropdown = document.getElementById("year");
      
        const membersInformation  = websiteData.data.membersInformation;
        const sortedMemberInformation = membersInformation.sort((a, b) => {
          return a.standings - b.standings; // Ascending order
      });
      
      
      // Update carousel and events
      updateHomeSliderImages(websiteData.data.carouselImages);
      updateEvents(events);
      updateMembers(sortedMemberInformation);

        // Add change listener for year filter
        if (yearDropdown) {
          yearDropdown.addEventListener("change", (event) => {
            const year = event.target.value;
       
            if(year !== ""){
            // Filter events based on the selected year
            const filteredEvents = originalEvents.filter((event) => {
              const eventYear = event.date.split("-")[0]; // Extract year
              return eventYear === year;
            });
      
            // Update the events with the filtered list
            updateEvents(filteredEvents);
        }else{
            updateEvents(events);

        }
          });
        } else {
          console.error("Year dropdown element not found.");
        }
      }
      


})




function updateHomeSliderImages(carouselImages){
    
    
     document.getElementById("carouselImage1").src = carouselImages.carouselImage1? carouselImages.carouselImage1 :defaultProfileImage;
     document.getElementById("carouselImage2").src = carouselImages.carouselImage2? carouselImages.carouselImage2 :defaultProfileImage;
     document.getElementById("carouselImage3").src = carouselImages.carouselImage3? carouselImages.carouselImage3 :defaultProfileImage;


}


function updateEvents(events) {
    try {
      const eventsContainer = document.getElementById("events"); // Get the container element
      
      if (!eventsContainer) {
        console.error("Error: Events container not found.");
        return;
      }
  
      // Check if the events array is empty
      if (events.length === 0) {
        eventsContainer.innerHTML = `
          <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center">
            <p class="text-gray-500 text-lg font-semibold">No events to display at the moment.</p>
          </div>
        `;
        return;
      }
  
      // Clear the container
      eventsContainer.innerHTML = "";
  
      // Loop through the events array and create cards dynamically
      events.forEach((event, index) => {
        const eventCard = document.createElement("div");
        eventCard.className = "bg-white rounded-lg shadow-lg overflow-hidden relative group card";
        eventCard.id = `card-${index}`; // Unique ID for each card
        eventCard.onclick = () => {
          try {
            handleOnClick(event);
          } catch (err) {
            console.error("Error handling card click:", err);
          }
        };
  
        eventCard.innerHTML = `
          <img
            alt="Event image"
            class="w-full h-48 object-cover"
            src="${event.image || defaultProfileImage}"
            width="600"
            height="400"
          />
          <div class="p-4">
            <p class="text-orange-500 text-lg font-semibold">${event.title || "Untitled Event"}</p>
          </div>
        `;
  
        // Append the card to the container
        eventsContainer.appendChild(eventCard);
      });
    } catch (err) {
      console.error("Error updating events:", err);
    }
  }
  
  function handleOnClick(event) {
    try {
      const popup = document.getElementById("popup");
  
      if (!popup) {
        console.error("Error: Popup element not found.");
        return;
      }
  
      popup.classList.remove("hidden");
  
      // Set the event details in the popup
      document.getElementById("title").innerText = event.title || "N/A";
      document.getElementById("date").innerText = event.date || "00/00/0000";
      document.getElementById("time").innerHTML = `<i class="fas fa-clock mr-1"></i>${event.time || "N/A"}`;
      document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${event.location || "N/A"}`;
      document.getElementById("description").innerText = event.description || "N/A";
    } catch (err) {
      console.error("Error showing event details in popup:", err);
    }
  }
  




  function updateMembers(members) {
    const membersContainer = document.getElementById("members"); // Get the container element
  
    // Check if the members array is empty
    if (members.length === 0) {
      membersContainer.innerHTML = `
        <div class="text-center col-span-full">
          <p class="text-gray-500 text-lg font-semibold">No members to display at the moment.</p>
        </div>
      `;
      return;
    }
  
    // Clear the container
    membersContainer.innerHTML = "";
  
    // Loop through the members array and create member cards dynamically
    members.forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.className = "text-center";
  
      memberCard.innerHTML = `
        <img 
          alt="${ "Member image"}" 
          class="member-image rounded-lg mx-auto mb-4" 
          src="${member.image || '../frontend/wp-content/uploads/default-image.png'}"
        />
        <p class="font-semibold">
          ${member.name || "Unknown Name"}, ${member.degree || ""}
        </p>
        <p>
          ${member.designation || "Unknown Designation"}
        </p>
      `;
  
      // Append the member card to the container
      membersContainer.appendChild(memberCard);
    });
  }
  













async function fetchData(token) {

    if (token) {
        try {
            showLoader()
            const response = await fetch("https://kalanjiyamtrustbackend.vercel.app/api/admin/get-website-data", {
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
