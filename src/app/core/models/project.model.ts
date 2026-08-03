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
  screenshots: string[];
  liveUrl?: string;
  repoUrl?: string;
  bentoClass?: string;
  featured?: boolean;
}

export const KEVIN_PROJECTS: Project[] = [
  {
    id: 'nextaudit',
    title: 'NextAudit AI',
    shortDescription: 'Plataforma SaaS para auditorías inteligentes de seguridad y cumplimiento con IA. Reduce tiempo de auditoría de semanas a horas, generando reportes ejecutivos claros y accionables.',
    longDescription: 'NextAudit AI es una plataforma SaaS completa que automatiza el proceso de auditoría de seguridad y cumplimiento normativo mediante inteligencia artificial. Permite a gerentes y directivos obtener reportes ejecutivos claros, accionables y libres de jerga técnica, reduciendo el tiempo de auditoría de semanas a horas.\n\nIntegra herramientas de escaneo de seguridad (SAST, DAST, SCA) en un pipeline unificado, genera reportes con IA y implementa autenticación robusta con 2FA y control de acceso basado en roles.\n\nStack: Angular 21, TypeScript, Tailwind CSS, NestJS, Node.js, PostgreSQL, Prisma ORM, SonarQube, Trivy, OWASP ZAP, JWT, RBAC, Docker, GitHub Actions.',
    technologies: [
      'Angular', 'RxJS', 'Signals',
      'NestJS', 'Node.js', 'PostgreSQL',
      'n8n', 'Flowise', 'REST API',
      'Docker', 'CI/CD'
    ],
    role: 'Full-Stack Developer & Security Architect',
    screenshots: [
          '/projects/nextaudit.png'
        ],
    liveUrl: '#',
    repoUrl: '#',
    bentoClass: 'md:col-span-1',
    featured: true
  },
  {
    id: 'jornada-industrial-cocle',
    title: 'Jornada Industrial Coclé',
    shortDescription: 'Sitio web institucional oficial para la Jornada Industrial de UTP Coclé. WordPress personalizado con bloques modulares, WCAG 2.1 AA, Lighthouse 98+. Agenda dinámica, streaming en vivo, registro de participantes.',
    longDescription: 'Desarrollo completo del sitio web oficial para la Jornada Industrial de la Universidad Tecnológica de Panamá, sede Coclé. Plataforma informativa accesible para estudiantes, empresas participantes y público general, con agenda dinámica multi-track, perfiles de ponentes, transmisión en vivo integrada y área de registro de participantes.\n\nTema WordPress personalizado desarrollado desde cero con 27 bloques modulares reutilizables. El diseño prioriza accesibilidad WCAG 2.1 AA (certificado), rendimiento (Lighthouse Performance 98+, Accessibility 100, Best Practices 96, SEO 100) y experiencia móvil fluida.\n\nStack: WordPress, PHP, MySQL, Customizer API, Google Fonts, Material Symbols, bloques modulares personalizados.',
    technologies: [
      'WordPress', 'PHP', 'MySQL', 'CSS', 'HTML'
    ],
    role: 'Lead Developer',
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
    screenshots: [
          '/projects/google-ads-web.png'
        ],
    liveUrl: '#',
    repoUrl: '#',
    bentoClass: 'md:col-span-1'
  }
];