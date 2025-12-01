import { MercadoPagoConfig } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

// Inicializamos el cliente con el Access Token del .env
export const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});