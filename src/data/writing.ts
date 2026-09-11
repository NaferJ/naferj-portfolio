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

export const postsEn: Post[] = [
  {
    slug: "why-my-portfolio-looks-simple",
    title: "Why my portfolio looks simple",
    description:
      "Not because I can't do more. Because it's honest about what I actually build, and it lets the work speak instead of the decoration.",
    date: "2026-09-10",
    category: "Notes",
    body: [
      {
        type: "paragraph",
        text: "Honestly — it depends. There are portfolios out there with 3D components, custom animations, a lot of visual craft. I'm not against that. I just build differently.",
      },
      { type: "heading", id: "where-my-weight-actually-is", text: "Where my weight actually is" },
      {
        type: "paragraph",
        text: "I'm more comfortable building logic and complex structure than chasing a cool frontend design. Most of what I build is structure pages, business frontends — the kind of work where the backend carries more weight than the visuals ever will. So when it came time to build my own portfolio, it made sense to build it the way I actually build things, not the way a portfolio is 'supposed' to look.",
      },
      {
        type: "quote",
        text: "I wanted people to know who built it, and what I actually do. Not something forced, and not something I paid someone else to make look impressive.",
      },
      { type: "heading", id: "building-it-yourself-still-matters", text: "Building it yourself still matters" },
      {
        type: "paragraph",
        text: "What matters more to me than a flashy result is that it's mine. Even now, when using agents and AI to build is basically normal — and it's only going to get more normal — the thing that still separates people isn’t who has access to the tools. It’s who can actually recognize when the AI got something wrong, and fix it by hand.",
      },
      {
        type: "paragraph",
        text: "That's the skill I think matters most going forward: not prompting well, but debugging well. Knowing when the output is wrong, and knowing enough to catch it.",
      },
      { type: "heading", id: "so-simple", text: "So, simple." },
      {
        type: "paragraph",
        text: "Not because I can't do more. Because it's honest about what I actually build, and it lets the work speak instead of the decoration.",
      },
    ],
  },
];

export const postsEs: Post[] = [
  {
    slug: "why-my-portfolio-looks-simple",
    title: "Por qué mi portafolio se ve sencillo",
    description:
      "No porque no pueda hacer más. Es porque es honesto sobre lo que realmente construyo, y deja que el trabajo hable en lugar de la decoración.",
    date: "2026-09-10",
    category: "Notas",
    body: [
      {
        type: "paragraph",
        text: "Honestamente — depende. Hay portafolios con componentes 3D, animaciones personalizadas y mucho detalle visual. No estoy en contra de eso. Simplemente construyo de otra manera.",
      },
      {
        type: "heading",
        id: "where-my-weight-actually-is",
        text: "Dónde está realmente mi peso",
      },
      {
        type: "paragraph",
        text: "Me siento más cómodo construyendo lógica y estructuras complejas que persiguiendo un diseño front-end llamativo. La mayor parte de lo que construyo son páginas de estructura, front-ends de negocio — el tipo de trabajo donde el backend pesa más que la parte visual. Así que cuando llegó el momento de construir mi propio portafolio, tuvo sentido hacerlo de la forma en que realmente construyo, no de la forma en que un portafolio 'debería' verse.",
      },
      {
        type: "quote",
        text: "Quería que la gente supiera quién lo construyó y qué es lo que realmente hago. Ni algo forzado, ni algo por lo que le pagué a otra persona para que se viera impresionante.",
      },
      {
        type: "heading",
        id: "building-it-yourself-still-matters",
        text: "Construirlo por uno mismo todavía importa",
      },
      {
        type: "paragraph",
        text: "Lo que más me importa no es un resultado llamativo, sino que sea mío. Incluso ahora, cuando usar agentes e IA para construir es prácticamente normal — y solo se volverá más normal — lo que todavía separa a las personas no es quién tiene acceso a las herramientas. Es quién puede reconocer cuándo la IA se equivocó y corregirlo a mano.",
      },
      {
        type: "paragraph",
        text: "Esa es la habilidad que creo que más importa de aquí en adelante: no dar buenas instrucciones, sino depurar bien. Saber cuándo el resultado está mal y saber lo suficiente para detectarlo.",
      },
      { type: "heading", id: "so-simple", text: "Así de sencillo." },
      {
        type: "paragraph",
        text: "No porque no pueda hacer más. Es porque es honesto sobre lo que realmente construyo, y deja que el trabajo hable en lugar de la decoración.",
      },
    ],
  },
];

export function getPosts(locale?: string): Post[] {
  const source = locale === "es" ? postsEs : postsEn;
  return source.filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, locale?: string): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug);
}

export function readingMinutes(post: Post): number {
  const words = post.body
    .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: string, locale?: string): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
