/**
 * Configuración centralizada de redirección para el botón "Iniciar sesión"
 * -------------------------------------------------------------------------
 * Cambia `DIRECT_LOGIN_URL` una sola vez aquí (o mediante la variable de entorno
 * `VITE_SITECORP_LOGIN_URL` en tu archivo `.env`) para que el botón "Iniciar sesión"
 * te lleve directamente a tu aplicación sin abrir la ventana modal ni pedir datos.
 */

// true = Al pulsar "Iniciar sesión" redirige directamente a DIRECT_LOGIN_URL
// false = Abre la ventana modal de inicio de sesión y configuración
export const DIRECT_LOGIN_ENABLED: boolean = true;

// Pon aquí la dirección fija de tu servidor o contenedor para tus pruebas:
// Ejemplos:
// - Servidor local Docker: "http://localhost:8080/login" o "http://localhost:3000/login"
// - Túnel de VS Code:      "https://xxxx-8080.brs.devtunnels.ms/login"
// - Dominio en producción: "https://app.sitecorp.cu/login"
export const DIRECT_LOGIN_URL: string =
  import.meta.env.VITE_SITECORP_LOGIN_URL ||
  import.meta.env.VITE_SITECORP_APP_URL ||
  "http://localhost:8080/login";
