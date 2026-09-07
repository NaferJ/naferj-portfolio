import { Intro } from "@/components/Intro";

export default function Home() {
  return (
    <div className="min-h-dvh lg:mx-auto lg:grid lg:w-full lg:max-w-[1600px] lg:grid-cols-[1fr_2fr_4fr_2fr_1fr]">
      <div aria-hidden="true" className="hidden min-h-dvh lg:block" />
      <aside
        aria-label="Primary navigation"
        className="hidden min-h-dvh border-x border-[var(--rail)] lg:block"
      />
      <main className="min-h-dvh min-w-0 px-6 py-16 sm:px-10 sm:py-20 lg:px-8 lg:py-28">
        <Intro />
      </main>
      <aside
        aria-label="Secondary navigation"
        className="hidden min-h-dvh border-x border-[var(--rail)] lg:block"
      />
      <div aria-hidden="true" className="hidden min-h-dvh lg:block" />
    </div>
  );
}
