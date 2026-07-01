"use client";

import Navbar from "@/components/Navbar";
import HashScrollFix from "@/components/HashScrollFix";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Building2,
  BookOpen,
  ClipboardList,
  Users,
  TrendingUp,
  Star,
  Settings,
  BadgeCheck,
  Search,
  ChevronDown,
} from "lucide-react";

const services = [
  {
    id: "affiliation",
    number: "01",
    title: "Affiliation & Compliance",
    tagline: "Navigate every stage with confidence",
    description:
      "Complete support across the CBSE and multi-board affiliation lifecycle — from fresh applications and section increases to post-affiliation compliance and continuous regulatory readiness.",
    icon: FileText,
    phases: [
      {
        label: "Pre-Affiliation",
        items: [
          "Infrastructure readiness audit",
          "Staff norms and documentation",
          "Application preparation and support",
        ],
      },
      {
        label: "During Affiliation",
        items: [
          "Inspection preparation",
          "Deficiency resolution",
          "Compliance guidance",
        ],
      },
      {
        label: "Post-Affiliation",
        items: [
          "OASIS, SQAAF, SAFAL",
          "LOC and renewal support",
          "Continuous compliance monitoring",
        ],
      },
    ],
    tags: [
      "CBSE Affiliation",
      "ICSE",
      "IB",
      "State Board",
      "Inspection Support",
      "OASIS",
      "SQAAF",
      "SAFAL",
    ],
  },
  {
    id: "school-planning",
    number: "02",
    title: "School Planning & Development",
    tagline: "From concept to a thriving institution",
    description:
      "End-to-end support for new institutions — from vision articulation and infrastructure planning to recruitment frameworks and five-year strategic roadmaps.",
    icon: Building2,
    phases: [
      {
        label: "Concept & Vision",
        items: [
          "School concept planning",
          "Vision and mission framework",
          "Five-year perspective plan",
        ],
      },
      {
        label: "Infrastructure",
        items: [
          "Infrastructure planning",
          "Interior space planning",
          "Laboratory and library design",
        ],
      },
      {
        label: "Launch Readiness",
        items: [
          "Teacher recruitment support",
          "Branding strategy",
          "Pre-opening systems setup",
        ],
      },
    ],
    tags: [
      "New School Setup",
      "Infrastructure Planning",
      "Interior Design",
      "Recruitment",
      "Branding",
      "Growth Strategy",
    ],
  },
  {
    id: "academics",
    number: "03",
    title: "Academic Solutions",
    tagline: "Structured learning that delivers outcomes",
    description:
      "Designing academic systems that improve teaching effectiveness, curriculum delivery, and institutional performance — built around NEP principles and best practices in pedagogy.",
    icon: BookOpen,
    phases: [
      {
        label: "Planning",
        items: [
          "Annual academic planning",
          "Lesson plan frameworks",
          "Pedagogical planning calendars",
        ],
      },
      {
        label: "Delivery",
        items: [
          "Classroom instruction models",
          "Skill development programs",
          "Student feedback systems",
        ],
      },
      {
        label: "Review",
        items: [
          "Academic audits",
          "Learning outcome analysis",
          "Continuous improvement cycles",
        ],
      },
    ],
    tags: [
      "Lesson Planning",
      "Academic Planning",
      "Pedagogical Frameworks",
      "Academic Audits",
      "Skill Development",
      "NEP Alignment",
    ],
  },
  {
    id: "examination",
    number: "04",
    title: "Examination Systems",
    tagline: "Consistent, transparent, data-driven assessment",
    description:
      "Building examination frameworks that provide clarity, consistency, and actionable insights — from question paper design to NEP-aligned report cards and parent feedback systems.",
    icon: ClipboardList,
    phases: [
      {
        label: "Design",
        items: [
          "Question paper design",
          "Marking scheme development",
          "Assessment calendar planning",
        ],
      },
      {
        label: "Execution",
        items: [
          "Internal and external assessments",
          "Invigilation systems",
          "Digital and paper formats",
        ],
      },
      {
        label: "Reporting",
        items: [
          "NEP-aligned report cards",
          "Result analytics",
          "Parent feedback systems",
        ],
      },
    ],
    tags: [
      "Question Papers",
      "Marking Schemes",
      "NEP Report Cards",
      "Assessments",
      "Result Analytics",
      "Parent Feedback",
    ],
  },
  {
    id: "training",
    number: "05",
    title: "Training & Development",
    tagline: "Empowering educators at every level",
    description:
      "Structured training programs that build teacher effectiveness through modern pedagogy, assessment practices, classroom management, and NEP orientation — for sustainable school-wide improvement.",
    icon: Users,
    phases: [
      {
        label: "Teacher Training",
        items: [
          "Pedagogy and classroom management",
          "Assessment practices",
          "Technology integration",
        ],
      },
      {
        label: "NEP Orientation",
        items: [
          "Foundational literacy and numeracy",
          "Competency-based learning",
          "Holistic progress cards",
        ],
      },
      {
        label: "Student Programs",
        items: [
          "Academic skill-building",
          "Personality development",
          "Confidence and leadership",
        ],
      },
    ],
    tags: [
      "Teacher Training",
      "Pedagogy",
      "NEP Orientation",
      "Classroom Management",
      "Capacity Building",
      "Technology Integration",
    ],
  },
  {
    id: "student-growth",
    number: "06",
    title: "Student Growth & Advancement",
    tagline: "Holistic development beyond the classroom",
    description:
      "Supporting students through career guidance, skill development, and confidence-building programs that prepare them for life beyond school.",
    icon: Star,
    phases: [
      {
        label: "Academic Guidance",
        items: [
          "Study skills workshops",
          "Exam anxiety support",
          "Academic mentoring",
        ],
      },
      {
        label: "Career & Future",
        items: [
          "Career counselling sessions",
          "Stream selection guidance",
          "College readiness programs",
        ],
      },
      {
        label: "Personal Growth",
        items: [
          "Personality development",
          "Confidence building",
          "Leadership programs",
        ],
      },
    ],
    tags: [
      "Career Counselling",
      "Skill Development",
      "Personality Development",
      "Academic Guidance",
      "Mentoring",
      "Exam Support",
    ],
  },
  {
    id: "branding",
    number: "07",
    title: "School Branding & Admissions",
    tagline: "Build a reputation that fills classrooms",
    description:
      "Helping schools position themselves distinctively, attract the right families, and build lasting community trust through strategic branding and admissions campaigns.",
    icon: TrendingUp,
    phases: [
      {
        label: "Brand Strategy",
        items: [
          "School identity and positioning",
          "Visual brand development",
          "Messaging and communication",
        ],
      },
      {
        label: "Admissions",
        items: [
          "Admissions campaigns",
          "Enrolment process design",
          "Parent conversion systems",
        ],
      },
      {
        label: "Community",
        items: [
          "Parent engagement programs",
          "Community outreach",
          "Reputation management",
        ],
      },
    ],
    tags: [
      "Branding Strategy",
      "Admissions Campaigns",
      "Community Engagement",
      "Parent Outreach",
      "School Positioning",
      "Marketing",
    ],
  },
  {
    id: "upgradation",
    number: "08",
    title: "Systemic School Upgradation",
    tagline: "Transforming operations from the inside out",
    description:
      "Comprehensive institutional upgrade across academic, administrative, library, laboratory, and operational departments — building the systems that enable sustainable excellence.",
    icon: Settings,
    phases: [
      {
        label: "Academic Departments",
        items: [
          "Examination department setup",
          "Library systems",
          "Laboratory management",
        ],
      },
      {
        label: "Administration",
        items: [
          "Office administration processes",
          "Accounts and finance systems",
          "HR and staffing frameworks",
        ],
      },
      {
        label: "Operational Systems",
        items: [
          "Teaching-learning processes",
          "Training systems",
          "Quality assurance protocols",
        ],
      },
    ],
    tags: [
      "Administration",
      "Accounts",
      "Library Systems",
      "Lab Systems",
      "Operations",
      "Quality Assurance",
    ],
  },
];

export default function ServicesPage() {
  const [openService, setOpenService] = useState<string | null>(null);

  const timelineSteps = [
    "Vision",
    "Planning",
    "Infrastructure",
    "Recruitment",
    "Launch",
    "Growth",
  ];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);
  const [activeProfile, setActiveProfile] = useState(0);

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

        {/* ================= HERO SECTION ================= */}
        <section className="relative z-10 min-h-screen flex items-center px-8 md:px-20">
          <div
            className="w-full grid lg:grid-cols-2 gap-12 items-center"
            style={{ marginTop: "4rem" }}
          >
            {/* LEFT: copy */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ marginLeft: "2rem" }}
            >
              <p className="text-[#F4B942] uppercase tracking-[0.22em] text-xl md:text-2xl font-semibold mb-6">
                OUR SERVICES
              </p>

              <motion.h1
                className="heading-fluid-lg max-w-4xl"
                style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Comprehensive Solutions
                <br />
                <span className="text-[#F4B942]">for Every School</span>
              </motion.h1>

              <motion.p
                className="text-white/65 text-xl max-w-2xl leading-relaxed"
                style={{ marginBottom: "2.5rem" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                From school establishment and affiliation to academics,
                training, examinations, and institutional development — WISE
                provides end-to-end solutions tailored to each school's unique
                vision.
              </motion.p>

              <motion.div
                className="flex gap-6 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("services-detail");
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="bg-[#F4B942] text-black px-16 py-6 rounded-[999px] font-medium tracking-[0.02em] hover:scale-105 hover:shadow-[0_0_50px_rgba(255,198,42,0.9)] transition-all duration-300 min-w-[220px]"
                  style={{ fontSize: "1.05rem" }}
                >
                  Explore Services
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById("services-cta");
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="border border-white/20 text-white px-16 py-6 rounded-[999px] font-medium tracking-[0.02em] hover:bg-white/10 hover:border-[#F4B942]/40 transition-all duration-300 min-w-[220px]"
                  style={{ fontSize: "1.05rem" }}
                >
                  Talk to Our Experts
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT: vertical icon diagram, inlined */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center items-center"
            >
              <svg
                viewBox="0 0 520 820"
                className="w-full max-w-[460px] h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="nodeGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F4B942" stopOpacity="0.18" />
                    <stop
                      offset="100%"
                      stopColor="#A855F7"
                      stopOpacity="0.10"
                    />
                  </linearGradient>
                  <linearGradient id="growthStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F4B942" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                  <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4B942" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#F4B942" stopOpacity="0" />
                  </linearGradient>
                  <filter
                    id="softGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>

                {/* vertical spine */}
                <line
                  x1="80"
                  y1="95"
                  x2="80"
                  y2="575"
                  stroke="#F4B942"
                  strokeOpacity="0.22"
                  strokeWidth="2"
                  strokeDasharray="2 8"
                />

                {/* School Building */}
                <circle
                  cx="80"
                  cy="95"
                  r="52"
                  fill="url(#nodeGlow)"
                  filter="url(#softGlow)"
                />
                <circle
                  cx="80"
                  cy="95"
                  r="48"
                  fill="#1F0E28"
                  stroke="#F4B942"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <g transform="translate(80, 96) scale(1.4)">
                  <path
                    d="M-18,0 L0,-15 L18,0"
                    stroke="#F4B942"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <rect
                    x="-14"
                    y="0"
                    width="28"
                    height="17"
                    rx="2"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                  />
                  <rect x="-3" y="8" width="6" height="9" fill="#F4B942" />
                  <rect
                    x="-9.5"
                    y="3.5"
                    width="4"
                    height="4"
                    fill="#F4B942"
                    fillOpacity="0.7"
                  />
                  <rect
                    x="5.5"
                    y="3.5"
                    width="4"
                    height="4"
                    fill="#F4B942"
                    fillOpacity="0.7"
                  />
                </g>
                <text
                  x="148"
                  y="102"
                  fill="#ffffff"
                  fillOpacity="0.9"
                  fontSize="21"
                  fontWeight="600"
                >
                  School Building
                </text>

                {/* Teachers */}
                <circle
                  cx="80"
                  cy="255"
                  r="52"
                  fill="url(#nodeGlow)"
                  filter="url(#softGlow)"
                />
                <circle
                  cx="80"
                  cy="255"
                  r="48"
                  fill="#1F0E28"
                  stroke="#F4B942"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <g transform="translate(80, 257) scale(1.4)">
                  <circle
                    cx="-9"
                    cy="-9"
                    r="7"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M-19,15 Q-9,-2 1,15 Z"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="-5"
                    r="6"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M1,17 Q10,4 19,17 Z"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </g>
                <text
                  x="148"
                  y="262"
                  fill="#ffffff"
                  fillOpacity="0.9"
                  fontSize="21"
                  fontWeight="600"
                >
                  Teachers
                </text>

                {/* Students */}
                <circle
                  cx="80"
                  cy="415"
                  r="52"
                  fill="url(#nodeGlow)"
                  filter="url(#softGlow)"
                />
                <circle
                  cx="80"
                  cy="415"
                  r="48"
                  fill="#1F0E28"
                  stroke="#F4B942"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <g transform="translate(80, 417) scale(1.3)">
                  <circle
                    cx="-16"
                    cy="-7"
                    r="6"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M-25,14 Q-16,1 -7,14 Z"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="0"
                    cy="-10"
                    r="6"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M-9,13 Q0,-2 9,13 Z"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="16"
                    cy="-7"
                    r="6"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M7,14 Q16,1 25,14 Z"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </g>
                <text
                  x="148"
                  y="422"
                  fill="#ffffff"
                  fillOpacity="0.9"
                  fontSize="21"
                  fontWeight="600"
                >
                  Students
                </text>

                {/* Academic Systems */}
                <circle
                  cx="80"
                  cy="575"
                  r="52"
                  fill="url(#nodeGlow)"
                  filter="url(#softGlow)"
                />
                <circle
                  cx="80"
                  cy="575"
                  r="48"
                  fill="#1F0E28"
                  stroke="#F4B942"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <g transform="translate(80, 575) scale(1.4)">
                  <rect
                    x="-18"
                    y="-15"
                    width="36"
                    height="26"
                    rx="3"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="-12"
                    y1="-7"
                    x2="12"
                    y2="-7"
                    stroke="#F4B942"
                    strokeWidth="2"
                  />
                  <line
                    x1="-12"
                    y1="-1"
                    x2="5"
                    y2="-1"
                    stroke="#F4B942"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="-12"
                    y1="5"
                    x2="9"
                    y2="5"
                    stroke="#F4B942"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                  />
                  <rect
                    x="-5"
                    y="11"
                    width="10"
                    height="6"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2"
                  />
                </g>
                <text
                  x="148"
                  y="582"
                  fill="#ffffff"
                  fillOpacity="0.9"
                  fontSize="21"
                  fontWeight="600"
                >
                  Academic Systems
                </text>

                {/* connector to growth card */}
                <line
                  x1="80"
                  y1="575"
                  x2="80"
                  y2="690"
                  stroke="#F4B942"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeDasharray="2 8"
                />

                {/* Growth card */}
                <g transform="translate(40,700)">
                  <text
                    x="0"
                    y="-10"
                    fill="#F4B942"
                    fontSize="16"
                    fontWeight="700"
                    letterSpacing="1"
                  >
                    GROWTH
                  </text>
                  <rect
                    x="0"
                    y="0"
                    width="440"
                    height="100"
                    rx="18"
                    fill="#1F0E28"
                    stroke="#F4B942"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M24,78 L94,68 L164,72 L234,52 L304,40 L374,28 L416,16 L416,86 L24,86 Z"
                    fill="url(#growthFill)"
                  />
                  <polyline
                    points="24,78 94,68 164,72 234,52 304,40 374,28 416,16"
                    fill="none"
                    stroke="url(#growthStroke)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="416" cy="16" r="5.5" fill="#F4B942" />
                  <circle
                    cx="416"
                    cy="16"
                    r="10"
                    fill="#F4B942"
                    fillOpacity="0.25"
                  />
                </g>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* ================= WHAT SCHOOLS COME FOR ================= */}
        <section className="relative z-10 px-8 md:px-20 py-24">
          <div className="absolute top-[0%] right-[15%] w-[700px] h-[700px] bg-[#6A00FF]/8 blur-[220px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: "6rem",
              marginLeft: "2rem",
              marginBottom: "4rem",
            }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              INITIAL SERVICES
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              What Schools Usually
              <br />
              <span className="text-[#F4B942]">Approach Us For</span>
            </h2>
          </motion.div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            {[
              {
                icon: FileText,
                label: "CBSE Affiliation",
                desc: "Fresh affiliation, extension, section increase, upgrades, and compliance support.",
              },
              {
                icon: Building2,
                label: "School Establishment",
                desc: "Planning and guidance for new institutions from concept to launch.",
              },
              {
                icon: Search,
                label: "Inspection Support",
                desc: "Preparation, documentation, and coaching for successful board inspections.",
              },
              {
                icon: BookOpen,
                label: "Other Board Affiliations",
                desc: "ICSE, IB, and State Board assistance tailored to each board's requirements.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="group rounded-[28px] border border-white/10 bg-white/[0.03] hover:border-[#F4B942] hover:bg-[#F4B942]/20 hover:shadow-[0_0_40px_rgba(244,185,66,0.35)] cursor-default"
                  style={{ padding: "2.5rem", willChange: "transform" }} // ← willChange forces GPU layer on ALL cards equally
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.1 }} // ← same fix for icon
                    className="w-14 h-14 rounded-[16px] bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center group-hover:bg-[#F4B942] group-hover:border-[#F4B942] group-hover:scale-110 transition-all duration-300"
                    style={{ marginBottom: "1.75rem" }}
                  >
                    <Icon
                      size={24}
                      className="text-[#F4B942] group-hover:text-[#14071A] transition-colors duration-300"
                    />
                  </motion.div>
                  <h4
                    className="text-white font-bold text-lg group-hover:text-[#F4B942] transition-colors duration-300"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {card.label}
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= DETAILED SERVICES ================= */}
        <section
          id="services-detail"
          className="relative z-10 px-8 md:px-20 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: "8rem",
              marginLeft: "2rem",
              marginBottom: "5rem",
            }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              LONG-TERM PARTNERSHIPS
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              Services That Support
              <br />
              <span className="text-[#F4B942]">Institutional Growth</span>
            </h2>
          </motion.div>

          <div
            className="flex flex-col gap-4"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              const isOpen = openService === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  viewport={{ once: true, amount: 0.1 }}
                  style={{
                    borderRadius: "28px",
                    border: isOpen
                      ? "1px solid rgba(244,185,66,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isOpen
                      ? "rgba(244,185,66,0.06)"
                      : "rgba(255,255,255,0.04)",
                    overflow: "hidden",
                    transition: "border 0.5s, background 0.5s",
                  }}
                >
                  {/* ── HEADER ── */}
                  <button
                    onClick={() => setOpenService(isOpen ? null : service.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      textAlign: "left",
                      padding: "2rem 2.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {/* number */}
                    <span
                      className="service-card-number"
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: "rgba(244,185,66,0.2)",
                        lineHeight: 1,
                        flexShrink: 0,
                        width: "4rem",
                      }}
                    >
                      {service.number}
                    </span>

                    {/* icon box */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: isOpen
                          ? "1px solid rgba(244,185,66,0.5)"
                          : "1px solid rgba(244,185,66,0.2)",
                        background: isOpen
                          ? "rgba(244,185,66,0.2)"
                          : "rgba(244,185,66,0.1)",
                        transition: "all 0.3s",
                      }}
                    >
                      <Icon size={24} style={{ color: "#F4B942" }} />
                    </div>

                    {/* title + tagline */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                          fontWeight: 700,
                          color: isOpen ? "#F4B942" : "#ffffff",
                          margin: 0,
                          lineHeight: 1.2,
                          transition: "color 0.3s",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          fontSize: "0.95rem",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {service.tagline}
                      </p>
                    </div>

                    {/* tag preview — hidden when open */}
                    {!isOpen && (
                      <div
                        style={{
                          gap: "8px",
                          flexShrink: 0,
                          overflow: "hidden",
                          maxWidth: "360px",
                        }}
                        className="hidden lg:flex"
                      >
                        {service.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              padding: "4px 10px",
                              borderRadius: "999px",
                              border: "1px solid rgba(244,185,66,0.2)",
                              color: "rgba(244,185,66,0.6)",
                              background: "rgba(244,185,66,0.05)",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* chevron */}
                    <ChevronDown
                      size={22}
                      style={{
                        color: "#F4B942",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.4s",
                      }}
                    />
                  </button>

                  {/* ── EXPANDED CONTENT ── */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ padding: "0 2.5rem 3rem" }}
                    >
                      {/* divider */}
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(244,185,66,0.15)",
                          marginBottom: "2.5rem",
                        }}
                      />

                      <div
                        className="service-detail-grid"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1.2fr",
                          gap: "3.5rem",
                          alignItems: "start",
                        }}
                      >
                        {/* ── LEFT ── */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.75rem",
                          }}
                        >
                          {/* description */}
                          <p
                            style={{
                              color: "rgba(255,255,255,0.65)",
                              fontSize: "1rem",
                              lineHeight: "1.85",
                              margin: 0,
                            }}
                          >
                            {service.description}
                          </p>

                          {/* divider */}
                          <div
                            style={{
                              height: "1px",
                              background: "rgba(255,255,255,0.06)",
                            }}
                          />

                          {/* tags — all in one block, wrapping fine but contained */}
                          <div>
                            <p
                              style={{
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "rgba(244,185,66,0.5)",
                                margin: "0 0 10px 0",
                              }}
                            >
                              Covers
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "7px",
                              }}
                            >
                              {service.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 500,
                                    padding: "4px 11px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(244,185,66,0.2)",
                                    color: "rgba(244,185,66,0.65)",
                                    background: "rgba(244,185,66,0.04)",
                                    whiteSpace: "nowrap",
                                    letterSpacing: "0.01em",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* divider */}
                          <div
                            style={{
                              height: "1px",
                              background: "rgba(255,255,255,0.06)",
                            }}
                          />

                          {/* CTA */}
                          <a
                            href="#services-cta"
                            onClick={(e) => {
                              e.preventDefault();
                              const el =
                                document.getElementById("services-cta");
                              if (el) {
                                const top =
                                  el.getBoundingClientRect().top +
                                  window.scrollY -
                                  80;
                                window.scrollTo({ top, behavior: "smooth" });
                              }
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(244,185,66,0.12)";
                              e.currentTarget.style.borderColor = "#F4B942";
                              e.currentTarget.style.color = "#F4B942";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.borderColor =
                                "rgba(244,185,66,0.35)";
                              e.currentTarget.style.color =
                                "rgba(244,185,66,0.8)";
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              border: "1px solid rgba(244,185,66,0.35)",
                              color: "rgba(244,185,66,0.8)",
                              padding: "12px 22px",
                              borderRadius: "12px",
                              fontWeight: 600,
                              fontSize: "0.88rem",
                              textDecoration: "none",
                              width: "fit-content",
                              transition: "all 0.25s",
                              letterSpacing: "0.01em",
                            }}
                          >
                            Enquire about this service
                            <span style={{ fontSize: "1rem", lineHeight: 1 }}>
                              →
                            </span>
                          </a>
                        </div>

                        {/* ── RIGHT: phase cards ── */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {service.phases.map((phase, pi) => (
                            <div
                              key={phase.label}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(244,185,66,0.15)";
                                e.currentTarget.style.border =
                                  "1px solid #F4B942";
                                e.currentTarget.style.boxShadow =
                                  "0 0 0 1px #F4B942, 0 0 20px rgba(244,185,66,0.35), inset 0 0 20px rgba(244,185,66,0.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(244,185,66,0.08)";
                                e.currentTarget.style.border =
                                  "1px solid rgba(244,185,66,0.35)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                              style={{
                                borderRadius: "14px",
                                padding: "1.25rem 1.5rem",
                                border: "1px solid rgba(244,185,66,0.35)",
                                background: "rgba(244,185,66,0.08)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.25s ease",
                                cursor: "default",
                              }}
                            >
                              {/* left accent bar */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "8px",
                                  bottom: "8px",
                                  width: "3px",
                                  borderRadius: "0 3px 3px 0",
                                  background: "#F4B942",
                                  boxShadow: "0 0 6px rgba(244,185,66,0.6)",
                                }}
                              />

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "0.9rem",
                                  paddingLeft: "14px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#F4B942",
                                  }}
                                >
                                  {phase.label}
                                </span>
                              </div>

                              <ul
                                style={{
                                  listStyle: "none",
                                  margin: 0,
                                  padding: "0 0 0 14px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                {phase.items.map((item) => (
                                  <li
                                    key={item}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      color: "rgba(255,255,255,0.8)",
                                      fontSize: "0.88rem",
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    <BadgeCheck
                                      size={15}
                                      style={{
                                        color: "#F4B942",
                                        flexShrink: 0,
                                      }}
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= NEW SCHOOL DEVELOPMENT ================= */}
        <section className="relative z-10 px-8 md:px-20 py-32">
          <div className="absolute top-[0%] left-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: "8rem",
              marginLeft: "2rem",
              marginBottom: "4rem",
            }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              NEW SCHOOL DEVELOPMENT
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              From Concept
              <br />
              <span className="text-[#F4B942]">to Implementation</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] border border-[#F4B942]/18 overflow-hidden"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-0">
              {/* LEFT */}
              <div
                className="new-school-left-panel flex flex-col justify-center gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.06]"
                style={{
                  padding: "3.5rem",
                  background:
                    "linear-gradient(135deg, rgba(244,185,66,0.06) 0%, rgba(106,0,255,0.04) 100%)",
                }}
              >
                <p className="text-white/65 text-lg leading-relaxed">
                  WISE supports schools right from the planning stage,
                  transforming ideas into structured, compliant, and
                  future-ready educational institutions.
                </p>

                {/* Timeline */}
                <div className="new-school-timeline relative flex items-center mt-2">
                  {timelineSteps.map((step, i) => {
                    const isActive = i === activeStep;
                    return (
                      <div key={step} className="flex items-center relative">
                        <motion.span
                          animate={{
                            scale: isActive ? 1.08 : 1,
                            backgroundColor: isActive ? "#F4B942" : "#1F0E28",
                            color: isActive ? "#14071A" : "#F4B942",
                            borderColor: isActive
                              ? "#F4B942"
                              : "rgba(244,185,66,0.3)",
                          }}
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                          className="text-sm font-semibold rounded-full border tracking-[0.04em] whitespace-nowrap relative"
                          style={{ padding: "9px 16px" }}
                        >
                          {step}
                        </motion.span>
                        {i < timelineSteps.length - 1 && (
                          <div className="relative w-5 h-[1px] bg-[#F4B942]/20 overflow-hidden flex-shrink-0">
                            <motion.div
                              className="absolute inset-0 bg-[#F4B942]"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: i < activeStep ? 1 : 0 }}
                              transition={{ duration: 0.15 }}
                              style={{ transformOrigin: "left" }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-center"
                style={{
                  padding: "2rem",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {[
                  "School Concept Planning",
                  "Infrastructure Planning",
                  "Interior Planning",
                  "Teacher Recruitment",
                  "Branding Strategy",
                  "Five-Year Perspective Plan",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] text-sm text-white/75 hover:border-[#F4B942]/40 hover:bg-[#F4B942]/[0.07] transition-all duration-200 cursor-default"
                    style={{ padding: "1rem 1.1rem" }}
                  >
                    <BadgeCheck
                      size={16}
                      className="text-[#F4B942] flex-shrink-0"
                    />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= EVERY SCHOOL IS DIFFERENT ================= */}
        <section className="relative z-10 px-8 md:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: "8rem",
              marginLeft: "2rem",
              marginBottom: "4rem",
            }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
              TAILORED SOLUTIONS
            </p>
            <h2 className="heading-fluid-lg" style={{ marginTop: "1.5rem" }}>
              Every School is <span className="text-[#F4B942]">Different</span>
            </h2>
          </motion.div>

          {(() => {
            const profiles = [
              {
                type: "New School",
                tag: "Establishing from scratch",
                path: ["Vision", "Planning", "Systems", "Launch"],
                blurb:
                  "Starting with a blank canvas — we help you turn an idea into a structured, compliant, future-ready institution.",
              },
              {
                type: "Seeking Affiliation",
                tag: "Board compliance journey",
                path: ["Audit", "Compliance", "Application", "Approval"],
                blurb:
                  "Already running, but need recognition — we guide you through every requirement until approval is secured.",
              },
              {
                type: "Existing Institution",
                tag: "Institutional strengthening",
                path: ["Diagnose", "Strengthen", "Upgrade", "Grow"],
                blurb:
                  "Operating, but ready to level up — we diagnose gaps and rebuild systems for sustainable growth.",
              },
            ];
            const current = profiles[activeProfile];
            const heights = [40, 75, 115, 160];

            return (
              <>
                {/* Selector — plain text tabs, underline indicator, no boxes */}
                <div
                  className="profile-tabs-row flex flex-wrap gap-x-12 gap-y-4 border-b border-white/10"
                  style={{
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    paddingBottom: "1.5rem",
                  }}
                >
                  {profiles.map((p, i) => (
                    <button
                      key={p.type}
                      onClick={() => setActiveProfile(i)}
                      className="relative text-left"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        className="block font-bold transition-colors duration-300"
                        style={{
                          fontSize: "1.4rem",
                          color:
                            activeProfile === i
                              ? "#F4B942"
                              : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {p.type}
                      </span>
                      {activeProfile === i && (
                        <motion.div
                          layoutId="profileUnderline"
                          className="absolute left-0 -bottom-[1.6rem] h-[2px] w-full bg-[#F4B942]"
                          style={{ boxShadow: "0 0 10px rgba(244,185,66,0.7)" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Focal panel — swaps with the active selection */}
                <div
                  style={{
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    marginTop: "4rem",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.type}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start"
                    >
                      <div>
                        <p
                          className="text-[#F4B942]/70 text-base uppercase tracking-[0.2em] mb-4"
                          style={{ marginBottom: "1rem" }}
                        >
                          {current.tag}
                        </p>
                        <p className="text-white/65 text-lg leading-relaxed max-w-md">
                          {current.blurb}
                        </p>
                      </div>

                      <div
                        className="flex flex-nowrap items-baseline justify-end gap-x-2 overflow-x-auto"
                        style={{ minHeight: "140px", marginTop: "1.5rem" }}
                      >
                        {current.path.map((step, i) => (
                          <motion.span
                            key={step}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: i * 0.12,
                              ease: "easeOut",
                            }}
                            className="font-bold leading-none flex items-baseline flex-shrink-0"
                            style={{
                              fontSize: "clamp(1.9rem, 3.0vw, 3.2rem)",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            <span
                              style={{
                                color:
                                  i === current.path.length - 1
                                    ? "#F4B942"
                                    : "rgba(255,255,255,0.9)",
                              }}
                            >
                              {step}
                            </span>
                            {i < current.path.length - 1 && (
                              <span
                                style={{
                                  fontSize: "1.6rem",
                                  fontWeight: 800,
                                  color: "#F4B942",
                                  margin: "0 0.5rem",
                                  position: "relative",

                                  top: "-6px",
                                }}
                              >
                                →
                              </span>
                            )}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            );
          })()}
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
              GET STARTED
            </p>
            <h2
              className="heading-fluid-lg relative z-10"
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              Looking for the Right Solution for
              <span className="text-[#F4B942]"> Your School?</span>
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
              Whether you are planning a new institution, seeking affiliation,
              or strengthening existing systems, WISE is here to support your
              journey.
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
                Contact Us
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
