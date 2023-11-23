function fetchWorkExperienceData() {
  return fetch("http://localhost:5000/api/experiences")
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

        const dateCell = document.createElement("td");
        dateCell.textContent = experience.timestamp;
        row.appendChild(dateCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = experience.desc;
        row.appendChild(descriptionCell);

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching experience data:", error);
    });
}

window.addEventListener("DOMContentLoaded", fetchWorkExperienceData);

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  addExperience(name, description);
}

function addExperience(name, description) {
  const data = {
    name: name,
    desc: description,
    timestamp: new Date().toLocaleDateString(),
  };

  fetch("http://localhost:5000/api/experiences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      fetchWorkExperienceData();
    })
    .catch((error) => {
      console.error("Error adding experience:", error);
    });
}
