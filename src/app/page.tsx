"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { PortraitFilter } from "@/components/portrait-filter";
import { DitherText } from "@/components/dither-text";
import { Manicule } from "@/components/manicule";
import { projects } from "@/lib/projects";
import styles from "./home.module.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function HeroName() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mahmoudX = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const hilaniX = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.88], [1, 0.18]);

  return (
    <div className={styles.name} aria-label="Mahmoud Hilani" ref={heroRef}>
      <span>
        <motion.b
          initial={reduceMotion ? false : { y: "140%" }}
          animate={{ y: 0 }}
          style={reduceMotion ? undefined : { x: mahmoudX, opacity: nameOpacity }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <DitherText text="Mahmoud" />
        </motion.b>
      </span>
      <span>
        <motion.b
          initial={reduceMotion ? false : { y: "140%" }}
          animate={{ y: 0 }}
          style={reduceMotion ? undefined : { x: hilaniX, opacity: nameOpacity }}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <DitherText text="Hilani" />
        </motion.b>
      </span>
    </div>
  );
}

function ProjectIndex() {
  const reduceMotion = useReducedMotion();
  const pointerY = useMotionValue(0);
  const smoothY = useSpring(pointerY, { stiffness: 380, damping: 34, mass: 0.6 });
  const [pointing, setPointing] = useState(false);

  // The hand snaps to the middle of the hovered or focused title and glides
  // between rows. It appears in place rather than gliding in from wherever
  // it was last hidden.
  const aim = (row: Element | null) => {
    const title = row?.querySelector<HTMLElement>(`.${styles.workTitle}`);
    if (!title) return;
    const y = title.offsetTop + title.offsetHeight / 2;
    pointerY.set(y);
    if (!pointing) smoothY.jump(y);
    setPointing(true);
  };

  const trackPointer = (event: React.PointerEvent<HTMLOListElement>) => {
    if (event.pointerType !== "mouse") return;
    aim((event.target as Element).closest("a"));
  };

  return (
    <section className={styles.work} id="work">
      <motion.p className={`${styles.aboutLabel} ${styles.workLabel}`} {...reveal}>
        <span>Selected work</span>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </motion.p>

      <motion.div className={styles.workIndex} {...reveal}>
        <motion.div
          className={styles.workPointer}
          style={{ y: reduceMotion ? pointerY : smoothY }}
          animate={{ opacity: pointing ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <Manicule />
        </motion.div>

        <ol
          className={styles.workList}
          onPointerMove={trackPointer}
          onPointerLeave={() => setPointing(false)}
        >
          {projects.map((project, index) => (
            <li key={project.href}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onFocus={(event) => aim(event.currentTarget)}
                onBlur={() => setPointing(false)}
              >
                <span className={styles.workNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.workTitle}>{project.title}</span>
                <span className={styles.workMeta}>{project.stack}</span>
                <span className={`${styles.workMeta} ${styles.workYear}`}>{project.year}</span>
                <span className={styles.workArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Mahmoud Hilani, home">
          MH
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="mailto:mahmoodhilani@gmail.com">Email</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <PortraitFilter />
        <HeroName />

        <motion.div
          className={styles.heroBottom}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55 }}
        >
          <a href="#work">
            Selected work
            <span>↓</span>
          </a>
        </motion.div>
      </section>

      <ProjectIndex />

      <section className={styles.about} id="about">
        <motion.p className={styles.aboutLabel} {...reveal}>
          About
        </motion.p>
        <motion.div className={styles.aboutCopy} {...reveal}>
          <h2>
            Software engineer in <em>Dublin.</em> I build web products,
            developer tools, and small games.
          </h2>
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>Contact</p>
        <a href="mailto:mahmoodhilani@gmail.com">
          Email me
          <Arrow />
        </a>
        <div>
          <span>© {new Date().getFullYear()} Mahmoud Hilani</span>
          <nav aria-label="Social links">
            <a href="https://github.com/MahmoudHilani">GitHub</a>
            <a href="https://www.linkedin.com/in/mahmoud-hilani/">LinkedIn</a>
            <a href="https://x.com/MahmoodHilani">X</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
