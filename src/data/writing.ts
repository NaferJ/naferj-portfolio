export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  sample?: boolean;
  draft?: boolean;
  body: ArticleBlock[];
};

export type Publication = {
  title: string;
  publisher: string;
  year: string;
  href: string;
};

export const publications: Publication[] = [];

export const posts: Post[] = [
  {
    slug: "build-a-smaller-first-version",
    title: "Build a smaller first version",
    description:
      "A working feature teaches you more than a perfect plan. Some notes on making room for the first useful version.",
    date: "2026-09-01",
    category: "Building",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Every project starts with more possibilities than time. The tempting response is to design a system that can accommodate all of them. A more useful response is to choose one thing the system should do well, and make that thing real.",
      },
      { type: "heading", id: "one-clear-job", text: "Give it one clear job" },
      {
        type: "paragraph",
        text: "Before choosing a stack, write down the smallest outcome that would help someone. Not a list of features. An outcome. A person can find a piece of information, complete a task, or understand a decision without needing you to explain it.",
      },
      {
        type: "quote",
        text: "A smaller scope is not a lower standard. It is a way to give the important parts enough attention.",
      },
      { type: "heading", id: "make-it-complete", text: "Small, but complete" },
      {
        type: "paragraph",
        text: "Small does not mean unfinished. A useful first version still handles the empty state, explains an error, and works on a phone. Cut whole features before cutting the care that makes the remaining features usable.",
      },
      {
        type: "list",
        items: [
          "Make the primary action obvious.",
          "Handle the case where there is no data yet.",
          "Use the keyboard to walk through the entire flow.",
          "Keep the setup simple enough to explain in a few sentences.",
        ],
      },
      { type: "heading", id: "leave-room-to-learn", text: "Leave room to learn" },
      {
        type: "paragraph",
        text: "The first release is a question, not a verdict. Put it in front of someone, watch where they hesitate, and use that information to decide what comes next. The best next feature is often smaller than the one you imagined.",
      },
    ],
  },
  {
    slug: "documentation-is-part-of-the-interface",
    title: "Documentation is part of the interface",
    description:
      "The README, the error message, and the onboarding guide are all places where people meet your software.",
    date: "2026-08-18",
    category: "Engineering",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "A product does not end at its buttons. People also interact with installation instructions, API responses, and the explanation someone left next to an unfamiliar decision. Those surfaces deserve the same care as the screen.",
      },
      { type: "heading", id: "start-with-the-reader", text: "Start with the reader" },
      {
        type: "paragraph",
        text: "A good guide begins where the reader is, not where the author finished. State the prerequisites, show a minimal working path, and make it clear what success looks like. Save the architectural tour for after the first successful run.",
      },
      {
        type: "code",
        language: "shell",
        text: "npm ci\nnpm run dev",
      },
      {
        type: "paragraph",
        text: "Two commands are useful only when the surrounding text explains where to run them, which environment they require, and what should happen next. Commands without context are not an onboarding experience.",
      },
      { type: "heading", id: "explain-decisions", text: "Explain the decisions" },
      {
        type: "list",
        items: [
          "Describe why a constraint exists, not just that it exists.",
          "Keep examples small enough to test.",
          "Put instructions close to the code or workflow they describe.",
          "Remove obsolete steps when the implementation changes.",
        ],
      },
      { type: "heading", id: "maintain-the-interface", text: "Maintain the interface" },
      {
        type: "paragraph",
        text: "Documentation work is product work. When an instruction fails, the reader experiences a bug. Reviewing the guide alongside a change is a small habit that prevents a surprising amount of friction.",
      },
    ],
  },
  {
    slug: "a-quieter-corner-of-the-internet",
    title: "A quieter corner of the internet",
    description:
      "On keeping a personal website small, useful, and a little more personal than a feed.",
    date: "2026-08-02",
    category: "Notes",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "A personal website can be an archive rather than a performance. It can hold the projects that mattered, ideas that are still taking shape, and enough context for someone to understand the person behind the work.",
      },
      { type: "heading", id: "make-space", text: "Make space for the work" },
      {
        type: "paragraph",
        text: "Good typography, a clear structure, and a few thoughtful details do a lot. The layout should make reading easier rather than compete for attention. A page does not need to move constantly to feel alive.",
      },
      {
        type: "quote",
        text: "The internet is big enough for a website that is simply a place to keep your work.",
      },
      { type: "heading", id: "keep-it-maintainable", text: "Keep it maintainable" },
      {
        type: "paragraph",
        text: "Choose a publishing process you will actually use. A simple file that you update regularly is more valuable than an elaborate system you avoid. Add tools when they solve a real problem, not because every website seems to have them.",
      },
      { type: "heading", id: "let-it-grow", text: "Let it grow slowly" },
      {
        type: "paragraph",
        text: "Start with a short introduction and something worth sharing. Add a note when you learn something useful. Over time, the collection becomes a record of how your thinking and your craft have changed.",
      },
    ],
  },
];

export function getPosts(): Post[] {
  return posts.filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function readingMinutes(post: Post): number {
  const words = post.body
    .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
