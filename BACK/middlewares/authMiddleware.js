// authMiddleware.js - Archivo inicial
import jwt from "jsonwebtoken"; // Importar jsonwebtoken para manejar autenticación

// Middleware para verificar el token JWT
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Capturar el header completo

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No se proporcionó token o formato inválido" });
  }

  const token = authHeader.split(" ")[1]; // Extraer el token limpio

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // Guardar información del usuario en la request
    next(); // Continuar al siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
