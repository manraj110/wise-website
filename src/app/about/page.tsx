"use client";

import Navbar from "@/components/Navbar";
import HashScrollFix from "@/components/HashScrollFix";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const IndiaMapAbout = dynamic(() => import("@/components/IndiaMapAbout"), {
  ssr: false,
});

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [openPhilosophy, setOpenPhilosophy] = useState<number | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [panelTop, setPanelTop] = useState(0);

  const handlePhilosophyEnter = (i: number) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenPhilosophy(i);
  };

  const handlePhilosophyLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenPhilosophy(null);
    }, 150);
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const LABEL_TO_ID: Record<string, string> = {
    Chhattisgarh: "TG",
    "Madhya Pradesh": "MP",
    "Uttar Pradesh": "UP",
    Assam: "AS",
    Odisha: "CT",
    Jharkhand: "JH",
    "West Bengal": "WB",
    Telangana: "OR",
    Maharashtra: "MH",
  };

  const values = [
    { label: "Integrity", desc: "Doing what is right.", angle: -90 },
    {
      label: "Excellence",
      desc: "Striving for quality in every engagement.",
      angle: -30,
    },
    { label: "Commitment", desc: "Building lasting relationships.", angle: 30 },
    {
      label: "Innovation",
      desc: "Embracing better ways of learning.",
      angle: 90,
    },
    {
      label: "Empathy",
      desc: "Understanding every institution's unique needs.",
      angle: 150,
    },
    { label: "Impact", desc: "Creating meaningful change.", angle: 210 },
  ];

  const philosophy = [
    "Academic Excellence",
    "Structured Systems",
    "Long-Term Partnerships",
    "Meaningful Education",
    "Institutional Growth",
    "Student First",
  ];

  return (
    <main className="relative bg-[#14071A] text-white overflow-hidden">
      <Navbar />
      <HashScrollFix />

      {/* ============================================================
          SECTION 1 — HERO
      ============================================================ */}
      <section className="relative z-10 min-h-screen flex items-center px-8 md:px-20 pt-28 pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[-240px] left-[-240px] w-[480px] h-[480px] bg-[#fea501]/55 blur-[105px] rounded-full pointer-events-none" />
        <div className="absolute top-[10%] right-[5%] w-[700px] h-[700px] bg-[#6A00FF]/12 blur-[200px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-[1400px] mx-auto">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col"
            style={{ marginLeft: "2rem" }}
          >
            <p
              className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6"
              style={{ marginBottom: "1rem" }}
            >
              ABOUT WISE
            </p>
            <h1
              className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-8"
              style={{ marginBottom: "2rem" }}
            >
              Building Institutions
              <br />
              <span className="text-[#F4B942]">with Purpose</span>
            </h1>
            <p
              className="text-white/60 text-xl leading-relaxed max-w-xl mb-12"
              style={{ marginBottom: "2rem" }}
            >
              Wonder Illuminate Service of Education was founded with a vision
              to help schools move beyond compliance and create meaningful,
              future-ready learning environments.
            </p>

            {/* Quick stats */}
            <div className="flex gap-10 flex-wrap">
              {[
                { value: "300+", label: "Schools Supported" },
                { value: "9", label: "States Covered" },
                { value: "8+", label: "Service Verticals" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-[4px] h-[52px] rounded-full bg-[#F4B942] shadow-[0_0_16px_rgba(244,185,66,0.6)] group-hover:shadow-[0_0_28px_rgba(244,185,66,1)] transition-all duration-300 flex-shrink-0" />
                  <div>
                    <p className="text-3xl font-bold text-white group-hover:text-[#F4B942] transition-colors duration-300 leading-none mb-1">
                      {value}
                    </p>
                    <p className="text-white/45 text-xs uppercase tracking-[0.15em]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= HERO ILLUSTRATION DIAGRAM ================= */}
          {/* ================= HERO ILLUSTRATION DIAGRAM ================= */}
          <svg
            viewBox="0 0 520 480"
            className="w-full h-full relative z-10"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer decorative rings — sit strictly between center and icons */}
            <circle
              cx="260"
              cy="240"
              r="210"
              fill="none"
              stroke="rgba(244,185,66,0.05)"
              strokeWidth="1"
            />
            <circle
              cx="260"
              cy="240"
              r="128"
              fill="none"
              stroke="rgba(244,185,66,0.07)"
              strokeWidth="1"
              strokeDasharray="6 10"
            />

            {/* ── CENTER: School building ── */}
            <g
              transform="translate(200, 158)"
              className="group/building"
              style={{ cursor: "default" }}
            >
              <g
                className="transition-transform duration-300 group-hover/building:scale-105"
                style={{ transformOrigin: "65px 65px" }}
              >
                <rect
                  x="-18"
                  y="58"
                  width="20"
                  height="62"
                  rx="2"
                  fill="rgba(244,185,66,0.10)"
                  stroke="#F4B942"
                  strokeWidth="1.2"
                />
                <rect
                  x="128"
                  y="58"
                  width="20"
                  height="62"
                  rx="2"
                  fill="rgba(244,185,66,0.10)"
                  stroke="#F4B942"
                  strokeWidth="1.2"
                />
                <rect
                  x="18"
                  y="50"
                  width="94"
                  height="70"
                  rx="2"
                  fill="rgba(244,185,66,0.15)"
                  stroke="#F4B942"
                  strokeWidth="1.5"
                />
                <polygon
                  points="65,8 130,50 0,50"
                  fill="rgba(244,185,66,0.22)"
                  stroke="#F4B942"
                  strokeWidth="1.5"
                />
                <line
                  x1="65"
                  y1="-14"
                  x2="65"
                  y2="8"
                  stroke="#F4B942"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M65 -14 L65 -3 L82 -9 Z"
                  fill="#F4B942"
                  stroke="none"
                />
                <rect
                  x="53"
                  y="85"
                  width="24"
                  height="35"
                  rx="12"
                  fill="#14071A"
                  stroke="#F4B942"
                  strokeWidth="1"
                />
                <rect
                  x="26"
                  y="62"
                  width="16"
                  height="14"
                  rx="2"
                  fill="rgba(244,185,66,0.28)"
                  stroke="#F4B942"
                  strokeWidth="1"
                />
                <rect
                  x="88"
                  y="62"
                  width="16"
                  height="14"
                  rx="2"
                  fill="rgba(244,185,66,0.28)"
                  stroke="#F4B942"
                  strokeWidth="1"
                />
                <rect
                  x="-12"
                  y="68"
                  width="10"
                  height="10"
                  rx="1"
                  fill="rgba(244,185,66,0.18)"
                  stroke="#F4B942"
                  strokeWidth="0.8"
                />
                <rect
                  x="132"
                  y="68"
                  width="10"
                  height="10"
                  rx="1"
                  fill="rgba(244,185,66,0.18)"
                  stroke="#F4B942"
                  strokeWidth="0.8"
                />
              </g>
            </g>

            {/* ── TOP LEFT: Books ── */}
            <g
              transform="translate(68, 78)"
              className="group/icon peer peer/books"
              style={{ cursor: "default" }}
            >
              <circle cx="42" cy="42" r="44" fill="#14071A" />
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="rgba(244,185,66,0.07)"
                stroke="rgba(244,185,66,0.28)"
                strokeWidth="1.2"
                className="transition-all duration-300 group-hover/icon:fill-[rgba(244,185,66,0.16)] group-hover/icon:stroke-[rgba(244,185,66,0.7)]"
              />
              <g
                transform="translate(0, 6)"
                stroke="#F4B942"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/icon:scale-110"
                style={{ transformOrigin: "42px 40px" }}
              >
                <path d="M42 20 L42 47" />
                <path d="M42 20 C36 18 24 20 20 22 L20 50 C24 48 36 46 42 48" />
                <path d="M42 20 C48 18 60 20 64 22 L64 50 C60 48 48 46 42 48" />
                <line x1="26" y1="27" x2="38" y2="26" />
                <line x1="26" y1="33" x2="38" y2="32" />
                <line x1="26" y1="39" x2="38" y2="38" />
                <line x1="46" y1="26" x2="58" y2="27" />
                <line x1="46" y1="32" x2="58" y2="33" />
                <line x1="46" y1="38" x2="58" y2="39" />
              </g>
              <text
                x="42"
                y="104"
                textAnchor="middle"
                fill="rgba(244,185,66,0.75)"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.05em"
                className="transition-colors duration-300 group-hover/icon:fill-[#F4B942]"
              >
                BOOKS
              </text>
            </g>

            {/* ── TOP RIGHT: Teacher ── */}
            <g
              transform="translate(358, 78)"
              className="group/icon peer peer/teachers"
              style={{ cursor: "default" }}
            >
              <circle cx="42" cy="42" r="44" fill="#14071A" />
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="rgba(244,185,66,0.07)"
                stroke="rgba(244,185,66,0.28)"
                strokeWidth="1.2"
                className="transition-all duration-300 group-hover/icon:fill-[rgba(244,185,66,0.16)] group-hover/icon:stroke-[rgba(244,185,66,0.7)]"
              />
              <g
                transform="translate(13, 9)"
                stroke="#F4B942"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/icon:scale-110"
                style={{ transformOrigin: "29px 35px" }}
              >
                <rect x="2" y="16" width="38" height="24" rx="2" />
                <line x1="8" y1="23" x2="34" y2="23" />
                <line x1="8" y1="28" x2="28" y2="28" />
                <line x1="10" y1="40" x2="6" y2="51" />
                <line x1="32" y1="40" x2="36" y2="51" />
                <line x1="21" y1="40" x2="21" y2="51" />
                <circle cx="50" cy="20" r="6" />
                <line x1="50" y1="26" x2="50" y2="42" />
                <line x1="43" y1="32" x2="50" y2="29" />
                <line x1="50" y1="42" x2="45" y2="52" />
                <line x1="50" y1="42" x2="55" y2="52" />
              </g>
              <text
                x="42"
                y="104"
                textAnchor="middle"
                fill="rgba(244,185,66,0.75)"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.05em"
                className="transition-colors duration-300 group-hover/icon:fill-[#F4B942]"
              >
                TEACHERS
              </text>
            </g>

            {/* ── BOTTOM LEFT: Students ── */}
            <g
              transform="translate(48, 308)"
              className="group/icon peer peer/students"
              style={{ cursor: "default" }}
            >
              <circle cx="42" cy="42" r="44" fill="#14071A" />
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="rgba(244,185,66,0.07)"
                stroke="rgba(244,185,66,0.28)"
                strokeWidth="1.2"
                className="transition-all duration-300 group-hover/icon:fill-[rgba(244,185,66,0.16)] group-hover/icon:stroke-[rgba(244,185,66,0.7)]"
              />
              <g
                transform="translate(0, 7)"
                stroke="#F4B942"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/icon:scale-110"
                style={{ transformOrigin: "42px 35px" }}
              >
                <polygon
                  points="42,18 62,26 42,34 22,26"
                  fill="rgba(244,185,66,0.15)"
                  stroke="#F4B942"
                  strokeWidth="1.8"
                />
                <path d="M30 30 L30 44 Q30 52 42 52 Q54 52 54 44 L54 30" />
                <line x1="62" y1="26" x2="62" y2="38" strokeLinecap="round" />
                <circle cx="62" cy="40" r="2.5" fill="#F4B942" stroke="none" />
              </g>
              <text
                x="42"
                y="104"
                textAnchor="middle"
                fill="rgba(244,185,66,0.75)"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.05em"
                className="transition-colors duration-300 group-hover/icon:fill-[#F4B942]"
              >
                STUDENTS
              </text>
            </g>

            {/* ── BOTTOM RIGHT: Systems ── */}
            <g
              transform="translate(378, 308)"
              className="group/icon peer peer/systems"
              style={{ cursor: "default" }}
            >
              <circle cx="42" cy="42" r="44" fill="#14071A" />
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="rgba(244,185,66,0.07)"
                stroke="rgba(244,185,66,0.28)"
                strokeWidth="1.2"
                className="transition-all duration-300 group-hover/icon:fill-[rgba(244,185,66,0.16)] group-hover/icon:stroke-[rgba(244,185,66,0.7)]"
              />
              <g
                stroke="#F4B942"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/icon:scale-110"
                style={{ transformOrigin: "42px 38px" }}
              >
                <circle cx="42" cy="26" r="6" />
                <circle cx="26" cy="52" r="6" />
                <circle cx="58" cy="52" r="6" />
                <line x1="42" y1="32" x2="30" y2="46" />
                <line x1="42" y1="32" x2="54" y2="46" />
                <line x1="32" y1="52" x2="52" y2="52" />
              </g>
              <text
                x="42"
                y="104"
                textAnchor="middle"
                fill="rgba(244,185,66,0.75)"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.05em"
                className="transition-colors duration-300 group-hover/icon:fill-[#F4B942]"
              >
                SYSTEMS
              </text>
            </g>

            {/* ── Connecting lines — rendered LAST so peer-hover (which needs an EARLIER sibling
       with the matching peer/ class) can target them. Each line uses a static,
       hardcoded Tailwind class — required because Tailwind cannot generate CSS
       for dynamically built class strings like peer-hover/${key}. ── */}
            <line
              x1="220"
              y1="195"
              x2="148"
              y2="142"
              stroke="rgba(244,185,66,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="transition-all duration-300 peer-hover/books:stroke-[rgba(244,185,66,0.55)] peer-hover/books:[stroke-width:1.5px]"
            />

            <line
              x1="310"
              y1="195"
              x2="363"
              y2="145"
              stroke="rgba(244,185,66,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="transition-all duration-300 peer-hover/teachers:stroke-[rgba(244,185,66,0.55)] peer-hover/teachers:[stroke-width:1.5px]"
            />

            <line
              x1="218"
              y1="282"
              x2="128"
              y2="320"
              stroke="rgba(244,185,66,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="transition-all duration-300 peer-hover/students:stroke-[rgba(244,185,66,0.55)] peer-hover/students:[stroke-width:1.5px]"
            />

            <line
              x1="312"
              y1="282"
              x2="384"
              y2="318"
              stroke="rgba(244,185,66,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="transition-all duration-300 peer-hover/systems:stroke-[rgba(244,185,66,0.55)] peer-hover/systems:[stroke-width:1.5px]"
            />
          </svg>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — OUR STORY / JOURNEY
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-hidden">
        <div className="absolute top-[0%] left-[-100px] w-[400px] h-[400px] bg-[#F4B942]/6 blur-[180px] rounded-full pointer-events-none" />

        <div
          className="max-w-[1400px] mx-auto"
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginBottom: "1rem" }}
          >
            OUR JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-16"
            style={{ marginBottom: "4rem" }}
          >
            Why We <span className="text-[#F4B942]">Started</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex flex-col gap-7 text-white/65 text-lg leading-[1.9]"
            >
              <p>
                Wonder Illuminate Service of Education was established in 2024
                by Ms. Sanskriti Singh and Dr. Suresh Singh with a shared vision
                of strengthening educational institutions through structured
                systems and meaningful learning.
              </p>
              <p>
                Recognizing the challenges faced by schools in areas such as
                affiliation, academics, operations, and institutional
                development, WISE was created to provide reliable, customized,
                and long-term support to schools across India.
              </p>
              <p>
                Today, WISE serves schools across multiple states and continues
                to work towards building institutions that prioritize academic
                excellence, student development, and sustainable growth.
              </p>
            </motion.div>

            {/* RIGHT — Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative -translate-y-24"
            >
              <div className="flex flex-col gap-0">
                {[
                  {
                    year: "2024",
                    title: "Establishment",
                    desc: "WISE founded by Ms. Sanskriti Singh & Dr. Suresh Singh with a mission to transform Indian education.",
                  },
                  {
                    year: "300+",
                    title: "Schools Supported",
                    desc: "Institutions across India trust WISE for affiliation, academic systems, and long-term growth.",
                  },
                  {
                    year: "9",
                    title: "States Covered",
                    desc: "A growing national presence, delivering structured support across diverse regions.",
                  },
                  {
                    year: "↑",
                    title: "Growing National Presence",
                    desc: "Expanding through trust, referrals, and the measurable impact we create for every school.",
                  },
                ].map(({ year, title, desc }, i, arr) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.45 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6 group cursor-default"
                  >
                    {/* Left column: dot + line */}
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      {/* SVG circle that draws itself */}
                      <div className="relative w-[72px] h-[72px] flex items-center justify-center">
                        <svg
                          viewBox="0 0 72 72"
                          className="absolute inset-0 w-full h-full -rotate-90"
                        >
                          {/* faint base track */}
                          <circle
                            cx="36"
                            cy="36"
                            r="33"
                            fill="rgba(244,185,66,0.08)"
                            stroke="rgba(244,185,66,0.15)"
                            strokeWidth="1.5"
                          />
                          {/* animated drawing stroke */}
                          <motion.circle
                            cx="36"
                            cy="36"
                            r="33"
                            fill="none"
                            stroke="#F4B942"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            pathLength={1}
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{
                              duration: 0.9,
                              delay: i * 0.45,
                              ease: "easeInOut",
                            }}
                            viewport={{ once: true }}
                          />
                        </svg>
                        <span className="text-[#F4B942] text-base font-bold z-10">
                          {year}
                        </span>
                      </div>

                      {/* Connector — draws downward right after the circle finishes */}
                      {i < arr.length - 1 && (
                        <svg width="2" height="52" className="overflow-visible">
                          <motion.line
                            x1="1"
                            y1="0"
                            x2="1"
                            y2="52"
                            stroke="#F4B942"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0.3 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: i * 0.45 + 0.9,
                              ease: "easeInOut",
                            }}
                            viewport={{ once: true }}
                          />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-2 pb-10">
                      <motion.h4
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.45 + 0.4 }}
                        viewport={{ once: true }}
                        className="text-white font-bold text-lg mb-1 group-hover:text-[#F4B942] transition-colors duration-300"
                      >
                        {title}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.45 + 0.5 }}
                        viewport={{ once: true }}
                        className="text-white/45 text-sm leading-relaxed"
                      >
                        {desc}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — OUR PURPOSE
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-hidden">
        <div className="absolute top-[0%] right-[-100px] w-[500px] h-[500px] bg-[#A855F7]/8 blur-[200px] rounded-full pointer-events-none" />

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "6rem", marginBottom: "1rem" }}
          >
            OUR PURPOSE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-6"
            style={{ marginBottom: "1.5rem" }}
          >
            Why We <span className="text-[#F4B942]">Exist</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/55 text-xl leading-relaxed max-w-2xl mb-20"
            style={{ marginBottom: "3rem" }}
          >
            We believe that education should develop understanding, curiosity,
            and confidence. Our purpose is to help schools build strong
            foundations that support students, teachers, and communities for
            generations to come.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                ),
                iconPath: true,
                title: "Quality Education",
                desc: "Promoting meaningful and holistic learning for every student.",
              },
              {
                icon: null,
                iconPath: false,
                title: "Equal Opportunities",
                desc: "Creating inclusive educational environments where every school can thrive.",
              },
              {
                icon: null,
                iconPath: false,
                title: "Innovation",
                desc: "Encouraging modern and effective practices in teaching and learning.",
              },
              {
                icon: null,
                iconPath: false,
                title: "Student-Centric Growth",
                desc: "Keeping learners at the heart of every decision and system.",
              },
            ].map(({ title, desc }, i) => {
              const icons = [
                // Quality Education
                <g
                  key="q"
                  stroke="#F4B942"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:[stroke:#14071A]"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </g>,
                // Equal Opportunities
                <g
                  key="e"
                  stroke="#F4B942"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:[stroke:#14071A]"
                >
                  <circle cx="9" cy="8" r="4" />
                  <path d="M3 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <line x1="16" y1="11" x2="22" y2="11" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                </g>,
                // Innovation
                <g
                  key="i"
                  stroke="#F4B942"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:[stroke:#14071A]"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.5.5 2.7 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </g>,
                // Student-Centric
                <g
                  key="s"
                  stroke="#F4B942"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:[stroke:#14071A]"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </g>,
              ];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-[28px] border border-white/10 bg-white/[0.03] hover:border-[#F4B942] hover:bg-[#F4B942]/20 hover:shadow-[0_0_40px_rgba(244,185,66,0.35)] transition-all duration-400 cursor-default"
                  style={{ padding: "2.5rem" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="w-14 h-14 rounded-[16px] bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center group-hover:bg-[#F4B942] group-hover:border-[#F4B942] group-hover:scale-110 transition-all duration-300"
                    style={{ marginBottom: "1.75rem" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-colors duration-300"
                    >
                      {icons[i]}
                    </svg>
                  </motion.div>
                  <h4
                    className="text-white font-bold text-lg group-hover:text-[#F4B942] transition-colors duration-300"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {title}
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
    SECTION 4 — OUR PHILOSOPHY
============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32">
        <div className="absolute bottom-0 left-[-100px] w-[450px] h-[450px] bg-[#F4B942]/6 blur-[180px] rounded-full pointer-events-none overflow-hidden" />

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "8rem", marginBottom: "1.5rem" }}
          >
            OUR PHILOSOPHY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-6"
            style={{ marginBottom: "1.5rem" }}
          >
            Education Beyond <span className="text-[#F4B942]">Compliance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/55 text-xl leading-relaxed max-w-2xl mb-20"
            style={{ marginBottom: "4rem" }}
          >
            At WISE, we believe that schools should not merely satisfy
            regulations — they should nurture curiosity, critical thinking, and
            lifelong learning. Our approach combines academic depth, structured
            systems, and long-term partnerships.
          </motion.p>

          {/* Accordion */}
          <div
            className="max-w-4xl relative"
            onMouseLeave={handlePhilosophyLeave}
          >
            {[
              {
                title: "Academic Excellence",
                desc: "Rigorous, depth-first learning that goes beyond the syllabus.",
              },
              {
                title: "Structured Systems",
                desc: "Reliable processes that keep institutions running smoothly.",
              },
              {
                title: "Long-Term Partnerships",
                desc: "We grow with schools over years, not just a single project.",
              },
              {
                title: "Meaningful Education",
                desc: "Learning that builds real understanding, not rote memorization.",
              },
              {
                title: "Institutional Growth",
                desc: "Helping schools scale sustainably, year after year.",
              },
              {
                title: "Student First",
                desc: "Every decision is measured against what's best for the learner.",
              },
            ].map((p, i) => {
              const isOpen = openPhilosophy === i;
              return (
                <div
                  key={p.title}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="relative border-b border-white/10"
                  onMouseEnter={() => handlePhilosophyEnter(i)}
                >
                  <div
                    className="flex items-center justify-between w-full cursor-default"
                    style={{ paddingTop: "1.75rem", paddingBottom: "1.75rem" }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-2xl font-bold w-12 flex-shrink-0 transition-colors duration-300 ${
                          isOpen ? "text-[#F4B942]" : "text-white/25"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h4
                        className={`font-bold text-xl md:text-2xl whitespace-nowrap transition-colors duration-300 ${
                          isOpen ? "text-[#F4B942]" : "text-white"
                        }`}
                      >
                        {p.title}
                      </h4>
                    </div>

                    <span
                      className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "border-[#F4B942] bg-[#F4B942] rotate-45"
                          : "border-white/20"
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke={isOpen ? "#14071A" : "#F4B942"}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Smooth height-based expand/collapse — pushes rows below
            down gently instead of overlaying, matching the reference. */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-white/70 text-base md:text-lg leading-relaxed border-l-[3px] border-[#F4B942]/70"
                          style={{
                            padding: "0.15rem 1.5rem 0.75rem 1.25rem",
                            margin: "0.35rem 0 0 3.5rem",
                          }}
                        >
                          {p.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — OUR VALUES
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-visible">
        <div className="absolute top-0 right-[-80px] w-[500px] h-[500px] bg-[#6A00FF]/8 blur-[200px] rounded-full pointer-events-none overflow-hidden" />

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "8rem", marginBottom: "1.5rem" }}
          >
            OUR VALUES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-20"
            style={{ marginBottom: "2rem" }}
          >
            Principles That <span className="text-[#F4B942]">Guide Us</span>
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr_2.1fr] gap-6 items-start">
            {/* LEFT — text + quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex flex-col gap-7"
              style={{ marginTop: "2.75rem" }}
            >
              <p className="text-white/65 text-lg leading-[1.9]">
                At WISE, values are more than words—they define how we work,
                collaborate, and support institutions. Every project we
                undertake is guided by a commitment to quality, trust, and
                meaningful educational impact.
              </p>
              <p className="text-white/65 text-lg leading-[1.9]">
                We believe that strong institutions are built not only through
                systems and processes, but also through integrity, empathy,
                innovation, and long-term relationships.
              </p>

              <div
                className="rounded-[20px] border border-[#F4B942]/25 bg-[#F4B942]/[0.06]"
                style={{ padding: "1.25rem 1.5rem", marginTop: "0.25rem" }}
              >
                <p className="text-[#F4B942] text-base md:text-lg font-semibold leading-relaxed italic">
                  "We measure success not by the number of projects completed,
                  but by the impact we create in the institutions we serve."
                </p>
              </div>
            </motion.div>

            {/* Circular layout — SVG based, no positioning bugs */}
            <div className="w-full flex justify-center lg:justify-end overflow-visible">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "100%",
                  maxWidth: "1300px",
                  aspectRatio: "950 / 740",
                  overflow: "visible",
                  marginRight: "-20px",
                }}
              >
                <svg
                  viewBox="0 0 950 740"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ overflow: "visible" }}
                >
                  {/* Connector lines — center now at (475, 370) */}
                  {values.map(({ angle }, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const centerHalf = 68;
                    const nodeHalf = 64;
                    // top/bottom nodes stay closer; the 4 diagonal nodes orbit further out
                    const r = angle === -90 || angle === 90 ? 225 : 270;
                    const dx = Math.cos(rad);
                    const dy = Math.sin(rad);
                    const cx0 = 475,
                      cy0 = 370;

                    const edgeDist = (half: number) =>
                      half / Math.max(Math.abs(dx), Math.abs(dy));

                    const startDist = edgeDist(centerHalf);
                    const endDist = r - edgeDist(nodeHalf);

                    const x1 = cx0 + dx * startDist;
                    const y1 = cy0 + dy * startDist;
                    const x2 = cx0 + dx * endDist;
                    const y2 = cy0 + dy * endDist;
                    const isHovered = hoveredValue === i;

                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          isHovered
                            ? "rgba(244,185,66,0.9)"
                            : "rgba(244,185,66,0.2)"
                        }
                        strokeWidth={isHovered ? "2" : "1"}
                        strokeDasharray="5 5"
                        style={{
                          filter: isHovered
                            ? "drop-shadow(0 0 6px rgba(244,185,66,0.6))"
                            : "none",
                          transition: "all 0.3s",
                        }}
                      />
                    );
                  })}

                  {/* Center WISE square */}
                  <rect
                    x={475 - 68}
                    y={370 - 68}
                    width="136"
                    height="136"
                    rx="24"
                    fill="rgba(244,185,66,0.1)"
                    stroke="rgba(244,185,66,0.6)"
                    strokeWidth="2"
                  />
                  <text
                    x="475"
                    y="378"
                    textAnchor="middle"
                    fill="#F4B942"
                    fontSize="24"
                    fontWeight="700"
                    letterSpacing="5"
                  >
                    WISE
                  </text>

                  {/* Value nodes */}
                  {values.map(({ label, desc, angle }, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = angle === -90 || angle === 90 ? 225 : 270;
                    const dx = Math.cos(rad);
                    const dy = Math.sin(rad);
                    const cx = 475 + dx * r;
                    const cy = 370 + dy * r;
                    const isHovered = hoveredValue === i;

                    const nodeHalf = 64;
                    const tooltipW = 170;
                    const tooltipH = 60;
                    const gap = 22;

                    let tipX, tipY;
                    if (angle === -90) {
                      tipX = cx - tooltipW / 2;
                      tipY = cy - nodeHalf - 10 - tooltipH;
                    } else if (angle === 90) {
                      tipX = cx - tooltipW / 2;
                      tipY = cy + nodeHalf + gap;
                    } else if (angle === -30 || angle === 30) {
                      tipX = cx + nodeHalf + gap;
                      tipY = cy - tooltipH / 2;
                    } else {
                      tipX = cx - nodeHalf - gap - tooltipW;
                      tipY = cy - tooltipH / 2;
                    }

                    return (
                      <g
                        key={label}
                        onMouseEnter={() => setHoveredValue(i)}
                        onMouseLeave={() => setHoveredValue(null)}
                        style={{ cursor: "default" }}
                      >
                        <rect
                          x={cx - nodeHalf}
                          y={cy - nodeHalf}
                          width={nodeHalf * 2}
                          height={nodeHalf * 2}
                          rx="20"
                          fill={
                            isHovered
                              ? "rgba(244,185,66,0.14)"
                              : "rgba(255,255,255,0.04)"
                          }
                          stroke={
                            isHovered
                              ? "rgba(244,185,66,0.7)"
                              : "rgba(244,185,66,0.25)"
                          }
                          strokeWidth="1.6"
                          style={{
                            filter: isHovered
                              ? "drop-shadow(0 0 12px rgba(244,185,66,0.4))"
                              : "none",
                            transition: "all 0.3s",
                          }}
                        />
                        <text
                          x={cx}
                          y={cy + 6}
                          textAnchor="middle"
                          fill={
                            isHovered ? "#F4B942" : "rgba(255,255,255,0.82)"
                          }
                          fontSize="18"
                          fontWeight="600"
                          style={{ transition: "fill 0.3s" }}
                        >
                          {label}
                        </text>

                        {isHovered && (
                          <foreignObject
                            x={tipX}
                            y={tipY}
                            width={tooltipW}
                            height={tooltipH}
                            style={{ overflow: "visible" }}
                          >
                            <div
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "16px",
                                lineHeight: "1.5",
                                textAlign: "center",
                                padding: "0 4px",
                              }}
                            >
                              {desc}
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — LEADERSHIP
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-hidden">
        <div className="absolute top-0 left-[-100px] w-[450px] h-[450px] bg-[#F4B942]/6 blur-[180px] rounded-full pointer-events-none" />

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "4rem", marginBottom: "1.5rem" }}
          >
            OUR LEADERSHIP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-20"
            style={{ marginBottom: "4rem" }}
          >
            Meet the <span className="text-[#F4B942]">Founders</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {[
              {
                name: "Dr. Suresh Singh",
                role: "Co-Founder",
                img: "/suresh-singh.jpg",
                fallbackInitial: "SS",
                desc: "Bringing years of experience and educational insight, Dr. Suresh Singh focuses on institutional development, strategic planning, and building systems that enable schools to grow sustainably.",
                tags: [
                  "Institutional Development",
                  "Strategic Planning",
                  "Systems Design",
                ],
                spacerHeight: 0,
                imgPosition: "center", // unchanged, default behavior
              },
              {
                name: "Ms. Sanskriti Singh",
                role: "Co-Founder",
                img: "/sanskriti-singh-og.jpg",
                fallbackInitial: "SS",
                desc: "Passionate about educational transformation, Sanskriti Singh focuses on innovation, relationship building, and strengthening the future of school development.",
                tags: [
                  "Educational Innovation",
                  "Relationship Building",
                  "School Development",
                ],
                spacerHeight: 10,
                imgPosition: "center 0%", // shifts crop window up, toward her face
              },
            ].map(
              (
                {
                  name,
                  role,
                  fallbackInitial,
                  desc,
                  tags,
                  img,
                  spacerHeight,
                  imgPosition,
                },
                i,
              ) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative rounded-[32px] bg-white/[0.03]
             border-t-[3px] border-x border-b
             border-t-[#F4B942] border-x-white/10 border-b-white/10
             hover:border-t-[#F4B942] hover:border-x-[#F4B942]/60 hover:border-b-[#F4B942]/60
             hover:shadow-[0_0_40px_rgba(244,185,66,0.15)]
             transition-colors duration-400"
                >
                  <div
                    className="flex flex-col sm:flex-row gap-10 items-center"
                    style={{ padding: "3.5rem" }}
                  >
                    {/* LEFT — content */}
                    <div className="flex flex-col gap-5 flex-[1.3]">
                      <div>
                        <h3 className="text-white font-bold text-2xl mb-1 group-hover:text-[#F4B942] transition-colors duration-300">
                          {name}
                        </h3>
                        <p className="text-[#F4B942]/70 text-sm uppercase tracking-[0.2em] font-semibold">
                          {role}
                        </p>
                      </div>

                      <p className="text-white/55 text-base leading-relaxed">
                        {desc}
                      </p>

                      {spacerHeight > 0 && (
                        <div style={{ height: `${spacerHeight}px` }} />
                      )}

                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium rounded-full border border-[#F4B942]/20 text-[#F4B942]/60 bg-[#F4B942]/5 hover:border-[#F4B942]/50 hover:text-[#F4B942] transition-all duration-300 cursor-default"
                            style={{ padding: "3px 5px" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT — circular photo */}
                    <div className="w-[260px] h-[260px] flex-shrink-0 rounded-full bg-[#F4B942]/15 border-2 border-[#F4B942]/40 flex items-center justify-center overflow-hidden group-hover:border-[#F4B942]/70 group-hover:shadow-[0_0_30px_rgba(244,185,66,0.25)] transition-all duration-300">
                      {img ? (
                        <img
                          src={img}
                          alt={name}
                          className={`w-full h-full object-cover ${i === 1 ? "scale-100" : ""}`}
                          style={{ objectPosition: imgPosition }}
                        />
                      ) : (
                        <span className="text-[#F4B942] font-bold text-6xl">
                          {fallbackInitial}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — OUR PRESENCE / MAP
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-hidden">
        <div className="absolute top-0 right-[-80px] w-[500px] h-[500px] bg-[#A855F7]/6 blur-[200px] rounded-full pointer-events-none" />

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "8rem", marginBottom: "1.5rem" }}
          >
            OUR REACH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-6"
            style={{ marginBottom: "1.5rem" }}
          >
            Supporting Schools{" "}
            <span className="text-[#F4B942]">Across India</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/55 text-xl leading-relaxed max-w-2xl mb-16"
            style={{ marginBottom: "4rem" }}
          >
            WISE currently supports schools across multiple states and continues
            to expand its presence through long-term institutional partnerships.
          </motion.p>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 pb-14 overflow-hidden flex items-center justify-center"
            >
              <div className="w-full max-w-[900px] pt-12 [&>div>*:nth-child(n+2)]:hidden">
                <IndiaMapAbout
                  hoveredState={hoveredId}
                  onStateHover={setHoveredId}
                />
              </div>
            </motion.div>

            {/* State list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 min-w-[220px]"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">
                States We Serve
              </p>
              {[
                "Chhattisgarh",
                "Madhya Pradesh",
                "Uttar Pradesh",
                "Assam",
                "Odisha",
                "Jharkhand",
                "West Bengal",
                "Telangana",
                "Maharashtra",
              ].map((state, i) => {
                const stateId = LABEL_TO_ID[state];
                const isActive = hoveredId === stateId;
                return (
                  <motion.div
                    key={state}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredId(stateId)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className="w-2 h-2 rounded-sm flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive
                          ? "#F4B942"
                          : "rgba(244,185,66,0.7)",
                        boxShadow: isActive
                          ? "0 0 10px rgba(244,185,66,0.9)"
                          : "none",
                      }}
                    />
                    <span
                      className="text-base transition-all duration-200"
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                        transform: isActive
                          ? "translateX(4px)"
                          : "translateX(0)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {state}
                    </span>
                  </motion.div>
                );
              })}
              <div className="mt-6 pt-6 border-t border-white/[0.07]">
                <p
                  className="text-[#F4B942] text-3xl font-bold leading-none mb-1"
                  style={{ marginTop: "2rem" }}
                >
                  300+
                </p>
                <p className="text-white/40 text-xs uppercase tracking-[0.15em]">
                  Schools Supported
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8 — LOOKING AHEAD
      ============================================================ */}
      <section className="relative z-10 px-8 md:px-20 py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F4B942]/6 blur-[200px] rounded-full" />
        </div>

        <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#F4B942] uppercase tracking-[0.45em] text-lg font-semibold mb-6"
            style={{ marginTop: "8rem", marginBottom: "1.5rem" }}
          >
            OUR VISION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[5rem] font-bold leading-[1.08] tracking-[-0.04em] mb-12"
          >
            Shaping the Future of{" "}
            <span className="text-[#F4B942]">Education</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="text-white/60 text-xl leading-relaxed"
              style={{ marginTop: "4rem" }}
            >
              As we continue to grow, our mission remains unchanged — to help
              schools build strong systems, empower educators, and create
              learning environments where every student can thrive.
            </motion.p>

            {/* Sunrise illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center items-center"
              style={{ marginTop: "1rem" }}
            >
              <svg
                viewBox="0 0 400 300"
                className="w-full max-w-[420px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="sunGlow" cx="50%" cy="48%" r="60%">
                    <stop offset="0%" stopColor="#F4B942" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#F4B942" stopOpacity="0.5" />
                    <stop offset="65%" stopColor="#F4B942" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#F4B942" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <ellipse
                  cx="200"
                  cy="150"
                  rx="200"
                  ry="140"
                  fill="url(#sunGlow)"
                />

                {/* Sun rays */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i / 16) * Math.PI * 2;
                  const cx = 200,
                    cy = 118,
                    inner = 60,
                    outer = 88;
                  const x1 = cx + Math.cos(angle) * inner;
                  const y1 = cy + Math.sin(angle) * inner;
                  const x2 = cx + Math.cos(angle) * outer;
                  const y2 = cy + Math.sin(angle) * outer;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#F4B942"
                      strokeWidth={i % 2 === 0 ? 2 : 1}
                      opacity={i % 2 === 0 ? 0.6 : 0.35}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Sun disc with WISE lettering centered inside it */}
                <circle
                  cx="200"
                  cy="118"
                  r="58"
                  fill="#F4B942"
                  opacity="0.95"
                />
                <text
                  x="200"
                  y="116"
                  textAnchor="middle"
                  fill="#14071A"
                  fontSize="24"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  WISE
                </text>

                <line
                  x1="40"
                  y1="232"
                  x2="360"
                  y2="232"
                  stroke="rgba(244,185,66,0.35)"
                  strokeWidth="1.5"
                />

                <g stroke="rgba(244,185,66,0.4)" strokeWidth="1" fill="none">
                  <line x1="80" y1="232" x2="80" y2="208" />
                  <circle
                    cx="80"
                    cy="200"
                    r="13"
                    fill="rgba(244,185,66,0.15)"
                  />
                  <line x1="320" y1="232" x2="320" y2="208" />
                  <circle
                    cx="320"
                    cy="200"
                    r="13"
                    fill="rgba(244,185,66,0.15)"
                  />
                </g>

                {/* ===== School building — better proportions ===== */}
                <g>
                  {/* Roof */}
                  <polygon
                    points="200,142 145,180 255,180"
                    fill="#14071A"
                    stroke="#F4B942"
                    strokeWidth="1.5"
                  />
                  {/* Main building block */}
                  <rect
                    x="150"
                    y="180"
                    width="100"
                    height="55"
                    fill="#14071A"
                    stroke="#F4B942"
                    strokeWidth="1.5"
                  />

                  {/* Windows + door */}
                  <rect
                    x="162"
                    y="195"
                    width="14"
                    height="14"
                    rx="2"
                    fill="#FFE9B3"
                    opacity="0.9"
                  />
                  <rect
                    x="224"
                    y="195"
                    width="14"
                    height="14"
                    rx="2"
                    fill="#FFE9B3"
                    opacity="0.9"
                  />
                  <rect
                    x="188"
                    y="201"
                    width="24"
                    height="34"
                    rx="8"
                    fill="#FFF3D6"
                  />
                </g>

                {/* ===== Very short flagpole + dark flag ===== */}
                <line
                  x1="200"
                  y1="142"
                  x2="200"
                  y2="124"
                  stroke="#F4B942"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polygon
                  points="200,124 220,130 200,136"
                  fill="#14071A"
                  stroke="#F4B942"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="services-cta" className="relative z-10 px-8 md:px-20 py-24">
        <div className="absolute bottom-0 right-[-120px] w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] border border-[#F4B942]/25 overflow-hidden text-center"
          style={{
            marginTop: "6rem",
            marginLeft: "2rem",
            marginRight: "2rem",
            marginBottom: "2rem",
            padding: "5rem",
            background:
              "linear-gradient(135deg, rgba(244,185,66,0.08) 0%, rgba(168,85,247,0.06) 100%)",
          }}
        >
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F4B942]/06 rounded-full blur-[80px]" />

          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6 relative z-10">
            PARTNER WITH US
          </p>
          <h2
            className="text-5xl md:text-[5.4rem] font-bold leading-[1.1] tracking-[-0.05em] relative z-10"
            style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
          >
            Let's Build Better Institutions{" "}
            <span className="text-[#F4B942]">Together</span>
          </h2>
          <p
            className="text-white/55 text-xl leading-relaxed relative z-10"
            style={{
              marginBottom: "3rem",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            Partner with WISE to create structured, future-ready educational
            institutions.
          </p>

          <div
            className="flex gap-5 flex-wrap justify-center mt-4"
            style={{ marginTop: "2rem" }}
          >
            <Link
              href="/#contact"
              scroll={false}
              className="inline-flex items-center justify-center bg-[#F4B942] text-black rounded-full font-semibold text-sm hover:shadow-[0_0_50px_rgba(244,185,66,0.7)]"
              style={{
                padding: "10px 24px",
                alignSelf: "flex-start",
                display: "inline-flex",
              }}
            >
              Get in Touch
            </Link>
            <a
              href="/services"
              className="inline-flex items-center gap-3 border border-[#F4B942]/40 text-[#F4B942] px-7 py-4 rounded-full font-semibold text-base hover:bg-[#F4B942]/10 hover:border-[#F4B942] hover:shadow-[0_0_30px_rgba(244,185,66,0.2)] transition-all duration-300 w-fit"
              style={{
                padding: "10px 24px",
                alignSelf: "flex-start",
                display: "inline-flex",
                marginBottom: "1rem",
              }}
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
