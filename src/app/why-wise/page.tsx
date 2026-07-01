"use client";

import Navbar from "@/components/Navbar";
import HashScrollFix from "@/components/HashScrollFix";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
  Fingerprint,
  Handshake,
  Settings2,
  GraduationCap,
  CircuitBoard,
} from "lucide-react";

function ServiceVsPartnershipDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 560 520"
      style={{ maxWidth: "680px" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="svp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="svp-arrow-purple"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="rgba(168,85,247,0.5)" />
        </marker>
        <marker
          id="svp-arrow-gold"
          markerWidth="9"
          markerHeight="9"
          refX="4.5"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#F4B942" />
        </marker>
      </defs>

      {/* LEFT PANEL — Traditional */}
      <rect
        x="20"
        y="30"
        width="230"
        height="400"
        rx="24"
        fill="rgba(168,85,247,0.06)"
        stroke="rgba(168,85,247,0.25)"
        strokeWidth="1.2"
      />
      <text
        x="135"
        y="68"
        textAnchor="middle"
        fill="rgba(216,180,254,0.85)"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.18em"
      >
        TRADITIONAL
      </text>
      <text
        x="135"
        y="86"
        textAnchor="middle"
        fill="rgba(216,180,254,0.5)"
        fontSize="11"
        letterSpacing="0.1em"
      >
        CONSULTANCY
      </text>

      {/* Document icons stack */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={95 + i * 6}
          y={120 + i * 10}
          width="80"
          height="100"
          rx="6"
          fill="rgba(168,85,247,0.10)"
          stroke="rgba(168,85,247,0.35)"
          strokeWidth="1"
        />
      ))}
      <g stroke="rgba(216,180,254,0.6)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="113" y1="150" x2="161" y2="150" />
        <line x1="113" y1="162" x2="161" y2="162" />
        <line x1="113" y1="174" x2="145" y2="174" />
      </g>

      <text
        x="135"
        y="270"
        textAnchor="middle"
        fill="rgba(216,180,254,0.55)"
        fontSize="13"
        fontWeight="600"
      >
        Short-term interaction
      </text>
      <text
        x="135"
        y="296"
        textAnchor="middle"
        fill="rgba(216,180,254,0.55)"
        fontSize="13"
        fontWeight="600"
      >
        One-time service
      </text>

      {/* Dimming downward arrow */}
      <path
        d="M135 330 L135 380"
        stroke="rgba(168,85,247,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
        markerEnd="url(#svp-arrow-purple)"
      />
      <text
        x="135"
        y="405"
        textAnchor="middle"
        fill="rgba(216,180,254,0.4)"
        fontSize="11"
        fontStyle="italic"
      >
        relationship ends
      </text>

      {/* CENTER LABEL */}
      <g filter="url(#svp-glow)">
        <rect
          x="225"
          y="220"
          width="110"
          height="56"
          rx="28"
          fill="#1B0826"
          stroke="#F4B942"
          strokeWidth="1.4"
        />
        <text
          x="280"
          y="244"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.05em"
        >
          Service
        </text>
        <text
          x="280"
          y="260"
          textAnchor="middle"
          fill="#F4B942"
          fontSize="12"
          fontWeight="700"
        >
          → Partnership
        </text>
      </g>

      {/* RIGHT PANEL — WISE */}
      <rect
        x="310"
        y="30"
        width="230"
        height="400"
        rx="24"
        fill="rgba(244,185,66,0.07)"
        stroke="rgba(244,185,66,0.35)"
        strokeWidth="1.4"
      />
      <text
        x="425"
        y="68"
        textAnchor="middle"
        fill="#F4B942"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.18em"
      >
        WISE
      </text>
      <text
        x="425"
        y="86"
        textAnchor="middle"
        fill="rgba(244,185,66,0.55)"
        fontSize="11"
        letterSpacing="0.1em"
      >
        LONG-TERM PARTNER
      </text>

      {/* School + Teachers + Students cluster */}
      <text
        x="425"
        y="108"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
      >
        School
      </text>
      <circle
        cx="425"
        cy="150"
        r="26"
        fill="rgba(244,185,66,0.15)"
        stroke="#F4B942"
        strokeWidth="1.4"
      />
      <g
        transform="translate(425,150)"
        stroke="#F4B942"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="0,-13 -10,-4 10,-4" fill="#F4B942" fillOpacity="0.7" />
        <rect
          x="-7"
          y="-4"
          width="14"
          height="11"
          fill="#F4B942"
          fillOpacity="0.5"
        />
      </g>

      <circle
        cx="382"
        cy="222"
        r="20"
        fill="rgba(244,185,66,0.10)"
        stroke="rgba(244,185,66,0.5)"
        strokeWidth="1.2"
      />
      <g
        transform="translate(382,222)"
        stroke="#F4B942"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="0" cy="-4" r="4" />
        <path d="M-7 8 C-7 2 7 2 7 8" />
      </g>
      <text x="382" y="254" textAnchor="middle" fill="white" fontSize="10">
        Teachers
      </text>

      <circle
        cx="468"
        cy="222"
        r="20"
        fill="rgba(244,185,66,0.10)"
        stroke="rgba(244,185,66,0.5)"
        strokeWidth="1.2"
      />
      <g
        transform="translate(468,222)"
        stroke="#F4B942"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="-4.5" cy="-5" r="3.2" />
        <path d="M-9.5 8 C-9.5 2.5 0.5 2.5 0.5 8" />
        <circle cx="4.5" cy="-5" r="3.2" />
        <path d="M-0.5 8 C-0.5 2.5 9.5 2.5 9.5 8" />
      </g>
      <text x="468" y="254" textAnchor="middle" fill="white" fontSize="10">
        Students
      </text>

      {/* Connector lines — from school circle edge to teacher/student circle edge only */}
      <line
        x1="412"
        y1="170"
        x2="392"
        y2="206"
        stroke="rgba(244,185,66,0.4)"
        strokeWidth="1.2"
      />
      <line
        x1="438"
        y1="170"
        x2="458"
        y2="206"
        stroke="rgba(244,185,66,0.4)"
        strokeWidth="1.2"
      />

      {/* Growth arrows + continuous support */}
      <path
        d="M425 260 L425 305"
        stroke="#F4B942"
        strokeWidth="2.2"
        markerEnd="url(#svp-arrow-gold)"
      />
      <text
        x="425"
        y="352"
        textAnchor="middle"
        fill="#F4B942"
        fontSize="13"
        fontWeight="700"
      >
        Continuous support
      </text>
      <text
        x="425"
        y="384"
        textAnchor="middle"
        fill="#F4B942"
        fontSize="12"
        fontWeight="500"
      >
        Growth, year after year
      </text>

      {/* small upward growth chevrons */}
      <g
        transform="translate(425,405)"
        stroke="#F4B942"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="-16,8 -4,-4 4,2 16,-10" />
        <polyline points="8,-10 16,-10 16,-2" />
      </g>
    </svg>
  );
}

/* =========================================================================
   SECTION 2 VISUAL — Affiliation → Trust → ... journey flow
   ========================================================================= */
function JourneyFlowDiagram() {
  const steps = [
    "Affiliation",
    "Trust",
    "System Development",
    "Academic Excellence",
    "Long-Term Partnership",
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col gap-0 w-full max-w-[420px]">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        return (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                borderColor: isActive
                  ? "rgba(244,185,66,0.6)"
                  : "rgba(244,185,66,0.25)",
                backgroundColor: isActive
                  ? "rgba(244,185,66,0.15)"
                  : "rgba(255,255,255,0.04)",
              }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.15 },
                scale: { duration: 0.5, delay: i * 0.15 },
                borderColor: { duration: 0.5 },
                backgroundColor: { duration: 0.5 },
              }}
              className="w-full rounded-[18px] border flex items-center justify-center text-center"
              style={{ padding: "16px 20px" }}
            >
              <motion.span
                animate={{
                  color: isActive ? "#F4B942" : "rgba(255,255,255,0.85)",
                }}
                transition={{ duration: 0.5 }}
                className="font-semibold text-base"
              >
                {step}
              </motion.span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center py-2">
                <motion.div
                  animate={{
                    backgroundColor: isActive
                      ? "rgba(244,185,66,0.8)"
                      : "rgba(244,185,66,0.4)",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-[2px] h-5"
                />
                <svg width="14" height="10" viewBox="0 0 14 10">
                  <motion.polygon
                    points="7,10 0,0 14,0"
                    animate={{
                      fillOpacity: isActive ? 0.9 : 0.55,
                    }}
                    transition={{ duration: 0.5 }}
                    fill="#F4B942"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
/* =========================================================================
   SECTION 3 VISUAL — Magnetic Card
   ========================================================================= */
function MagneticCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const dimsRef = useRef({ W: 0, H: 0 }); // cache dims here
  const [hovered, setHovered] = useState(false);

  // Cache card size once on mount + on resize
  useEffect(() => {
    const update = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      dimsRef.current = { W: rect.width, H: rect.height };
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!hovered) {
      cancelAnimationFrame(frameRef.current);
      return;
    }

    const animate = () => {
      angleRef.current += 1.2;

      const { W, H } = dimsRef.current;
      const r = 28;
      const perimeter = 2 * (W + H);
      const dist = ((angleRef.current % 360) / 360) * perimeter;

      let x = 0;
      let y = 0;

      if (dist < W) {
        x = dist;
        y = 0;
      } else if (dist < W + H) {
        x = W;
        y = dist - W;
      } else if (dist < 2 * W + H) {
        x = W - (dist - W - H);
        y = H;
      } else {
        x = 0;
        y = H - (dist - 2 * W - H);
      }

      if (orbRef.current) {
        orbRef.current.style.left = `${x}px`;
        orbRef.current.style.top = `${y}px`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [hovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-[28px] bg-white/[0.04] backdrop-blur-xl"
      style={{
        padding: "2.5rem 2rem",
        border: hovered
          ? "1.5px solid rgba(244,185,66,0.5)"
          : "1.5px solid rgba(255,255,255,0.1)",
        transition: "border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Orb container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "28px",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          ref={orbRef}
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, #F4B942 25%, rgba(244,185,66,0.2) 60%, transparent 100%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(12px)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Dark mask to only show orb at border edge */}
      <div
        style={{
          position: "absolute",
          inset: "6px",
          borderRadius: "24px",
          background: "#14071A",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-[#F4B942]/10 blur-[100px] rounded-full group-hover:bg-[#F4B942]/20 transition-all duration-500"
        style={{ zIndex: 2 }}
      />

      <div
        className="relative w-16 h-16 rounded-[18px] bg-[#F4B942]/10 border border-[#F4B942]/25 flex items-center justify-center mb-6 group-hover:bg-[#F4B942]/20 group-hover:border-[#F4B942]/50 transition-all duration-300"
        style={{ zIndex: 2 }}
      >
        <Icon size={28} className="text-[#F4B942]" />
      </div>

      <h3
        className="text-2xl font-bold mb-3 group-hover:text-[#F4B942] transition-colors duration-300"
        style={{ marginTop: "1rem", position: "relative", zIndex: 2 }}
      >
        {title}
      </h3>
      <p
        className="text-white/55 text-base leading-relaxed"
        style={{ marginTop: "1rem", position: "relative", zIndex: 2 }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* =========================================================================
   SECTION 5 VISUAL — Files vs thriving ecosystem
   ========================================================================= */
function FilesVsEcosystemDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 340 580"
      style={{ maxWidth: "380px", width: "100%" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fve-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── PAPERWORK label ── */}
      <text
        x="170"
        y="24"
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.18em"
      >
        PAPERWORK
      </text>

      {/* ── File stack (gap added below label + gentle float) ── */}
      {/* ── File stack (more spread) ── */}
      {[
        { dx: -50, dy: -6, rot: -12 },
        { dx: 16, dy: 10, rot: 9 },
        { dx: -18, dy: 22, rot: -3 },
      ].map((f, i) => (
        <g
          key={i}
          transform={`translate(${130 + f.dx},${58 + f.dy}) rotate(${f.rot})`}
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            additive="sum"
            values="0,0; 0,-4; 0,0"
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
          />
          <rect
            width="78"
            height="98"
            rx="6"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <line
            x1="12"
            y1="24"
            x2="66"
            y2="24"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.4"
          />
          <line
            x1="12"
            y1="36"
            x2="66"
            y2="36"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.4"
          />
          <line
            x1="12"
            y1="48"
            x2="48"
            y2="48"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.4"
          />
          <line
            x1="12"
            y1="60"
            x2="55"
            y2="60"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
        </g>
      ))}

      {/* ── "WISE transforms" label ── */}
      <text
        x="170"
        y="208"
        textAnchor="middle"
        fill="rgba(244,185,66,0.75)"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.1em"
      >
        WISE transforms
      </text>

      {/* ── Arrow ── */}
      <rect
        x="168"
        y="216"
        width="4"
        height="44"
        fill="#F4B942"
        opacity="0.85"
      />
      <polygon points="170,274 158,254 182,254" fill="#F4B942" opacity="0.9" />

      {/* ── LIVING INSTITUTION label ── */}
      <text
        x="170"
        y="300"
        textAnchor="middle"
        fill="#F4B942"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.18em"
      >
        LIVING INSTITUTION
      </text>

      {/* ── Outer glow halo (slow pulse) ── */}
      <circle
        cx="170"
        cy="440"
        r="90"
        fill="rgba(244,185,66,0.04)"
        stroke="rgba(244,185,66,0.12)"
        strokeWidth="1"
        filter="url(#fve-glow)"
      >
        <animate
          attributeName="r"
          values="90;96;90"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* ── Center hub ── */}
      <circle
        cx="170"
        cy="440"
        r="46"
        fill="#1B0826"
        stroke="#F4B942"
        strokeWidth="1.8"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.6;1;0.6"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
      <g
        transform="translate(170,438)"
        fill="none"
        stroke="#F4B942"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon
          points="0,-18 -15,-7 15,-7"
          fill="#F4B942"
          fillOpacity="0.7"
          stroke="none"
        />
        <rect
          x="-10"
          y="-7"
          width="20"
          height="16"
          fill="#F4B942"
          fillOpacity="0.45"
          stroke="none"
        />
        <rect x="-4" y="1" width="8" height="8" fill="#1B0826" stroke="none" />
      </g>

      {/* ── Satellite nodes (connectors trimmed to circle edges) ── */}
      {[
        { cx: 60, cy: 358, label: "Teachers" },
        { cx: 280, cy: 358, label: "Students" },
        { cx: 60, cy: 522, label: "Systems" },
        { cx: 280, cy: 522, label: "Growth" },
      ].map(({ cx, cy, label }, i) => {
        const hubX = 170,
          hubY = 440,
          hubR = 46,
          nodeR = 36;
        const dx = cx - hubX;
        const dy = cy - hubY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / dist;
        const uy = dy / dist;
        const x1 = hubX + ux * hubR;
        const y1 = hubY + uy * hubR;
        const x2 = cx - ux * nodeR;
        const y2 = cy - uy * nodeR;

        return (
          <g key={label}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(244,185,66,0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-16"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </line>
            <circle
              cx={cx}
              cy={cy}
              r={nodeR}
              fill="rgba(244,185,66,0.07)"
              stroke="rgba(244,185,66,0.45)"
              strokeWidth="1.3"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.45;0.9;0.45"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={cx}
              y={cy + 5}
              textAnchor="middle"
              fill="white"
              fontSize="11.5"
              fontWeight="600"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* =========================================================================
   SECTION 6 VISUAL — Lifecycle wheel
   ========================================================================= */
function LifecycleWheelDiagram() {
  const stages = [
    {
      label: "Planning",
      sub: "Foundation & goals",
      x: 220,
      y: 80,
      side: "left",
    },
    {
      label: "Implementation",
      sub: "Systems & structure",
      x: 380,
      y: 190,
      side: "right",
    },
    { label: "Support", sub: "Ongoing guidance", x: 220, y: 300, side: "left" },
    {
      label: "Growth",
      sub: "Year-on-year progress",
      x: 380,
      y: 410,
      side: "right",
    },
    {
      label: "Expansion",
      sub: "New horizons & beyond",
      x: 220,
      y: 520,
      side: "left",
    },
  ];

  // Uniform S-curve: control points always at the horizontal midpoint of each segment
  const midX = (220 + 380) / 2; // 300
  const curve = `
    M220,80
    C${midX},80 ${midX},190 380,190
    C${midX},190 ${midX},300 220,300
    C${midX},300 ${midX},410 380,410
    C${midX},410 ${midX},520 220,520
  `;

  return (
    <svg
      width="100%"
      viewBox="0 0 620 600"
      style={{ maxWidth: "620px" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="lcw-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lcw-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4B942" stopOpacity="1" />
          <stop offset="100%" stopColor="#F4B942" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Glow halo */}
      <path
        d={curve}
        fill="none"
        stroke="rgba(244,185,66,0.06)"
        strokeWidth="36"
        filter="url(#lcw-glow)"
      />

      {/* Dashed path — flowing */}
      <path
        d={curve}
        fill="none"
        stroke="url(#lcw-grad)"
        strokeWidth="1.8"
        strokeDasharray="7 5"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-24"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Traveling glow dot */}
      <circle r="5" fill="#F4B942" filter="url(#lcw-glow)">
        <animateMotion
          path={curve}
          dur="6s"
          repeatCount="indefinite"
          rotate="auto"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* START label */}
      <text
        x="220"
        y="24"
        textAnchor="middle"
        fill="rgba(244,185,66,0.5)"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.22em"
      >
        START
      </text>
      <line
        x1="220"
        y1="30"
        x2="220"
        y2="44"
        stroke="rgba(244,185,66,0.3)"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />

      {stages.map(({ label, sub, x, y, side }, i) => {
        const isLast = i === stages.length - 1;
        const highlight = i === 0 || isLast;
        const onLeft = side === "left";

        const tickX1 = onLeft ? x - 34 : x + 34;
        const tickX2 = onLeft ? x - 52 : x + 52;
        const anchor = onLeft ? "end" : "start";
        const labelX = onLeft ? x - 56 : x + 56;

        return (
          <g key={label}>
            <circle
              cx={x}
              cy={y}
              r="34"
              fill="rgba(20,7,26,0.95)"
              stroke={highlight ? "#F4B942" : "rgba(244,185,66,0.3)"}
              strokeWidth={highlight ? "1.8" : "1.2"}
              filter="url(#lcw-glow)"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.5;1;0.5"
                dur="2.4s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>

            {highlight && (
              <circle
                cx={x}
                cy={y}
                r="34"
                fill="none"
                stroke="#F4B942"
                strokeWidth="1.5"
              >
                <animate
                  attributeName="r"
                  values="34;44;34"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            <text
              x={x}
              y={y - 3}
              textAnchor="middle"
              fill={highlight ? "#F4B942" : "rgba(244,185,66,0.55)"}
              fontSize="15"
              fontWeight="800"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            <circle
              cx={x}
              cy={y + 13}
              r="4"
              fill={highlight ? "#F4B942" : "rgba(244,185,66,0.45)"}
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="1.8s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </circle>

            <line
              x1={tickX1}
              y1={y}
              x2={tickX2}
              y2={y}
              stroke="rgba(244,185,66,0.3)"
              strokeWidth="1"
            />

            <text
              x={labelX}
              y={y - 6}
              textAnchor={anchor}
              fill={highlight ? "#F4B942" : "white"}
              fontSize="17"
              fontWeight="700"
            >
              {label}
            </text>
            <text
              x={labelX}
              y={y + 14}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.45)"
              fontSize="13"
            >
              {sub}
            </text>

            {isLast && (
              <g>
                <rect
                  x={onLeft ? labelX - 92 : labelX}
                  y={y + 24}
                  width="92"
                  height="22"
                  rx="11"
                  fill="rgba(244,185,66,0.12)"
                  stroke="rgba(244,185,66,0.45)"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.45;1;0.45"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x={onLeft ? labelX - 46 : labelX + 46}
                  y={y + 39}
                  textAnchor="middle"
                  fill="#F4B942"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="0.12em"
                >
                  AND BEYOND
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function WhyWisePage() {
  return (
    <main className="relative bg-[#14071A] text-white overflow-hidden">
      <Navbar />
      <HashScrollFix />

      <div className="zoom-scale">
        {/* ================= BACKGROUND LIGHTING ================= */}
        <div className="absolute top-[-240px] left-[-240px] w-[480px] h-[480px] bg-[#fea501]/55 blur-[105px] rounded-full" />
        <div className="absolute top-[5%] right-[8%] w-[900px] h-[900px] bg-[#6A00FF]/12 blur-[220px] rounded-full" />
        <div className="absolute top-[22%] right-[16%] w-[420px] h-[420px] bg-[#A855F7]/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-210px] right-[-120px] w-[480px] h-[480px] bg-[#fea501]/35 blur-[155px] rounded-full" />

        {/* ================= SECTION 1 — HERO ================= */}
        <section
          id="hero"
          className="relative z-10 min-h-screen flex items-center px-8 md:px-20"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center w-full">
            {/* LEFT — CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem", marginTop: "4rem" }}
              className="flex flex-col justify-center"
            >
              <p className="text-[#F4B942] uppercase tracking-[0.22em] text-xl md:text-2xl font-semibold mb-6">
                WHY WISE
              </p>

              <motion.h1
                className="heading-fluid-lg"
                style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                More Than a Consultancy.
                <br />
                <span className="text-[#F4B942]">A Long-Term Partner.</span>
              </motion.h1>

              <motion.p
                className="text-white/65 text-xl max-w-xl leading-relaxed"
                style={{ marginBottom: "2rem" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                At WISE, we believe schools deserve more than isolated services.
                We work alongside institutions to build strong foundations,
                sustainable systems, and meaningful educational outcomes.
              </motion.p>
            </motion.div>

            {/* RIGHT — SPLIT SCREEN SVG ILLUSTRATION */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
              className="why-wise-hero-diagram relative flex justify-center items-center"
              style={{ marginRight: "2rem", marginTop: "3rem" }}
            >
              <ServiceVsPartnershipDiagram />
            </motion.div>
          </div>
        </section>

        {/* SPACING */}
        <div className="h-4 md:h-8" />

        {/* ================= SECTION 2 — OUR PHILOSOPHY ================= */}
        <section id="philosophy" className="relative z-10 px-8 md:px-20 py-32">
          <div className="absolute top-[10%] left-[-180px] w-[420px] h-[420px] bg-[#F4B942]/12 blur-[160px] rounded-full" />
          <div className="absolute top-[0%] right-[15%] w-[700px] h-[700px] bg-[#6A00FF]/8 blur-[220px] rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT — CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-12">
                OUR APPROACH
              </p>
              <h2
                className="heading-fluid-lg"
                style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
              >
                Schools Come for{" "}
                <span className="text-[#F4B942]">Affiliation.</span>
                <br />
                They Stay for <span className="text-[#F4B942]">Growth.</span>
              </h2>

              <div className="space-y-6 text-[#D1D5DB] text-xl leading-[1.9] max-w-xl">
                <p>
                  Many schools initially approach us for affiliation support.
                  Over time, they continue to partner with us for academics,
                  training, examinations, institutional systems, and long-term
                  development.
                </p>
                <p className="text-[#F4B942] font-medium">
                  For us, affiliation is not the destination — it is the
                  beginning.
                </p>
              </div>
            </motion.div>

            {/* RIGHT — JOURNEY FLOW */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="journey-flow-wrapper relative flex justify-center"
              style={{ marginRight: "2rem" }}
            >
              <JourneyFlowDiagram />
            </motion.div>
          </div>
        </section>

        {/* SPACING */}
        <div className="h-4 md:h-8" />

        {/* ================= SECTION 3 — DIFFERENTIATOR CARDS ================= */}
        <section
          id="differentiator-cards"
          className="relative z-10 px-8 md:px-16 py-24"
        >
          <div className="absolute top-0 left-[-120px] w-[320px] h-[320px] bg-[#F59E0B]/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-[-120px] w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mb-20"
            style={{ marginTop: "6rem", marginLeft: "2rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-12">
              OUR DIFFERENTIATORS
            </p>
            <h2
              className="heading-fluid-lg"
              style={{ marginTop: "1.5rem", marginBottom: "4rem" }}
            >
              Why Institutions{" "}
              <span className="text-[#F4B942]">Choose WISE</span>
            </h2>
          </motion.div>

          <div
            className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {[
              {
                icon: Puzzle,
                title: "End-to-End Solutions",
                desc: "From school planning and affiliation to academics and operations, we support institutions at every stage of growth.",
              },
              {
                icon: Fingerprint,
                title: "Customized Approach",
                desc: "Every school has unique goals and challenges. Our solutions are designed specifically for each institution.",
              },
              {
                icon: Handshake,
                title: "Long-Term Relationships",
                desc: "Our focus is not one-time projects but building partnerships that continue to evolve over time.",
              },
              {
                icon: Settings2,
                title: "Practical Implementation",
                desc: "We don't just recommend ideas — we help schools implement them effectively.",
              },
              {
                icon: GraduationCap,
                title: "Student-Centric Philosophy",
                desc: "Every solution ultimately aims to improve learning and student development.",
              },
              {
                icon: CircuitBoard,
                title: "Holistic Development",
                desc: "We strengthen academic, administrative, and operational systems together.",
              },
            ].map(({ icon, title, desc }, i) => (
              <MagneticCard
                key={title}
                icon={icon}
                title={title}
                desc={desc}
                delay={i * 0.08}
              />
            ))}
          </div>
        </section>

        {/* SPACING */}
        <div className="h-24 md:h-36" />

        {/* ================= SECTION 4 — ACADEMIC GUIDANCE ================= */}
        <section id="guidance" className="relative z-10 px-8 md:px-20 py-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-[#F4B942]/8 blur-[200px] rounded-full" />
            <div className="absolute bottom-[10%] right-[-80px] w-[400px] h-[400px] bg-[#A855F7]/8 blur-[200px] rounded-full" />
          </div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginBottom: "4rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              ACADEMIC GUIDANCE
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              Inspired by Leaders Who Have{" "}
              <span className="text-[#F4B942]">Shaped Education</span>
            </h2>
          </motion.div>

          {/* Main grid */}
          <div
            className="relative grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            {/* LEFT — content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 guidance-content"
              style={{ marginTop: "-7rem" }}
            >
              <p className="text-white/60 text-xl leading-relaxed">
                At WISE, our approach to education is influenced by some of
                India's most respected academic minds. The guidance and
                association of{" "}
                <span className="text-white font-semibold">
                  Prof. H.C. Verma
                </span>{" "}
                reinforce our belief that true education goes beyond marks and
                focuses on conceptual understanding, curiosity, and meaningful
                learning.
              </p>
              <p className="text-white/60 text-xl leading-relaxed">
                This academic perspective strengthens our work in teacher
                development, institutional improvement, and the creation of
                learning environments that encourage critical thinking and
                lifelong learning.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.015 }}
                className="relative rounded-[20px] border overflow-hidden"
                style={{
                  padding: "1.5rem 2rem",
                  borderColor: "rgba(244,185,66,0.35)",
                  background: "rgba(244,185,66,0.06)",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* animated glow sweep across the box */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 30%, rgba(244,185,66,0.12) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* pulsing quote mark */}
                <motion.p
                  className="text-[#F4B942] text-3xl font-bold mb-3 relative z-10"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  "
                </motion.p>

                <p className="text-white/75 text-lg leading-relaxed italic relative z-10">
                  Strong institutions are built when academic excellence and
                  practical implementation work together.
                </p>

                {/* glowing border accent on hover */}
                <motion.div
                  className="absolute inset-0 rounded-[20px] pointer-events-none"
                  style={{ border: "1.5px solid rgba(244,185,66,0)" }}
                  whileHover={{ borderColor: "rgba(244,185,66,0.6)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* RIGHT — HC Verma node diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
              style={{ marginTop: "-2rem", minHeight: "520px" }}
            >
              <svg
                viewBox="0 0 500 560"
                width="100%"
                style={{ maxWidth: "520px" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="node-glow"
                    x="-40%"
                    y="-40%"
                    width="180%"
                    height="180%"
                  >
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <clipPath id="circle-clip">
                    <circle cx="150" cy="170" r="115" />
                  </clipPath>
                </defs>

                <style>
                  {`
      .tag-card { transition: transform 0.25s ease, filter 0.25s ease; transform-box: fill-box; transform-origin: center; cursor: pointer; }
      .tag-card rect { transition: fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease; }
      .tag-card text { transition: fill 0.25s ease; }
      .tag-card:hover { transform: scale(1.04); }
      .tag-card:hover rect { fill: rgba(244,185,66,0.22); stroke: #F4B942; stroke-width: 1.8; }
      .tag-card:hover text { fill: #FFD980; }
    `}
                </style>

                {/* Photo glow — pulsing */}
                <circle
                  cx="150"
                  cy="170"
                  r="132"
                  fill="rgba(244,185,66,0.05)"
                  filter="url(#node-glow)"
                >
                  <animate
                    attributeName="r"
                    values="132;138;132"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="150"
                  cy="170"
                  r="117"
                  fill="#14071A"
                  stroke="#F4B942"
                  strokeWidth="2"
                  filter="url(#node-glow)"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.7;1;0.7"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <image
                  href="/hc-verma.jpg"
                  x="35"
                  y="55"
                  width="230"
                  height="230"
                  clipPath="url(#circle-clip)"
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Name block */}
                <text
                  x="150"
                  y="320"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="700"
                >
                  Prof. H.C. Verma
                </text>
                <text
                  x="150"
                  y="340"
                  textAnchor="middle"
                  fill="rgba(244,185,66,0.6)"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="0.14em"
                >
                  PHYSICIST · AUTHOR · EDUCATOR
                </text>
                <line
                  x1="90"
                  y1="352"
                  x2="210"
                  y2="352"
                  stroke="rgba(244,185,66,0.2)"
                  strokeWidth="1"
                />
                <text
                  x="150"
                  y="368"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.28)"
                  fontSize="9"
                  letterSpacing="0.14em"
                >
                  IIT KANPUR
                </text>

                {/* Connector spine — flowing dashes */}
                <line
                  x1="280"
                  y1="86"
                  x2="280"
                  y2="338"
                  stroke="rgba(244,185,66,0.3)"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-16"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Tag stack — with hover + flowing tick connectors */}
                {[
                  { y: 60, label: "Teacher Development" },
                  { y: 144, label: "Academic Excellence" },
                  { y: 228, label: "Student-Centric Learning" },
                  { y: 312, label: "Conceptual Education" },
                ].map(({ y, label }, i) => (
                  <g key={label} className="tag-card">
                    <line
                      x1="280"
                      y1={y + 26}
                      x2="296"
                      y2={y + 26}
                      stroke="rgba(244,185,66,0.3)"
                      strokeWidth="1.2"
                    >
                      <animate
                        attributeName="stroke-opacity"
                        values="0.3;0.9;0.3"
                        dur="2s"
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                    <rect
                      x="296"
                      y={y}
                      width="190"
                      height="52"
                      rx="18"
                      fill="rgba(244,185,66,0.1)"
                      stroke="rgba(244,185,66,0.45)"
                      strokeWidth="1.2"
                      filter="url(#node-glow)"
                    />
                    <text
                      x="391"
                      y={y + 30}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#F4B942"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 5 — BEYOND DOCUMENTATION ================= */}
        <section
          id="beyond-documentation"
          className="relative z-10 px-8 md:px-20 py-24"
          style={{ marginTop: "-4rem" }}
        >
          <div className="absolute top-[10%] left-[-100px] w-[400px] h-[400px] bg-[#A855F7]/8 blur-[180px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
                OUR BELIEF
              </p>
              <h2
                className="heading-fluid-lg"
                style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
              >
                We Build <span className="text-[#F4B942]">Institutions,</span>
                <br />
                Not Just <span className="text-[#F4B942]">Files.</span>
              </h2>
              <p className="text-white/55 text-xl max-w-xl leading-relaxed">
                Educational transformation goes far beyond paperwork and
                compliance. Strong schools require systems, trained educators,
                structured processes, and a culture that supports learning. This
                belief defines every engagement at WISE.
              </p>
            </motion.div>

            {/* RIGHT — diagram */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex justify-center items-center"
              style={{ marginTop: "4rem", minWidth: 0 }}
            >
              <FilesVsEcosystemDiagram />
            </motion.div>
          </div>
        </section>

        {/* SPACING */}
        <div className="h-24 md:h-36" />

        {/* ================= SECTION 6 — LONG-TERM SUPPORT (lifecycle wheel) ================= */}
        <section
          id="continuous-support"
          className="relative z-10 px-8 md:px-20 py-24"
        >
          <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] bg-[#6A00FF]/10 blur-[200px] rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
                CONTINUOUS SUPPORT
              </p>
              <h2
                className="heading-fluid-lg"
                style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
              >
                Support That <span className="text-[#F4B942]">Continues</span>{" "}
                Beyond <span className="text-[#F4B942]">Completion</span>{" "}
              </h2>
              <p className="text-white/55 text-xl max-w-xl leading-relaxed">
                Our relationship with schools does not end after project
                completion. We continue to support institutions through changing
                requirements, academic needs, and future growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <LifecycleWheelDiagram />
            </motion.div>
          </div>
        </section>

        {/* SPACING */}
        <div className="h-24 md:h-36" />

        {/* ================= SECTION 7 — COMPARISON ================= */}
        <section id="comparison" className="relative z-10 px-8 md:px-20 py-24">
          <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#A855F7]/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#F4B942]/10 blur-[140px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mb-16"
            style={{ marginLeft: "2rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              THE WISE DIFFERENCE
            </p>
            <h2
              className="heading-fluid-lg"
              style={{ marginTop: "1.5rem", marginBottom: "4rem" }}
            >
              Traditional Consultancy{" "}
              <span className="text-[#F4B942]">vs WISE</span>
            </h2>
          </motion.div>

          <div
            className="relative z-10 grid lg:grid-cols-2 gap-6"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            {/* TRADITIONAL — purple */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-[32px] overflow-hidden"
              style={{ padding: "2.5rem", background: "rgba(168,85,247,0.05)" }}
            >
              {/* seamless rotating border — gradient now wraps smoothly, no hard edge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "34px",
                  background:
                    "conic-gradient(from 0deg, rgba(168,85,247,0.8), rgba(168,85,247,0.1), rgba(168,85,247,0.8) 100%)",
                  zIndex: 0,
                  willChange: "transform",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "1.5px",
                  borderRadius: "32px",
                  background: "#14071A",
                  zIndex: 1,
                }}
              />

              <div className="relative z-10">
                <p
                  className="text-purple-300/80 uppercase tracking-[0.25em] text-base font-semibold mb-8"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Traditional Approach
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    "One-time service",
                    "Documentation focused",
                    "Standard solutions",
                    "Ends after completion",
                    "Individual tasks",
                    "Compliance driven",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-purple-400/60 flex-shrink-0" />
                      <span className="text-white/60 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* WISE — gold */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-[32px] overflow-hidden"
              style={{ padding: "2.5rem", background: "rgba(244,185,66,0.05)" }}
            >
              {/* animated gradient border */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "34px",
                  background:
                    "conic-gradient(from 0deg, #F4B942, rgba(244,185,66,0.1), #F4B942)",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "1.5px",
                  borderRadius: "32px",
                  background: "#14071A",
                  zIndex: 1,
                }}
              />

              <div className="relative z-10">
                <p
                  className="text-[#F4B942] uppercase tracking-[0.25em] text-base font-semibold mb-8"
                  style={{ marginBottom: "0.5rem" }}
                >
                  WISE Approach
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    "Long-term partnership",
                    "Institution focused",
                    "Customized solutions",
                    "Continuous support",
                    "Holistic development",
                    "Growth driven",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-2 h-2 rounded-full bg-[#F4B942] flex-shrink-0"
                        style={{ boxShadow: "0 0 8px rgba(244,185,66,0.8)" }}
                      />
                      <span className="text-white font-medium text-lg">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 8 — CTA ================= */}
        <section id="cta" className="relative z-10 px-8 md:px-20 py-24">
          <div className="absolute bottom-0 right-[-120px] w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="cta-card relative rounded-[40px] border border-[#F4B942]/25 overflow-hidden text-center"
            style={{
              marginTop: "8rem",
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
              Looking for More Than
              <br />
              <span className="text-[#F4B942]">Just a Service Provider?</span>
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
              Partner with WISE to build stronger systems, empowered educators,
              and future-ready institutions.
            </p>
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
                Connect With Us
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================================
   SECTION 1 VISUAL — Service → Partnership split-screen SVG
   ========================================================================= */
