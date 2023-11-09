// Fetch experience data from the API and populate the table
function fetchWorkExperienceData() {
    return fetch('http://localhost:5000/api/experiences')
      .then(response => response.json())
      .then(data => {
        const table = document.querySelector('.work-experience');
        const tbody = table.querySelector('#work-experience');
    
        // Clear the existing table rows
        tbody.innerHTML = '';
    
        // Create a new row for each experience and populate the cells
        data.forEach(experience => {
          const row = document.createElement('tr');
    
          const nameCell = document.createElement('td');
          nameCell.textContent = experience.name;
          row.appendChild(nameCell);
    
          const dateCell = document.createElement('td');
          dateCell.textContent = experience.timestamp;
          row.appendChild(dateCell);
    
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = experience.desc;
          row.appendChild(descriptionCell);
    
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching experience data:', error);
      });
  }
  
  // Call the fetchWorkExperienceData function to populate the table when the page is loaded
  window.addEventListener('DOMContentLoaded', fetchWorkExperienceData);

  // Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get values from form elements
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Perform validation or additional checks if needed

  // Call the function to add experience
  addExperience(name, description);
}

// Function to add experience
function addExperience(name, description) {
  // Prepare the data for the POST request
  const data = {
      name: name,
      desc: description,
      timestamp: new Date().toLocaleDateString(), // You can modify the timestamp as needed
  };

  // Make the POST request to add experience
  fetch('http://localhost:5000/api/experiences', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then(response => response.json())
      .then(() => {
          // After successfully adding experience, fetch and update the table
          fetchWorkExperienceData();
      })
      .catch(error => {
          console.error('Error adding experience:', error);
      });
}

  