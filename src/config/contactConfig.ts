/**
 * Configuración centralizada de correo de contacto y recepción de solicitudes de Demo
 * -----------------------------------------------------------------------------------
 * Modifica `CONTACT_EMAIL` aquí (o mediante `VITE_SITECORP_CONTACT_EMAIL` en `.env`)
 * cuando desees cambiar el correo temporal por el definitivo de producción.
 */

export const CONTACT_EMAIL: string =
  import.meta.env.VITE_SITECORP_CONTACT_EMAIL || "imaceod96+sitecorp@gmail.com";

export interface DemoSubmissionPayload {
  origen: "Modal de Demostración" | "Sección de Contacto";
  nombre: string;
  email: string;
  empresa: string;
  empleados: string;
  tipoOrganizacion?: string;
  mensaje?: string;
  moduloInteres?: string;
}

export interface DemoSubmissionResult {
  ok: boolean;
  deliveredViaAjax: boolean;
  mailtoUrl: string;
  errorMessage?: string;
}

/**
 * Construye un enlace `mailto:` con todos los datos de la solicitud formateados
 * como respaldo directo o envío desde el cliente de correo del usuario.
 */
export function buildDemoMailtoUrl(payload: DemoSubmissionPayload): string {
  const subject = `[SiteCorp Demo] Solicitud de ${payload.empresa} (${payload.nombre})`;
  const lines = [
    `Hola equipo de SiteCorp,`,
    ``,
    `Se ha registrado una nueva solicitud de demostración guiada:`,
    ``,
    `• Nombre y apellidos: ${payload.nombre}`,
    `• Email corporativo: ${payload.email}`,
    `• Empresa u organización: ${payload.empresa}`,
    `• Tamaño de plantilla: ${payload.empleados}`,
    payload.tipoOrganizacion ? `• Tipo de estructura: ${payload.tipoOrganizacion}` : null,
    payload.moduloInteres ? `• Módulo de interés: ${payload.moduloInteres}` : null,
    payload.mensaje ? `• Retos / Necesidades: ${payload.mensaje}` : null,
    `• Origen del formulario: ${payload.origen}`,
  ].filter(Boolean);

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

/**
 * Envía los datos del formulario de solicitud de demo al correo configurado (`CONTACT_EMAIL`)
 * mediante FormSubmit AJAX (`https://formsubmit.co/ajax/...`).
 */
export async function sendDemoRequestEmail(
  payload: DemoSubmissionPayload,
): Promise<DemoSubmissionResult> {
  const mailtoUrl = buildDemoMailtoUrl(payload);

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[SiteCorp Demo] Nueva solicitud de ${payload.empresa} — ${payload.nombre}`,
          _template: "table",
          _captcha: "false",
          _replyto: payload.email,
          Nombre_Completo: payload.nombre,
          Email_Corporativo: payload.email,
          Empresa_Organizacion: payload.empresa,
          Tamano_Plantilla: payload.empleados,
          Tipo_Estructura: payload.tipoOrganizacion || "No especificado",
          Modulo_Interes: payload.moduloInteres || "General",
          Mensaje_Necesidades: payload.mensaje || "Sin comentarios adicionales",
          Formulario_Origen: payload.origen,
        }),
      },
    );

    const data = await response.json().catch(() => ({}));
    const isSuccess =
      response.ok && (data?.success === "true" || data?.success === true || response.status === 200);

    if (isSuccess) {
      return {
        ok: true,
        deliveredViaAjax: true,
        mailtoUrl,
      };
    }

    return {
      ok: true,
      deliveredViaAjax: false,
      mailtoUrl,
      errorMessage:
        data?.message ||
        "El servicio de correo requiere confirmar la activación inicial o usar el cliente de correo.",
    };
  } catch {
    return {
      ok: true,
      deliveredViaAjax: false,
      mailtoUrl,
      errorMessage:
        "No se pudo conectar con el servidor de envío directo. Puedes completar el envío abriendo tu cliente de correo.",
    };
  }
}
