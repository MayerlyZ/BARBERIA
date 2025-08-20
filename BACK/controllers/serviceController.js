// serviceController.js - Archivo inicial
// controllers/serviceController.js
import Service from "../models/Service.js";

// Obtener todos los servicios
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios", error });
  }
};

// Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el servicio", error });
  }
};

// Actualizar un servicio
export const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el servicio", error });
  }
};

// Eliminar un servicio
export const deleteService = async (req, res) => {  
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el servicio", error });
  }
};

// Obtener un servicio por ID
export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio", error });
  }
};

// Listar todos los servicios (ordenados por nombre)
export const getAllServicesSorted = async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios", error });
  }
};
