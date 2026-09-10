export type AgentItem = {
  name: string;
  href?: string;
  description: string;
  status: string;
  sample?: boolean;
};

export const agentItems: AgentItem[] = [
  {
    name: "Devin as dev agent",
    href: "https://devin.ai",
    description:
      "Devin Desktop is my IDE, paired with different models depending on the task — GLM-5.2 High, SWE-1.7 Max, GPT-5.6, Claude Sonnet 5.",
    status: "Live",
  },
  {
    name: "Repo rules & agent config",
    description:
      "AGENTS.md and templates standardize how agents work across repos — commits, PRs, issues.",
    status: "Building",
  },
  {
    name: "Automated review gates",
    href: "https://github.com/NaferJ/luisardito-frontend/pull/16",
    description:
      "SonarCloud, GitGuardian, lint, and typecheck gate every PR before merge.",
    status: "Live",
  },
];
