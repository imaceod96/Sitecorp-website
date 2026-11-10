/**
 * Configuración centralizada de conexión con la aplicación SiteCorp en producción
 * --------------------------------------------------------------------------------
 * Reutiliza las variables de entorno de Vite o la variable estándar VITE_APP_URL:
 * - VITE_APP_URL / VITE_SITECORP_APP_URL: URL base de la aplicación ("https://app.sitecorp.cu")
 * - VITE_SITECORP_LOGIN_URL: URL directa de inicio de sesión ("https://app.sitecorp.cu/login")
 */

// URL base de la aplicación en producción
export const APP_BASE_URL: string = (
  import.meta.env.VITE_APP_URL ||
  import.meta.env.VITE_SITECORP_APP_URL ||
  "https://app.sitecorp.cu"
).replace(/\/+$/, "");

// URL real de inicio de sesión en producción
export const DIRECT_LOGIN_URL: string = (
  import.meta.env.VITE_SITECORP_LOGIN_URL ||
  `${APP_BASE_URL}/login`
).trim();

// Flag para redirección directa desde el botón "Iniciar sesión"
export const DIRECT_LOGIN_ENABLED: boolean = true;
