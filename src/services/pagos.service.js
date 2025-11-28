import { Preference } from "mercadopago";
import { client } from "../config/config.mercadoPago.js";
import Pedido from "../models/Pedido.js";
import Usuario from "../models/usuario.js"; // <--- 1. Importamos el modelo aquí

export const crearPedidoYPreferencia = async ({ items, total, direccion, telefono, emailUsuario }) => {
  
    // --- LÓGICA DE NEGOCIO Y DATOS ---

    // 1. Validar carrito
    if (!items || items.length === 0) {
        throw new Error("El carrito está vacío");
    }

    // 2. BUSCAR EL ID DEL USUARIO USANDO EL EMAIL
    // Esta lógica antes estaba en el controller, ahora vive aquí donde pertenece.
    const usuarioEncontrado = await Usuario.findOne({ email: emailUsuario });

    if (!usuarioEncontrado) {
        throw new Error("El usuario del token no existe en la base de datos");
    }

    const idCliente = usuarioEncontrado._id; // ¡Aquí recuperamos el ID de forma segura!

    try {
        // 3. Transformar items para el Schema de Pedido
        const itemsParaDB = items.map(item => ({
            producto: item._id, 
            cantidad: item.quantity
        }));

        // 4. Crear el Pedido en Base de Datos (Pendiente)
        const nuevoPedido = new Pedido({
            cliente: idCliente, // Usamos el ID que acabamos de encontrar
            items: itemsParaDB,
            total: total,
            estado: "pendiente",
            direccion: direccion || "Retiro en Local",
            telefono: telefono || "Sin teléfono"
        });

        const pedidoGuardado = await nuevoPedido.save();

        // 5. Configurar Mercado Pago
        const preference = new Preference(client);

        const body = {
            items: items.map((item) => ({
                title: item.nombre,
                quantity: Number(item.quantity),
                unit_price: Number(item.precio),
                currency_id: "ARS",
            })),
            external_reference: pedidoGuardado._id.toString(), // Vinculamos con el Pedido
            back_urls: {
                success: "http://localhost:5173", // Ajusta si es necesario
                failure: "http://localhost:5173",
                pending: "http://localhost:5173",
            },
            // auto_return: "approved",
        };

        const resultadoMP = await preference.create({ body });

        return { 
            id: resultadoMP.id, 
            idPedido: pedidoGuardado._id 
        };

    } catch (error) {
        console.error("Error en servicio de pagos:", error);
        throw error;
    }
};