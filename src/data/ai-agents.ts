export type AgentItem = {
  name: string;
  href: string;
  description: string;
  status: string;
  sample?: boolean;
};

export const agentItems: AgentItem[] = [
  {
    name: "Agent workflow",
    href: "https://github.com/NaferJ",
    description:
      "Describe how you use AI agents in your day-to-day work. This is a sample entry showing the pattern: a linked title, a short description, and a status label.",
    status: "Building",
    sample: true,
  },
  {
    name: "Code review agent",
    href: "https://github.com/NaferJ",
    description:
      "Another sample entry. Replace this with a real AI tool or agent project.",
    status: "Live",
    sample: true,
  },
  {
    name: "CI/CD with agents",
    href: "https://github.com/NaferJ",
    description:
      "A third sample. The status label on the right can be anything: Building, Live, Exploring, or whatever fits the current state of the work.",
    status: "Exploring",
    sample: true,
  },
];
