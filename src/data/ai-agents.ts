export type AgentItem = {
  name: string;
  href?: string;
  description: string;
  status: string;
  sample?: boolean;
};

export const agentItemsEn: AgentItem[] = [
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

export const agentItemsEs: AgentItem[] = [
  {
    name: "Devin como agente de desarrollo",
    href: "https://devin.ai",
    description:
      "Devin Desktop es mi IDE, emparejado con distintos modelos según la tarea: GLM-5.2 High, SWE-1.7 Max, GPT-5.6, Claude Sonnet 5.",
    status: "En uso",
  },
  {
    name: "Reglas del repositorio y configuración del agente",
    description:
      "AGENTS.md y las plantillas estandarizan cómo trabajan los agentes entre repositorios: commits, PRs e issues.",
    status: "En construcción",
  },
  {
    name: "Controles de revisión automatizados",
    href: "https://github.com/NaferJ/luisardito-frontend/pull/16",
    description:
      "SonarCloud, GitGuardian, lint y typecheck controlan cada PR antes de fusionarlo.",
    status: "En uso",
  },
];

export const agentItems = agentItemsEn;

export function getAgentItems(locale?: string): AgentItem[] {
  return locale === "es" ? agentItemsEs : agentItemsEn;
}
