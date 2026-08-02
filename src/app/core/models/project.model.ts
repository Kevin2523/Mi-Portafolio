export interface ProjectStats {
  label: string;
  value: string;
  colorClass: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  role: string;
  challenges: string[];
  metrics: ProjectStats[];
  screenshots: string[];
  liveUrl?: string;
  repoUrl?: string;
  isDashboardPreview?: boolean;
  bentoClass?: string;
  stats?: ProjectStats[];
  featured?: boolean;
}

export const KEVIN_PROJECTS: Project[] = [
  {
    id: 'nextaudit',
    title: 'NextAudit AI',
    shortDescription: 'Plataforma SaaS para auditorías inteligentes de seguridad y cumplimiento con IA. Reduce tiempo de auditoría de semanas a horas, generando reportes ejecutivos claros y accionables.',
    longDescription: 'NextAudit AI es una plataforma SaaS completa que automatiza el proceso de auditoría de seguridad y cumplimiento normativo mediante inteligencia artificial. Permite a gerentes y directivos obtener reportes ejecutivos claros, accionables y libres de jerga técnica, reduciendo el tiempo de auditoría de semanas a horas.\n\nIntegra herramientas de escaneo de seguridad (SAST, DAST, SCA) en un pipeline unificado, genera reportes con IA y implementa autenticación robusta con 2FA y control de acceso basado en roles.\n\nStack: Angular 21, TypeScript, Tailwind CSS, NestJS, Node.js, PostgreSQL, Prisma ORM, SonarQube, Trivy, OWASP ZAP, JWT, RBAC, Docker, GitHub Actions.',
    technologies: [
      'Angular 21', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Signals',
      'NestJS', 'Node.js', 'PostgreSQL', 'Prisma ORM',
      'SonarQube', 'Trivy', 'OWASP ZAP',
      'JWT', 'RBAC', 'REST API',
      'Docker', 'GitHub Actions', 'CI/CD'
    ],
    role: 'Full-Stack Developer & Security Architect',
    challenges: [
      'Integrar múltiples herramientas de seguridad (SAST, DAST, SCA) en un pipeline unificado',
      'Diseñar flujos de IA que generen reportes ejecutivos precisos y accionables',
      'Implementar control de acceso granular con auditoría inmutable',
      'Optimizar rendimiento para dashboards con miles de vulnerabilidades'
    ],
    metrics: [
      { label: 'Security Score', value: 'A+', colorClass: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Compliance Rate', value: '98%', colorClass: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Risks Detected', value: '3 críticos', colorClass: 'text-yellow-600 dark:text-yellow-400' },
      { label: 'Audit Time Reduction', value: '94%', colorClass: 'text-purple-600 dark:text-purple-400' }
    ],
    screenshots: [
          '/projects/nextaudit.png'
        ],
    liveUrl: '#',
    repoUrl: '#',
    isDashboardPreview: true,
    bentoClass: 'md:col-span-1',
    stats: [
      { label: 'Security Score', value: 'A+', colorClass: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Compliance Rate', value: '98%', colorClass: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Risks Detected', value: '3', colorClass: 'text-yellow-600 dark:text-yellow-400' }
    ],
    featured: true
  },
  {
    id: 'jornada-industrial-cocle',
    title: 'Jornada Industrial Coclé',
    shortDescription: 'Sitio web institucional oficial para la Jornada Industrial de UTP Coclé. WordPress personalizado con bloques modulares, WCAG 2.1 AA, Lighthouse 98+. Agenda dinámica, streaming en vivo, registro de participantes.',
    longDescription: 'Desarrollo completo del sitio web oficial para la Jornada Industrial de la Universidad Tecnológica de Panamá, sede Coclé. Plataforma informativa accesible para estudiantes, empresas participantes y público general, con agenda dinámica multi-track, perfiles de ponentes, transmisión en vivo integrada y área de registro de participantes.\n\nTema WordPress personalizado desarrollado desde cero con 27 bloques modulares reutilizables. El diseño prioriza accesibilidad WCAG 2.1 AA (certificado), rendimiento (Lighthouse Performance 98+, Accessibility 100, Best Practices 96, SEO 100) y experiencia móvil fluida.\n\nStack: WordPress, PHP, MySQL, Customizer API, Google Fonts, Material Symbols, bloques modulares personalizados.',
    technologies: [
      'WordPress', 'PHP', 'MySQL', 'CSS', 'HTML',
      'Customizer API', 'Gutenberg',
      'WCAG 2.1 AA', 'Lighthouse 98+', 'Google Fonts', 'Material Symbols'
    ],
    role: 'Lead Developer',
    challenges: [
      'Cumplir estrictos requisitos de accesibilidad WCAG 2.1 AA en institución pública (auditoría certificada)',
      'Gestionar agenda dinámica multi-track con zonas horarias automáticas y conflictos de horario',
      'Integrar streaming en vivo con fallback adaptativo para ancho de banda limitado',
      'Desplegar en infraestructura universitaria con restricciones de seguridad'
    ],
    metrics: [
      { label: 'Lighthouse Performance', value: '98', colorClass: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Accessibility Score', value: '100', colorClass: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Best Practices', value: '96', colorClass: 'text-purple-600 dark:text-purple-400' },
      { label: 'SEO Score', value: '100', colorClass: 'text-cyan-600 dark:text-cyan-400' }
    ],
    screenshots: [
          '/projects/jornada-industrial.png'
        ],
    liveUrl: 'https://jornadaindustrialcocle.utp.ac.pa/',
    repoUrl: '#',
    bentoClass: 'md:col-span-1',
    featured: true
  },
  {
    id: 'casa-jean',
    title: 'La Casa del Jean',
    shortDescription: 'E-commerce completo para retail textil: catálogo 200+ productos, carrito persistente, checkout, panel admin, notificaciones WhatsApp + Email.',
    longDescription: 'Plataforma e-commerce completa para "La Casa del Jean", negocio de retail textil. Incluye catálogo de productos con filtros avanzados (talla, color, categoría, precio), carrito persistente, checkout integrado, panel de administración completo (gestión de inventario, pedidos, clientes, reportes de ventas), y automatización de notificaciones por WhatsApp y email.\n\nIntegración de frontend moderno con backend existente sin reescritura completa, sincronización de stock en tiempo real entre tienda física y online, y manejo de variantes de tallas/colores con reportes de ventas interactivos.\n\nStack: Angular, TypeScript, Tailwind CSS, PHP, MySQL, REST API, RxJS, WhatsApp Business API, EmailJS, Chart.js.',
    technologies: [
      'Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'NgRx/Signals',
      'PHP', 'MySQL', 'REST API', 'WhatsApp Business API', 'EmailJS', 'Chart.js'
    ],
    role: 'Full-Stack Developer',
    challenges: [
      'Integrar frontend moderno con backend existente sin reescritura completa',
      'Sincronización de stock en tiempo real entre tienda física y online',
      'Implementar checkout seguro sin pasarela de pagos certificada',
      'Diseñar UX móvil-first para clientes no técnicos'
    ],
    metrics: [
      { label: 'Products Catalog', value: '200+', colorClass: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Orders/Month', value: '150+', colorClass: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Mobile Traffic', value: '78%', colorClass: 'text-purple-600 dark:text-purple-400' },
      { label: 'Conversion Rate', value: '3.2%', colorClass: 'text-cyan-600 dark:text-cyan-400' }
    ],
    screenshots: [
          '/projects/casa-jean.png'
        ],
    liveUrl: 'https://lacasadeljean.free.nf/?i=1',
    repoUrl: '#',
    bentoClass: 'md:col-span-1'
  },
  {
    id: 'google-ads-web',
    title: 'Publicidad Digital + Páginas Web',
    shortDescription: 'Gestión de campañas de Google Ads para llevar tráfico calificado a páginas web de clientes. Objetivo: que las personas hagan click en el botón de WhatsApp y consulten directamente.',
    longDescription: 'Servicio de publicidad digital enfocado en Google Ads para negocios locales. El flujo es simple y efectivo: campañas de Google Ads (Búsqueda) que llevan tráfico calificado directamente a la página del cliente, donde encontrará un botón de WhatsApp para contactar de inmediato.\n\nCada cliente recibe: configuración de cuenta Google Ads, estrategia de keywords, landing page optimizada para conversión, y reportes mensuales con métricas clave (CTR, CPC, CPA, ROAS).',
    technologies: [
      'Google Ads (Search)', 'Landing Pages', 'Google Analytics 4',
      'Copywriting', 'CRO', 'A/B Testing'
    ],
    role: 'Digital Marketing Specialist',
    challenges: [
      'Generar tráfico de calidad con presupuesto limitado',
      'Optimizar campañas para maximizar clicks en WhatsApp',
      'Combatir fraude de clics y tráfico inválido',
      'Escalar gestión multi-cliente manteniendo resultados'
    ],
    metrics: [
      { label: 'Avg. CTR (Search)', value: '6.8%', colorClass: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Avg. CPA Reduction', value: '35%', colorClass: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Client Retention', value: '92%', colorClass: 'text-purple-600 dark:text-purple-400' }
    ],
    screenshots: [
          '/projects/google-ads-web.png'
        ],
    liveUrl: '#',
    repoUrl: '#',
    bentoClass: 'md:col-span-1'
  }
];