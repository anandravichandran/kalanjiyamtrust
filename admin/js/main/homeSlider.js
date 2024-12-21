
const token = sessionStorage.getItem("token");

document.addEventListener("DOMContentLoaded",async()=>{

  if(token){
  
    try {
        const websiteData = await fetchData();
      
        if(websiteData){
            
            updateImages(websiteData.data.carouselImages);

        }

        
    } catch (error) {
        
    }

  }


})




const defaultProfileImage = "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"

function updateImages(carouselImages) {
    for (let i = 1; i <= 3; i++) {
        const imageKey = `carouselImage${i}`;
        const imageElement = document.getElementById(`image${i}`);
        const textElement = document.getElementById(`${i}`);
        const dltIcon = document.getElementById(`d${i}`);
        if (carouselImages[imageKey]) {
            // Update image source and style
            imageElement.src = carouselImages[imageKey] || defaultProfileImage;
            imageElement.style.width = "100%";
            dltIcon.style.display = "block";

            // Hide the corresponding text element if it exists
            if (textElement) {
                textElement.style.display = "none";
            }
        }
    }
}



const formData = new FormData();


function handleImage(event, elementNo) {
    const file = event.target.files[0];

    if (!file) {
        console.error("No file selected");
        return;
    }

    // Create a FileReader to read the selected file
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById(`image${elementNo}`);
        if (output) {
            output.src = reader.result;
            output.style.width = "100%";
        }

        const text = document.getElementById(elementNo);
        if (text) {
            text.style.display = "none";
        }
    };
    reader.readAsDataURL(file);

    // Append the file to FormData and log it
    formData.append(event.target.name, file);

    // Log FormData keys and values for debugging
    for (const [key, value] of formData.entries()) {
        console.log(`FormData Key: ${key}, Value:`, value);
    }
}





document.getElementById("submitBtn").addEventListener("click",async()=>{


    if (!formData || !Array.from(formData.entries()).length) {
        showErrorToast("Form data is empty. Please upload images before submitting.");
        return;
    }

        try {
            showLoader();
            const response = await fetch("http://localhost:5000/api/admin/carousel-images",{
                method:"POST",
                headers:{
                    token:token
                },
                body: formData
            });
            hideLoader();

            const data = await response.json();

            if(data.success){
                showSuccessToast(data.message);
            }

        } catch (error) {
            console.log(error);
            showErrorToast("error,Please try Later");
        }
    


});





async function handleDelete(id) {
    if (!id) {
        showErrorToast("Invalid ID provided");
        return;
    }

    try {
        console.log("Deleting ID:", id);
        showLoader();

        // Send the DELETE request
        const response = await fetch(`http://localhost:5000/api/admin/carouselImages/delete/${id}`, {
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
            showSuccessToast(data.message || "Image deleted successfully");
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























// FETCH DATA

async function fetchData() {
    const token = sessionStorage.getItem("token");

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
