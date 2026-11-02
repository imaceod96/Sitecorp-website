export interface ProductScreenshot {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  highlights: string[];
}

export const PRODUCT_SCREENSHOTS = {
  resumen: {
    id: "resumen",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.49.09_p._m._3b8dd9ea.png",
    title: "Resumen Ejecutivo — Grupo Empresarial Horizonte",
    subtitle: "Vista consolidada con alcance por entidad o incluyendo descendientes (Empresas y UEBs)",
    url: "app.sitecorp.cu/resumen",
    badge: "Panel General & KPIs",
    highlights: [
      "Selector de alcance: 'Esta entidad' vs 'Entidad + descendientes'",
      "Métricas en tiempo real: Plantilla Autorizada, Trabajadores Activos, Vacantes y % Ocupación",
      "Desglose inmediato por área organizativa y categoría ocupacional (Cuadro, Técnico, etc.)",
    ],
  },
  entidades: {
    id: "entidades",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.49.38_p._m._b9b843c1.png",
    title: "Selector Jerárquico Multi-Entidad (Grupo, Empresas y UEBs)",
    subtitle: "Navegación instantánea entre las 13 entidades disponibles con aislamiento de espacio de trabajo",
    url: "app.sitecorp.cu/organizacion/entidades",
    badge: "Arquitectura Multi-Entidad",
    highlights: [
      "Árbol jerárquico visual: Grupo Empresarial → Empresas Filiales → Unidades Empresariales de Base (UEB)",
      "Buscador rápido de entidades con etiquetas diferenciadas por tipo de unidad",
      "Alternancia de espacio de trabajo en un clic respetando los permisos del usuario",
    ],
  },
  trabajadores: {
    id: "trabajadores",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.50.12_p._m._b98532c5.png",
    title: "Directorio de Trabajadores y Estado de Expedientes",
    subtitle: "Control integral de las personas activas en la entidad con validación de ficha y vínculo a plantilla",
    url: "app.sitecorp.cu/personas/trabajadores",
    badge: "Personas & Expedientes",
    highlights: [
      "Identificación única por código de trabajador (ej. TRB-050BA5) y carné de identidad",
      "Indicadores visuales de estado: 'Vinculado a plantilla' y 'Ficha completa'",
      "Búsqueda instantánea y filtros multicriterio sobre el padrón activo",
    ],
  },
  plantilla: {
    id: "plantilla",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.50.54_p._m._3e975bae.png",
    title: "Plantilla de Cargos y Estructura del Anexo 14B",
    subtitle: "Estructura organizativa por Área → Cargo/Puesto con capacidad autorizada, ocupación, vacantes y salario",
    url: "app.sitecorp.cu/plantilla/anexo-14b",
    badge: "Control de Plazas & Anexo 14B",
    highlights: [
      "Exportación directa del modelo oficial Anexo 14B y migración guiada de trabajadores",
      "Detalle por Dirección/Área con Categoría Ocupacional, Grupo Escala (I al XXIV) y Salario en CUP",
      "Control exacto de plazas autorizadas, ocupadas y vacantes puesto por puesto",
    ],
  },
  contratacion: {
    id: "contratacion",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.51.09_p._m._6ecd160a.png",
    title: "Contratación y Cobertura de Plazas Vacantes",
    subtitle: "Incorporación de trabajadores directamente vinculada a las vacantes de la plantilla autorizada",
    url: "app.sitecorp.cu/contratacion/vacantes",
    badge: "Cobertura de Puestos",
    highlights: [
      "Monitoreo en vivo de puestos con vacantes, vacantes totales y puestos cubiertos",
      "Estados claros ('CUBIERTO' / 'CON VACANTES') con acción directa 'Cubrir puesto'",
      "Imposibilidad de sobrecupo: toda alta se asocia a una plaza autorizada disponible",
    ],
  },
  vacaciones: {
    id: "vacaciones",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.51.41_p._m._af65ffdb.png",
    title: "Gestión de Saldos, Devengos y Períodos de Vacaciones",
    subtitle: "Control automatizado de días disponibles, próximo devengo mensual (+1.92) y alertas de límite de 24 días",
    url: "app.sitecorp.cu/gestion-laboral/vacaciones",
    badge: "Vacaciones & Devengos",
    highlights: [
      "Cálculo automático de saldo disponible, próximo devengo (+1.92 d) y saldo proyectado",
      "Indicadores preventivos de trabajadores próximos al límite o en límite de 24 días",
      "Historial detallado y registro ágil de períodos de disfrute por trabajador",
    ],
  },
  licencias: {
    id: "licencias",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.52.03_p._m._604ffb16.png",
    title: "Licencias, Subsidios y Certificados Médicos (Modelo SC-4-04)",
    subtitle: "Registro documental de certificados médicos con respaldo PDF y generación automática del modelo SC-4-04",
    url: "app.sitecorp.cu/gestion-laboral/licencias-certificados",
    badge: "Certificados Médicos & SC-4-04",
    highlights: [
      "Estadísticas por año: total de certificados, promedio de días y trabajadores con certificado",
      "Vínculo directo al documento digitalizado en PDF de cada certificado médico",
      "Generación en un clic del Modelo oficial SC-4-04 para notificación y prenómina",
    ],
  },
  documentos: {
    id: "documentos",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.51.55_p._m._7939ec7d.png",
    title: "Plantillas Documentales Word (.doc / .docx) con Marcadores Dinámicos",
    subtitle: "Automatización de Contratos, Anexos, Modelo SC-4-04, Resoluciones y Movimientos de Nómina",
    url: "app.sitecorp.cu/ajustes/plantillas-documentales",
    badge: "Automatización Documental",
    highlights: [
      "Catálogo oficial: Contratos Determinados/Indeterminados, Anexos, Modelo SC-4-04, Resoluciones y Nómina",
      "Subida de archivos Word (.doc y .docx) manteniendo intacto el formato corporativo de la entidad",
      "Inyección automática de datos reales mediante marcadores dinámicos (ej. {{{worker.full_name}}})",
    ],
  },
  escalaSalarial: {
    id: "escalaSalarial",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.52.40_p._m._9fe1112d.png",
    title: "Escala Salarial y Clasificador de Complejidad (24 Grupos)",
    subtitle: "Configuración por régimen (Empresarial / Presupuestado) de los grupos I al XXIV con historial de cambios",
    url: "app.sitecorp.cu/ajustes/escala-salarial",
    badge: "Régimen & Escalas Salariales",
    highlights: [
      "Clasificador oficial de 24 grupos de complejidad (Grupo I al XXIV: 2 800,00 a 16 200,00 CUP)",
      "Adaptación al régimen salarial de la entidad (EMPRESARIAL) con estado activo por grupo",
      "Edición controlada de tarifas salariales ('Cambiar salario') y trazabilidad ('Ver historial')",
    ],
  },
  rolesPermisos: {
    id: "rolesPermisos",
    src: "/assets/aistudio/Captura_de_pantalla_2026-11-02_a_las_12.53.19_p._m._42527c6f.png",
    title: "Matriz Granular de Roles y 47 Permisos Internos por Entidad",
    subtitle: "Catálogo controlado por base de datos para definir exactamente qué puede ver o gestionar cada rol",
    url: "app.sitecorp.cu/ajustes/roles-permisos",
    badge: "RBAC · 47 Permisos Internos",
    highlights: [
      "Creación de roles internos a medida con catálogo controlado de 47 permisos granulares",
      "Segregación por dominios: Organización, Usuarios, Roles, Candidatos, Plantilla, Trabajadores y Contratación",
      "Separación estricta entre permisos de lectura (.view), gestión (.manage), invitación e importación",
    ],
  },
} as const;

export type ScreenshotKey = keyof typeof PRODUCT_SCREENSHOTS;
