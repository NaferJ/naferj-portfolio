
import React, { useEffect, useState } from 'react';
import CornerMarker from './components/CornerMarker';
import SlashDivider from './components/SlashDivider';
import { PROJECTS, EXPERIENCES, SKILLS } from './constants';

const App: React.FC = () => {
  const screenshots = ['/screenshots/captura1.png', '/screenshots/captura2.png', '/screenshots/captura3.png'];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (paused ? c : (c + 1) % screenshots.length)), 15000);
    return () => clearInterval(t);
  }, [paused, screenshots.length]);

  // Keyboard shortcuts: P => Proyectos, G => GitHub, H => Hablemos
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ignore when using modifiers or typing in inputs
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement as HTMLElement | null;
      const tag = active?.tagName || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (active?.isContentEditable)) return;

      const key = (e.key || '').toLowerCase();
      if (key === 'p') {
        const el = document.querySelector('a[href="#proyectos"]') as HTMLAnchorElement | null;
        if (el) { el.click(); e.preventDefault(); }
      } else if (key === 'g') {
        const el = document.querySelector('a[href*="github.com/naferj"]') as HTMLAnchorElement | null;
        if (el) { el.click(); e.preventDefault(); }
      } else if (key === 'h') {
        const el = document.querySelector('a[href^="mailto:"]') as HTMLAnchorElement | null;
        if (el) { el.click(); e.preventDefault(); }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-zed-bg font-sans selection:bg-zed-accent selection:text-white">
      
      {/* Main Grid Sidebar Borders */}
      <div className="fixed inset-y-0 left-0 w-3 border-r border-zed-border/50 bg-zed-bg/50 md:w-8 lg:w-12 z-30" />
      <div className="fixed inset-y-0 right-0 w-3 border-l border-zed-border/50 bg-zed-bg/50 md:w-8 lg:w-12 z-30" />

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 h-[57px] border-b border-zed-border bg-zed-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <div className="flex size-7 items-center justify-center rounded-sm border border-blue-500/20 bg-zed-card font-mono text-xs font-bold text-zed-accent group-hover:scale-105 transition-transform overflow-hidden">
                <img src="/profile/avatar.png" alt="NaferJ" className="w-full h-full object-cover" />
              </div>
              <span className="font-lora text-lg font-medium tracking-tight text-white">NaferJ.dev</span>
            </a>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zed-muted md:flex">
            <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
            <a href="#skills" className="hover:text-white transition-colors">Stack</a>
            <a href="#experiencia" className="hover:text-white transition-colors">Exp</a>
            
            <div className="h-4 w-px bg-zed-border" />
            
            <div className="flex items-center gap-4 border-r border-zed-border pr-6">
              <a href="https://github.com/naferj" target="_blank" className="hover:text-white transition-colors" title="GitHub">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/naferj" target="_blank" className="hover:text-white transition-colors" title="LinkedIn">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://x.com/NaferJ1" target="_blank" className="hover:text-white transition-colors" title="X (Twitter)">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
              </a>
            </div>

            <a href="mailto:naferjml@gmail.com" className="group flex items-center gap-2 text-white hover:text-zed-accent transition-colors">
              Hablemos
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] opacity-50 font-bold tracking-tighter">H</kbd>
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] border-x border-zed-border/50 relative">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-24 pb-32 sm:px-6 md:pt-32">
          <div className="absolute inset-0 grid-pattern mask-bottom opacity-30 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="animate-fade-in space-y-6">
              <h1 className="font-lora text-5xl font-normal leading-[1.1] text-white sm:text-7xl md:text-8xl tracking-tight">
                Love your code <br />
                <span className="text-zed-accent italic">again</span>
              </h1>
              <p className="mx-auto max-w-xl text-balance text-lg text-zed-muted sm:text-xl">
                <a href="https://linkedin.com/in/naferj" target="_blank" className="text-zed-accent underline decoration-zed-accent/40 underline-offset-2 hover:decoration-zed-accent transition-all font-semibold">NaferJ</a> es un desarrollador Full Stack especializado en e-commerce e integraciones API de alto rendimiento.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-3 pt-8 sm:flex-row">
                <a href="#proyectos" className="group flex items-center gap-2 rounded-sm bg-zed-accent px-6 py-2.5 text-sm font-medium text-white shadow-[0_2px_0_0_rgba(255,255,255,0.1)_inset] hover:bg-blue-600 transition-all">
                  Ver Proyectos
                  <kbd className="hidden rounded bg-white/20 px-1.5 py-0.5 text-[10px] sm:inline-block font-bold">P</kbd>
                </a>
                <a href="https://github.com/naferj" target="_blank" className="group flex items-center gap-2 rounded-sm border border-zed-border bg-zed-card px-6 py-2.5 text-sm font-medium text-white hover:border-zed-muted transition-all">
                  GitHub
                  <kbd className="hidden rounded bg-white/5 px-1.5 py-0.5 text-[10px] sm:inline-block text-zed-muted font-bold tracking-tighter">G</kbd>
                </a>
              </div>
            </div>
            
            <div className="mt-20 flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.25em] text-zed-muted/60">
              <span>Barranquilla, CO</span>
              <span className="text-zed-accent/40">•</span>
              <span>2+ Años Experiencia</span>
              <span className="text-zed-accent/40">•</span>
              <span>Full Stack</span>
            </div>
          </div>
        </section>

        <SlashDivider />

        {/* FEATURED PROJECT */}
        <section id="proyectos" className="relative p-6 py-24 md:p-12 md:py-32 scroll-mt-[57px]">
          <div className="absolute inset-0 grid-pattern mask-vignette opacity-10 pointer-events-none" />
          
          <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-zed-accent uppercase tracking-widest">
                  <span className="size-1.5 rounded-full bg-zed-accent animate-pulse" />
                  Proyecto Destacado
                </div>
                <h2 className="font-lora text-4xl font-medium text-white md:text-5xl tracking-tight">Luisardito Shop</h2>
                <p className="text-lg leading-relaxed text-zed-muted text-pretty italic">
                  "Gana. Canjea. Disfruta."
                </p>
                <p className="text-md leading-relaxed text-zed-muted text-pretty">
                  Plataforma de rewards de alto rendimiento integrada con la API de Kick.com. Construida para manejar miles de transacciones de puntos y rankings en tiempo real.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-y border-zed-border/50 py-8">
                {PROJECTS[0].metrics.map(metric => (
                  <div key={metric.label} className="space-y-1">
                    <p className="font-lora text-2xl font-bold text-white tracking-tighter">{metric.value}</p>
                    <p className="text-[10px] text-zed-muted uppercase tracking-[0.1em] font-bold">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {PROJECTS[0].tags.map(tag => (
                  <span key={tag} className="rounded-sm border border-zed-border bg-zed-card px-2 py-0.5 font-mono text-[9px] text-zed-accent uppercase tracking-tight">{tag}</span>
                ))}
              </div>

              <div className="pt-4">
                <a href={PROJECTS[0].link} target="_blank" className="group inline-flex items-center gap-2 text-sm font-medium text-zed-accent hover:text-white transition-colors">
                  Explorar plataforma en vivo
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="group relative overflow-hidden rounded-sm border border-zed-border bg-zed-card p-2 shadow-2xl transition-all hover:border-zed-accent/40">
                <div className="aspect-video w-full overflow-hidden rounded-xs bg-[#1a1a1a]">
                  <div className="relative w-full h-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    {screenshots.map((s, i) => (
                      <img
                        key={s}
                        src={s}
                        alt={`Luisardito screenshot ${i + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 filter grayscale ${i === current ? 'opacity-100' : 'opacity-0'} mix-blend-luminosity`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-zed-bg/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SlashDivider />

        {/* STACK SECTION */}
        <section id="skills" className="relative border-b border-zed-border/50 scroll-mt-[57px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zed-border/50">
            {SKILLS.map(cat => (
              <div key={cat.name} className="group relative bg-zed-bg p-10 transition-colors hover:bg-zed-card">
                <div className="absolute inset-0 grid-pattern opacity-0 group-hover:opacity-[0.05] transition-opacity pointer-events-none" />
                <h3 className="mb-6 font-mono text-[10px] font-bold text-zed-accent uppercase tracking-[0.25em]">{cat.name}</h3>
                <ul className="space-y-3">
                  {cat.skills.map(s => (
                    <li key={s} className="text-sm text-zed-muted flex items-center gap-3">
                      <span className="size-1 rounded-full bg-zed-accent/40 group-hover:bg-zed-accent transition-colors" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experiencia" className="relative p-6 py-24 md:p-12 md:py-32 scroll-mt-[57px]">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="sticky top-32 space-y-4">
                <span className="font-mono text-[10px] text-zed-muted uppercase tracking-widest font-bold">Trayectoria</span>
                <h2 className="font-lora text-4xl font-medium text-white tracking-tight">Experiencia</h2>
                <p className="text-zed-muted max-w-xs text-sm leading-relaxed">
                  Historial construyendo aplicaciones e-commerce empresariales y sistemas escalables.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-20">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="group relative">
                  <div className="space-y-6">
                    <div className="flex flex-col justify-between items-baseline gap-2 sm:flex-row border-b border-zed-border/50 pb-4">
                      <h3 className="text-2xl font-medium text-white font-lora italic tracking-tight">{exp.role}</h3>
                      <span className="font-mono text-[10px] text-zed-accent bg-zed-accent/10 border border-zed-accent/20 px-2 py-0.5 rounded-full">{exp.period}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-zed-muted">
                      <span className="text-white">{exp.company}</span>
                      <span className="opacity-30">•</span>
                      <span>{exp.location}</span>
                    </div>

                    <ul className="space-y-4">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex gap-4 text-sm leading-relaxed text-zed-muted hover:text-zed-text transition-colors">
                          <span className="shrink-0 text-zed-accent font-bold">/</span>
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.stack.map(s => (
                        <span key={s} className="text-[9px] text-zed-muted font-mono bg-zed-card border border-zed-border rounded-xs px-2 py-1 uppercase tracking-tighter">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SlashDivider />

        {/* CTA FOOTER */}
        <section id="contactar" className="relative px-6 py-32 text-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern mask-vignette opacity-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-lora text-4xl font-medium text-white md:text-6xl tracking-tight">¿Hablamos de tu próximo <span className="text-zed-accent italic">gran proyecto</span>?</h2>
            <p className="text-zed-muted text-lg">
              Disponible para oportunidades semi-senior y colaboraciones innovadoras.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:naferjml@gmail.com" className="rounded-sm bg-zed-accent px-8 py-3 text-sm font-medium text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/10">
                Enviar Email
              </a>
              <a href="https://linkedin.com/in/naferj" target="_blank" className="rounded-sm border border-zed-border bg-zed-card px-8 py-3 text-sm font-medium text-white hover:border-zed-muted transition-all">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative bg-zed-card/50 border-t border-zed-border py-16 px-12 z-40">
        <div className="mx-auto max-w-[1100px] flex flex-col justify-between items-start gap-12 md:flex-row">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-sm bg-white/10 font-mono text-[10px] font-bold text-white overflow-hidden">
                <img src="/profile/avatar.png" alt="NaferJ" className="w-full h-full object-cover" />
              </div>
              <span className="font-lora text-lg font-medium text-white">NaferJ</span>
            </div>
            <p className="text-xs text-zed-muted max-w-[200px] leading-relaxed italic">
              Construyendo herramientas web eficientes y escalables. 2026.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-[11px] font-mono text-zed-muted uppercase tracking-[0.2em]">
            <a href="https://github.com/naferj" className="hover:text-white transition-colors" target="_blank">GITHUB ↗</a>
            <a href="https://linkedin.com/in/naferj" className="hover:text-white transition-colors" target="_blank">LINKEDIN ↗</a>
            <a href="https://x.com/NaferJ1" className="hover:text-white transition-colors" target="_blank">X / TWITTER ↗</a>
            <a href="mailto:naferjml@gmail.com" className="hover:text-white transition-colors underline decoration-zed-accent underline-offset-4">EMAIL ↓</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
