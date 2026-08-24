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
    id: 'anibal',
    title: 'proj.anibal.title',
    shortDescription: 'proj.anibal.short',
    longDescription: 'proj.anibal.long',
    technologies: [
      'HTML', 'CSS', 'JavaScript', 'Google Ads', 'WhatsApp API'
    ],
    role: 'proj.anibal.role',
    screenshots: [
          '/projects/anibal.png'
        ],
    liveUrl: 'https://anibalreydecorazones.com',
    repoUrl: '#',
    bentoClass: 'md:col-span-1',
    featured: true
  },
  {
    id: 'nextaudit',
    title: 'proj.nextaudit.title',
    shortDescription: 'proj.nextaudit.short',
    longDescription: 'proj.nextaudit.long',
    technologies: [
      'Angular', 'RxJS', 'Signals',
      'NestJS', 'Node.js', 'PostgreSQL',
      'n8n', 'Flowise', 'REST API',
      'Docker', 'CI/CD'
    ],
    role: 'proj.nextaudit.role',
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
    title: 'proj.jornada.title',
    shortDescription: 'proj.jornada.short',
    longDescription: 'proj.jornada.long',
    technologies: [
      'WordPress', 'PHP', 'MySQL', 'CSS', 'HTML'
    ],
    role: 'proj.jornada.role',
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
    title: 'proj.casa.title',
    shortDescription: 'proj.casa.short',
    longDescription: 'proj.casa.long',
    technologies: [
      'Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'NgRx/Signals',
      'PHP', 'MySQL', 'REST API', 'WhatsApp Business API', 'EmailJS', 'Chart.js'
    ],
    role: 'proj.casa.role',
    screenshots: [
          '/projects/casa-jean.png'
        ],
    liveUrl: 'https://lacasadeljean.free.nf/?i=1',
    repoUrl: '#',
    bentoClass: 'md:col-span-1'
  },
  {
    id: 'google-ads-web',
    title: 'proj.google.title',
    shortDescription: 'proj.google.short',
    longDescription: 'proj.google.long',
    technologies: [
      'Google Ads (Search)', 'Landing Pages', 'Google Analytics 4',
      'Copywriting', 'CRO', 'A/B Testing'
    ],
    role: 'proj.google.role',
    screenshots: [
          '/projects/google-ads-web.png'
        ],
    liveUrl: '#',
    repoUrl: '#',
    bentoClass: 'md:col-span-1'
  }
];