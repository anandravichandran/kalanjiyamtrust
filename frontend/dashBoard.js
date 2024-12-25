const defaultProfileImage = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"


document.addEventListener("DOMContentLoaded",async()=>{


    const websiteData = await fetchData();

    if (websiteData) {
        let originalEvents = websiteData.events; // Store the original unmodified events
        let events = [...originalEvents]; // Work with a copy to prevent overwriting
        const yearDropdown = document.getElementById("year");
      
        // Update carousel and events
        updateHomeSliderImages(websiteData.carouselImages);
        updateEvents(events);
        const membersInformation  = websiteData.membersInformation;
        const sortedMemberInformation = membersInformation.sort((a, b) => {
          return a.standings - b.standings; // Ascending order
      });
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
    
  const slideContainer = document.getElementById("slideContainer");
  if(!slideContainer){return}
    
     document.getElementById("carouselImage1").src = carouselImages.carouselImage1? carouselImages.carouselImage1 :defaultProfileImage;
     document.getElementById("carouselImage2").src = carouselImages.carouselImage2? carouselImages.carouselImage2 :defaultProfileImage;
     document.getElementById("carouselImage3").src = carouselImages.carouselImage3? carouselImages.carouselImage3 :defaultProfileImage;


}


function updateEvents(events) {
    try {
      const eventsContainer = document.getElementById("events"); // Get the container element
      if(!events){return}
      
      if (!eventsContainer) {
        console.error("Error: Events container not found.");
        return;
      }
  
      // Check if the events array is empty
      if (events.length === 0) {
        eventsContainer.innerHTML = `
          <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center" style="margin:80px">
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
        eventCard.className = "event-card";
  
        eventCard.innerHTML = `
        <div class="event-img">

        <img src="${event.image || defaultProfileImage}">

      </div>
      <div class="event-content">
        <h6>${event.title || "Untitled Eveent"}</h6>

      </div>
      <div class="event-conetnt-hover">
        <ul class="event-date-time-location">
          <li>
            <i class="fa-regular fa-calendar-days"></i>
            <span class="price">${event.date || "00/00/0000"}</span>
          </li>
          <li>
            <i class="fa-solid fa-clock"></i>
            <span class="price">${event.time || "00:00 AM"}</span>
          </li>
          <li>
            <i class="fa-solid fa-location-dot"></i>
            <span class="price">${event.location || "N/A"}</span>
          </li>
        </ul>
        <ul class="event-organised-by">
          <li>
            <img src="../wp-content/themes/prime-charity-trust-pro/assets/images/Events/organiser4.png" alt="">
            <h6 class="price">Organised by :</h6>
            <p class="price">களஞ்சியம்</p>
          </li>
        </ul>
        <div class="event-main-content">
          <h3>${event.title || "Untitled Eveent"}</h3>
          <p class="price">${event.description || "N/A"}</p>

        </div>
      </div>
        `;
  
        // Append the card to the container
        eventsContainer.appendChild(eventCard);
      });
    } catch (err) {
      console.error("Error updating events:", err);
    }
  }
  

  


  function updateMembers(members) {
    const membersContainer = document.getElementById("members"); // Get the container element
  
    if(!membersContainer){return}

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
          style="height: 300px; width: 300px; object-fit:contain;"
          class="member-image rounded-lg mx-auto mb-4" 
          src="${member.image || '../frontend/wp-content/uploads/default-image.png'}"
        />
        <p class="font-semibold" style="color: #000000;">
          ${member.name || "Unknown Name"}, ${member.degree || ""}
        </p>
        <p style="color: #000000;">
          ${member.designation || "Unknown Designation"}
        </p>
      `;
  
      // Append the member card to the container
      membersContainer.appendChild(memberCard);
    });
  }
  
  



  









async function fetchData(token) {

    
        try {
            showLoader()
            const response = await fetch("http://localhost:5000/api/admin/kalanjiyam-trust", {
                method: "GET",
               
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
