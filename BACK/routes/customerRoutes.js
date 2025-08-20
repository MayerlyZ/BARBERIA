// customerRoutes.js - Archivo inicial
// routes/customerRoutes.js
import express from "express";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  searchCustomers,
  getAllCustomersSorted,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id", getCustomerById);
router.get("/search", searchCustomers);
router.get("/sorted", getAllCustomersSorted);

export default router;