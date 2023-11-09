import { Router } from "express";
import Chat from "../models/Chat.js";

const router = Router();


//CREATE CATEGORY
router.post("/", async (req, res) => {
    const newChat = new Chat(req.body);
    try {
      const savedChat = await newChat.save();
      res.status(200).json(savedChat);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 // GET CHATS 
  router.get("/", async (req, res) => {
    try {
      const chats = await Chat.find();
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // DELETE TODOS
router.delete("/:id", async (req, res) => {
    try {
      const todo = await Chat.findById(req.params.id);
        try {
          await todo.deleteOne();
          res.status(200).json("Chat has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  }); 

  export default router;