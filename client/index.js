import express from "express";
import { io } from 'socket.io-client';
import path from "path";

const app = express();
const socket = io('http://localhost:5000'); // Server URL for socket 

app.use(express.static("public"));

/* My Different Pages */

/* My Frontpage Page */
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/pages/index.html"));
});

/* My Contact Page */
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve("public/pages/contact.html"));
});

/* About Page */
app.get("/about", (req, res) => {
  res.sendFile(path.resolve("public/pages/about.html"));
});

/* Todays Message Page */
app.get("/message", (req, res) => {
    res.sendFile(path.resolve("public/pages/message.html"));
  });

/* Todo Page */
app.get("/todo", (req, res) => {
    res.sendFile(path.resolve("public/pages/todo.html"));
  });

/* Write Page */
app.get("/write", (req, res) => {
    res.sendFile(path.resolve("public/pages/write.html"));
  });

/* Calculation Page */
app.get("/calculation", (req, res) => {
  res.sendFile(path.resolve("public/pages/calculation.html"));
});  

/* Login Page */
app.get("/login", (req, res) => {
  res.sendFile(path.resolve("public/pages/login.html"));
});

/* Sign up Page */
app.get("/register", (req, res) => {
  res.sendFile(path.resolve("public/pages/register.html"));
});

/* Settings Page */
app.get("/settings", (req, res) => {
  res.sendFile(path.resolve("public/pages/settings.html"));
});

const PORT = 8080;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Server is running on port ", PORT);
});
