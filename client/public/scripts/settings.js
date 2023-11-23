const userUrl = "http://localhost:5000/api/users";
const userData = JSON.parse(localStorage.getItem("userData"));

let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

const setUsername = (value) => {
  usernameInput.value = value;
};

const setEmail = (value) => {
  emailInput.value = value;
};

const setPassword = (value) => {
  passwordInput.value = value;
};

setUsername(userData.username);
setEmail(userData.email);
setPassword(userData.password);

const handleSubmitSettings = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${userUrl}/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });
  
      if (response.ok) {
        const updatedUserData = {
          ...userData,
          username: usernameInput.value,
          email: emailInput.value,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setUsername(updatedUserData.username);
        setEmail(updatedUserData.email);
        setPassword(updatedUserData.password);

        console.log("User data updated successfully");
      } else {
        console.error("Error updating user data:", response);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
};