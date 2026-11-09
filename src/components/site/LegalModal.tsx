import { useState, useEffect, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Scale,
  ShieldCheck,
  Cookie,
  Settings2,
  Eye,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  Download,
  Upload,
  Building2,
  FileText,
  Lock,
  KeyRound,
  ShieldAlert,
  LogOut,
  EyeOff,
} from "lucide-react";

export type LegalTabId = "aviso-legal" | "privacidad" | "cookies";

export interface LegalSectionItem {
  id: string;
  title: string;
  content: string;
  legalRef?: string;
}

export interface LegalDocumentData {
  id: LegalTabId;
  tabLabel: string;
  title: string;
  subtitle: string;
  badges: string[];
  sections: LegalSectionItem[];
}

export interface LegalEntityMetadata {
  entityName: string;
  nitReeup: string;
  address: string;
  contactEmail: string;
  dpoRole: string;
  lastUpdated: string;
}

export interface LegalStoreState {
  metadata: LegalEntityMetadata;
  documents: Record<LegalTabId, LegalDocumentData>;
}

const STORAGE_KEY = "sitecorp_legal_center_v1";
const ADMIN_AUTH_STORAGE_KEY = "sitecorp_legal_admin_auth_v1";
const ADMIN_LOCKOUT_STORAGE_KEY = "sitecorp_legal_admin_lockout_v1";
const DEFAULT_ADMIN_KEY = "Sitecorp2026*";
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60_000;

function encodeKeyHash(rawKey: string): string {
  // Deterministic obfuscated hash for client-side verification
  let hash = 5381;
  const salted = `sitecorp_rbac_salt::${rawKey.trim()}::cuba`;
  for (let i = 0; i < salted.length; i++) {
    hash = (hash * 33) ^ salted.charCodeAt(i);
  }
  return `sc_v1_${(hash >>> 0).toString(16)}`;
}

function getStoredAdminKeyHash(): string {
  if (typeof window === "undefined") return encodeKeyHash(DEFAULT_ADMIN_KEY);
  try {
    const stored = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    return stored || encodeKeyHash(DEFAULT_ADMIN_KEY);
  } catch {
    return encodeKeyHash(DEFAULT_ADMIN_KEY);
  }
}

export const DEFAULT_LEGAL_STATE: LegalStoreState = {
  metadata: {
    entityName: "SiteCorp — Plataforma de Gestión de Capital Humano",
    nitReeup: "Registro Nacional de Constructores y Productores de Software (RNCPS)",
    address: "La Habana, República de Cuba",
    contactEmail: "imaceod96+sitecorp@gmail.com",
    dpoRole: "Dirección de Seguridad Informática y Protección de Datos",
    lastUpdated: "Noviembre 2026",
  },
  documents: {
    "aviso-legal": {
      id: "aviso-legal",
      tabLabel: "Aviso legal",
      title: "Aviso Legal y Condiciones de Uso Institucional",
      subtitle:
        "Marco jurídico regulatorio para el uso del portal informativo y del sistema de gestión de Capital Humano SiteCorp en el entorno empresarial cubano.",
      badges: [
        "Ley No. 116/2013 Código de Trabajo",
        "Decreto No. 326/2014 Reglamento",
        "Decreto-Ley No. 34 Sistema Empresarial",
        "Ley No. 154/2022 Derecho de Autor",
      ],
      sections: [
        {
          id: "al-1",
          title: "1. Identificación del Titular y Objeto de la Plataforma",
          legalRef: "Decreto-Ley No. 370/2018 y Normas de Comercio Electrónico en Cuba",
          content:
            "El presente Aviso Legal regula el acceso, navegación y uso del sitio web institucional de SiteCorp, así como los términos generales aplicables a la plataforma tecnológica de gestión de Capital Humano.\n\nSiteCorp es una solución informática diseñada para Grupos Empresariales (OSDE), Empresas Estatales, Unidades Empresariales de Base (UEB) y demás actores económicos de la República de Cuba, orientada a centralizar estructuras organizativas, plantillas de cargos, contratación laboral, control de asistencia, vacaciones, licencias médicas y prenómina.",
        },
        {
          id: "al-2",
          title: "2. Adecuación al Marco Jurídico-Laboral Cubano",
          legalRef: "Ley No. 116/2013 «Código de Trabajo» y Decreto No. 326/2014",
          content:
            "Los módulos operativos de SiteCorp han sido concebidos para facilitar el cumplimiento estricto de la legislación laboral vigente dictada por el Ministerio de Trabajo y Seguridad Social (MTSS):\n• Gestión de Plantillas de Cargos aprobadas, plazas ocupadas, vacantes y congeladas según las facultades otorgadas por el Decreto-Ley No. 34 del Sistema Empresarial Estatal Cubano.\n• Formalización y control de Contratos de Trabajo (por tiempo indeterminado, determinado, para la ejecución de un trabajo u obra y períodos de prueba conforme a los artículos 24 al 35 de la Ley No. 116/2013).\n• Aplicación de la Escala Salarial vigente en Pesos Cubanos (CUP) estructurada en los 24 Grupos de Complejidad y categorías ocupacionales (Operarios, Técnicos, Administrativos, Servicios y Cuadros).\n• Emisión y conservación del Submayor de Vacaciones Anuales Pagadas (acumulación del 9,09% sobre tiempo y salario) y del Registro de Tiempo de Trabajo y Salario Devengado (Anexo No. 14B).\n• Registro administrativo de Licencias y Certificados Médicos vinculados al Modelo oficial SC-4-04 conforme a la Ley No. 105 de Seguridad Social.",
        },
        {
          id: "al-3",
          title: "3. Delimitación de Responsabilidades entre SiteCorp y la Entidad Empleadora",
          legalRef: "Código Civil de la República de Cuba (Ley No. 59) y Ley No. 116/2013",
          content:
            "Cada Grupo Empresarial, Empresa o Unidad Empresarial de Base (UEB) que implementa SiteCorp ostenta la condición jurídica de Entidad Empleadora y es la única responsable de:\n• La veracidad, exactitud legal y respaldo documental primario de los datos registrados en los Expedientes Laborales de sus trabajadores.\n• La correcta asignación de roles y permisos (matriz RBAC de 47 permisos) a los especialistas de Capital Humano, cuadros y directivos autorizados.\n• Las resoluciones de nombramiento, altas, bajas, movimientos de nómina y decisiones administrativas adoptadas dentro del sistema.",
        },
        {
          id: "al-4",
          title: "4. Propiedad Intelectual sobre el Software y Contenidos",
          legalRef: "Ley No. 154/2022 «Del Derecho de Autor y del Artista Intérprete»",
          content:
            "El código fuente, arquitectura de base de datos, interfaces gráficas, manuales de usuario, logotipos, isotipos y denominaciones de SiteCorp están protegidos por la Ley No. 154/2022 y las disposiciones del Centro Nacional de Derecho de Autor (CENDA) sobre programas de computación y bases de datos.\n\nQueda prohibida la reproducción, descompilación, distribución o cesión a terceros no autorizados sin licencia o contrato de servicios tecnológicos expresamente suscrito con el titular.",
        },
      ],
    },
    privacidad: {
      id: "privacidad",
      tabLabel: "Política de privacidad",
      title: "Política de Privacidad y Protección de Datos Personales",
      subtitle:
        "Tratamiento, confidencialidad y resguardo de los datos personales y laborales conforme a la Ley No. 149/2022 «De Protección de Datos Personales» de la República de Cuba.",
      badges: [
        "Ley No. 149/2022 Protección de Datos",
        "Art. 97 Constitución de la República",
        "Ley No. 116/2013 Expediente Laboral",
        "Resolución 128/2019 MINCOM Ciberseguridad",
      ],
      sections: [
        {
          id: "pr-1",
          title: "1. Marco Legal y Principios Rectores de Protección de Datos",
          legalRef: "Constitución de la República (Art. 97) y Ley No. 149/2022",
          content:
            "SiteCorp garantiza la protección de la intimidad personal y el uso legítimo de la información registrada en su plataforma, en estricto apego al Artículo 97 de la Constitución de la República de Cuba y a la Ley No. 149/2022 «De Protección de Datos Personales» (publicada en la Gaceta Oficial No. 90 Ordinaria).\n\nTodo tratamiento de datos personales se rige por los principios de licitud, lealtad, finalidad específica, calidad y veracidad del dato, proporcionalidad, seguridad técnica y confidencialidad absoluta.",
        },
        {
          id: "pr-2",
          title: "2. Categorías de Datos Personales y Laborales Tratados",
          legalRef: "Ley No. 149/2022 (Datos Personales y Sensibles) y Decreto No. 326/2014",
          content:
            "En función de si el usuario interactúa con la página web informativa o si sus datos son gestionados dentro del sistema institucional por su Entidad Empleadora, se tratan las siguientes categorías:\n• Datos de Contacto en el Portal Web: Nombre, apellidos, correo corporativo, entidad de procedencia y teléfono suministrados voluntariamente al solicitar una demostración técnica.\n• Datos Identificativos del Trabajador: Nombre completo, Número de Identidad Permanente / Carné de Identidad (CI de 11 dígitos), edad, sexo, dirección particular, municipio, provincia y datos de localización.\n• Datos Académicos y Profesionales: Nivel de escolaridad, especialidad graduada, capacitaciones, categoría ocupacional, cargo en plantilla y evaluaciones de idoneidad.\n• Datos Económicos y de Nómina: Grupo de escala salarial (I al XXIV), tarifa salarial en CUP, pagos adicionales, retenciones legales, tiempo real trabajado (Anexo 14B) y liquidación de vacaciones acumuladas (9,09%).\n• Datos Sensibles de Salud Laboral: Registros administrativos de certificados médicos (fechas de salida, reincorporación, días subsidiados y referencia al Modelo SC-4-04), licencias de maternidad y controles de Seguridad y Salud en el Trabajo (SST), los cuales reciben protección reforzada de acceso restringido.",
        },
        {
          id: "pr-3",
          title: "3. Base de Legitimación y Finalidad del Tratamiento",
          legalRef: "Artículos 14 y 15 de la Ley No. 149/2022 y Ley No. 116/2013",
          content:
            "• En el Portal Web Público: La base legal es el consentimiento expreso e informado de la persona que solicita contacto comercial o demostración guiada de la plataforma.\n• En el Sistema de Gestión de Capital Humano: Conforme al Artículo 15 de la Ley No. 149/2022, el tratamiento de los datos de los trabajadores se fundamenta en el cumplimiento de obligaciones legales impuestas a la Entidad Empleadora por la Ley No. 116/2013 «Código de Trabajo» y la Ley No. 105 «De Seguridad Social» para la conformación del Expediente Laboral, el pago de salarios y la tramitación de prestaciones sociales.",
        },
        {
          id: "pr-4",
          title: "4. Derechos de las Personas Titulares de los Datos (ARCO)",
          legalRef: "Artículo 97 Constitucional y Capítulo III de la Ley No. 149/2022",
          content:
            "Toda persona titular de datos personales registrados tiene derecho a:\n• Acceso y Conocimiento: Conocer qué datos suyos obran en el registro digital, su finalidad y las comunicaciones realizadas.\n• Rectificación y Actualización: Solicitar la corrección inmediata de datos inexactos, incompletos o desactualizados (ej. cambio de domicilio, superación técnico-profesional o ajuste de Carné de Identidad).\n• Cancelación / Supresión: Solicitar la eliminación de aquellos datos que resulten improcedentes o excesivos, siempre que no exista un deber legal de conservación laboral o de Seguridad Social.\n• Oposición y Reclamación: Oponerse a tratamientos no autorizados por la ley y presentar reclamación ante el Responsable del Registro en su entidad o mediante nuestro canal oficial de privacidad.",
        },
        {
          id: "pr-5",
          title: "5. Seguridad Informática, Trazabilidad y Plazos de Conservación",
          legalRef: "Resoluciones No. 126 y 128/2019 del MINCOM y Ley No. 116/2013",
          content:
            "SiteCorp aplica controles técnicos alineados con el Reglamento de Seguridad para las Tecnologías de la Información del Ministerio de Comunicaciones (MINCOM):\n• Segregación jerárquica por entidad (Grupo Empresarial, Empresa y UEB) y control granular mediante 47 permisos por rol (RBAC).\n• Bitácora inmutable de auditoría que registra usuario, fecha, hora y operación sobre cada movimiento de plantilla o nómina.\n• Conservación Legal: Los datos de tiempo de servicio y salarios devengados (Anexo 14B) se conservan durante los plazos exigidos por la legislación laboral y de Seguridad Social cubana para respaldar futuras jubilaciones y certificaciones oficiales.",
        },
      ],
    },
    cookies: {
      id: "cookies",
      tabLabel: "Política de cookies",
      title: "Política de Cookies y Almacenamiento Técnico de Sesión",
      subtitle:
        "Información transparente sobre el uso de cookies técnicas, tokens de seguridad y almacenamiento local conforme a las normas de ciberseguridad y protección de datos en Cuba.",
      badges: [
        "Sin Rastreadores Publicitarios",
        "Decreto-Ley No. 370/2018",
        "Resolución 128/2019 MINCOM",
        "Ley No. 149/2022",
      ],
      sections: [
        {
          id: "ck-1",
          title: "1. ¿Qué son las Cookies y el Almacenamiento Local en SiteCorp?",
          legalRef: "Decreto-Ley No. 370/2018 sobre Informatización de la Sociedad",
          content:
            "Las cookies y el almacenamiento local del navegador (localStorage / sessionStorage) son pequeños archivos o registros técnicos que se guardan en el dispositivo del usuario al acceder a nuestro portal web o a la aplicación empresarial SiteCorp.\n\nSu único propósito en SiteCorp es garantizar el funcionamiento técnico seguro, recordar la entidad activa en estructuras multinivel y preservar la integridad de la sesión autenticada.",
        },
        {
          id: "ck-2",
          title: "2. Compromiso de Cero Cookies Publicitarias o de Rastreo Comercial",
          legalRef: "Ley No. 149/2022 «De Protección de Datos Personales»",
          content:
            "Por tratarse de una plataforma empresarial de gestión de Capital Humano orientada a entidades cubanas, SiteCorp NO utiliza cookies publicitarias, píxeles de seguimiento comercial ni comparte hábitos de navegación con redes de mercadeo de terceros.\n\nNingún dato laboral ni personal es perfilado con fines comerciales.",
        },
        {
          id: "ck-3",
          title: "3. Detalle de Cookies y Registros Técnicos Utilizados",
          legalRef: "Resolución No. 128/2019 del MINCOM (Seguridad de Sesiones)",
          content:
            "SiteCorp utiliza exclusivamente los siguientes identificadores técnicos:\n• Token de Sesión Autenticada (sitecorp_auth_session): Cookie técnica cifrada (HttpOnly / SameSite) indispensable para validar la identidad del usuario y sus 47 permisos de rol durante su jornada de trabajo. Caduca automáticamente al cerrar sesión o por inactividad.\n• Contexto de Entidad Activa (sitecorp_active_entity): Registro técnico que mantiene seleccionada la entidad actual (Grupo Empresarial, Empresa o UEB) en el conmutador jerárquico para evitar errores de carga entre unidades.\n• Configuración y Preferencias Locales (sitecorp_legal_center_v1 / UI): Almacenamiento local en el navegador que guarda las preferencias de interfaz y los textos legales actualizados por el administrador.",
        },
        {
          id: "ck-4",
          title: "4. Gestión y Desactivación desde el Navegador",
          legalRef: "Derecho de Autodeterminación Informativa — Ley No. 149/2022",
          content:
            "El usuario o administrador de red puede revisar, bloquear o borrar las cookies y el almacenamiento local en cualquier momento desde las opciones de privacidad y seguridad de su navegador (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).\n\nTenga en cuenta que la desactivación de las cookies técnicas de sesión dentro de la aplicación operativa de SiteCorp impedirá mantener iniciada la sesión autenticada por motivos de seguridad informática.",
        },
      ],
    },
  },
};

export function loadLegalState(): LegalStoreState {
  if (typeof window === "undefined") return DEFAULT_LEGAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LEGAL_STATE;
    const parsed = JSON.parse(raw) as LegalStoreState;
    if (!parsed.documents || !parsed.metadata) return DEFAULT_LEGAL_STATE;
    return parsed;
  } catch {
    return DEFAULT_LEGAL_STATE;
  }
}

interface LegalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: LegalTabId;
  initialAdminMode?: boolean;
}

export function LegalModal({
  open,
  onOpenChange,
  initialTab = "aviso-legal",
  initialAdminMode = false,
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = Number(window.localStorage.getItem(ADMIN_LOCKOUT_STORAGE_KEY) || "0");
    return saved > Date.now() ? saved : 0;
  });
  const [nowTick, setNowTick] = useState<number>(Date.now());

  // Change Admin Key panel states
  const [showChangeKeyPanel, setShowChangeKeyPanel] = useState<boolean>(false);
  const [currentKeyInput, setCurrentKeyInput] = useState<string>("");
  const [newKeyInput, setNewKeyInput] = useState<string>("");
  const [confirmKeyInput, setConfirmKeyInput] = useState<string>("");
  const [keyChangeError, setKeyChangeError] = useState<string | null>(null);

  const [legalState, setLegalState] = useState<LegalStoreState>(() => loadLegalState());
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  // Cooldown timer for brute-force lockout
  useEffect(() => {
    if (lockoutUntil <= Date.now()) return;
    const interval = window.setInterval(() => {
      const current = Date.now();
      setNowTick(current);
      if (current >= lockoutUntil) {
        setLockoutUntil(0);
        setFailedAttempts(0);
        setAuthError(null);
        window.clearInterval(interval);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [lockoutUntil]);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      setConfirmReset(false);
      setAuthError(null);
      setPasswordInput("");
      if (initialAdminMode) {
        if (isAuthenticated) {
          setIsAdminMode(true);
          setShowAuthPrompt(false);
        } else {
          setIsAdminMode(false);
          setShowAuthPrompt(true);
        }
      } else {
        setIsAdminMode(false);
        setShowAuthPrompt(false);
      }
    } else {
      // Auto-lock session when modal is closed so next visitor cannot edit
      setIsAdminMode(false);
      setIsAuthenticated(false);
      setShowAuthPrompt(false);
      setShowChangeKeyPanel(false);
      setPasswordInput("");
      setAuthError(null);
    }
  }, [open, initialTab, initialAdminMode]);

  const lockoutRemainingSec = Math.max(0, Math.ceil((lockoutUntil - nowTick) / 1000));
  const isLockedOut = lockoutRemainingSec > 0;

  const handleRequestAdminToggle = () => {
    if (isAdminMode) {
      // Switch to visitor preview without revoking session yet
      setIsAdminMode(false);
      setShowAuthPrompt(false);
      return;
    }
    if (isAuthenticated) {
      setIsAdminMode(true);
      setShowAuthPrompt(false);
    } else {
      setShowAuthPrompt((prev) => !prev);
      setAuthError(null);
      setPasswordInput("");
    }
  };

  const handleLockAdminSession = () => {
    setIsAdminMode(false);
    setIsAuthenticated(false);
    setShowAuthPrompt(false);
    setShowChangeKeyPanel(false);
    setPasswordInput("");
    setSaveNotice("Sesión de administrador bloqueada");
    setTimeout(() => setSaveNotice(null), 2800);
  };

  const handleVerifyAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    const inputHash = encodeKeyHash(passwordInput);
    const validHash = getStoredAdminKeyHash();

    if (inputHash === validHash) {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      setShowAuthPrompt(false);
      setPasswordInput("");
      setFailedAttempts(0);
      setAuthError(null);
      setSaveNotice("Acceso de administrador verificado");
      setTimeout(() => setSaveNotice(null), 3000);
    } else {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      setPasswordInput("");
      if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_DURATION_MS;
        setLockoutUntil(until);
        setNowTick(Date.now());
        try {
          window.localStorage.setItem(ADMIN_LOCKOUT_STORAGE_KEY, String(until));
        } catch {
          // ignore storage errors
        }
        setAuthError(
          "Demasiados intentos fallidos. El acceso administrativo se ha bloqueado temporalmente por 60 segundos.",
        );
      } else {
        setAuthError(
          `Clave de administrador incorrecta. Intentos restantes: ${
            MAX_FAILED_ATTEMPTS - nextAttempts
          }.`,
        );
      }
    }
  };

  const handleUpdateAdminKey = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyChangeError(null);

    if (encodeKeyHash(currentKeyInput) !== getStoredAdminKeyHash()) {
      setKeyChangeError("La clave actual introducida no es correcta.");
      return;
    }
    if (newKeyInput.trim().length < 6) {
      setKeyChangeError("La nueva clave debe tener al menos 6 caracteres.");
      return;
    }
    if (newKeyInput.trim() !== confirmKeyInput.trim()) {
      setKeyChangeError("La confirmación de la nueva clave no coincide.");
      return;
    }

    try {
      window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, encodeKeyHash(newKeyInput));
      setCurrentKeyInput("");
      setNewKeyInput("");
      setConfirmKeyInput("");
      setShowChangeKeyPanel(false);
      setSaveNotice("Clave de administrador actualizada correctamente");
      setTimeout(() => setSaveNotice(null), 3200);
    } catch {
      setKeyChangeError("No se pudo guardar la nueva clave en este navegador.");
    }
  };

  const persistState = (nextState: LegalStoreState, message = "Cambios guardados en el portal") => {
    setLegalState(nextState);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      setSaveNotice(message);
      setTimeout(() => setSaveNotice(null), 3200);
    } catch {
      setSaveNotice("No se pudo guardar en el almacenamiento local");
    }
  };

  const currentDoc = legalState.documents[activeTab];

  const handleMetadataChange = (field: keyof LegalEntityMetadata, value: string) => {
    const next: LegalStoreState = {
      ...legalState,
      metadata: {
        ...legalState.metadata,
        [field]: value,
      },
    };
    persistState(next, "Datos de la entidad titular actualizados");
  };

  const handleDocHeaderChange = (field: "title" | "subtitle", value: string) => {
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          [field]: value,
        },
      },
    };
    persistState(next);
  };

  const handleBadgesChange = (value: string) => {
    const badges = value
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          badges,
        },
      },
    };
    persistState(next);
  };

  const handleSectionChange = (
    sectionId: string,
    field: keyof LegalSectionItem,
    value: string,
  ) => {
    const nextSections = currentDoc.sections.map((sec) =>
      sec.id === sectionId ? { ...sec, [field]: value } : sec,
    );
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          sections: nextSections,
        },
      },
    };
    persistState(next);
  };

  const handleAddSection = () => {
    const nextIndex = currentDoc.sections.length + 1;
    const newSection: LegalSectionItem = {
      id: `${activeTab}-${Date.now()}`,
      title: `${nextIndex}. Nueva cláusula o disposición legal`,
      legalRef: "Normativa interna / Legislación aplicable",
      content:
        "Redacte aquí el contenido detallado de la nueva cláusula o disposición para su entidad...",
    };
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          sections: [...currentDoc.sections, newSection],
        },
      },
    };
    persistState(next, "Nueva cláusula añadida");
  };

  const handleDeleteSection = (sectionId: string) => {
    const nextSections = currentDoc.sections.filter((sec) => sec.id !== sectionId);
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          sections: nextSections,
        },
      },
    };
    persistState(next, "Cláusula eliminada");
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentDoc.sections.length) return;
    const nextSections = [...currentDoc.sections];
    const [moved] = nextSections.splice(index, 1);
    nextSections.splice(targetIndex, 0, moved);
    const next: LegalStoreState = {
      ...legalState,
      documents: {
        ...legalState.documents,
        [activeTab]: {
          ...currentDoc,
          sections: nextSections,
        },
      },
    };
    persistState(next, "Orden de cláusulas actualizado");
  };

  const handleRestoreDefaults = () => {
    persistState(DEFAULT_LEGAL_STATE, "Plantilla legal cubana oficial restaurada");
    setConfirmReset(false);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(legalState, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitecorp-textos-legales-cuba.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSaveNotice("Archivo JSON de respaldo descargado");
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result)) as LegalStoreState;
        if (parsed.documents && parsed.metadata) {
          persistState(parsed, "Configuración legal importada correctamente");
        }
      } catch {
        setSaveNotice("El archivo seleccionado no tiene un formato válido");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const TABS: { id: LegalTabId; label: string; icon: typeof Scale }[] = [
    { id: "aviso-legal", label: "Aviso legal", icon: Scale },
    { id: "privacidad", label: "Política de privacidad", icon: ShieldCheck },
    { id: "cookies", label: "Política de cookies", icon: Cookie },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-hidden rounded-2xl border-surface-line bg-white p-0 shadow-lift sm:max-w-4xl flex flex-col">
        {/* Top institutional banner */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 px-6 py-5 text-white sm:px-8 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-100">
              <Scale className="h-4 w-4 text-accent-300" aria-hidden />
              Centro Legal y Cumplimiento Normativo (República de Cuba)
            </div>

            {/* Protected Admin Editor Controls */}
            <div className="flex items-center gap-2">
              {saveNotice && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-300/30 px-2.5 py-1 text-[11px] font-medium text-emerald-100">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  {saveNotice}
                </span>
              )}
              <button
                type="button"
                onClick={handleRequestAdminToggle}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isAdminMode
                    ? "bg-accent-400 text-coal shadow-sm hover:bg-accent-300"
                    : "border border-white/20 bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white"
                }`}
              >
                {isAdminMode ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Vista Visitante
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    {isAuthenticated ? "Volver al Editor" : "Acceso Admin"}
                  </>
                )}
              </button>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLockAdminSession}
                  title="Cerrar y bloquear sesión de administrador"
                  className="inline-flex items-center gap-1 rounded-xl border border-red-300/30 bg-red-500/20 px-2.5 py-1.5 text-xs font-semibold text-red-100 hover:bg-red-500/30"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Bloquear
                </button>
              )}
            </div>
          </div>

          <DialogHeader className="mt-2.5 text-left">
            <DialogTitle className="text-xl font-bold text-white sm:text-2xl font-display">
              {currentDoc.title}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-teal-100/90 max-w-3xl">
              {currentDoc.subtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Interactive 3-Tab Switcher */}
          <div
            role="tablist"
            aria-label="Secciones legales de SiteCorp"
            className="mt-5 flex flex-wrap gap-2 border-t border-white/15 pt-4"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-white text-brand-700 shadow-sm"
                      : "bg-white/10 text-teal-100 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
          {/* ================= ADMIN AUTHENTICATION GATE ================= */}
          {showAuthPrompt && !isAuthenticated && (
            <div className="rounded-2xl border border-brand-500/25 bg-surface-mist p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-2xs">
                    <KeyRound className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink font-display">
                      Verificación de Seguridad — Administrador del Portal
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft max-w-xl">
                      La edición de textos normativos está protegida. Introduce tu clave de
                      administrador para desbloquear la modificación del Aviso Legal, Política de
                      Privacidad y Política de Cookies.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthPrompt(false);
                    setAuthError(null);
                    setPasswordInput("");
                  }}
                  className="self-start text-xs font-semibold text-ink-muted hover:text-ink"
                >
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleVerifyAdminPassword} className="mt-4 space-y-3">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <div className="relative flex-1 max-w-md">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      disabled={isLockedOut}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Introduce la clave de administrador..."
                      autoFocus
                      className="h-10 rounded-xl bg-white pr-10 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                      aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLockedOut || !passwordInput.trim()}
                    className="h-10 rounded-xl bg-brand-600 px-5 text-xs font-semibold text-white hover:bg-brand-700"
                  >
                    <Lock className="mr-1.5 h-3.5 w-3.5" />
                    Desbloquear Modo Editor
                  </Button>
                </div>

                {authError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
                    <span>
                      {authError}{" "}
                      {isLockedOut && `(Tiempo restante: ${lockoutRemainingSec}s)`}
                    </span>
                  </div>
                )}
              </form>
            </div>
          )}

          {isAdminMode && isAuthenticated ? (
            /* ================= ADMIN EDITOR MODE ================= */
            <div className="space-y-6">
              {/* Admin Toolbar */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                      <Settings2 className="h-4 w-4 text-amber-700" />
                      Panel de Edición Autenticado — {currentDoc.tabLabel}
                    </div>
                    <p className="mt-1 text-xs text-amber-800/90">
                      Sesión administrativa verificada. Al cerrar esta ventana, el modo de edición
                      se bloqueará automáticamente por seguridad.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangeKeyPanel((prev) => !prev);
                        setKeyChangeError(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-brand-500/30 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-500/5"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-teal-600" />
                      Cambiar clave Admin
                    </button>

                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100/60"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Exportar JSON
                    </button>

                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100/60">
                      <Upload className="h-3.5 w-3.5" />
                      Importar JSON
                      <input
                        type="file"
                        accept="application/json"
                        onChange={handleImportJson}
                        className="sr-only"
                      />
                    </label>

                    {!confirmReset ? (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restaurar por defecto
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-2.5 py-1">
                        <span className="text-[11px] font-semibold text-red-800">
                          ¿Restaurar textos originales?
                        </span>
                        <button
                          type="button"
                          onClick={handleRestoreDefaults}
                          className="rounded-lg bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-red-700"
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmReset(false)}
                          className="rounded-lg bg-white px-2 py-0.5 text-[11px] font-semibold text-ink-soft"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Admin Key Sub-panel */}
                {showChangeKeyPanel && (
                  <form
                    onSubmit={handleUpdateAdminKey}
                    className="rounded-xl border border-amber-300/80 bg-white p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">
                        Actualizar Clave de Acceso de Administrador
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowChangeKeyPanel(false)}
                        className="text-[11px] font-semibold text-ink-muted hover:text-ink"
                      >
                        Cerrar
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-ink-soft">
                          Clave actual
                        </Label>
                        <Input
                          type="password"
                          value={currentKeyInput}
                          onChange={(e) => setCurrentKeyInput(e.target.value)}
                          placeholder="Clave vigente"
                          className="h-8 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-ink-soft">
                          Nueva clave (mín. 6 caracteres)
                        </Label>
                        <Input
                          type="password"
                          value={newKeyInput}
                          onChange={(e) => setNewKeyInput(e.target.value)}
                          placeholder="Nueva clave segura"
                          className="h-8 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-ink-soft">
                          Confirmar nueva clave
                        </Label>
                        <Input
                          type="password"
                          value={confirmKeyInput}
                          onChange={(e) => setConfirmKeyInput(e.target.value)}
                          placeholder="Repite la nueva clave"
                          className="h-8 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    {keyChangeError && (
                      <p className="text-xs font-medium text-red-600">{keyChangeError}</p>
                    )}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        size="sm"
                        className="h-8 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700"
                      >
                        Guardar nueva clave
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Global Entity Metadata Editor */}
              <div className="rounded-2xl border border-surface-line bg-surface-mist p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                  <Building2 className="h-4 w-4 text-teal-600" />
                  1. Datos Institucionales de la Entidad Titular (Comunes a las 3 pestañas)
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Nombre de la Entidad / Titular
                    </Label>
                    <Input
                      value={legalState.metadata.entityName}
                      onChange={(e) => handleMetadataChange("entityName", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Código REEUP / NIT / Registro Legal
                    </Label>
                    <Input
                      value={legalState.metadata.nitReeup}
                      onChange={(e) => handleMetadataChange("nitReeup", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Domicilio Legal en Cuba
                    </Label>
                    <Input
                      value={legalState.metadata.address}
                      onChange={(e) => handleMetadataChange("address", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Correo Oficial de Privacidad y Legal
                    </Label>
                    <Input
                      value={legalState.metadata.contactEmail}
                      onChange={(e) => handleMetadataChange("contactEmail", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Área Responsable de Protección de Datos
                    </Label>
                    <Input
                      value={legalState.metadata.dpoRole}
                      onChange={(e) => handleMetadataChange("dpoRole", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Fecha de Última Actualización
                    </Label>
                    <Input
                      value={legalState.metadata.lastUpdated}
                      onChange={(e) => handleMetadataChange("lastUpdated", e.target.value)}
                      className="h-9 rounded-xl bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Active Tab Header Editor */}
              <div className="rounded-2xl border border-surface-line bg-white p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                  <FileText className="h-4 w-4 text-teal-600" />
                  2. Encabezado y Normativas de la pestaña «{currentDoc.tabLabel}»
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Título principal de esta pestaña
                    </Label>
                    <Input
                      value={currentDoc.title}
                      onChange={(e) => handleDocHeaderChange("title", e.target.value)}
                      className="h-9 rounded-xl bg-surface-mist text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-ink-soft">
                      Etiquetas de Leyes Cubanas (separadas por coma)
                    </Label>
                    <Input
                      value={currentDoc.badges.join(", ")}
                      onChange={(e) => handleBadgesChange(e.target.value)}
                      className="h-9 rounded-xl bg-surface-mist text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-ink-soft">
                    Subtítulo / Resumen normativo
                  </Label>
                  <Textarea
                    rows={2}
                    value={currentDoc.subtitle}
                    onChange={(e) => handleDocHeaderChange("subtitle", e.target.value)}
                    className="rounded-xl bg-surface-mist text-xs"
                  />
                </div>
              </div>

              {/* Clauses / Sections Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    3. Cláusulas y Artículos ({currentDoc.sections.length})
                  </h3>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddSection}
                    className="h-8 rounded-xl bg-brand-600 text-xs font-semibold text-white hover:bg-brand-700"
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Añadir cláusula a «{currentDoc.tabLabel}»
                  </Button>
                </div>

                {currentDoc.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-surface-line bg-surface-mist/60 p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                        Cláusula #{idx + 1}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSection(idx, "up")}
                          title="Subir cláusula"
                          className="grid h-7 w-7 place-items-center rounded-lg border border-surface-line bg-white text-ink-soft hover:bg-surface-mist disabled:opacity-40"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentDoc.sections.length - 1}
                          onClick={() => handleMoveSection(idx, "down")}
                          title="Bajar cláusula"
                          className="grid h-7 w-7 place-items-center rounded-lg border border-surface-line bg-white text-ink-soft hover:bg-surface-mist disabled:opacity-40"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(section.id)}
                          title="Eliminar cláusula"
                          className="grid h-7 w-7 place-items-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-ink-soft">
                          Título del apartado
                        </Label>
                        <Input
                          value={section.title}
                          onChange={(e) =>
                            handleSectionChange(section.id, "title", e.target.value)
                          }
                          className="h-9 rounded-xl bg-white text-xs font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-ink-soft">
                          Base legal cubana de referencia
                        </Label>
                        <Input
                          value={section.legalRef ?? ""}
                          onChange={(e) =>
                            handleSectionChange(section.id, "legalRef", e.target.value)
                          }
                          placeholder="Ej. Ley No. 149/2022 Art. 15"
                          className="h-9 rounded-xl bg-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold text-ink-soft">
                        Contenido de la cláusula (admite saltos de línea y viñetas con •)
                      </Label>
                      <Textarea
                        rows={5}
                        value={section.content}
                        onChange={(e) =>
                          handleSectionChange(section.id, "content", e.target.value)
                        }
                        className="rounded-xl bg-white text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ================= READER / VISITOR VIEW ================= */
            <div className="space-y-6">
              {/* Legal Reference Badges + Entity Metadata Card */}
              <div className="rounded-2xl border border-surface-line bg-surface-mist p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {currentDoc.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-brand-700"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 border-t border-surface-line pt-4 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      Titular / Plataforma
                    </span>
                    <span className="font-semibold text-ink">
                      {legalState.metadata.entityName}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      {legalState.metadata.nitReeup}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      Domicilio y Jurisdicción
                    </span>
                    <span className="font-semibold text-ink">{legalState.metadata.address}</span>
                    <span className="block text-[11px] text-ink-muted">
                      {legalState.metadata.dpoRole}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      Contacto Oficial y Vigencia
                    </span>
                    <a
                      href={`mailto:${legalState.metadata.contactEmail}`}
                      className="font-semibold text-brand-600 hover:underline"
                    >
                      {legalState.metadata.contactEmail}
                    </a>
                    <span className="block text-[11px] text-ink-muted">
                      Actualizado: {legalState.metadata.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clauses List */}
              <div className="space-y-4">
                {currentDoc.sections.map((section) => (
                  <article
                    key={section.id}
                    className="rounded-2xl border border-surface-line bg-white p-5 shadow-2xs transition-colors hover:border-teal-500/30"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-ink font-display">
                        {section.title}
                      </h3>
                      {section.legalRef && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-surface-mist px-2.5 py-0.5 text-[11px] font-medium text-brand-600">
                          <Lock className="h-3 w-3 text-teal-600" />
                          {section.legalRef}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-ink-soft whitespace-pre-line">
                      {section.content}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col gap-3 border-t border-surface-line bg-surface-mist px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 shrink-0">
          <div className="text-xs text-ink-muted">
            {isAdminMode && isAuthenticated ? (
              <span className="font-medium text-brand-700">
                Sesión de Administrador verificada • Los cambios quedan guardados automáticamente.
              </span>
            ) : (
              <span>
                Adecuado a la Ley No. 116/2013 (Código de Trabajo) y Ley No. 149/2022 (Protección
                de Datos Personales).
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleLockAdminSession}
                className="h-9 rounded-xl border-red-200 bg-white text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5 text-red-600" />
                Bloquear y salir del editor
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={handleRequestAdminToggle}
                className="h-9 rounded-xl border-surface-line bg-white text-xs font-semibold text-ink-soft hover:bg-surface-mist"
              >
                <Lock className="mr-1.5 h-3.5 w-3.5 text-teal-600" />
                Acceso Admin
              </Button>
            )}
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-9 rounded-xl bg-brand-500 px-5 text-xs font-semibold text-white hover:bg-brand-600"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
