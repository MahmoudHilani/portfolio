"use client";

// PROTOTYPE: Three Three.js hero directions, switchable via ?variant=A|B|C.
import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeroVariant, ThreeHeroCanvas } from "./three-hero-canvas";
import styles from "./prototype.module.css";

const variants = [
  {
    key: "A" as const,
    name: "Tension sculpture",
    eyebrow: "Code / Play / Body",
    statement: "Built under tension.",
    note: "Interlocking systems, compressed forms, and a little controlled friction.",
  },
  {
    key: "B" as const,
    name: "Living syntax tree",
    eyebrow: "Systems become shapes",
    statement: "Make the invisible legible.",
    note: "A spatial language system that grows, evaluates, and reorganises itself.",
  },
  {
    key: "C" as const,
    name: "Infinite surfer",
    eyebrow: "Play is a way of learning",
    statement: "Find the flow.",
    note: "A perpetual browser machine built from rhythm, obstacles, and response.",
  },
];

function Switcher({ current }: { current: HeroVariant }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const cycle = useCallback(
    (direction: number) => {
      const index = variants.findIndex((item) => item.key === current);
      const next = variants[(index + direction + variants.length) % variants.length];
      const nextParams = new URLSearchParams(params.toString());
      nextParams.set("variant", next.key);
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    },
    [current, params, pathname, router],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.target as HTMLElement | null)?.matches(
          "input, textarea, select, [contenteditable='true']",
        )
      ) {
        return;
      }
      if (event.key === "ArrowLeft") cycle(-1);
      if (event.key === "ArrowRight") cycle(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle]);

  if (process.env.NODE_ENV === "production") return null;
  const active = variants.find((item) => item.key === current)!;

  return (
    <aside className={styles.switcher} aria-label="Three.js prototype switcher">
      <button onClick={() => cycle(-1)} aria-label="Previous concept">
        ←
      </button>
      <span>
        {active.key} — {active.name}
      </span>
      <button onClick={() => cycle(1)} aria-label="Next concept">
        →
      </button>
    </aside>
  );
}

export default function ThreeHeroPrototypePage() {
  const params = useSearchParams();
  const requested = params.get("variant")?.toUpperCase();
  const current: HeroVariant =
    requested === "B" || requested === "C" ? requested : "A";
  const active = variants.find((item) => item.key === current)!;

  return (
    <main className={`${styles.hero} ${styles[`variant${current}`]}`}>
      <ThreeHeroCanvas variant={current} />
      <header className={styles.header}>
        <a href="/" aria-label="Back to Mahmoud Hilani homepage">
          MH
        </a>
        <span>Software engineer / design habit</span>
        <nav>
          <a href="#work">Work</a>
          <a href="mailto:mahmoodhilani@gmail.com">Email</a>
        </nav>
      </header>

      <div className={styles.index}>
        <span>Prototype {active.key} / 03</span>
        <span>{active.eyebrow}</span>
      </div>

      <section className={styles.copy}>
        <p>Mahmoud Hilani</p>
        <h1>{active.statement}</h1>
        <div>
          <p>{active.note}</p>
          <a href="#work">
            Selected work <span>↓</span>
          </a>
        </div>
      </section>

      <div className={styles.sceneLabel}>
        <span>Pointer reactive</span>
        <span>Ordered dither / Three.js</span>
      </div>
      <Switcher current={current} />
    </main>
  );
}
