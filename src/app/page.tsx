"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { PortraitFilter } from "@/components/portrait-filter";
import { DitherArrow } from "@/components/dither-arrow";
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
  const listRef = useRef<HTMLOListElement>(null);
  const aimedRow = useRef<Element | null>(null);

  // The hand points at the middle of the hovered or focused title and glides
  // between rows. With nothing hovered it rests on the first title.
  const aim = (row: Element | null) => {
    const title = row?.querySelector<HTMLElement>(`.${styles.workTitle}`);
    if (!title) return;
    aimedRow.current = row;
    pointerY.set(title.offsetTop + title.offsetHeight / 2);
  };

  const rest = () => aim(listRef.current?.querySelector("a") ?? null);

  // Start at rest without gliding in, and follow the aimed title as the
  // layout reflows.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    rest();
    smoothY.jump(pointerY.get());
    const resizeObserver = new ResizeObserver(() => aim(aimedRow.current));
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, []);

  // Follows mouseover rather than moves: scrolling a title under a still mouse
  // fires mouseover but no mousemove.
  const trackPointer = (event: React.MouseEvent<HTMLOListElement>) => {
    aim((event.target as Element).closest("a"));
  };

  return (
    <section className={styles.work} id="work">
      <motion.p className={`${styles.label} ${styles.workLabel}`} {...reveal}>
        Selected work
      </motion.p>

      <motion.div className={styles.workIndex} {...reveal}>
        <motion.div
          className={styles.workPointer}
          style={{ y: reduceMotion ? pointerY : smoothY }}
        >
          <Manicule />
        </motion.div>

        <ol
          ref={listRef}
          className={styles.workList}
          onMouseOver={trackPointer}
          onMouseLeave={rest}
        >
          {projects.map((project, index) => (
            <li key={project.href}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onFocus={(event) => aim(event.currentTarget)}
                onBlur={rest}
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
      <section className={styles.hero}>
        <PortraitFilter />
        <HeroName />
      </section>

      <ProjectIndex />

      <footer className={styles.footer}>
        {/* Made in playgrnd.tools' Terrain: variation 4242, balance -120%,
            bands #11110f #1b1a17 #2a2824 #5a2519 #e84e2c #deddd4. Kept
            lossless so the grain stays crisp. */}
        <div className={styles.footerArt} aria-hidden="true">
          <Image src="/footer-terrain.webp" alt="" fill sizes="100vw" unoptimized />
        </div>
        <p className={`${styles.label} ${styles.footerLabel}`}>Contact</p>
        <a className={styles.email} href="mailto:mahmoudhilani18@gmail.com">
          <b>
            <DitherText text="Email me" />
          </b>
          <DitherArrow className={styles.emailArrow} />
        </a>
        <p className={styles.emailAddress}>mahmoudhilani18@gmail.com</p>
        <div className={styles.footerBottom}>
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
