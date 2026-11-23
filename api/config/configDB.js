const mongoose = require('mongoose')

async function conectaMongo() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("banco conectado")
}

module.exports = conectaMongo;


