import { Router } from "express";
import Todo from "../models/Todo.js";

const router = Router();

// CREATE TODOS
router.post('/', async (req, res) => {
	const newTodo = new Todo(req.body);
    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET TODOS
router.get('/', async (req, res) => {
	try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE TODO
router.put("/:id", async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      
      if (!updatedTodo) {
        // The document with the given ID was not found
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

 // TO COMPLETE TODO
 router.get("/complete/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
  
      todo.complete = !todo.complete;
  
      await todo.save();
  
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
 // DELETE TODOS
router.delete("/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
        try {
          await todo.deleteOne();
          res.status(200).json("Todo has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
  
  export default router;