"use client";

import Navbar from "@/components/Navbar";
import HashScrollFix from "@/components/HashScrollFix";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Award,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Search,
  FileX2,
  RefreshCw,
  Sparkles,
  Quote,
  GraduationCap,
  ArrowRight,
  ClipboardCheck,
  Users,
  Calendar,
} from "lucide-react";

function ChainLoop() {
  const DEPART_DELAY = 0.4; // pause after a node lights up before it sends its line onward
  const TRAVEL = 0.6; // how long the line takes to travel to the next node
  const FINAL_HOLD = 1.3; // how long everything stays lit before the whole chain resets
  const SNAP = 0.18; // how fast the grey->gold flip itself happens

  const steps = [
    {
      label: "Documentation",
      size: 64,
      Icon: FolderOpen,
      glow: "0 0 28px rgba(244,185,66,0.55)",
    },
    {
      label: "Approvals",
      size: 64,
      Icon: Award,
      glow: "0 0 28px rgba(244,185,66,0.55)",
    },
    {
      label: "Compliance",
      size: 64,
      Icon: ShieldCheck,
      glow: "0 0 28px rgba(244,185,66,0.55)",
    },
    {
      label: "The Next Milestone",
      size: 92,
      Icon: Sparkles,
      glow: "0 0 45px rgba(244,185,66,0.7)",
      isLast: true,
    },
  ];

  const RAIL = 96; // fixed-width column so every circle (64px or 92px) shares the same center as the line

  // Single sequential timeline. onTime[i] = exact instant icon i lights up.
  // departTime[i] = onTime[i] + DEPART_DELAY (when its line leaves).
  // onTime[i+1] = departTime[i] + TRAVEL — same number the line arrives on,
  // so a node lighting up and the incoming line arriving are mathematically identical.
  const onTime: number[] = [0];
  const departTime: number[] = [];
  steps.forEach((step, i) => {
    if (step.isLast) return;
    departTime[i] = onTime[i] + DEPART_DELAY;
    onTime[i + 1] = departTime[i] + TRAVEL;
  });
  const TOTAL = onTime[onTime.length - 1] + FINAL_HOLD;

  const GREY = {
    border: "rgba(255,255,255,0.28)",
    bg: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.45)",
    shadow: "0 0 0px rgba(244,185,66,0)",
    scale: 0.95,
  };
  const GOLD = {
    border: "rgba(244,185,66,0.7)",
    bg: "rgba(244,185,66,0.12)",
    color: "#F4B942",
    scale: 1,
  };

  // Once a node turns on, it stays on for the rest of THIS loop, then the
  // "loop" repeatType snaps every keyframe array back to its first value
  // (grey) the instant the next cycle begins — giving the reset-together effect.
  const buildGlowSchedule = (onT: number, total: number, snap: number) => {
    if (onT <= 0) {
      return {
        times: [0, 1],
        values: (idle: any, active: any) => [active, active],
      };
    }
    const eps = 0.0006;
    const t1 = Math.max((onT - snap) / total, eps);
    const t2 = Math.min(Math.max(onT / total, t1 + eps), 1 - eps);
    return {
      times: [0, t1, t2, 1],
      values: (idle: any, active: any) => [idle, idle, active, active],
    };
  };

  const clamp = (v: number) => Math.min(Math.max(v, 0.0005), 0.9995);

  return (
    <div
      className="relative flex flex-col items-center mx-auto"
      style={{ gap: "56px", width: "fit-content" }}
    >
      {steps.map((step, i) => {
        const isLast = step.isLast;
        const schedule = buildGlowSchedule(onTime[i], TOTAL, SNAP);
        const times = schedule.times;
        const mk = (idle: any, active: any) => schedule.values(idle, active);

        // Line: departs DEPART_DELAY after this icon turns on, arrives exactly
        // when the next icon's "active" keyframe begins above — same numbers.
        let lineTimes;
        if (!isLast) {
          const lt1 = clamp(departTime[i] / TOTAL);
          const lt2 = clamp(Math.max(onTime[i + 1] / TOTAL, lt1 + 0.001));
          lineTimes = [0, lt1, lt2, 1];
        }

        return (
          <div
            key={step.label}
            className="relative flex items-center gap-5 w-full"
          >
            {/* ICON RAIL */}
            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: RAIL, height: Math.max(step.size, 64) }}
            >
              {!isLast && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] bg-[#F4B942]/60 origin-top"
                  style={{ height: 56 }}
                  animate={{ scaleY: [0, 0, 1, 1] }}
                  transition={{
                    duration: TOTAL,
                    repeat: Infinity,
                    times: lineTimes,
                    ease: "easeInOut",
                  }}
                />
              )}

              <motion.div
                className="rounded-full border flex items-center justify-center"
                style={{ width: step.size, height: step.size }}
                animate={{
                  borderColor: mk(GREY.border, GOLD.border),
                  backgroundColor: mk(GREY.bg, GOLD.bg),
                  color: mk(GREY.color, GOLD.color),
                  scale: mk(GREY.scale, GOLD.scale),
                  boxShadow: mk(GREY.shadow, step.glow),
                }}
                transition={{
                  duration: TOTAL,
                  repeat: Infinity,
                  times,
                  ease: "easeInOut",
                }}
              >
                <step.Icon size={isLast ? 32 : 24} />
              </motion.div>
            </div>

            <p
              className={
                isLast
                  ? "text-[#F4B942] font-semibold text-base whitespace-nowrap"
                  : "text-white/70 text-sm font-medium whitespace-nowrap"
              }
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackRecordPage() {
  return (
    <main className="relative bg-[#14071A] text-white overflow-hidden">
      <Navbar />
      <HashScrollFix />

      <div className="zoom-scale">
        {/* ================= PAGE BACKGROUND LIGHTING ================= */}
        <div className="absolute top-[-240px] left-[-240px] w-[480px] h-[480px] bg-[#fea501]/45 blur-[105px] rounded-full" />
        <div className="absolute top-[5%] right-[8%] w-[900px] h-[900px] bg-[#6A00FF]/10 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-210px] right-[-120px] w-[480px] h-[480px] bg-[#fea501]/30 blur-[155px] rounded-full" />

        {/* ================= SECTION 1 — HERO ================= */}
        <section
          id="track-hero"
          className="relative z-10 min-h-screen flex items-center px-8 md:px-20 py-24"
        >
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center w-full">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
              className="flex flex-col justify-center"
            >
              <p className="text-[#F4B942] uppercase tracking-[0.22em] text-xl md:text-2xl font-semibold mb-6">
                TRACK RECORD
              </p>

              <motion.h1
                className="heading-fluid-lg max-w-none"
                style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Delivering Results.
                <br />
                <span className="text-[#F4B942]">Building Trust.</span>
              </motion.h1>

              <motion.p
                className="text-white/65 text-xl max-w-xl leading-relaxed"
                style={{ marginBottom: "2rem" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Every project represents our commitment to quality, precision,
                and long-term institutional success.
              </motion.p>

              <motion.div
                className="flex gap-8 flex-wrap items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a
                  href="#services-cta"
                  className="bg-[#F4B942] text-black px-16 py-6 rounded-[999px] font-medium tracking-[0.02em] hover:scale-105 hover:shadow-[0_0_50px_rgba(255,198,42,0.9)] transition-all duration-300 min-w-[220px] text-center"
                  style={{ fontSize: "1.05rem" }}
                >
                  Contact Us
                </a>
                <a
                  href="#institutions"
                  className="border border-white/20 text-white px-16 py-6 rounded-[999px] font-medium tracking-[0.02em] hover:bg-white/10 hover:border-[#F4B942]/40 transition-all duration-300 min-w-[220px] text-center"
                  style={{ fontSize: "1.05rem" }}
                >
                  View Case Studies
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT — FLOATING VISUAL */}
            <motion.div
              className="track-hero-diagram relative w-full max-w-[560px] aspect-square mx-auto"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* OUTER RINGS */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] h-[94%] rounded-full border border-white/[0.05]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-white/[0.06]" />

              {/* AMBIENT GLOW */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%]">
                <motion.div
                  className="w-full h-full bg-[#A855F7]/25 blur-[60px] rounded-full"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* CONNECTOR LINES — same 0-100 coordinate space as the node positions below, so they always line up */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ pointerEvents: "none" }}
              >
                <line
                  x1="50"
                  y1="50"
                  x2="24"
                  y2="24"
                  stroke="#F4B942"
                  strokeOpacity="0.3"
                  strokeDasharray="2 2.4"
                  strokeWidth="0.5"
                />
                <line
                  x1="50"
                  y1="50"
                  x2="76"
                  y2="24"
                  stroke="#F4B942"
                  strokeOpacity="0.3"
                  strokeDasharray="2 2.4"
                  strokeWidth="0.5"
                />
                <line
                  x1="50"
                  y1="50"
                  x2="24"
                  y2="76"
                  stroke="#F4B942"
                  strokeOpacity="0.3"
                  strokeDasharray="2 2.4"
                  strokeWidth="0.5"
                />
                <line
                  x1="50"
                  y1="50"
                  x2="76"
                  y2="76"
                  stroke="#F4B942"
                  strokeOpacity="0.3"
                  strokeDasharray="2 2.4"
                  strokeWidth="0.5"
                />
              </svg>

              {/* CENTER BADGE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] h-[34%] rounded-full border-[3px] border-[#F4B942]/70 bg-[#1B0826]/95 flex items-center justify-center shadow-[0_0_55px_rgba(244,185,66,0.35)]">
                <ShieldCheck size={58} className="text-[#F4B942]" />
              </div>

              {/* FLOATING NODES — positioned as % of the square container, centered on that point */}
              {[
                {
                  Icon: FolderOpen,
                  label: "Documentation",
                  top: "24%",
                  left: "24%",
                },
                { Icon: Award, label: "Approvals", top: "24%", left: "76%" },
                {
                  Icon: Building2,
                  label: "Institutions",
                  top: "76%",
                  left: "24%",
                },
                {
                  Icon: CheckCircle2,
                  label: "Compliance",
                  top: "76%",
                  left: "76%",
                },
              ].map(({ Icon, label, top, left }, i) => (
                <div
                  key={label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top, left }}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  >
                    <div className="w-[96px] h-[96px] rounded-full border border-[#F4B942]/30 bg-[#F4B942]/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(244,185,66,0.15)]">
                      <Icon size={34} className="text-[#F4B942]" />
                    </div>
                    <p
                      className="mt-3 text-white/80 text-xs font-medium tracking-[0.08em] uppercase whitespace-nowrap"
                      style={{ marginTop: "0.4rem" }}
                    >
                      {label}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="h-12 md:h-20" />

        {/* ================= SECTION 2 — QUALITY COMMITMENT ================= */}
        <section id="quality" className="relative z-10 px-8 md:px-20 py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[-150px] w-[400px] h-[400px] bg-[#F4B942]/10 blur-[160px] rounded-full" />
            <div className="absolute top-[55%] right-[5%] w-[380px] h-[380px] bg-[#A855F7]/6 blur-[180px] rounded-full" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
                OUR STANDARD OF WORK
              </p>
              <h2
                className="heading-fluid-lg"
                style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
              >
                Excellence Without{" "}
                <span className="text-[#F4B942]">Compromise</span>
              </h2>
              <div className="space-y-6 text-[#D1D5DB] text-xl leading-[1.9] max-w-xl">
                <p>
                  At WISE, every assignment is approached with the same level of
                  commitment and professionalism—regardless of its size or
                  complexity.
                </p>
                <p>
                  From documentation and planning to execution and follow-up,
                  our focus remains on delivering complete, accurate, and
                  satisfactory outcomes for every institution we serve.
                </p>
              </div>

              <div
                className="rounded-[20px] border border-[#F4B942]/30 bg-[#F4B942]/10 max-w-xl"
                style={{ padding: "24px 28px", marginTop: "2.5rem" }}
              >
                <p className="text-[#F4B942] font-bold text-xl mb-2">
                  100% Project Completion & Client Satisfaction
                </p>
                <p className="text-white/65 text-base leading-relaxed">
                  No project undertaken by WISE has resulted in incomplete,
                  substandard, or unsatisfactory work.
                </p>
              </div>
            </motion.div>

            {/* RIGHT — SHIELD */}
            <motion.div
              className="relative flex justify-center items-center"
              style={{ minHeight: 460 }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* AMBIENT GLOW */}
              <motion.div
                className="absolute w-[400px] h-[400px] bg-[#F4B942]/14 blur-[110px] rounded-full"
                animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* OUTER ROTATING RINGS — separate wrapper divs so rotation is actually visible via dash offset, not full-circle spin */}
              <svg
                className="absolute"
                width="420"
                height="420"
                viewBox="0 0 420 420"
                style={{ pointerEvents: "none" }}
              >
                <motion.circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                  strokeDasharray="3 14"
                  animate={{ strokeDashoffset: [0, -170] }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.circle
                  cx="210"
                  cy="210"
                  r="175"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="14 10"
                  animate={{ strokeDashoffset: [0, 240] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>

              <svg width="340" height="400" viewBox="0 0 320 380">
                <defs>
                  <linearGradient id="shieldBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4B942" stopOpacity="0.32" />
                    <stop offset="45%" stopColor="#F4B942" stopOpacity="0.14" />
                    <stop
                      offset="100%"
                      stopColor="#1B0826"
                      stopOpacity="0.65"
                    />
                  </linearGradient>

                  <linearGradient id="shieldEdge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FDE3A0" />
                    <stop offset="50%" stopColor="#F4B942" />
                    <stop offset="100%" stopColor="#C7860A" />
                  </linearGradient>

                  <linearGradient id="shieldSheen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  <filter
                    id="shieldShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="10"
                      stdDeviation="14"
                      floodColor="#000000"
                      floodOpacity="0.35"
                    />
                  </filter>
                </defs>

                {/* shield body with drop shadow */}
                <g filter="url(#shieldShadow)">
                  <path
                    d="M160 28 L292 74 L292 196 C292 282 230 332 160 362 C90 332 28 282 28 196 L28 74 Z"
                    fill="url(#shieldBody)"
                    stroke="url(#shieldEdge)"
                    strokeWidth="2.5"
                  />
                </g>

                {/* top sheen overlay for glassy highlight */}
                <path
                  d="M160 28 L292 74 L292 150 L160 150 L28 150 L28 74 Z"
                  fill="url(#shieldSheen)"
                  opacity="0.6"
                />

                {/* small accent dot at the shield's peak */}
                <circle cx="160" cy="28" r="3.5" fill="#FDE3A0" />

                <text
                  x="160"
                  y="178"
                  textAnchor="middle"
                  fill="#F4B942"
                  fontSize="52"
                  fontWeight="800"
                >
                  100%
                </text>
                <text
                  x="160"
                  y="212"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="0.18em"
                >
                  QUALITY
                </text>
                <text
                  x="160"
                  y="230"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="0.18em"
                >
                  COMMITMENT
                </text>
              </svg>
            </motion.div>
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 3 — PROJECT DIVERSITY ================= */}
        <section
          id="project-diversity"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[-100px] w-[400px] h-[400px] bg-[#A855F7]/10 blur-[160px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "4rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              PROJECT DIVERSITY
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              Supporting Institutions Through{" "}
              <span className="text-[#F4B942]">Diverse Requirements</span>
            </h2>
            <p
              className="text-white/55 text-xl max-w-2xl leading-relaxed mt-6"
              style={{ marginTop: "1rem" }}
            >
              Over the years, WISE has supported schools through a wide range of
              educational requirements extending beyond standard affiliation
              work.
            </p>
          </motion.div>

          <div
            className="relative grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {[
              { label: "Fresh Affiliation", icon: Award },
              { label: "Senior Secondary Upgradation", icon: GraduationCap },
              { label: "Extension Cases", icon: Calendar },
              { label: "Section Increase", icon: Users },
              { label: "Site Shifting", icon: Building2 },
              { label: "School Name Change", icon: FolderOpen },
              { label: "Rejection Resolution", icon: RefreshCw },
              { label: "Ongoing Compliance Support", icon: ShieldCheck },
            ].map(({ label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col gap-4 cursor-default relative overflow-hidden transition-all duration-300 hover:border-[#F4B942]/50 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(244,185,66,0.12)]"
                style={{ padding: "26px 20px" }}
              >
                {/* shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-[-20deg]" />

                {/* top-right corner glow */}
                <div className="pointer-events-none absolute top-[-40px] right-[-40px] w-[120px] h-[120px] rounded-full bg-[#F4B942]/0 group-hover:bg-[#F4B942]/15 blur-[50px] transition-all duration-500" />

                {/* icon ring */}
                <div className="w-11 h-11 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#F4B942]/30 group-hover:border-[#F4B942]/70 group-hover:shadow-[0_0_18px_rgba(244,185,66,0.35)] group-hover:scale-110">
                  <Icon
                    size={20}
                    className="text-[#F4B942] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <p className="text-white font-semibold text-base leading-snug transition-colors duration-300 group-hover:text-[#F4B942]/90">
                  {label}
                </p>

                {/* bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#F4B942]/80 to-transparent transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 4 — COMPLEX CASES ================= */}
        <section
          id="complex-cases"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[5%] left-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "4rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              COMPLEX CASES
            </p>
            <h2
              className="heading-fluid-lg"
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              Every Institution Has{" "}
              <span className="text-[#F4B942]">Unique Challenges</span>
            </h2>
            <p className="text-white/55 text-xl max-w-2xl leading-relaxed">
              Educational institutions often encounter situations that require
              thoughtful planning and customized solutions. WISE approaches
              every challenge with flexibility, experience, and a
              solution-oriented mindset.
            </p>
          </motion.div>

          <div
            className="relative flex flex-col gap-6"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {[
              {
                key: "inspection",
                tag: "Case Type",
                title: "Failed Inspection",
                description:
                  "Schools that failed CBSE inspections due to documentation gaps or infrastructure non-compliance.",
                steps: [
                  { Icon: Search, label: "Inspection Challenge" },
                  { Icon: ClipboardCheck, label: "Strategic Support" },
                  { Icon: Award, label: "Successful Outcome" },
                ],
              },
              {
                key: "rejection",
                tag: "Case Type",
                title: "Affiliation Rejected",
                description:
                  "Applications rejected by the board due to procedural errors, incomplete filings, or compliance gaps.",
                steps: [
                  { Icon: FileX2, label: "Rejection Case" },
                  { Icon: FolderOpen, label: "Documentation Review" },
                  { Icon: CheckCircle2, label: "Resolution" },
                ],
              },
              {
                key: "shifting",
                tag: "Case Type",
                title: "Site Relocation",
                description:
                  "Institutions needing to shift premises while maintaining uninterrupted affiliation status.",
                steps: [
                  { Icon: Building2, label: "Site Shifting" },
                  { Icon: ShieldCheck, label: "Compliance Planning" },
                  { Icon: RefreshCw, label: "Smooth Transition" },
                ],
              },
            ].map(({ key, tag, title, description, steps }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:bg-white/[0.07]"
                style={{ padding: "36px 40px" }}
              >
                {/* animated gold top border that draws in from left */}
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#F4B942] via-[#F4B942]/60 to-transparent transition-all duration-700 ease-out" />

                {/* radial spotlight that follows from center on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(244,185,66,0.07) 0%, transparent 70%)",
                  }}
                />

                <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
                  {/* LEFT */}
                  <div className="lg:w-[280px] flex-shrink-0">
                    <span className="text-[#F4B942]/60 uppercase tracking-[0.2em] text-xs font-semibold">
                      {tag}
                    </span>
                    <h3 className="text-white font-bold text-2xl mt-1 mb-2 transition-colors duration-300 group-hover:text-[#F4B942]">
                      {title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                      {description}
                    </p>
                  </div>

                  {/* DIVIDER */}
                  <div className="hidden lg:block w-px self-stretch bg-white/10 flex-shrink-0" />

                  {/* RIGHT — flow steps */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 flex-1">
                    {steps.map((step, i) => (
                      <div
                        key={step.label}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-[60px] h-[60px] rounded-full border border-[#F4B942]/30 bg-[#F4B942]/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#F4B942]/60 group-hover:bg-[#F4B942]/20"
                            style={{ transitionDelay: `${i * 80}ms` }}
                          >
                            <step.Icon size={24} className="text-[#F4B942]" />
                          </div>
                          <p className="text-white/70 text-xs font-medium text-center max-w-[100px] leading-snug">
                            {step.label === "Smooth Transition" ? (
                              <>
                                Smooth
                                <br />
                                Transition
                              </>
                            ) : (
                              step.label
                            )}
                          </p>
                        </div>
                        {i < steps.length - 1 && (
                          <ArrowRight
                            size={18}
                            className="text-[#F4B942]/30 flex-shrink-0 hidden sm:block group-hover:text-[#F4B942]/60 transition-colors duration-300"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 5 — PARTNERSHIPS THAT GROW ================= */}
        <section
          id="partnerships"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[-120px] w-[420px] h-[420px] bg-[#A855F7]/10 blur-[180px] rounded-full" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
                PARTNERSHIPS THAT GROW
              </p>
              <h2
                className="heading-fluid-sm"
                style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
              >
                From One Requirement to{" "}
                <span className="text-[#F4B942]">Continued Support</span>
              </h2>
              <p className="text-white/55 text-xl max-w-xl leading-relaxed">
                Many institutions initially approach WISE with a specific
                requirement. Over time, these relationships evolve into broader
                collaborations supporting multiple stages of institutional
                development.
              </p>
            </motion.div>

            {/* TREE ILLUSTRATION */}
            <motion.div
              className="relative flex justify-center"
              style={{ minHeight: 480 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute w-[380px] h-[380px] bg-[#F4B942]/8 blur-[120px] rounded-full" />
              <svg width="440" height="480" viewBox="0 0 440 480">
                <defs>
                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F4B942" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#F4B942" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* ROOTS */}
                <path
                  d="M220 420 C190 440 150 445 110 440"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M220 420 C250 440 290 445 330 440"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M220 420 L220 440"
                  stroke="#F4B942"
                  strokeOpacity="0.4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="220" cy="430" r="3" fill="#F4B942" />

                <rect
                  x="158"
                  y="448"
                  rx="14"
                  width="125"
                  height="30"
                  fill="rgba(244,185,66,0.12)"
                  stroke="#F4B942"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
                <text
                  x="220"
                  y="468"
                  textAnchor="middle"
                  fill="#F4B942"
                  fontSize="13"
                  fontWeight="700"
                  letterSpacing="0.1em"
                >
                  TRUST
                </text>

                {/* TRUNK */}
                <path
                  d="M220 420 C218 360 222 300 220 250"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.6"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* BRANCHES — endpoints pulled back so lines stop at circle edge (r=34) */}
                {/* Affiliation */}
                <path
                  id="branch-affiliation"
                  d="M220 340 C170 320 130 295 109 257"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Academics */}
                <path
                  id="branch-academics"
                  d="M220 300 C195 275 168 240 151 196"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Training */}
                <path
                  id="branch-training"
                  d="M220 250 L220 114"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Compliance */}
                <path
                  id="branch-compliance"
                  d="M220 300 C245 275 272 240 289 196"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Growth */}
                <path
                  id="branch-growth"
                  d="M220 340 C270 320 310 295 331 257"
                  fill="none"
                  stroke="#F4B942"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* LEAF NODES */}
                {[
                  { x: 80, y: 240, label: "Affiliation", delay: 0 },
                  { x: 130, y: 170, label: "Academics", delay: 0.3 },
                  { x: 220, y: 80, label: "Training", delay: 0.6 },
                  { x: 310, y: 170, label: "Compliance", delay: 0.9 },
                  { x: 360, y: 240, label: "Growth", delay: 1.2 },
                ].map(({ x, y, label, delay }) => (
                  <motion.g
                    key={label}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3.5 + delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="34"
                      fill="rgba(244,185,66,0.10)"
                      stroke="#F4B942"
                      strokeOpacity="0.5"
                      strokeWidth="1.3"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11.5"
                      fontWeight="600"
                    >
                      {label}
                    </text>
                  </motion.g>
                ))}

                {/* TRUNK BALL */}
                <motion.circle
                  cx="220"
                  r="4"
                  fill="#F4B942"
                  animate={{
                    cy: [420, 340, 300, 114],
                    opacity: [0, 1, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.261, 0.392, 0.592],
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, 0.02, 0.241, 0.392, 0.392, 0.592],
                    },
                  }}
                />

                {/* LOWER SPLIT — Affiliation & Growth — spawn at 0.261, arrive at 0.592 (same as everyone else) */}
                {["branch-affiliation", "branch-growth"].map((pathId) => (
                  <circle key={pathId} r="4" fill="#F4B942">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      keyPoints="0;0;1;1"
                      keyTimes="0;0.261;0.592;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      dur="3s"
                      repeatCount="indefinite"
                      keyTimes="0;0.259;0.261;0.58;0.592;1"
                      values="0;0;1;1;0;0"
                    />
                  </circle>
                ))}

                {/* UPPER SPLIT — Academics & Compliance — spawn at 0.392, arrive at 0.592 (same time) */}
                {["branch-academics", "branch-compliance"].map((pathId) => (
                  <circle key={pathId} r="4" fill="#F4B942">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      keyPoints="0;0;1;1"
                      keyTimes="0;0.392;0.592;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      dur="3s"
                      repeatCount="indefinite"
                      keyTimes="0;0.39;0.392;0.58;0.592;1"
                      values="0;0;1;1;0;0"
                    />
                  </circle>
                ))}
              </svg>
            </motion.div>
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 6 — FEATURED INSTITUTIONS ================= */}
        <section
          id="institutions"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-[0%] left-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "4rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              INSTITUTIONS WE HAVE SUPPORTED
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              Diverse Institutions.{" "}
              <span className="text-[#F4B942]">
                Shared Commitment to Excellence.
              </span>
            </h2>
          </motion.div>

          <div
            className="relative grid md:grid-cols-2 gap-6"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {[
              {
                name: "Montfort Brothers of St. Gabriel",
                scope:
                  "Affiliation support, extension cases, section increase, and ongoing CBSE requirements.",
              },
              {
                name: "Carmel Convent School",
                scope:
                  "Affiliation, inspection support, site shifting, extension cases, and teacher training.",
              },
              {
                name: "Sri Chaitanya School",
                scope: "Multiple compliance and institutional requirements.",
              },
              {
                name: "Jindal School",
                scope:
                  "Affiliation, inspection support, site shifting, extension cases, and teacher development.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl relative overflow-hidden transition-colors duration-400 hover:bg-white/[0.07]"
                style={{ padding: "36px 36px 32px" }}
              >
                {/* animated border ring that traces the card outline on hover */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ borderRadius: 28 }}
                >
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="27"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="1.5"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    className="transition-all duration-[1100ms] ease-out group-hover:[stroke-dashoffset:0]"
                    style={{ opacity: 0.6 }}
                  />
                </svg>

                {/* icon */}
                <div className="w-12 h-12 rounded-[14px] bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center transition-all duration-500 group-hover:bg-[#F4B942]/25 group-hover:border-[#F4B942]/60 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(244,185,66,0.3)]">
                  <GraduationCap size={22} className="text-[#F4B942]" />
                </div>

                {/* name */}
                <h3
                  className="text-white font-bold text-2xl leading-snug transition-colors duration-300 group-hover:text-[#F4B942]"
                  style={{ marginTop: "1.5rem" }}
                >
                  {item.name}
                </h3>

                {/* scope */}
                <p
                  className="text-white/50 text-base leading-relaxed group-hover:text-white/70 transition-colors duration-300 flex-1"
                  style={{ marginTop: "1rem" }}
                >
                  {item.scope}
                </p>

                {/* badge — fixed distance from text block via marginTop, not pushed by content length */}
                <span
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.12em] rounded-full border border-[#F4B942]/30 text-[#F4B942] bg-[#F4B942]/5 group-hover:bg-[#F4B942]/15 group-hover:border-[#F4B942]/60 transition-all duration-300 w-fit"
                  style={{ padding: "7px 16px", marginTop: "2rem" }}
                >
                  Long-Term Association
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 7 — HOW WE GROW ================= */}
        <section id="how-we-grow" className="relative z-10 px-8 md:px-20 pb-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-100px] w-[400px] h-[400px] bg-[#A855F7]/10 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "3rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              HOW WE GROW
            </p>
            <h2
              className="heading-fluid-lg"
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              Built Through Trust,{" "}
              <span className="text-[#F4B942]">Not Advertising</span>
            </h2>
            <p className="text-white/55 text-xl max-w-2xl leading-relaxed">
              For years, WISE has grown primarily through recommendations and
              the confidence placed in us by educational institutions. Our
              greatest source of growth has always been the trust and
              satisfaction of the schools we serve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            style={{
              padding: "48px 40px",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <div className="flex flex-wrap items-start justify-center gap-6 md:gap-3">
              {[
                { Icon: Award, label: "Successful Work" },
                { Icon: ShieldCheck, label: "Trust" },
                { Icon: Users, label: "Recommendations" },
                { Icon: Building2, label: "New Institutions" },
                { Icon: Sparkles, label: "Long-Term Relationships" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="w-[78px] h-[78px] rounded-full border border-[#F4B942]/30 bg-[#F4B942]/10 flex items-center justify-center"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(244,185,66,0)",
                          "0 0 0px rgba(244,185,66,0)",
                          "0 0 30px rgba(244,185,66,0.6)",
                          "0 0 0px rgba(244,185,66,0)",
                          "0 0 0px rgba(244,185,66,0)",
                        ],
                        borderColor: [
                          "rgba(244,185,66,0.3)",
                          "rgba(244,185,66,0.3)",
                          "rgba(244,185,66,0.9)",
                          "rgba(244,185,66,0.3)",
                          "rgba(244,185,66,0.3)",
                        ],
                        scale: [1, 1, 1.08, 1, 1],
                      }}
                      transition={{
                        duration: arr.length * 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [
                          0,
                          i / arr.length,
                          (i + 0.5) / arr.length,
                          (i + 1) / arr.length,
                          1,
                        ],
                      }}
                    >
                      <step.Icon size={30} className="text-[#F4B942]" />
                    </motion.div>
                    <p className="text-white/85 text-sm font-medium text-center max-w-[120px] h-[40px] flex items-center justify-center leading-snug">
                      {step.label}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight
                      size={24}
                      className="text-[#F4B942]/50 flex-shrink-0"
                      style={{ marginBottom: "40px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 8 — TESTIMONIALS ================= */}
        <section
          id="testimonials"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-[0%] right-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "4rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              TESTIMONIALS
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              What Our <span className="text-[#F4B942]">Clients Say</span>
            </h2>
          </motion.div>

          <div
            className="relative grid md:grid-cols-3 gap-10"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {[
              {
                quote:
                  "Professional guidance and continuous support throughout the process.",
                name: "Principal",
                place: "MGM Higher Secondary School, Chhattisgarh",
              },
              {
                quote: "A dependable partner for institutional development.",
                name: "Director",
                place: "KC Public School, Odisha",
              },
              {
                quote: "Responsive, knowledgeable, and committed to quality.",
                name: "Principal",
                place: "Emerald Heights School, Madhya Pradesh",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name + t.place}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="group relative flex flex-col"
                style={{ paddingLeft: "28px" }}
              >
                {/* vertical accent bar — grows taller + brighter on hover */}
                <div
                  className="absolute left-0 top-[6px] w-[3px] rounded-full bg-[#F4B942]"
                  style={{ height: "calc(100% - 12px)" }}
                />

                {/* ghost quote mark, large and faint, sits behind the text */}
                <Quote
                  size={64}
                  className="text-[#F4B942]/15 absolute -top-2 left-4 transition-colors duration-500 group-hover:text-[#F4B942]/35"
                />

                <p
                  className="relative text-white/80 text-xl leading-relaxed italic transition-colors duration-300 group-hover:text-white/95"
                  style={{ marginTop: "3rem" }}
                >
                  "{t.quote}"
                </p>

                <div style={{ marginTop: "2rem" }}>
                  <p className="text-white font-semibold text-base">{t.name}</p>
                  <p
                    className="text-[#F4B942]/70 text-sm uppercase tracking-[0.15em]"
                    style={{ marginTop: "0.35rem" }}
                  >
                    {t.place}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-24 md:h-36" />

        {/* ================= SECTION 9 — LOOKING AHEAD ================= */}
        <section
          id="looking-ahead"
          className="relative z-10 px-8 md:px-20 pb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-100px] w-[420px] h-[420px] bg-[#A855F7]/8 blur-[180px] rounded-full" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
                LOOKING AHEAD
              </p>
              <h2
                className="heading-fluid-sm"
                style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
              >
                Every Success Becomes a{" "}
                <span className="text-[#F4B942]">Foundation for the Next</span>
              </h2>
              <p className="text-white/55 text-xl max-w-xl leading-relaxed">
                While we value our achievements, our focus remains on continuous
                improvement and supporting institutions with the same commitment
                that has guided us from the beginning.
              </p>
            </motion.div>

            <motion.div
              className="relative flex justify-center items-center"
              style={{ minHeight: 480 }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute w-[380px] h-[520px] bg-[#F4B942]/10 blur-[130px] rounded-full" />
              <ChainLoop />
            </motion.div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section
          id="services-cta"
          className="relative z-10 px-8 md:px-20 py-24"
        >
          <div className="absolute bottom-0 right-[-120px] w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="cta-card relative rounded-[40px] border border-[#F4B942]/25 overflow-hidden text-center"
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

            <p className="cta-label text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6 relative z-10">
              GET STARTED
            </p>
            <h2
              className="heading-fluid-lg relative z-10"
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              Let's Build the Next{" "}
              <span className="text-[#F4B942]">Success Story Together</span>
            </h2>

            <div className="flex gap-6 justify-center flex-wrap relative z-10">
              <a
                href="https://calendly.com/wise-educatingindia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#F4B942] text-black rounded-full font-semibold text-sm hover:shadow-[0_0_50px_rgba(244,185,66,0.7)]"
                style={{
                  padding: "10px 24px",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                }}
              >
                Schedule a Consultation
              </a>
              <a
                href="mailto:wise.educatingindia@gmail.com"
                className="inline-flex items-center gap-3 border border-[#F4B942]/40 text-[#F4B942] px-7 py-4 rounded-full font-semibold text-base hover:bg-[#F4B942]/10 hover:border-[#F4B942] hover:shadow-[0_0_30px_rgba(244,185,66,0.2)] transition-all duration-300 w-fit"
                style={{
                  padding: "10px 24px",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
