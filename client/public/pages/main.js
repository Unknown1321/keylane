
// Navbar fetch

fetch('/pages/navbar.html')
  .then(response => response.text())
  .then(data => {
    
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
      navbarElement.innerHTML = data;
    }
  })
  .catch(error => {
    console.error('Error fetching navbar:', error);
  });
