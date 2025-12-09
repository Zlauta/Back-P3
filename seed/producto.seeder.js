import "dotenv/config"; 
import mongoose from "mongoose";
import ProductoModel from "../src/models/Producto.js";
import { connectDB } from "../src/config/config.db.js";

const seederProductos = async () => {
  try {

    await connectDB();
    console.log("Conectado a MongoDB para seeder de productos");

    const productos = [

      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Empanadas de Carne",
        descripcion: "Empanadas cortadas a cuchillo, jugosas, con cebolla de verdeo y huevo. Porción de 2 unidades.",
        precio: 2500,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1616035133202-d96205779c11?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Provoleta Clásica",
        descripcion: "Queso provolone fundido a la parrilla con orégano y aceite de oliva. Sale con pan casero.",
        precio: 4200,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1628113400539-75618b7636e7?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Rabas a la Romana",
        descripcion: "Anillos de calamar tiernizados y rebozados, acompañados con limón y salsa tártara.",
        precio: 5800,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Bastones de Muzzarella",
        descripcion: "6 unidades de muzzarella rebozada con hierbas, acompañados de salsa fileto.",
        precio: 3900,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Papas Fritas con Cheddar",
        descripcion: "Papas bastón crocantes bañadas en abundante queso cheddar, panceta y verdeo.",
        precio: 4500,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1573080496987-aeb7d53385c7?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Nachos con Guacamole",
        descripcion: "Totopos de maíz caseros con guacamole, queso crema y salsa picante.",
        precio: 3600,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1582169296194-e9d648411dff?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Mollejas al Limón",
        descripcion: "Mollejas de corazón doradas a la parrilla con limón y sal marina.",
        precio: 6200,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Buñuelos de Acelga",
        descripcion: "Torre de buñuelos caseros con alioli de ajo asado.",
        precio: 3200,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Tequeños Venezolanos",
        descripcion: "5 Dedos de queso envueltos en masa de harina de trigo frita.",
        precio: 3800,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Picada Chica",
        descripcion: "Selección de quesos, jamón crudo, salame, aceitunas y pan de campo (Para 1 o 2).",
        precio: 7500,
        categoria: "entrada",
        imagen: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
      },

      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Hamburguesa Doble Cheddar",
        descripcion: "Doble medallón de carne (360g), cuádruple cheddar, bacon crocante y salsa mil islas.",
        precio: 6500,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Milanesa a Caballo",
        descripcion: "Milanesa de ternera XL con dos huevos fritos arriba. Acompañada de papas fritas.",
        precio: 7800,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Pizza Muzzarella",
        descripcion: "Masa madre, salsa de tomate casera, abundante muzzarella y aceitunas verdes.",
        precio: 5500,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Bife de Chorizo",
        descripcion: "Corte de 400g a la parrilla con ensalada mixta o papas fritas.",
        precio: 9500,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Sorrentinos de Jamón y Queso",
        descripcion: "Pasta casera rellena con salsa a elección (Fileto, Blanca o Mixta).",
        precio: 6200,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Wok de Pollo y Vegetales",
        descripcion: "Salteado de vegetales de estación, trozos de pollo y salsa de soja con sésamo.",
        precio: 5800,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Ensalada Caesar con Pollo",
        descripcion: "Lechuga, croutones, parmesano, aderezo caesar y pechuga grillada.",
        precio: 5200,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Risotto de Hongos",
        descripcion: "Arroz carnaroli cremoso con mix de hongos de pino y champiñones.",
        precio: 7200,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Bondiola a la Mostaza",
        descripcion: "Bondiola braseada por 4 horas con salsa de mostaza y miel, con batatas asadas.",
        precio: 8500,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1626804475297-411dbe169c66?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Tacos de Carne (x3)",
        descripcion: "Tortillas de maíz con carne desmechada, cebolla, cilantro y lima.",
        precio: 5900,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Salmón Rosado Grillé",
        descripcion: "Con colchón de vegetales asados y salsa de limón.",
        precio: 12500,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Lasaña Bolognesa",
        descripcion: "Capas de masa casera, carne, salsa blanca y mucho queso gratinado.",
        precio: 6800,
        categoria: "principal",
        imagen: "https://images.unsplash.com/photo-1574868235805-c8124f7bd32f?auto=format&fit=crop&w=800&q=80",
      },

      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Cerveza Artesanal IPA",
        descripcion: "Pinta 500ml. Cerveza rubia con amargor intenso y notas cítricas.",
        precio: 2800,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Limonada con Menta",
        descripcion: "Jarra de 1 litro. Exprimido natural con menta fresca y jengibre.",
        precio: 3200,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Coca Cola 1.5L",
        descripcion: "Botella para compartir.",
        precio: 2500,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Agua Mineral Sin Gas",
        descripcion: "Botella de 500ml.",
        precio: 1500,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Vino Malbec Reserva",
        descripcion: "Botella 750ml. Notas de frutos rojos y madera.",
        precio: 6500,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Fernet con Coca",
        descripcion: "El clásico argentino. Vaso trago largo.",
        precio: 3500,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Gin Tonic",
        descripcion: "Gin, agua tónica, pepino y bayas de enebro.",
        precio: 3800,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Cerveza Honey",
        descripcion: "Pinta 500ml. Cerveza suave con toque de miel.",
        precio: 2800,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1566633806327-68e144fc9f10?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Licuado de Frutilla",
        descripcion: "Hecho con leche o agua, dulce y fresco.",
        precio: 2900,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Café Doble",
        descripcion: "Café de especialidad tostado intenso.",
        precio: 1800,
        categoria: "bebida",
        imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Flan Casero Mixto",
        descripcion: "Flan de huevo tradicional con abundante dulce de leche y crema chantilly.",
        precio: 2900,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1551024601-569d6f46319c?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Volcán de Chocolate",
        descripcion: "Soufflé de chocolate caliente con corazón líquido, acompañado de una bocha de helado.",
        precio: 3800,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Chocotorta",
        descripcion: "La torta argentina por excelencia. Galletitas de chocolate y mezcla de queso crema con dulce de leche.",
        precio: 3200,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Tiramisú",
        descripcion: "Postre italiano con vainillas bañadas en café y crema de mascarpone.",
        precio: 3500,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Helado (2 Bochas)",
        descripcion: "Sabores a elección: Chocolate, Vainilla, Frutilla, Dulce de Leche.",
        precio: 2500,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Cheesecake de Frutos Rojos",
        descripcion: "Base de galletita crocante, crema de queso suave y salsa de frutos del bosque.",
        precio: 3600,
        categoria: "postre",
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      },
    ];

    await ProductoModel.deleteMany({});
    console.log("Productos anteriores eliminados");

    await ProductoModel.insertMany(productos);
    console.log(`¡Éxito! Se insertaron ${productos.length} productos en la base de datos 🍔🍺`);


    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de productos:", error);
    mongoose.disconnect();
  }
};

seederProductos();