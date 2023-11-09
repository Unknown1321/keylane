import { Router } from "express";
import Category from "../models/Category.js";

const router = Router();

//CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCat = await newCategory.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CATEGORY
router.get("/", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  export default router;