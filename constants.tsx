
import { Project, Experience, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'luisardito-shop',
    title: 'LUISARDITO SHOP',
    subtitle: 'Plataforma de Rewards para Comunidad de Streaming',
    description: 'Diseñé y desarrollé una plataforma full-stack desde cero para gestionar recompensas en tiempo real. Resolví el desafío de engagement gamificado para una de las comunidades más activas de Kick.com mediante una arquitectura robusta y eficiente.',
    tags: ['React', 'CSS3', 'Node.js', 'Express', 'MySQL', 'OAuth 2.0', 'Kick API'],
    metrics: [
      { label: 'Puntos Canjeados', value: '1,078,487+' },
      { label: 'Usuarios Activos', value: '300+' },
      { label: 'Tiempo de Carga', value: '< 500ms' },
      { label: 'Downtime', value: '0%' }
    ],
    role: 'Full Stack Developer',
    duration: 'Sep 2025 - Dic 2025',
    link: 'https://shop.luisardito.com/landing',
    github: 'https://github.com/naferj'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'DESARROLLADOR WEB',
    company: 'LM Soluciones S.A.S',
    period: 'Octubre 2023 - Octubre 2025',
    location: 'Barranquilla, Colombia (Remoto)',
    achievements: [
      'Desarrollé 15+ módulos CRUD completos en CodeIgniter PHP 7.4.',
      'Gestioné 15+ esquemas MySQL 8 en AWS, optimizando procedimientos almacenados que redujeron errores en 25%.',
      'Implementé pair programming con herramientas IA (Copilot, JetBrains AI), acelerando debugging en un 30-40%.',
      'Coordiné despliegues en entornos dev y producción usando GitLab y metodologías ágiles con Jira.'
    ],
    stack: ['PHP 7.4', 'CodeIgniter', 'JavaScript', 'MySQL', 'GitLab', 'AWS', 'Jira']
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive Design']
  },
  {
    name: 'Backend',
    skills: ['PHP 7.4+', 'Node.js', 'Express', 'CodeIgniter', 'Strapi CMS', 'RESTful APIs']
  },
  {
    name: 'Bases de Datos',
    skills: ['MySQL 8', 'PostgreSQL', 'DB Design', 'Optimization']
  },
  {
    name: 'IA & Herramientas',
    skills: ['VS Code', 'GitHub Copilot', 'JetBrains AI', 'ChatGPT', 'Git', 'Docker', 'Vercel']
  }
];
