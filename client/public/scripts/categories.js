function fetchWorkCategoriesData() {
  return fetch("http://localhost:5000/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const table = document.querySelector(".work-experience");
      const tbody = table.querySelector("#work-experience");

      tbody.innerHTML = "";

      data.forEach((experience) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = experience.name;
        row.appendChild(nameCell);

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching categories data:", error);
    });
}

window.addEventListener("DOMContentLoaded", fetchWorkCategoriesData);

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;

  addCategories(name);
}

function addCategories(name) {
  const data = {
    name: name,
  };

  fetch("http://localhost:5000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      fetchWorkCategoriesData();
    })
    .catch((error) => {
      console.error("Error adding categories:", error);
    });
}

async function fetchAndCalculateTotalTime() {
  try {
    const response = await fetch("http://localhost:5000/api/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    const totalTimeByCategory = {};

    posts.forEach((post) => {
      const categories = post.categories;

      if (categories && Array.isArray(categories)) {
        categories.forEach((category) => {
          if (!totalTimeByCategory[category]) {
            totalTimeByCategory[category] = 0;
          }

          totalTimeByCategory[category]++;
        });
      }
    });

    displayTotalTime(totalTimeByCategory);
  } catch (error) {
    console.error("Error fetching posts data:", error);
  }
}
function displayTotalTime(totalTimeByCategory) {
  const tableBody = document.getElementById("totalTimeBody");

  tableBody.innerHTML = "";

  for (const category in totalTimeByCategory) {
    const row = document.createElement("tr");

    const categoryCell = document.createElement("td");
    categoryCell.textContent = category;
    row.appendChild(categoryCell);

    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = parseInt(totalTimeByCategory[category]);
    row.appendChild(totalTimeCell);

    tableBody.appendChild(row);
  }
}

window.addEventListener("DOMContentLoaded", fetchAndCalculateTotalTime);
