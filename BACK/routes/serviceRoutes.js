// serviceRoutes.js - Archivo inicial
// routes/serviceRoutes.js
import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServicesSorted,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/:id", getServiceById);
router.get("/sorted", getAllServicesSorted);

export default router;