
import { Project, Experience, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'luisardito-shop',
    title: 'LUISARDITO SHOP',
    subtitle: 'Rewards Platform for a Streaming Community',
    description: 'I designed and built a full-stack platform from scratch to manage real-time rewards. Solved gamified engagement challenges for one of Kick.com\'s most active communities using a robust, high-performance architecture.',
    tags: ['React', 'CSS3', 'Node.js', 'Express', 'MySQL', 'OAuth 2.0', 'Kick API'],
    metrics: [
      { label: 'Points Redeemed', value: '1,078,487+' },
      { label: 'Active Users', value: '300+' },
      { label: 'Load Time', value: '< 500ms' },
      { label: 'Downtime', value: '0%' }
    ],
    role: 'Full Stack Developer',
    duration: 'Sep 2025 - Dec 2025',
    link: 'https://shop.luisardito.com/landing',
    github: 'https://github.com/naferj'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Web Developer',
    company: 'LM Soluciones S.A.S',
    period: 'Oct 2023 - Oct 2025',
    location: 'Barranquilla, Colombia (Remote)',
    achievements: [
      'Built 15+ full CRUD modules using CodeIgniter (PHP 7.4).',
      'Managed 15+ MySQL 8 schemas on AWS, optimizing stored procedures and reducing errors by 25%.',
      'Introduced pair programming with AI tools (Copilot, JetBrains AI), accelerating debugging by ~30-40%.',
      'Coordinated deployments across dev and production environments using GitLab and agile practices with Jira.'
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
    name: 'Databases',
    skills: ['MySQL 8', 'PostgreSQL', 'DB Design', 'Optimization']
  },
  {
    name: 'AI & Tools',
    skills: ['VS Code', 'GitHub Copilot', 'JetBrains AI', 'ChatGPT', 'Git', 'Docker', 'Vercel']
  }
];
