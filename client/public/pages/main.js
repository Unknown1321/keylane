const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("userData");
      window.location.href = "/login";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

fetch("/pages/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      navbarElement.innerHTML = data;
    }
  })
  .catch((error) => {
    console.error("Error fetching navbar:", error);
  });
