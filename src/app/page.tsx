"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { PortraitFilter } from "@/components/portrait-filter";
import { CubeSurferDecor } from "@/components/cube-surfer-decor";
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

function ExploreLink({ href }: { href: string }) {
  return (
    <Link href={href} className={styles.languageExplore}>
      Explore <Arrow />
    </Link>
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
          Mahmoud
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
          Hilani
        </motion.b>
      </span>
    </div>
  );
}

const codeLines = [
  ["01", "let", " makeAdder ", "= fn(x) {"],
  ["02", "  return", " fn(y) { return x + y; };"],
  ["03", "}"],
  ["04", ""],
  ["05", "let", " addTwo ", "= makeAdder(2);"],
  ["06", "addTwo(5);", "  // 7"],
];

function LanguageVisual() {
  return (
    <div className={styles.languageVisual} aria-label="Animated interpreter example">
      <div className={styles.terminalChrome}>
        <span>go-interpreter / closure.go</span>
      </div>
      <div className={styles.codePanel}>
        <div className={styles.codeLines}>
          {codeLines.map(([number, ...parts], index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: 0.12 + index * 0.07,
                ease: "easeOut",
              }}
            >
              <span>{number}</span>
              <code>
                {parts.map((part, partIndex) => (
                  <b key={`${number}-${partIndex}`}>{part}</b>
                ))}
              </code>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FitnessVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div className={styles.fitnessStage} ref={stageRef}>
      <motion.figure
        className={styles.fitnessPhoto}
        style={reduceMotion ? undefined : { y: backdropY }}
      >
        <Image
          src="/fitness/Dribbble.png"
          alt="Fitness app landing page"
          fill
          sizes="(max-width: 800px) 94vw, 66vw"
        />
      </motion.figure>
      <motion.figure
        className={styles.fitnessUi}
        style={reduceMotion ? { rotate: -2.5 } : { y: phoneY, rotate: -2.5 }}
        whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.025 }}
        transition={{ duration: 0.25 }}
      >
        <Image
          src="/fitness/4.png"
          alt="Fitness tracker overview showing steps, workouts, and calories"
          fill
          sizes="(max-width: 800px) 48vw, 28vw"
        />
      </motion.figure>
      <p>
        Fitness app
        <br />
        and website.
      </p>
    </div>
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

      <section className={`${styles.project} ${styles.language}`} id="work">
        <div className={styles.languageLayout}>
          <div className={styles.languageCopy}>
            <motion.div className={styles.projectTitle} {...reveal}>
              <h2>
                A Go interpreter, built <em>from scratch.</em>
              </h2>
            </motion.div>
            <motion.div className={styles.projectFoot} {...reveal}>
              <p>
                A tree-walk interpreter with a browser guide to lexing, parsing,
                environments, and evaluation.
              </p>
            </motion.div>
          </div>
          <motion.div className={styles.languageTerminal} {...reveal}>
            <LanguageVisual />
            <ExploreLink href="/interpreter" />
          </motion.div>
        </div>
      </section>

      <section className={`${styles.project} ${styles.play}`}>
        <motion.div className={styles.projectTitle} {...reveal}>
          <h2>
            Cube Surfer, reimagined <em>with a twist.</em>
          </h2>
        </motion.div>
        <motion.div className={styles.projectFoot} {...reveal}>
          <p>
            A Unity game built in C#, expanding Cube Surfer with off-platform
            movement, vertical level design, multiple routes, and easter eggs.
          </p>
          <ExploreLink href="/cube-surfer" />
        </motion.div>
        <CubeSurferDecor />
      </section>

      <section className={`${styles.project} ${styles.body}`}>
        <motion.div className={styles.projectTitle} {...reveal}>
          <h2>
            Fitness tracking, built for <em>steady progress.</em>
          </h2>
        </motion.div>
        <motion.div {...reveal}>
          <FitnessVisual />
        </motion.div>
        <motion.div className={styles.projectFoot} {...reveal}>
          <p>
            A React Native fitness and nutrition tracker with authentication,
            APIs, and a database, plus a responsive Next.js landing page.
          </p>
          <Link href="/fitness">
            Enter the archive <Arrow />
          </Link>
        </motion.div>
      </section>

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
