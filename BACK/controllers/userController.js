// userController.js - Archivo inicial
import User from "../models/User.js"; // Importar modelo de usuario
import bcrypt from "bcryptjs"; // Importar bcrypt para encriptar contraseñas
import jwt from "jsonwebtoken"; // Importar jsonwebtoken para manejar autenticación

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // Crear nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
}   

// Iniciar sesión de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Expira en 30 días
    });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

//Obtener todos los usuarios (opcional)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
}   