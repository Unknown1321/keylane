import { Router } from "express";
import Experiences from "../models/Experiences.js";

const router = Router();

// CREATE Experiences
router.post('/', async (req, res) => {
	const newExperience = new Experiences(req.body);
    try {
        const savedExperience = await newExperience.save();
        res.status(200).json(savedExperience);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET Experiences
router.get('/', async (req, res) => {
	try {
        const experiences = await Experiences.find();
        res.status(200).json(experiences);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE Experiences
router.put("/:id", async (req, res) => {
    try {
      const updatedExperiences = await Experiences.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      
      if (!updatedExperiences) {
        // The document with the given ID was not found
        return res.status(404).json({ message: "Experiences not found" });
      }
  
      res.status(200).json(updatedExperiences);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
 // DELETE TODOS
router.delete("/:id", async (req, res) => {
    try {
      const experiences = await Experiences.findById(req.params.id);
        try {
          await experiences.deleteOne();
          res.status(200).json("Experiences has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
  
  export default router;