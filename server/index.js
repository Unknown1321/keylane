import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from "path";
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import categoryRoute from './routes/categories.js';
import todoRoute from './routes/todos.js';
import chatRoute from './routes/chats.js';
import experiencesRoute from './routes/experiences.js';
import multer from 'multer';

const app = express();


dotenv.config();
app.use(express.json());
app.use(cors());


const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(join(__dirname, "images")));


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB")).catch((err)=> console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// CODE CONFIGURING ROUTES FOR API ENDPOINTS
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/todo", todoRoute);
app.use("/api/chats", chatRoute);
app.use("/api/experiences", experiencesRoute);


/* CODE FOR SOCKET APP MESSAGE */

const server = http.createServer(app);
import { Server } from 'socket.io';
import http from "http";
import Chat from './models/Chat.js';

const io = new Server(server, {
  cors: {
    origin: '*'
}
})

// Socket communication
io.on('connection', socket => {

  socket.on('message', async payload => {
    try {
      const newMessage = new Chat({ text: payload }); // Create a new instance of the Chat model
      await newMessage.save(); // Save the new message to the database
      io.emit('message_receiver', newMessage);
    } catch (error) {
      console.error('Error saving message to database:', error);
    }
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on", PORT));

