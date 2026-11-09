/**
 * Configuración centralizada de contacto comercial y conexión con Google Forms
 * ----------------------------------------------------------------------------
 * Mapea los campos del formulario de SiteCorp directamente a las entradas (`entry.*`)
 * del formulario de Google Forms del proyecto (`https://forms.gle/Y6zfrdpNnq9stBjs6`).
 */

export const CONTACT_EMAIL: string =
  import.meta.env.VITE_SITECORP_CONTACT_EMAIL || "imaceod96+sitecorp@gmail.com";

export const GOOGLE_FORM_SHORT_URL = "https://forms.gle/Y6zfrdpNnq9stBjs6";

export const GOOGLE_FORM_ID = "1FAIpQLScKL3IDjvzeJiPhbyrleKE68VJqLuezjaMHr8aRxUANOVczbQ";

export const GOOGLE_FORM_VIEW_URL: string = (
  import.meta.env.VITE_SITECORP_DEMO_FORM_URL ||
  `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`
).trim();

export const GOOGLE_FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

/**
 * IDs exactos de cada campo dentro del Google Form de SiteCorp
 */
export const GOOGLE_FORM_ENTRIES = {
  nombre: "entry.252411663", // Nombre del solicitante
  empresa: "entry.545589378", // Nombre de la entidad
  email: "entry.694825319", // Correo electrónico
  empleados: "entry.215461061", // Cantidad de trabajadores
  mensaje: "entry.1033627008", // Mensaje o comentarios adicionales (Retos organizativos)
} as const;

/**
 * Intervalos de cantidad de trabajadores idénticos a las opciones configuradas en el Google Form
 */
export const WORKER_COUNT_OPTIONS = [
  { value: "Menos de 50 empleados", label: "Menos de 50 empleados" },
  { value: "50 a 250 empleados", label: "50 a 250 empleados" },
  { value: "250 a 1000 empleados", label: "250 a 1.000 empleados" },
  { value: "Mas de 1000 empleados", label: "Más de 1.000 empleados" },
] as const;

export interface DemoFormPayload {
  nombre: string;
  empresa: string;
  email: string;
  empleados: string;
  mensaje: string;
}

/**
 * Genera la URL del Google Form con todos los campos pre-rellenados (`usp=pp_url`)
 */
export function buildPrefilledGoogleFormUrl(payload: DemoFormPayload): string {
  const params = new URLSearchParams({
    usp: "pp_url",
    [GOOGLE_FORM_ENTRIES.nombre]: payload.nombre.trim(),
    [GOOGLE_FORM_ENTRIES.empresa]: payload.empresa.trim(),
    [GOOGLE_FORM_ENTRIES.email]: payload.email.trim(),
    [GOOGLE_FORM_ENTRIES.empleados]: payload.empleados,
  });

  if (payload.mensaje.trim()) {
    params.set(GOOGLE_FORM_ENTRIES.mensaje, payload.mensaje.trim());
  }

  return `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?${params.toString()}`;
}

/**
 * Envía los datos del formulario directamente a los campos correspondientes de Google Forms
 */
export async function submitToGoogleForms(payload: DemoFormPayload): Promise<boolean> {
  const formData = new URLSearchParams();
  formData.append(GOOGLE_FORM_ENTRIES.nombre, payload.nombre.trim());
  formData.append(GOOGLE_FORM_ENTRIES.empresa, payload.empresa.trim());
  formData.append(GOOGLE_FORM_ENTRIES.email, payload.email.trim());
  formData.append(GOOGLE_FORM_ENTRIES.empleados, payload.empleados);
  formData.append(GOOGLE_FORM_ENTRIES.mensaje, payload.mensaje.trim());

  try {
    await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    return true;
  } catch {
    return false;
  }
}
