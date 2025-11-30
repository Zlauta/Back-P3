import mongoose from "mongoose";
import ProductoModel from "../src/models/Producto.js"; 
import { connectDB } from "../src/config/config.db.js";

const seederProductos = async () => {
  try {
    // 1. Conectamos a la DB
    await connectDB();
    console.log("Conectado a MongoDB para seeder de productos");

    // 2. Definimos los productos con IDs aleatorios
    const productos = [
      // --- ENTRADAS ---
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Empanadas de Carne",
        descripcion: "Empanadas cortadas a cuchillo, jugosas, con cebolla de verdeo y huevo. Porción de 2 unidades.",
        precio: 2500,
        categoria: "Entradas",
        imagen: "https://images.unsplash.com/photo-1616035133202-d96205779c11?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Provoleta Clásica",
        descripcion: "Queso provolone fundido a la parrilla con orégano y aceite de oliva. Sale con pan casero.",
        precio: 4200,
        categoria: "Entradas",
        imagen: "https://images.unsplash.com/photo-1628113400539-75618b7636e7?auto=format&fit=crop&w=800&q=80"
      },

      // --- PRINCIPALES ---
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Hamburguesa Doble Cheddar",
        descripcion: "Doble medallón de carne (360g), cuádruple cheddar, bacon crocante y salsa mil islas.",
        precio: 6500,
        categoria: "Principales",
        imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Milanesa a Caballo",
        descripcion: "Milanesa de ternera XL con dos huevos fritos arriba. Acompañada de papas fritas.",
        precio: 7800,
        categoria: "Principales",
        imagen: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Pizza Muzzarella",
        descripcion: "Masa madre, salsa de tomate casera, abundante muzzarella y aceitunas verdes.",
        precio: 5500,
        categoria: "Principales",
        imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
      },

      // --- BEBIDAS ---
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Cerveza Artesanal IPA",
        descripcion: "Pinta 500ml. Cerveza rubia con amargor intenso y notas cítricas.",
        precio: 2800,
        categoria: "Bebidas",
        imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Limonada con Menta",
        descripcion: "Jarra de 1 litro. Exprimido natural con menta fresca y jengibre.",
        precio: 3200,
        categoria: "Bebidas",
        imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
      },

      // --- POSTRES (NUEVO) ---
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Flan Casero Mixto",
        descripcion: "Flan de huevo tradicional con abundante dulce de leche y crema chantilly.",
        precio: 2900,
        categoria: "Postres",
        imagen: "https://images.unsplash.com/photo-1551024601-569d6f46319c?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Volcán de Chocolate",
        descripcion: "Soufflé de chocolate caliente con corazón líquido, acompañado de una bocha de helado de americana.",
        precio: 3800,
        categoria: "Postres",
        imagen: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80"
      }
    ];

    // 3. Limpiamos la colección existente
    await ProductoModel.deleteMany({});
    console.log("Productos anteriores eliminados");

    // 4. Insertamos los nuevos productos
    await ProductoModel.insertMany(productos);
    console.log("Productos (incluyendo postres) insertados correctamente 🍮");
    
    // 5. Imprimimos los IDs
    console.log("\n--- IDs GENERADOS PARA COPIAR ---");
    productos.forEach(p => {
        console.log(`${p.nombre} (${p.categoria}): "${p._id.toString()}"`);
    });

    // 6. Desconexión
    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de productos:", error);
    mongoose.disconnect();
  }
};

seederProductos();