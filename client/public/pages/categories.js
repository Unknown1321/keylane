// Fetch categories data from the API and populate the table
function fetchWorkCategoriesData() {
    return fetch('http://localhost:5000/api/categories')
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
    
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching categories data:', error);
      });
  }
  
  // Call the fetchWorkCategoriesData function to populate the table when the page is loaded
  window.addEventListener('DOMContentLoaded', fetchWorkCategoriesData);

  // Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get values from form elements
  const name = document.getElementById('name').value;

  // Perform validation or additional checks if needed

  // Call the function to add categories
  addCategories(name);
}

// Function to add experience
function addCategories(name) {
  // Prepare the data for the POST request
  const data = {
      name: name,
  };

  // Make the POST request to add categories
  fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then(response => response.json())
      .then(() => {
          // After successfully adding categories, fetch and update the table
          fetchWorkCategoriesData();
      })
      .catch(error => {
          console.error('Error adding categories:', error);
      });
}

async function fetchAndCalculateTotalTime() {
// Assuming that your response.json() is an array of posts
try {
    const response = await fetch('http://localhost:5000/api/posts');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    const totalTimeByCategory = {};

    posts.forEach(post => {
        const categories = post.categories;

        // Check if categories is a non-null array before attempting to split
        if (categories && Array.isArray(categories)) {
            categories.forEach(category => {
                if (!totalTimeByCategory[category]) {
                    totalTimeByCategory[category] = 0;
                }

                totalTimeByCategory[category]++;
            });
        }
    });

    // Display the calculated data in the table
    displayTotalTime(totalTimeByCategory);
} catch (error) {
    console.error('Error fetching posts data:', error);
}
}
// Function to display calculated data in the table
function displayTotalTime(totalTimeByCategory) {
    const tableBody = document.getElementById('totalTimeBody');

    // Clear existing table content
    tableBody.innerHTML = '';

    // Loop through categories and add rows to the table
    for (const category in totalTimeByCategory) {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        const totalTimeCell = document.createElement('td');
        // Use parseInt to convert the value to an integer
        totalTimeCell.textContent = parseInt(totalTimeByCategory[category]);
        row.appendChild(totalTimeCell);

        tableBody.appendChild(row);
    }
}


// Fetch and calculate total time when the page loads
window.addEventListener('DOMContentLoaded', fetchAndCalculateTotalTime);
