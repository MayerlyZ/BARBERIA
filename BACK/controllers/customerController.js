// customerController.js - Archivo inicial
// controllers/customerController.js
import Customer from "../models/Customer.js";

// Obtener todos los clientes
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};
// Crear un nuevo cliente
export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el cliente", error });
  }
};
// Actualizar un cliente
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el cliente", error });
  }
};
// Eliminar un cliente
export const deleteCustomer = async (req, res) => {  
  const { id } = req.params;
  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};
// Obtener un cliente por ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error });
  }
};
// Buscar clientes por nombre o email
export const searchCustomers = async (req, res) => {    
  const { query } = req.query;
  try {
    const customers = await Customer.find({
      $or: [
        { name: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar clientes", error });
  }
};
// Listar todos los clientes (ordenados por nombre)
export const getAllCustomersSorted = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};