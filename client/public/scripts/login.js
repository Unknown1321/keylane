const handleSubmitLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    const userData = await response.json();
    initialize(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Logged in");
    window.location.href = "/";
  } else {
    console.log("Login failed");
  }
};

const initialize = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  if (userData) {
    // User is authenticated
    console.log("User is authenticated:");
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    // User is not authenticated
    console.log("User is not authenticated");
    loginButton.style.display = "block";
    registerButton.style.display = "block";
    logoutButton.style.display = "none";
  }
};

