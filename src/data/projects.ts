export type Project = {
  slug: string;
  name: string;
  description: string;
  type: string;
  year: string;
  stack: string[];
  sample?: boolean;
  href?: string;
  sections: { title: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    name: "Personal portfolio",
    description: "A home for my work, writing, and the things I learn along the way.",
    type: "web",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    sections: [
      {
        title: "A place for the work",
        text: "This website brings projects, experience, and writing together in a quiet, readable space. The two-rail layout keeps recent writing close by while leaving the main column focused on the page you are reading.",
      },
      {
        title: "Built to stay simple",
        text: "Pages render on the server, while small interactive components handle navigation state and filtering. Profile information, projects, and posts live in typed data modules, separate from the presentation.",
      },
      {
        title: "Room to grow",
        text: "The writing section supports individual articles and an optional list of external publications. Content can move to a CMS later without redesigning the reading experience.",
      },
    ],
  },
  {
    slug: "service-health-monitor",
    name: "Service health monitor",
    description: "An example case study for a small tool that makes service health easier to understand.",
    type: "web",
    year: "Sample",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    sample: true,
    sections: [
      { title: "The problem", text: "Use this space to explain a real problem you worked on. Who experienced it, what was difficult about the existing approach, and why was it worth solving? This is a sample case study, not a shipped product." },
      { title: "The approach", text: "Describe the important technical decisions and your role in making them. A clear explanation of one trade-off is more useful than a long list of technologies. Replace the sample stack with the tools you actually used." },
      { title: "The outcome", text: "Share what changed after the work shipped. Use verifiable results, a specific lesson, or a limitation you would address next. Add a live or source URL to the project data when you have one to share." },
    ],
  },
  {
    slug: "release-notes-cli",
    name: "Release notes CLI",
    description: "An example entry for a developer tool that turns release preparation into a repeatable workflow.",
    type: "CLI",
    year: "Sample",
    stack: ["Node.js", "TypeScript"],
    sample: true,
    sections: [
      { title: "The starting point", text: "Introduce the repetitive task or developer workflow behind your tool. This sample is here to demonstrate how a smaller project can have a useful case study without invented users or performance numbers." },
      { title: "Making it useful", text: "Walk through the main interaction, the input the tool expects, and the output it produces. Describe how you handled invalid input or an empty result, and what you intentionally left out of the first version." },
      { title: "What I learned", text: "Close with something specific you learned while building the project. Replace this sample with your own work before making the site indexable." },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
