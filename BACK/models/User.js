// User.js - Archivo inicial
import mongoose from "mongoose"; // Importar mongoose para crear el esquema del usuario
import bcrypt from "bcryptjs"; // Importar bcrypt para encriptar contraseñas

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps: true});

// Método para encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}   
// Crear modelo de usuario
const User = mongoose.model("User", userSchema);
export default User;