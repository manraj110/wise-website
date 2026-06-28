"use client";

import Navbar from "@/components/Navbar";
import HashScrollFix from "@/components/HashScrollFix";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Building2,
  ClipboardList,
  Search,
  BadgeCheck,
  Award,
  Users,
  BookOpen,
  Settings,
  TrendingUp,
  School,
} from "lucide-react";
import dynamic from "next/dynamic";

const MotionLink = motion(Link);

const IndiaMap = dynamic(() => import("@/components/IndiaMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[380px]">
      <p className="text-white/40 text-sm">Loading map...</p>
    </div>
  ),
});

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="text-[#F4B942] font-semibold text-base mb-2 tracking-[0.02em]">
        {title}
      </h4>
      <p>{children}</p>
    </section>
  );
}

function PrivacyContent() {
  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-[0.15em]">
        Last updated: June 2026
      </p>

      <LegalSection title="1. Introduction">
        Wonder Illuminate Service of Education ("WISE", "we", "us", "our") is
        committed to protecting the privacy of everyone who interacts with our
        website and services. This Privacy Policy explains what information we
        collect, how we use it, and the choices you have regarding your data.
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        When you fill out our contact form, schedule a meeting, or reach out to
        us directly, we may collect your name, institution name, email address,
        phone number, and any details you choose to share about your
        requirements. We do not collect sensitive personal data unless you
        voluntarily provide it.
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        We use the information you provide to respond to your enquiries,
        schedule consultations, deliver our consulting services, and share
        relevant updates about our offerings. We do not sell or rent your
        personal information to third parties.
      </LegalSection>

      <LegalSection title="4. Data Sharing">
        We may share information with trusted team members or service providers
        strictly for the purpose of delivering our services (for example,
        scheduling tools). We do not share your information with third parties
        for marketing purposes without your consent.
      </LegalSection>

      <LegalSection title="5. Data Security">
        We take reasonable administrative and technical measures to protect the
        information you share with us from unauthorized access, alteration, or
        disclosure. However, no method of transmission over the internet is
        completely secure, and we cannot guarantee absolute security.
      </LegalSection>

      <LegalSection title="6. Your Rights">
        You may request access to, correction of, or deletion of the personal
        information you have shared with us at any time by contacting us using
        the details below, consistent with applicable data protection laws in
        India.
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        Our services are directed at schools and educational institutions rather
        than individual minors. We do not knowingly collect personal information
        directly from children through this website.
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        We may update this Privacy Policy from time to time. Any changes will be
        reflected on this page with a revised "Last updated" date.
      </LegalSection>

      <LegalSection title="9. Contact Us">
        If you have questions about this Privacy Policy, please reach us at
        wise.educatingindia@gmail.com or +91 98261 31600.
      </LegalSection>
    </>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeModal, setActiveModal] = useState<"privacy" | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "27a52ac3-9a25-44a9-a73c-62ddc702ba8e",
          name: formData.name,
          institution: formData.institution,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          subject: `New Enquiry from ${formData.name} — ${formData.institution}`,
          from_name: "WISE — Educating India",
          replyto: formData.email,
          botcheck: false,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          institution: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function Node(props: any) {
    const Icon = props.icon;

    return (
      <div className="flex flex-col items-center">
        <div
          className="
        w-[96px]
        h-[96px]
        rounded-full
        border
        border-white/10
        bg-white/[0.07]
        backdrop-blur-xl
        flex
        items-center
        justify-center
        shadow-[0_0_25px_rgba(255,255,255,0.05)]
      "
        >
          <Icon size={38} className={props.color} />
        </div>

        <p className="mt-3 text-white text-sm font-medium tracking-[0.08em]">
          {props.label}
        </p>
      </div>
    );
  }

  const services = [
    {
      title: "Affiliation & Compliance",
      description:
        "Helping schools navigate CBSE, ICSE, IB and State Board requirements with complete documentation, inspection preparedness, compliance management, and post-affiliation support.",
      points: [
        "CBSE Affiliation",
        "OASIS",
        "SQAAF",
        "SAFAL",
        "Inspection Support",
      ],
    },
    {
      title: "School Planning & Development",
      description:
        "Supporting institutions from concept to execution through infrastructure planning, school design, operational frameworks, recruitment strategy, and long-term growth planning.",
      points: [
        "School Planning",
        "Infrastructure Design",
        "Interior Planning",
        "Recruitment Support",
        "Growth Strategy",
      ],
    },
    {
      title: "Academic Solutions",
      description:
        "Designing structured academic systems that strengthen learning outcomes, classroom effectiveness, and institutional performance.",
      points: [
        "Academic Planning",
        "Lesson Planning",
        "Academic Audits",
        "Pedagogical Frameworks",
      ],
    },
    {
      title: "Examination Systems",
      description:
        "Building examination frameworks that ensure consistency, transparency, performance analysis, and student development.",
      points: [
        "Assessments",
        "Evaluation Systems",
        "⁠Report Cards",
        "⁠Result Analytics",
      ],
    },
    {
      title: "Training & Development",
      description:
        "Enhancing educator effectiveness through structured training programs focused on pedagogy, assessment, classroom management, and modern educational practices.",
      points: [
        "Teacher Training",
        "Pedagogy",
        "NEP Orientation",
        "Technology Integration",
      ],
    },
    {
      title: "Student Growth & Advancement",
      description:
        "Empowering students through career guidance, skill development, confidence building, and future-readiness initiatives.",
      points: [
        "Career Counselling",
        "Skill Development",
        "Personality Development",
        "Mentoring Support",
      ],
    },
    {
      title: "School Branding & Admissions",
      description:
        "Helping schools strengthen visibility, build trust, engage communities, and improve admissions through strategic branding initiatives.",
      points: [
        "Branding Strategy",
        "Admissions Campaigns",
        "Community Engagement",
        "Parent Outreach",
      ],
    },
    {
      title: "Systemic School Upgradation",
      description:
        "Transforming institutional systems to improve efficiency, governance, compliance, and overall educational outcomes.",
      points: [
        "Administration",
        "Accounts",
        "Libraries & Labs",
        "Academic Counselling",
        "Operational Systems",
      ],
    },
  ];
  return (
    <main className="relative bg-[#14071A] text-white overflow-hidden">
      <Navbar />
      <HashScrollFix />

      <div className="zoom-scale">
      {/* ================= BACKGROUND LIGHTING ================= */}

      {/* TOP LEFT GOLD GLOW */}
      <div className="absolute top-[-240px] left-[-240px] w-[480px] h-[480px] bg-[#fea501]/55 blur-[105px] rounded-full" />

      {/* LARGE CENTER PURPLE AMBIENT */}
      <div className="absolute top-[5%] right-[8%] w-[900px] h-[900px] bg-[#6A00FF]/12 blur-[220px] rounded-full" />

      {/* RIGHT SIDE PURPLE GLOW */}
      <div className="absolute top-[22%] right-[16%] w-[420px] h-[420px] bg-[#A855F7]/20 blur-[140px] rounded-full" />

      {/* BOTTOM RIGHT GOLD GLOW */}
      <div className="absolute bottom-[-210px] right-[-120px] w-[480px] h-[480px] bg-[#fea501]/35 blur-[155px] rounded-full" />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center px-8 md:px-20"
      >
        <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 items-center w-full">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginLeft: "2rem", marginTop: "4rem" }}
            className="flex flex-col justify-center min-w-0"
          >
            <p className="text-[#F4B942] uppercase tracking-[0.40em] text-xl md:text-2xl font-semibold mb-6">
              END-TO-END EDUCATIONAL CONSULTING
            </p>

            <motion.h1
              className="heading-fluid-lg max-w-none"
              style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Building Future-Ready Schools
              <br />
              <span className="text-[#F4B942]">Beyond Affiliation</span>
            </motion.h1>

            <motion.p
              className="text-white/65 text-xl max-w-xl leading-relaxed"
              style={{ marginBottom: "2rem" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From CBSE affiliation and infrastructure planning to academic
              systems, training, and long-term institutional growth.
            </motion.p>

            <motion.div
              className="flex gap-5 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex gap-8 flex-wrap items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {/* PRIMARY BUTTON */}
                <button
                  onClick={() => {
                    const el = document.getElementById("about");
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - 220;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="
     bg-[#F4B942]
     text-black
     px-16
     py-6
     rounded-[999px]
     font-medium
     tracking-[0.02em]
     hover:scale-105
     hover:shadow-[0_0_50px_rgba(255,198,42,0.9)]
     transition-all
     duration-300
     min-w-[220px]
   "
                  style={{ fontSize: "1.05rem" }}
                >
                  Explore
                </button>

                {/* SECONDARY BUTTON */}
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="
     border
     border-white/20
     text-white
     px-16
     py-6
     rounded-[999px]
     font-medium
     tracking-[0.02em]
     hover:bg-white/10
     hover:border-[#F4B942]/40
     transition-all
     duration-300
     min-w-[220px]
   "
                  style={{ fontSize: "1.05rem" }}
                >
                  Contact Us
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT LOGO SECTION ================= */}
          <motion.div
            className="relative flex justify-center items-center min-w-0 hero-orb-container"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="hero-orb">
              {/* ================= OUTER RINGS ================= */}
              <div className="absolute w-[760px] h-[760px] rounded-full border border-white/[0.04]" />

              <div className="absolute w-[560px] h-[520px] rounded-full border border-white/[0.05]" />

              {/* ================= AMBIENT PURPLE GLOW ================= */}
              <motion.div
                className="absolute w-[380px] h-[380px] bg-[#A855F7]/30 blur-[70px] rounded-full"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ================= OUTER WHITE RING ================= */}
              <motion.div
                className="
     absolute
     w-[360px]
     h-[360px]
     rounded-full
     border-[6px]
     border-white/80
     shadow-[0_0_55px_rgba(255,255,255,0.7)]
   "
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ================= INNER CORE ================= */}
              <motion.div
                className="
     relative
     w-[340px]
     h-[340px]
     rounded-full
     bg-[#1B0826]/95
     flex
     items-center
     justify-center
     overflow-hidden
   "
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* INNER BORDER */}
                <div className="absolute inset-[18px] rounded-full border border-white/10" />

                {/* GOLD INNER GLOW */}
                <div className="absolute w-[220px] h-[220px] bg-[#F4B942]/10 blur-[60px] rounded-full" />

                {/* ================= LOGO HOLDER ================= */}
                <div
                  className="
       relative
       z-10
       flex
       items-center
       justify-center
       w-[280px]
       h-[280px]
     "
                >
                  {/* SOFT GOLD GLOW */}
                  <div className="absolute w-[240px] h-[240px] bg-[#F4B942]/10 blur-[80px] rounded-full" />

                  {/* LOGO */}
                  <div className="relative w-[240px] h-[240px] rounded-full overflow-hidden">
                    <Image
                      src="/logo2.jpg"
                      alt="WISE Logo"
                      fill
                      priority
                      className="object-cover scale-[2.2]"
                      style={{
                        objectPosition: "center center",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="relative z-10 px-8 md:px-20 py-24 overflow-hidden">
        {/* SUBTLE GOLD GLOW */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[320px] blur-[180px] rounded-full" />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-16">
          {/* ================= STAT 1 ================= */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group flex items-center gap-8 cursor-default"
          >
            {/* GOLD LINE */}
            <div className="w-[5px] h-[125px] rounded-full bg-[#F4B942] shadow-[0_0_25px_rgba(244,185,66,0.7)] group-hover:shadow-[0_0_45px_rgba(244,185,66,1)] transition-all duration-500 flex-shrink-0" />

            {/* CONTENT */}
            <div className="pl-2">
              <h3 className="heading-fluid-60 font-bold text-white mb-4 leading-none transition-all duration-500 group-hover:text-[#F4B942]">
                300+
              </h3>

              <p className="text-white/60 text-lg leading-relaxed transition-all duration-500 group-hover:text-white/85">
                Schools Supported
              </p>
            </div>
          </motion.div>

          {/* ================= STAT 2 ================= */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group flex items-center gap-8 cursor-default"
          >
            {/* GOLD LINE */}
            <div className="w-[5px] h-[125px] rounded-full bg-[#F4B942] shadow-[0_0_25px_rgba(244,185,66,0.7)] group-hover:shadow-[0_0_45px_rgba(244,185,66,1)] transition-all duration-500 flex-shrink-0" />

            {/* CONTENT */}
            <div className="pl-2">
              <h3 className="heading-fluid-60 font-bold text-white mb-4 leading-none transition-all duration-500 group-hover:text-[#F4B942]">
                9
              </h3>

              <p className="text-white/60 text-lg leading-relaxed transition-all duration-500 group-hover:text-white/85">
                States Covered
              </p>
            </div>
          </motion.div>

          {/* ================= STAT 3 ================= */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group flex items-center gap-8 cursor-default"
          >
            {/* GOLD LINE */}
            <div className="w-[5px] h-[125px] rounded-full bg-[#F4B942] shadow-[0_0_25px_rgba(244,185,66,0.7)] group-hover:shadow-[0_0_45px_rgba(244,185,66,1)] transition-all duration-500 flex-shrink-0" />

            {/* CONTENT */}
            <div className="pl-2">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 transition-all duration-500 group-hover:text-[#F4B942]">
                Long-Term
              </h3>

              <p className="text-white/60 text-lg leading-relaxed transition-all duration-500 group-hover:text-white/85">
                Institutional Partnerships
              </p>
            </div>
          </motion.div>

          {/* ================= STAT 4 ================= */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group flex items-center gap-8 cursor-default"
          >
            {/* GOLD LINE */}
            <div className="w-[5px] h-[125px] rounded-full bg-[#F4B942] shadow-[0_0_25px_rgba(244,185,66,0.7)] group-hover:shadow-[0_0_45px_rgba(244,185,66,1)] transition-all duration-500 flex-shrink-0" />

            {/* CONTENT */}
            <div className="pl-2">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 transition-all duration-500 group-hover:text-[#F4B942]">
                Expertise in
              </h3>

              <p className="text-white/60 text-lg leading-relaxed transition-all duration-500 group-hover:text-white/85">
                CBSE & School Development
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPACING BEFORE NEXT SECTION */}
      <div className="h-4 md:h-8" />

      {/* ================= WHO WE ARE SECTION ================= */}
      <section id="about" className="relative z-10 px-8 md:px-20 py-32">
        {/* MATCHING SITE LIGHTING */}

        {/* LEFT GOLD GLOW */}
        <div className="absolute top-[10%] left-[-180px] w-[420px] h-[420px] bg-[#F4B942]/12 blur-[160px] rounded-full" />

        {/* CENTER PURPLE AMBIENT */}
        <div className="absolute top-[0%] right-[15%] w-[700px] h-[700px] bg-[#6A00FF]/8 blur-[220px] rounded-full" />

        {/* LOWER GOLD GLOW */}
        <div className="absolute bottom-[-100px] right-[5%] w-[380px] h-[380px] bg-[#F4B942]/8 blur-[180px] rounded-full" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="
   relative
   z-10
   flex
   flex-col
   justify-center
   min-h-[620px]
 "
            style={{ marginLeft: "2rem" }}
          >
            <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-12">
              ABOUT WISE
            </p>
            <h2
              className="text-white font-bold heading-fluid-72 leading-none"
              style={{ marginTop: "1.5rem", marginBottom: "20px" }}
            >
              Who We <span className="text-[#F4B942]">Are</span>
            </h2>

            <div className="space-y-8 text-[#D1D5DB] text-xl leading-[1.9] max-w-xl">
              <p>
                <span className="font-medium">
                  Wonder Illuminate Service of Education
                </span>{" "}
                is an educational consultancy focused on helping institutions
                build structured, future-ready systems with long-term academic
                vision.
              </p>

              <p>
                We work across affiliation planning, institutional systems,
                infrastructure strategy, training, and operational excellence —
                enabling schools to evolve beyond compliance towards meaningful,
                sustainable growth.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-3 border border-[#F4B942]/40 text-[#F4B942] px-7 py-4 rounded-full font-semibold text-base hover:bg-[#F4B942]/10 hover:border-[#F4B942] hover:shadow-[0_0_30px_rgba(244,185,66,0.2)] transition-all duration-300 w-fit"
                style={{
                  padding: "10px 24px",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  marginTop: "1rem",
                }}
              >
                Learn More
                <span className="transition-all duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative flex justify-center min-h-[620px]">
            {/* AMBIENT GLOW */}
            <div className="absolute w-[650px] h-[650px] bg-[#F4B942]/8 blur-[180px] rounded-full" />

            <div className="relative flex flex-col justify-center gap-16 w-full pt-12">
              {/* ================= ITEM 1 ================= */}
              <div className="group flex items-center cursor-default">
                <div
                  className="
   w-5
   h-5
   border-2
   border-[#F4B942]
   flex-shrink-0
   transition-all
   duration-500
   group-hover:scale-125
   group-hover:shadow-[0_0_15px_rgba(244,185,66,1)]
 "
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="


 h-[2px]


 bg-[#F4B942]


 shadow-[0_0_20px_rgba(244,185,66,1)]


 flex-shrink-0


"
                />

                <h3
                  className="


   ml-4


   text-2xl


   font-semibold


   text-white


   transition-all


   duration-500


   group-hover:translate-x-2


   group-hover:text-[#F4B942]


 "
                >
                  Academic Depth
                </h3>
              </div>

              {/* ================= ITEM 2 ================= */}
              <div className="group flex items-center cursor-default">
                <div
                  className="
    w-5
   h-5
   border-2
   border-[#F4B942]
   flex-shrink-0
   transition-all
   duration-500
   group-hover:scale-125
   group-hover:shadow-[0_0_15px_rgba(244,185,66,1)]
 "
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 160 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="
 h-[2px]


 bg-[#F4B942]


 shadow-[0_0_20px_rgba(244,185,66,1)]


 flex-shrink-0


"
                />

                <h3
                  className="


   ml-4


   text-2xl


   font-semibold


   text-white


   transition-all


   duration-500


   group-hover:translate-x-2


   group-hover:text-[#F4B942]


 "
                >
                  Structured Systems
                </h3>
              </div>

              {/* ================= ITEM 3 ================= */}
              <div className="group flex items-center cursor-default">
                <div
                  className="
   w-5
   h-5
   border-2
   border-[#F4B942]
   flex-shrink-0
   transition-all
   duration-500
   group-hover:scale-125
   group-hover:shadow-[0_0_15px_rgba(244,185,66,1)]
 "
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 240 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                  className="


 h-[2px]


 bg-[#F4B942]


 shadow-[0_0_20px_rgba(244,185,66,1)]


 flex-shrink-0


"
                />

                <h3
                  className="


   ml-4


   text-2xl


   font-semibold


   text-white


   transition-all


   duration-500


   group-hover:translate-x-2


   group-hover:text-[#F4B942]


 "
                >
                  Long-Term Partnerships
                </h3>
              </div>

              {/* ================= ITEM 4 ================= */}
              <div className="group flex items-center cursor-default">
                <div
                  className="


   w-5
   h-5
   border-2
   border-[#F4B942]
   flex-shrink-0
   transition-all
   duration-500
   group-hover:scale-125
   group-hover:shadow-[0_0_15px_rgba(244,185,66,1)]
 "
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 320 }}
                  transition={{ duration: 1.4 }}
                  viewport={{ once: true }}
                  className="
 h-[2px]


 bg-[#F4B942]


 shadow-[0_0_20px_rgba(244,185,66,1)]


 flex-shrink-0


"
                />

                <h3
                  className="


   ml-4


   text-2xl


   font-semibold


   text-white


   transition-all


   duration-500


   group-hover:translate-x-2


   group-hover:text-[#F4B942]


 "
                >
                  Institution-Focused Approach
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACING BEFORE SERVICES */}
      <div className="h-4 md:h-8" />

      {/* ================= SERVICES SECTION ================= */}

      <section
        id="services"
        className="relative z-10 px-8 md:px-20 pt-80 pb-32 overflow-hidden"
      >
        {/* ================= BACKGROUND GLOWS ================= */}

        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#A855F7]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-cyan-400/10 blur-[140px] rounded-full" />

        {/* ================= TITLE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-32"
          style={{ marginLeft: "2rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-12">
            OUR SERVICES
          </p>
          <h2
            className="heading-fluid-72 font-bold leading-[1.05] max-w-none mb-24"
            style={{ marginTop: "1.5rem" }}
          >
            Comprehensive <span className="text-[#F4B942]">Educational</span>
            <br />
            <span className="text-[#F4B942]">Solutions</span>
          </h2>
        </motion.div>

        <div className="h-12 md:h-16" />

        {/* ================= GRID ================= */}

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-28 items-center">
          {/* LEFT SIDE */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[540px]"
            style={{ marginLeft: "2rem" }}
          >
            {/* NUMBER */}
            <div className="mb-10">
              <p className="text-[#F4B942] heading-fluid-96 font-bold leading-none">
                0{activeService + 1}
              </p>
            </div>

            {/* TITLE */}
            <h3
              className="
     heading-fluid-60
     font-bold
     leading-[1.05]
     min-h-[150px]
     mb-8
   "
            >
              {services[activeService].title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
     text-white/65
     text-xl
     leading-relaxed
     max-w-[500px]
     min-h-[90px]
     mb-10
   "
            >
              {services[activeService].description}
            </p>

            {/* BULLETS */}
            <div
              className="
     space-y-4
     min-h-[140px]
   "
              style={{ marginTop: "1rem" }}
            >
              {services[activeService].points.map((point) => (
                <div key={point} className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F4B942]" />
                  <span className="text-lg text-white/85">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            key={`card-${activeService}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[450px] h-[450px] bg-[#F4B942]/10 rounded-full blur-[140px]" />

            <div
              className="
   relative
   w-full
   max-w-[780px]
   h-[560px]
   rounded-[40px]
   border
   border-white/10
   bg-white/[0.04]
   backdrop-blur-xl
   overflow-hidden
 "
              style={{ marginRight: "2rem" }}
            >
              {activeService === 0 ? (
                <div className="relative z-10 h-full">
                  {/* HEADING */}
                  <h4
                    className="


   absolute


   top-[40px]


   left-1/2


   -translate-x-1/2


   text-[#F4B942]


   text-xl


   tracking-[0.3em]


   uppercase


   whitespace-nowrap


   drop-shadow-[0_0_20px_rgba(244,185,66,0.45)]


 "
                  >
                    The Affiliation Journey
                  </h4>

                  {/* ICONS + TIMELINE */}
                  <div
                    className="absolute top-[110px] left-1/2 -translate-x-1/2 w-[88%]"
                    style={{ position: "relative" }}
                  >
                    {/* HORIZONTAL LINE */}
                    <div
                      className="
     absolute
     left-0
     right-0
     top-[148px]
     h-[3px]
     rounded-full
     bg-[#F4B942]
     shadow-[0_0_20px_rgba(244,185,66,0.8)]
   "
                    />

                    <div
                      id="affil-icons"
                      className="flex justify-between items-start w-full relative z-10"
                    >
                      {[
                        FileText,
                        Building2,
                        ClipboardList,
                        Search,
                        BadgeCheck,
                      ].map((Icon, i) => (
                        <div
                          key={i}
                          className="
         relative
         flex
         flex-col
         items-center
       "
                        >
                          {/* ICON */}
                          <div
                            className="
           w-[99px]
           h-[99px]
           rounded-full
           border
           border-[#F4B942]/30
           bg-[#F4B942]/10
           flex
           items-center
           justify-center
           shadow-[0_0_25px_rgba(244,185,66,0.2)]
         "
                          >
                            <Icon size={48} className="text-[#F4B942]" />
                          </div>

                          {/* VERTICAL CONNECTOR */}
                          <div
                            className="
           w-[3px]
           h-[50px]
           bg-[#F4B942]
           shadow-[0_0_15px_rgba(244,185,66,0.8)]
         "
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
   absolute
   top-[280px]
   left-1/2
   -translate-x-1/2
   w-[96%]
   grid
   grid-cols-5
   gap-4
 "
                  >
                    {[
                      {
                        title: "Documentation",
                        desc: "All required documents prepared",
                      },
                      {
                        title: "Infrastructure Readiness",
                        desc: "Compliance with norms and standards",
                      },
                      {
                        title: "Application Submission",
                        desc: "Submitted through OASIS platform",
                      },
                      {
                        title: "Inspection",
                        desc: "CBSE verification process",
                      },
                      {
                        title: "Affiliation Approval",
                        desc: "Affiliation granted and future support",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="
       flex
       flex-col
       items-center
       text-center
       px-2
     "
                      >
                        {/* HEADING */}
                        <div
                          className="
         h-[56px]
         flex
         items-start
         justify-center
       "
                        >
                          <h5
                            className="
           text-white
           text-[15px]
           font-semibold
           uppercase
           leading-[1.2]
           max-w-[140px]
         "
                          >
                            {item.title}
                          </h5>
                        </div>

                        {/* DESCRIPTION */}
                        <div
                          className="
   h-[84px]
   flex
   items-start
   justify-center
   relative


   -top-2
 "
                        >
                          <p
                            className="
     text-[13px]
     text-white/60
     leading-[1.6]
     max-w-[130px]
   "
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FINAL DESTINATION */}
                  <div
                    className="
     absolute
     bottom-[25px]
     left-1/2
     -translate-x-1/2
     flex
     flex-col
     items-center
     gap-3
   "
                  >
                    <div
                      className="
       w-[99px] h-[99px]
       rounded-full
       border border-[#F4B942]/30
       bg-[#F4B942]/10
       flex items-center justify-center
       shadow-[0_0_30px_rgba(244,185,66,0.3)]
     "
                    >
                      <Award size={48} className="text-[#F4B942]" />
                    </div>

                    <p
                      className="
   text-[#F4B942]
   text-lg
   font-semibold
   tracking-[0.08em]
 "
                    >
                      Affiliation Granted
                    </p>
                  </div>
                </div>
              ) : activeService === 1 ? (
                <div className="relative z-10 h-full">
                  {/* HEADING */}
                  <h4
                    className="
      absolute
      top-[40px]
      left-1/2
      -translate-x-1/2
      text-[#F4B942]
      text-xl
      tracking-[0.3em]
      uppercase
      whitespace-nowrap
      drop-shadow-[0_0_20px_rgba(244,185,66,0.45)]
    "
                  >
                    A HOLISTIC SCHOOL ECOSYSTEM
                  </h4>

                  {/* ================= CENTRAL SCHOOL HUB ================= */}
                  <div className="absolute left-1/2 top-[345px] -translate-x-1/2 -translate-y-1/2">
                    {/* MAIN GLOW */}
                    <div
                      className="
        absolute
        left-1/2
        top-[360px]
        -translate-x-1/2
        -translate-y-1/2
        w-[150px]
        h-[150px]
        rounded-full
        bg-[#F4B942]/15
        blur-[80px]
        animate-pulse
      "
                    />

                    {/* SCHOOL ICON */}
                    <div
                      className="
        relative
        w-[180px]
        h-[180px]
        flex
        items-center
        justify-center
      "
                    >
                      <svg
                        width="180"
                        height="180"
                        viewBox="0 0 512 512"
                        fill="none"
                        className="text-[#F4B942] drop-shadow-[0_0_20px_rgba(244,185,66,0.55)]"
                      >
                        <g fill="currentColor">
                          <rect
                            x="40"
                            y="170"
                            width="120"
                            height="190"
                            rx="8"
                          />
                          <rect
                            x="352"
                            y="170"
                            width="120"
                            height="190"
                            rx="8"
                          />
                          <rect
                            x="180"
                            y="140"
                            width="152"
                            height="220"
                            rx="8"
                          />
                          <polygon points="256,70 150,150 362,150" />
                          <rect x="248" y="25" width="10" height="55" />
                          <path d="M258 25 Q300 10 340 25 L340 70 Q300 55 258 70 Z" />
                          <circle
                            cx="256"
                            cy="130"
                            r="26"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="75"
                            y="205"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="118"
                            y="205"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="75"
                            y="270"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="118"
                            y="270"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="372"
                            y="205"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="415"
                            y="205"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="372"
                            y="270"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="415"
                            y="270"
                            width="22"
                            height="40"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="215"
                            y="185"
                            width="25"
                            height="45"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="244"
                            y="185"
                            width="25"
                            height="45"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="273"
                            y="185"
                            width="25"
                            height="45"
                            fill="rgba(10,0,20,0.75)"
                          />
                          <rect
                            x="225"
                            y="255"
                            width="62"
                            height="105"
                            fill="rgba(10,0,20,0.75)"
                            rx="30"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* ================= NODES ================= */}

                  {/* TOP */}
                  <div className="absolute top-[100px] left-1/2 -translate-x-1/2">
                    <Node
                      icon={TrendingUp}
                      label="Growth"
                      color="text-[#F4B942]"
                    />
                  </div>

                  {/* LEFT */}
                  <div className="absolute left-[95px] top-[280px]">
                    <Node
                      icon={Building2}
                      label="Infrastructure"
                      color="text-[#F4B942]"
                    />
                  </div>

                  {/* RIGHT */}
                  <div className="absolute right-[95px] top-[280px]">
                    <Node icon={Users} label="Faculty" color="text-[#F4B942]" />
                  </div>

                  {/* BOTTOM LEFT */}
                  <div className="absolute left-[145px] bottom-[30px]">
                    <Node
                      icon={BookOpen}
                      label="Academics"
                      color="text-[#F4B942]"
                    />
                  </div>

                  {/* BOTTOM RIGHT */}
                  <div className="absolute right-[145px] bottom-[30px]">
                    <Node
                      icon={Settings}
                      label="Operations"
                      color="text-[#F4B942]"
                    />
                  </div>

                  {/* ================= CONNECTORS ================= */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 740 570"
                    preserveAspectRatio="none"
                    style={{ pointerEvents: "none" }}
                  >
                    {/* GROWTH */}
                    <line
                      x1="370"
                      y1="255"
                      x2="370"
                      y2="230"
                      stroke="#F4B942"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />

                    {/* INFRASTRUCTURE */}
                    <line
                      x1="290"
                      y1="345"
                      x2="195"
                      y2="342"
                      stroke="#F4B942"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />

                    {/* FACULTY */}
                    <line
                      x1="450"
                      y1="345"
                      x2="545"
                      y2="342"
                      stroke="#F4B942"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />

                    {/* ACADEMICS */}
                    <line
                      x1="330"
                      y1="400"
                      x2="255"
                      y2="465"
                      stroke="#F4B942"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />

                    {/* OPERATIONS */}
                    <line
                      x1="410"
                      y1="400"
                      x2="485"
                      y2="465"
                      stroke="#F4B942"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />
                  </svg>
                </div>
              ) : activeService === 2 ? (
                <div className="relative z-10 h-full">
                  {/* HEADING */}
                  <h4 className="absolute top-[28px] left-1/2 -translate-x-1/2 text-[#F4B942] text-xl tracking-[0.3em] uppercase whitespace-nowrap drop-shadow-[0_0_20px_rgba(244,185,66,0.45)]">
                    Academic Excellence Cycle
                  </h4>

                  <div
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <svg
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      viewBox="0 0 760 580"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <marker
                          id="ah"
                          markerWidth="12"
                          markerHeight="12"
                          refX="6"
                          refY="6"
                          orient="auto"
                        >
                          <path
                            d="M1,1 L11,6 L1,11"
                            fill="none"
                            stroke="#F4B942"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </marker>
                      </defs>

                      {/*
        Circle cx=380 cy=300 r=190
          Planning:    -90° → (380, 110)
          Teaching:    -18° → (561, 241)
          Assessment:   54° → (494, 444)
          Feedback:    126° → (266, 444)
          Improvement: 198° → (199, 241)
      */}

                      {/* DASHED CIRCLE */}
                      <motion.circle
                        cx="380"
                        cy="300"
                        r="190"
                        fill="none"
                        stroke="#F4B942"
                        strokeOpacity="0.35"
                        strokeWidth="2"
                        strokeDasharray="14 12"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Node circles */}
                      <circle
                        cx="380"
                        cy="110"
                        r="44"
                        fill="#1a1528"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="561"
                        cy="241"
                        r="44"
                        fill="#1a1528"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="494"
                        cy="444"
                        r="44"
                        fill="#1a1528"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="266"
                        cy="444"
                        r="44"
                        fill="#1a1528"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="199"
                        cy="241"
                        r="44"
                        fill="#1a1528"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />

                      {/* Labels */}
                      <text
                        x="380"
                        y="168"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Planning
                      </text>
                      <text
                        x="380"
                        y="182"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Curriculum &amp; academic planning
                      </text>

                      <text
                        x="561"
                        y="299"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Teaching
                      </text>
                      <text
                        x="561"
                        y="313"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Effective classroom instruction
                      </text>

                      <text
                        x="494"
                        y="502"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Assessment
                      </text>
                      <text
                        x="494"
                        y="516"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Measuring learning effectively
                      </text>

                      <text
                        x="266"
                        y="502"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Feedback
                      </text>
                      <text
                        x="266"
                        y="516"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Actionable feedback &amp; insights
                      </text>

                      <text
                        x="199"
                        y="299"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Improvement
                      </text>
                      <text
                        x="199"
                        y="313"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Continuous improvement
                      </text>
                      <text
                        x="199"
                        y="325"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.65)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        for better outcomes
                      </text>

                      {/* Center — bigger, no ring */}
                      <text
                        x="380"
                        y="322"
                        textAnchor="middle"
                        fill="white"
                        fontSize="23"
                        fontWeight="bold"
                      >
                        Academic
                      </text>
                      <text
                        x="380"
                        y="350"
                        textAnchor="middle"
                        fill="white"
                        fontSize="23"
                        fontWeight="bold"
                      >
                        Excellence
                      </text>

                      {/* Arrowws */}
                      {/* P→T */}
                      <path
                        d="M 484 141 A 190 190 0 0 1 500 152"
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#ah)"
                      />

                      {/* T→A */}
                      <path
                        d="M 564 349 A 190 190 0 0 1 557 368"
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#ah)"
                      />

                      {/* A→F */}
                      <path
                        d="M 390 490 A 190 190 0 0 1 370 490"
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#ah)"
                      />

                      {/* F→I */}
                      <path
                        d="M 203 368 A 190 190 0 0 1 197 349"
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#ah)"
                      />

                      {/* I→P */}
                      <path
                        d="M 261 152 A 190 190 0 0 1 277 141"
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#ah)"
                      />

                      {/* ICONS — scaled up using transform scale, centered on each node */}

                      {/* Planning (380,110) — ClipboardList — scale(1.5) centered */}
                      <g
                        transform="translate(380,110) scale(1.5) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="2" width="18" height="20" rx="2" />
                        <path d="M9 2.5h6" />
                        <path d="M8 2v3M12 2v3M16 2v3" />
                        <path d="M7 11h10M7 15h6" />
                      </g>

                      {/* Teaching (561,241) — Users */}
                      <g
                        transform="translate(561,241) scale(1.5) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                      </g>

                      {/* Assessment (494,444) — BadgeCheck */}
                      <g
                        transform="translate(494,444) scale(1.5) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2l2.4 4.8L20 8l-4 3.8.9 5.2L12 14.5 7.1 17l.9-5.2L4 8l5.6-1.2z" />
                        <path d="M9 12l2 2 4-4" />
                      </g>

                      {/* Feedback (266,444) — FileText */}
                      <g
                        transform="translate(266,444) scale(1.5) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </g>

                      {/* Improvement (199,241) — TrendingUp */}
                      <g
                        transform="translate(199,241) scale(1.5) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </g>

                      {/* Center BookOpen (380,278) — larger scale */}
                      <g
                        transform="translate(380,278) scale(2.0) translate(-12,-12)"
                        stroke="#F4B942"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </g>
                    </svg>
                  </div>
                </div>
              ) : activeService === 3 ? (
                <div className="relative z-10 h-full">
                  <h4 className="absolute top-[28px] left-0 right-0 text-center text-[#F4B942] text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(244,185,66,0.45)] z-20">
                    Data-Driven Examination Management
                  </h4>

                  <div
                    style={{
                      position: "absolute",
                      top: 72,
                      left: 32,
                      right: 24,
                      bottom: 32,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {/* KPI ROW */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 10,
                        flexShrink: 0,
                      }}
                    >
                      {[
                        { label: "Overall Score", value: "82%", sub: "Good" },
                        { label: "Students", value: "1450+", sub: "Enrolled" },
                        {
                          label: "Completion",
                          value: "98%",
                          sub: "Exams done",
                        },
                      ].map(({ label, value, sub }) => (
                        <div
                          key={label}
                          style={{
                            borderRadius: 16,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            padding: "14px 16px",
                          }}
                        >
                          <p
                            style={{
                              color: "rgba(255,255,255,0.4)",
                              fontSize: 9,
                              textTransform: "uppercase",
                              letterSpacing: "0.15em",
                              marginBottom: 4,
                            }}
                          >
                            {label}
                          </p>
                          <p
                            style={{
                              color: "#F4B942",
                              fontSize: 22,
                              fontWeight: "bold",
                              lineHeight: 1.2,
                              marginBottom: 2,
                            }}
                          >
                            {value}
                          </p>
                          <p
                            style={{
                              color: "rgba(255,255,255,0.35)",
                              fontSize: 9,
                            }}
                          >
                            {sub}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* SUBJECT PERFORMANCE */}
                    <div
                      style={{
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.04)",
                        padding: "14px 16px",
                        flexShrink: 0,
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          marginBottom: 12,
                        }}
                      >
                        Subject Performance
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {[
                          { sub: "Mathematics", val: 88 },
                          { sub: "Science", val: 84 },
                          { sub: "English", val: 78 },
                          { sub: "Social Std.", val: 72 },
                        ].map(({ sub, val }) => (
                          <div
                            key={sub}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: 10,
                                width: 68,
                                flexShrink: 0,
                              }}
                            >
                              {sub}
                            </span>
                            <div
                              style={{
                                flex: 1,
                                height: 6,
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: 999,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${val}%`,
                                  height: "100%",
                                  background: "#F4B942",
                                  borderRadius: 999,
                                }}
                              />
                            </div>
                            <span
                              style={{
                                color: "rgba(255,255,255,0.45)",
                                fontSize: 10,
                                width: 30,
                                textAlign: "right",
                              }}
                            >
                              {val}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BOTTOM ROW */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                        flex: 1,
                        minHeight: 0,
                      }}
                    >
                      {/* GRADE DISTRIBUTION */}
                      <div
                        style={{
                          borderRadius: 16,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "14px 16px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 9,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: 10,
                          }}
                        >
                          Grade Distribution
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-around",
                            flex: 1,
                            paddingBottom: 4,
                          }}
                        >
                          {[
                            { grade: "A", pct: "25%", h: 55 },
                            { grade: "B", pct: "35%", h: 75 },
                            { grade: "C", pct: "26%", h: 58 },
                            { grade: "D", pct: "15%", h: 38 },
                            { grade: "E", pct: "5%", h: 14 },
                          ].map(({ grade, pct, h }) => (
                            <div
                              key={grade}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.4)",
                                  fontSize: 8,
                                }}
                              >
                                {pct}
                              </span>
                              <div
                                style={{
                                  width: 28,
                                  height: h,
                                  background: "rgba(244,185,66,0.75)",
                                  borderRadius: "4px 4px 0 0",
                                }}
                              />
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.55)",
                                  fontSize: 9,
                                  fontWeight: 600,
                                }}
                              >
                                {grade}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LEARNING TREND */}
                      <div
                        style={{
                          borderRadius: 16,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "14px 16px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 9,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: 6,
                          }}
                        >
                          Learning Trend
                        </p>
                        <div
                          style={{ display: "flex", gap: 12, marginBottom: 8 }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                              color: "rgba(255,255,255,0.4)",
                            }}
                          >
                            <span
                              style={{
                                width: 16,
                                height: 2,
                                background: "#F4B942",
                                borderRadius: 1,
                                display: "inline-block",
                              }}
                            />
                            Score
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 8,
                              color: "rgba(255,255,255,0.4)",
                            }}
                          >
                            <span
                              style={{
                                width: 16,
                                height: 2,
                                background: "#A855F7",
                                borderRadius: 1,
                                display: "inline-block",
                              }}
                            />
                            Trend
                          </span>
                        </div>
                        <svg
                          width="100%"
                          style={{ flex: 1 }}
                          viewBox="0 0 260 100"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <defs>
                            <linearGradient
                              id="gf3"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F4B942"
                                stopOpacity="0.2"
                              />
                              <stop
                                offset="100%"
                                stopColor="#F4B942"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          {[25, 50, 75].map((y) => (
                            <line
                              key={y}
                              x1="20"
                              y1={y}
                              x2="250"
                              y2={y}
                              stroke="rgba(255,255,255,0.06)"
                              strokeWidth="1"
                            />
                          ))}
                          <text
                            x="2"
                            y="28"
                            fill="rgba(255,255,255,0.25)"
                            fontSize="8"
                          >
                            90
                          </text>
                          <text
                            x="2"
                            y="53"
                            fill="rgba(255,255,255,0.25)"
                            fontSize="8"
                          >
                            80
                          </text>
                          <text
                            x="2"
                            y="78"
                            fill="rgba(255,255,255,0.25)"
                            fontSize="8"
                          >
                            70
                          </text>
                          <polygon
                            fill="url(#gf3)"
                            points="25,80 70,68 110,72 150,55 190,40 230,28 252,15 252,98 25,98"
                          />
                          <polyline
                            fill="none"
                            stroke="#F4B942"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            points="25,80 70,68 110,72 150,55 190,40 230,28 252,15"
                          />
                          <polyline
                            fill="none"
                            stroke="#A855F7"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            strokeDasharray="4 3"
                            points="25,88 70,77 110,80 150,65 190,52 230,40 252,28"
                          />
                          {[
                            [25, 80],
                            [70, 68],
                            [110, 72],
                            [150, 55],
                            [190, 40],
                            [230, 28],
                            [252, 15],
                          ].map(([x, y], i) => (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r="2.5"
                              fill="#F4B942"
                            />
                          ))}
                          {[
                            [25, 88],
                            [70, 77],
                            [110, 80],
                            [150, 65],
                            [190, 52],
                            [230, 40],
                            [252, 28],
                          ].map(([x, y], i) => (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r="2"
                              fill="#A855F7"
                            />
                          ))}
                        </svg>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 8,
                            color: "rgba(255,255,255,0.3)",
                            marginTop: 4,
                            paddingLeft: 20,
                          }}
                        >
                          {["Apr", "Jun", "Aug", "Oct"].map((m) => (
                            <span key={m}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeService === 4 ? (
                <div className="relative z-10 h-full">
                  <h4 className="absolute top-[28px] left-0 right-0 text-center text-[#F4B942] text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(244,185,66,0.45)] z-20">
                    Educator Growth Pyramid
                  </h4>

                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ top: "55px" }}
                  >
                    <style>{`
        .layer-group { cursor: pointer; transition: opacity 0.3s; }
        .layer-group:hover .layer-fill { filter: brightness(1.25); transition: filter 0.3s; }
        .layer-group:hover .layer-label-heading { fill: rgba(255,255,255,0.95) !important; font-size: 13px; transition: all 0.3s; }
        .layer-group:hover .layer-label-desc { fill: rgba(255,255,255,0.65) !important; transition: all 0.3s; }
        .layer-group:hover .layer-connector { stroke: rgba(244,185,66,0.8) !important; stroke-width: 1.5 !important; transition: all 0.3s; }
        .layer-group:hover .layer-name { fill: rgba(255,255,255,0.9) !important; transition: all 0.3s; }
        .layer-fill { transition: filter 0.3s; }
        .layer-label-heading { transition: fill 0.3s; }
        .layer-label-desc { transition: fill 0.3s; }
        .layer-connector { transition: stroke 0.3s, stroke-width 0.3s; }
        .layer-name { transition: fill 0.3s; }
      `}</style>

                    <svg
                      width="100%"
                      viewBox="40 0 720 460"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ maxHeight: "420px" }}
                    >
                      <defs>
                        <filter id="glow5">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <clipPath id="c2">
                          <rect x="0" y="0" width="720" height="370" />
                        </clipPath>
                        <clipPath id="c3">
                          <rect x="0" y="0" width="720" height="290" />
                        </clipPath>
                        <clipPath id="c4">
                          <rect x="0" y="0" width="720" height="210" />
                        </clipPath>
                        <clipPath id="c5">
                          <rect x="0" y="0" width="720" height="130" />
                        </clipPath>
                        <clipPath id="band1">
                          <rect x="0" y="0" width="720" height="130" />
                        </clipPath>
                        <clipPath id="band2">
                          <rect x="0" y="130" width="720" height="80" />
                        </clipPath>
                        <clipPath id="band3">
                          <rect x="0" y="210" width="720" height="80" />
                        </clipPath>
                        <clipPath id="band4">
                          <rect x="0" y="290" width="720" height="80" />
                        </clipPath>
                        <clipPath id="band5">
                          <rect x="0" y="370" width="720" height="90" />
                        </clipPath>
                      </defs>

                      {/* BASE — KNOWLEDGE (always behind) */}
                      <polygon
                        points="300,18 580,450 20,450"
                        fill="rgba(244,185,66,0.32)"
                      />

                      {/* ── LAYER 2: KNOWLEDGE (370–450) ── */}
                      <g className="layer-group">
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="rgba(244,185,66,0.30)"
                          clipPath="url(#c2)"
                          className="layer-fill"
                        />
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="transparent"
                          clipPath="url(#band5)"
                        />
                        <line
                          x1="72"
                          y1="370"
                          x2="528"
                          y2="370"
                          stroke="rgba(20,7,26,0.65)"
                          strokeWidth="2.5"
                        />
                        <text
                          x="300"
                          y="416"
                          textAnchor="middle"
                          className="layer-name"
                          fill="#1a0f00"
                          fontSize="13"
                          fontWeight="700"
                          letterSpacing="0.12em"
                        >
                          KNOWLEDGE
                        </text>
                        {/* Right-side label */}
                        <line
                          x1="556"
                          y1="410"
                          x2="614"
                          y2="410"
                          stroke="rgba(244,185,66,0.30)"
                          strokeWidth="0.8"
                          className="layer-connector"
                        />
                        <text
                          x="620"
                          y="404"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.65)"
                          fontSize="12"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          className="layer-label-heading"
                        >
                          Foundation
                        </text>
                        <text
                          x="620"
                          y="417"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="11"
                          className="layer-label-desc"
                        >
                          Foundational concepts &amp; theory
                        </text>
                      </g>

                      {/* ── LAYER 3: SKILLS (290–370) ── */}
                      <g className="layer-group">
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="rgba(244,185,66,0.50)"
                          clipPath="url(#c3)"
                          className="layer-fill"
                        />
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="transparent"
                          clipPath="url(#band4)"
                        />
                        <line
                          x1="124"
                          y1="290"
                          x2="476"
                          y2="290"
                          stroke="rgba(20,7,26,0.65)"
                          strokeWidth="2.5"
                        />
                        <text
                          x="300"
                          y="336"
                          textAnchor="middle"
                          className="layer-name"
                          fill="#1a0f00"
                          fontSize="12"
                          fontWeight="700"
                          letterSpacing="0.12em"
                        >
                          SKILLS
                        </text>
                        <line
                          x1="504"
                          y1="330"
                          x2="614"
                          y2="330"
                          stroke="rgba(244,185,66,0.30)"
                          strokeWidth="0.8"
                          className="layer-connector"
                        />
                        <text
                          x="620"
                          y="324"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.65)"
                          fontSize="12"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          className="layer-label-heading"
                        >
                          Competency
                        </text>
                        <text
                          x="620"
                          y="337"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="11"
                          className="layer-label-desc"
                        >
                          Essential teaching competencies
                        </text>
                      </g>

                      {/* ── LAYER 4: APPLICATION (210–290) ── */}
                      <g className="layer-group">
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="rgba(244,185,66,0.72)"
                          clipPath="url(#c4)"
                          className="layer-fill"
                        />
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="transparent"
                          clipPath="url(#band3)"
                        />
                        <line
                          x1="176"
                          y1="210"
                          x2="424"
                          y2="210"
                          stroke="rgba(20,7,26,0.65)"
                          strokeWidth="2.5"
                        />
                        <text
                          x="300"
                          y="256"
                          textAnchor="middle"
                          className="layer-name"
                          fill="#1a0f00"
                          fontSize="11"
                          fontWeight="700"
                          letterSpacing="0.12em"
                        >
                          APPLICATION
                        </text>
                        <line
                          x1="452"
                          y1="250"
                          x2="614"
                          y2="250"
                          stroke="rgba(244,185,66,0.30)"
                          strokeWidth="0.8"
                          className="layer-connector"
                        />
                        <text
                          x="620"
                          y="244"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.65)"
                          fontSize="12"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          className="layer-label-heading"
                        >
                          Practice
                        </text>
                        <text
                          x="620"
                          y="257"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="11"
                          className="layer-label-desc"
                        >
                          Applying skills in real scenarios
                        </text>
                      </g>

                      {/* ── LAYER 5: LEADERSHIP (130–210) ── */}
                      <g className="layer-group">
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="transparent"
                          clipPath="url(#band2)"
                        />
                        <line
                          x1="227"
                          y1="130"
                          x2="373"
                          y2="130"
                          stroke="rgba(20,7,26,0.65)"
                          strokeWidth="2.5"
                        />
                        <text
                          x="300"
                          y="176"
                          textAnchor="middle"
                          className="layer-name"
                          fill="#1a0f00"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="0.12em"
                        >
                          LEADERSHIP
                        </text>
                        <line
                          x1="401"
                          y1="170"
                          x2="614"
                          y2="170"
                          stroke="rgba(244,185,66,0.30)"
                          strokeWidth="0.8"
                          className="layer-connector"
                        />
                        <text
                          x="620"
                          y="164"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.65)"
                          fontSize="12"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          className="layer-label-heading"
                        >
                          Influence
                        </text>
                        <text
                          x="620"
                          y="177"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="11"
                          className="layer-label-desc"
                        >
                          Leading with vision and purpose
                        </text>
                      </g>

                      {/* ── LAYER 6: EXCELLENCE (0–130) ── */}
                      <g className="layer-group">
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="rgba(244,185,66,0.93)"
                          clipPath="url(#c5)"
                          className="layer-fill"
                        />
                        <polygon
                          points="300,18 580,450 20,450"
                          fill="transparent"
                          clipPath="url(#band1)"
                        />
                        <text
                          x="300"
                          y="86"
                          textAnchor="middle"
                          className="layer-name"
                          fill="#1a0f00"
                          fontSize="9"
                          fontWeight="700"
                          letterSpacing="0.12em"
                        >
                          EXCELLENCE
                        </text>
                        <line
                          x1="338"
                          y1="74"
                          x2="614"
                          y2="74"
                          stroke="rgba(244,185,66,0.30)"
                          strokeWidth="0.8"
                          className="layer-connector"
                        />
                        <text
                          x="620"
                          y="68"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.65)"
                          fontSize="12"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          className="layer-label-heading"
                        >
                          Mastery
                        </text>
                        <text
                          x="620"
                          y="81"
                          textAnchor="start"
                          fill="rgba(255,255,255,0.35)"
                          fontSize="11"
                          className="layer-label-desc"
                        >
                          Meaningful &amp; lasting transformation
                        </text>
                      </g>

                      {/* OUTLINE on top */}
                      <polygon
                        points="300,18 580,450 20,450"
                        fill="none"
                        stroke="rgba(244,185,66,0.22)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
              ) : activeService === 5 ? (
                <div className="relative z-10 h-full overflow-hidden">
                  <h4 className="absolute top-[28px] left-0 right-0 text-center text-[#F4B942] text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(244,185,66,0.45)] z-20">
                    Student Success Orbit
                  </h4>

                  {(() => {
                    const OrbitDiagram = () => {
                      const [orbitAngle, setOrbitAngle] = useState(0);

                      useEffect(() => {
                        let raf: number;
                        let startTime: number | null = null;
                        const step = (ts: number) => {
                          if (!startTime) startTime = ts;
                          const elapsed = ts - startTime;
                          setOrbitAngle((elapsed / 18000) * 2 * Math.PI);
                          raf = requestAnimationFrame(step);
                        };
                        raf = requestAnimationFrame(step);
                        return () => cancelAnimationFrame(raf);
                      }, []);

                      const CX = 380;
                      const CY = 320;
                      const ORBIT_R = 185;
                      const NODE_R = 62;

                      const nodes = [
                        {
                          label: ["CRITICAL", "THINKING"],
                          offset: 0,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M0 -14 C-10 -14 -16 -7 -16 2 C-16 9 -11 15 -6 18 L-6 22 L6 22 L6 18 C11 15 16 9 16 2 C16 -7 10 -14 0 -14 Z" />
                              <line x1="-6" y1="22" x2="6" y2="22" />
                              <line x1="-5" y1="26" x2="5" y2="26" />
                              <line x1="-3" y1="30" x2="3" y2="30" />
                              <path
                                d="M-4 -4 Q0 -10 4 -4"
                                strokeOpacity="0.5"
                              />
                            </g>
                          ),
                        },
                        {
                          label: ["COMMUNICATION", "SKILLS"],
                          offset: (2 * Math.PI) / 5,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="-16"
                                y="-18"
                                width="22"
                                height="15"
                                rx="3"
                              />
                              <path d="M-13 -3 L-16 3 L-7 -3" />
                              <rect
                                x="-2"
                                y="-8"
                                width="20"
                                height="15"
                                rx="3"
                              />
                              <path d="M14 7 L18 13 L9 7" />
                            </g>
                          ),
                        },
                        {
                          label: ["CAREER", "READINESS"],
                          offset: (4 * Math.PI) / 5,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="-18"
                                y="-8"
                                width="36"
                                height="26"
                                rx="3"
                              />
                              <path d="M-8 -8 L-8 -14 Q-8 -18 -4 -18 L4 -18 Q8 -18 8 -14 L8 -8" />
                              <line x1="-18" y1="6" x2="18" y2="6" />
                              <line x1="0" y1="-8" x2="0" y2="18" />
                            </g>
                          ),
                        },
                        {
                          label: ["LEADERSHIP", "DEVELOPMENT"],
                          offset: (6 * Math.PI) / 5,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="0" cy="-10" r="7" />
                              <path d="M-14 18 C-14 6 14 6 14 18" />
                              <polygon
                                points="0,-26 2,-21 7,-21 3,-18 5,-13 0,-16 -5,-13 -3,-18 -7,-21 -2,-21"
                                fill="#F4B942"
                                stroke="none"
                              />
                            </g>
                          ),
                        },
                        {
                          label: ["CONFIDENCE", "BUILDING"],
                          offset: (8 * Math.PI) / 5,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M-12 -18 L12 -18 L10 -4 Q10 8 0 8 Q-10 8 -10 -4 Z" />
                              <path d="M-12 -16 C-20 -16 -20 -6 -12 -6" />
                              <path d="M12 -16 C20 -16 20 -6 12 -6" />
                              <line x1="0" y1="8" x2="0" y2="16" />
                              <line x1="-10" y1="16" x2="10" y2="16" />
                              <rect
                                x="-8"
                                y="16"
                                width="16"
                                height="5"
                                rx="1"
                              />
                            </g>
                          ),
                        },
                      ];

                      return (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 760 580"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <defs>
                            <radialGradient
                              id="coreGlow5"
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F4B942"
                                stopOpacity="0.35"
                              />
                              <stop
                                offset="100%"
                                stopColor="#F4B942"
                                stopOpacity="0"
                              />
                            </radialGradient>
                            <radialGradient
                              id="nodeGlow5"
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F4B942"
                                stopOpacity="0.25"
                              />
                              <stop
                                offset="100%"
                                stopColor="#F4B942"
                                stopOpacity="0"
                              />
                            </radialGradient>
                            <filter id="softGlow5">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            <filter id="nodeBloom5">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* SPOKES */}
                          {nodes.map((node, i) => {
                            const theta =
                              orbitAngle + node.offset - Math.PI / 2;
                            const nx = CX + ORBIT_R * Math.cos(theta);
                            const ny = CY + ORBIT_R * Math.sin(theta);
                            return (
                              <line
                                key={`spoke-${i}`}
                                x1={CX}
                                y1={CY}
                                x2={nx}
                                y2={ny}
                                stroke="#F4B942"
                                strokeOpacity="0.55"
                                strokeWidth="1.5"
                              />
                            );
                          })}

                          {/* CENTER GLOW */}
                          <circle
                            cx={CX}
                            cy={CY}
                            r="140"
                            fill="url(#coreGlow5)"
                          />

                          {/* CENTER RINGS */}
                          <circle
                            cx={CX}
                            cy={CY}
                            r="90"
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity="0.35"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx={CX}
                            cy={CY}
                            r="86"
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity="0.12"
                            strokeWidth="5"
                          />
                          <circle cx={CX} cy={CY} r="82" fill="#1B0826" />
                          <circle
                            cx={CX}
                            cy={CY}
                            r="80"
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity="0.65"
                            strokeWidth="1"
                            filter="url(#softGlow5)"
                          />

                          {/* CENTER ICON: graduation cap */}
                          <g
                            transform={`translate(${CX}, ${CY - 18})`}
                            filter="url(#softGlow5)"
                          >
                            <polygon
                              points="0,-22 28,0 0,10 -28,0"
                              fill="#F4B942"
                              fillOpacity="0.85"
                              stroke="#F4B942"
                              strokeWidth="1"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M-18 0 Q-18 20 0 22 Q18 20 18 0 L0 10 Z"
                              fill="#F4B942"
                              fillOpacity="0.55"
                              stroke="#F4B942"
                              strokeWidth="1"
                              strokeLinejoin="round"
                            />
                            <line
                              x1="28"
                              y1="0"
                              x2="28"
                              y2="18"
                              stroke="#F4B942"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle cx="28" cy="20" r="3.5" fill="#F4B942" />
                          </g>

                          <text
                            x={CX}
                            y={CY + 28}
                            textAnchor="middle"
                            fill="#F4B942"
                            fontSize="13"
                            fontWeight="700"
                            letterSpacing="0.15em"
                          >
                            STUDENT
                          </text>
                          <text
                            x={CX}
                            y={CY + 44}
                            textAnchor="middle"
                            fill="#F4B942"
                            fontSize="13"
                            fontWeight="700"
                            letterSpacing="0.15em"
                          >
                            SUCCESS
                          </text>

                          {/* ORBITING NODES */}
                          {nodes.map((node, i) => {
                            const theta =
                              orbitAngle + node.offset - Math.PI / 2;
                            const nx = CX + ORBIT_R * Math.cos(theta);
                            const ny = CY + ORBIT_R * Math.sin(theta);
                            return (
                              <g key={i} transform={`translate(${nx}, ${ny})`}>
                                {/* glow halo */}
                                <circle
                                  r={NODE_R + 16}
                                  fill="url(#nodeGlow5)"
                                />
                                {/* outer ring */}
                                <circle
                                  r={NODE_R}
                                  fill="none"
                                  stroke="#F4B942"
                                  strokeOpacity="0.55"
                                  strokeWidth="1"
                                  filter="url(#nodeBloom5)"
                                />
                                {/* fill */}
                                <circle r={NODE_R - 2} fill="#1B0826" />
                                {/* inner subtle ring */}
                                <circle
                                  r={NODE_R - 3}
                                  fill="none"
                                  stroke="#F4B942"
                                  strokeOpacity="0.35"
                                  strokeWidth="0.8"
                                />

                                {/* Icon — upper half, unchanged */}
                                <g
                                  transform="translate(0, -16)"
                                  filter="url(#nodeBloom5)"
                                >
                                  {node.icon}
                                </g>

                                {/* Labels — anchored from bottom of circle inward */}
                                <text
                                  y={NODE_R - 30}
                                  textAnchor="middle"
                                  fill="#F4B942"
                                  fontSize="8.5"
                                  fontWeight="700"
                                  letterSpacing="0.06em"
                                >
                                  {node.label[0]}
                                </text>
                                <text
                                  y={NODE_R - 19}
                                  textAnchor="middle"
                                  fill="#F4B942"
                                  fontSize="8.5"
                                  fontWeight="700"
                                  letterSpacing="0.06em"
                                >
                                  {node.label[1]}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      );
                    };
                    return <OrbitDiagram />;
                  })()}
                </div>
              ) : activeService === 6 ? (
                <div className="relative z-10 h-full overflow-hidden">
                  <h4 className="absolute top-[28px] left-0 right-0 text-center text-[#F4B942] text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(244,185,66,0.45)] z-20">
                    BUILDING A STRONG SCHOOL BRAND
                  </h4>

                  {(() => {
                    const BrandingDiagram = () => {
                      const [visible, setVisible] = useState(false);
                      const [hoveredCard, setHoveredCard] = useState<
                        number | null
                      >(null);
                      const [hubHovered, setHubHovered] = useState(false);

                      useEffect(() => {
                        const t = setTimeout(() => setVisible(true), 200);
                        return () => clearTimeout(t);
                      }, []);

                      const CW = 240;
                      const CH = 128;
                      const HUB = { cx: 390, cy: 255 };
                      const HUB_R = 62;

                      const cards = [
                        {
                          title: "VISIBILITY",
                          desc: "Increasing reach and awareness",
                          x: 18,
                          y: 72,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="11" r="7" />
                              <path
                                d="M4.5 11 Q12 3 19.5 11 Q12 19 4.5 11"
                                strokeOpacity="0.45"
                              />
                              <circle
                                cx="12"
                                cy="11"
                                r="2.5"
                                fill="#F4B942"
                                stroke="none"
                              />
                              <line x1="12" y1="4" x2="12" y2="2" />
                              <line x1="12" y1="20" x2="12" y2="22" />
                              <line x1="3" y1="11" x2="1" y2="11" />
                              <line x1="21" y1="11" x2="23" y2="11" />
                            </g>
                          ),
                        },
                        {
                          title: "ADMISSIONS",
                          desc: "Converting interest into enrolments",
                          x: 542,
                          y: 72,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="8" y1="13" x2="13" y2="13" />
                              <line x1="8" y1="17" x2="11" y2="17" />
                              <circle cx="17" cy="17" r="3" />
                              <line x1="19.2" y1="19.2" x2="22" y2="22" />
                            </g>
                          ),
                        },
                        {
                          title: "PARENT TRUST",
                          desc: "Strengthening confidence\nand relationships",
                          x: 18,
                          y: 318,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </g>
                          ),
                        },
                        {
                          title: "REPUTATION",
                          desc: "Building credibility and trust",
                          x: 280,
                          y: 388,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon
                                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                fill="rgba(244,185,66,0.15)"
                              />
                              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </g>
                          ),
                        },
                        {
                          title: "COMMUNITY\nENGAGEMENT",
                          desc: "Creating meaningful connections",
                          x: 542,
                          y: 318,
                          icon: (
                            <g
                              stroke="#F4B942"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="5" r="3" />
                              <circle cx="4.5" cy="18" r="3" />
                              <circle cx="19.5" cy="18" r="3" />
                              <line x1="12" y1="8" x2="7" y2="15.2" />
                              <line x1="12" y1="8" x2="17" y2="15.2" />
                              <line x1="7.4" y1="18" x2="16.6" y2="18" />
                            </g>
                          ),
                        },
                      ];

                      const getCardEdgePoint = (card: any) => {
                        const cx = card.x + CW / 2;
                        const cy = card.y + CH / 2;
                        const dx = HUB.cx - cx;
                        const dy = HUB.cy - cy;
                        const scale = Math.min(
                          CW / 2 / Math.abs(dx || 0.0001),
                          CH / 2 / Math.abs(dy || 0.0001),
                        );
                        return { x: cx + dx * scale, y: cy + dy * scale };
                      };

                      const getHubEdgePoint = (cc: {
                        cx: number;
                        cy: number;
                      }) => {
                        const dx = cc.cx - HUB.cx;
                        const dy = cc.cy - HUB.cy;
                        const angle = Math.atan2(dy, dx);
                        return {
                          x: HUB.cx + Math.cos(angle) * (HUB_R + 2),
                          y: HUB.cy + Math.sin(angle) * (HUB_R + 2),
                        };
                      };

                      return (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 800 540"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <defs>
                            <radialGradient
                              id="hubGlow6"
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F4B942"
                                stopOpacity="0.32"
                              />
                              <stop
                                offset="100%"
                                stopColor="#F4B942"
                                stopOpacity="0"
                              />
                            </radialGradient>
                            <radialGradient
                              id="hubGlowHot6"
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F4B942"
                                stopOpacity="0.55"
                              />
                              <stop
                                offset="100%"
                                stopColor="#F4B942"
                                stopOpacity="0"
                              />
                            </radialGradient>
                            <filter
                              id="glow6"
                              x="-30%"
                              y="-30%"
                              width="160%"
                              height="160%"
                            >
                              <feGaussianBlur
                                stdDeviation="3.5"
                                result="blur"
                              />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            <filter
                              id="hubBloom6"
                              x="-60%"
                              y="-60%"
                              width="220%"
                              height="220%"
                            >
                              <feGaussianBlur stdDeviation="9" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            <clipPath id="hubClip6">
                              <circle cx={HUB.cx} cy={HUB.cy} r={HUB_R - 4} />
                            </clipPath>
                          </defs>

                          {/* CONNECTOR LINES */}
                          {cards.map((c, i) => {
                            const cardEdge = getCardEdgePoint(c);
                            const hubEdge = getHubEdgePoint({
                              cx: c.x + CW / 2,
                              cy: c.y + CH / 2,
                            });
                            return (
                              <line
                                key={`line-${i}`}
                                x1={cardEdge.x}
                                y1={cardEdge.y}
                                x2={hubEdge.x}
                                y2={hubEdge.y}
                                stroke="#F4B942"
                                strokeOpacity={
                                  visible
                                    ? hoveredCard === i
                                      ? 0.45
                                      : 0.15
                                    : 0
                                }
                                strokeWidth={hoveredCard === i ? 1.8 : 1.2}
                                strokeDasharray="6 5"
                                style={{
                                  transition:
                                    "stroke-opacity 0.35s ease, stroke-width 0.35s ease",
                                }}
                              />
                            );
                          })}

                          {/* CARDS */}
                          {cards.map((c, i) => {
                            const isHovered = hoveredCard === i;
                            return (
                              <g
                                key={`card-${i}`}
                                style={{
                                  opacity: visible ? 1 : 0,
                                  transition: `opacity 0.55s ease ${i * 0.12}s`,
                                  cursor: "pointer",
                                }}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                              >
                                {/* AURA */}
                                <rect
                                  x={c.x - 8}
                                  y={c.y - 8}
                                  width={CW + 16}
                                  height={CH + 16}
                                  rx="26"
                                  fill="rgba(244,185,66,0.06)"
                                  style={{
                                    opacity: isHovered ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                  }}
                                  filter="url(#hubBloom6)"
                                />
                                {/* CARD BODY */}
                                <rect
                                  x={c.x}
                                  y={c.y}
                                  width={CW}
                                  height={CH}
                                  rx="20"
                                  fill={
                                    isHovered
                                      ? "rgba(244,185,66,0.07)"
                                      : "rgba(255,255,255,0.04)"
                                  }
                                  stroke={
                                    isHovered
                                      ? "rgba(244,185,66,0.55)"
                                      : "rgba(244,185,66,0.20)"
                                  }
                                  strokeWidth="1.2"
                                  style={{
                                    transition:
                                      "fill 0.3s ease, stroke 0.3s ease",
                                  }}
                                />
                                {/* TOP GOLD ACCENT BAR */}
                                <rect
                                  x={c.x + 18}
                                  y={c.y}
                                  width={isHovered ? 80 : 52}
                                  height="2.5"
                                  rx="1.5"
                                  fill="#F4B942"
                                  fillOpacity={isHovered ? 1 : 0.75}
                                  filter="url(#glow6)"
                                  style={{
                                    transition:
                                      "width 0.35s ease, fill-opacity 0.3s ease",
                                  }}
                                />
                                {/* ICON */}
                                <g
                                  transform={`translate(${c.x + 16}, ${c.y + 16})`}
                                >
                                  {c.icon}
                                </g>
                                {/* TITLE */}
                                {c.title.split("\n").map((line, li) => (
                                  <text
                                    key={li}
                                    x={c.x + 18}
                                    y={c.y + 60 + li * 13}
                                    fill="#F4B942"
                                    fontSize="14"
                                    fontWeight="700"
                                    letterSpacing="0.14em"
                                    filter="url(#glow6)"
                                  >
                                    {line}
                                  </text>
                                ))}
                                {/* DESC */}
                                {c.desc.split("\n").map((line, li) => (
                                  <text
                                    key={li}
                                    x={c.x + 18}
                                    y={
                                      c.y +
                                      (c.title.includes("\n") ? 100 : 88) +
                                      li * 13
                                    }
                                    fill={
                                      isHovered
                                        ? "rgba(255,255,255,0.65)"
                                        : "rgba(255,255,255,0.40)"
                                    }
                                    fontSize="14"
                                    style={{ transition: "fill 0.3s ease" }}
                                  >
                                    {line}
                                  </text>
                                ))}
                              </g>
                            );
                          })}

                          {/* HUB GLOW */}
                          <circle
                            cx={HUB.cx}
                            cy={HUB.cy}
                            r="110"
                            fill={
                              hubHovered
                                ? "url(#hubGlowHot6)"
                                : "url(#hubGlow6)"
                            }
                            style={{
                              opacity: visible ? 1 : 0,
                              transition: "opacity 1s ease 0.4s",
                            }}
                          />

                          {/* HUB RINGS */}
                          <circle
                            cx={HUB.cx}
                            cy={HUB.cy}
                            r="72"
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity="0.14"
                            strokeWidth="1"
                            style={{
                              opacity: visible ? 1 : 0,
                              transition: "opacity 0.8s ease 0.45s",
                            }}
                          />
                          <circle
                            cx={HUB.cx}
                            cy={HUB.cy}
                            r="66"
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity="0.09"
                            strokeWidth="8"
                            style={{
                              opacity: visible ? 1 : 0,
                              transition: "opacity 0.8s ease 0.45s",
                            }}
                          />
                          <circle
                            cx={HUB.cx}
                            cy={HUB.cy}
                            r={HUB_R}
                            fill="#1B0826"
                            style={{
                              opacity: visible ? 1 : 0,
                              transition: "opacity 0.8s ease 0.5s",
                            }}
                          />
                          <circle
                            cx={HUB.cx}
                            cy={HUB.cy}
                            r={HUB_R - 2}
                            fill="none"
                            stroke="#F4B942"
                            strokeOpacity={hubHovered ? 0.9 : 0.6}
                            strokeWidth="1.2"
                            filter="url(#hubBloom6)"
                            style={{
                              opacity: visible ? 1 : 0,
                              transition:
                                "stroke-opacity 0.35s ease, opacity 0.8s ease 0.55s",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => setHubHovered(true)}
                            onMouseLeave={() => setHubHovered(false)}
                          />

                          {/* HUB SCHOOL ICON */}
                          <g clipPath="url(#hubClip6)">
                            <g
                              transform={`translate(${HUB.cx}, ${HUB.cy + 6}) scale(${hubHovered ? 2.4 : 2.25})`}
                              filter="url(#glow6)"
                              style={{
                                opacity: visible ? 1 : 0,
                                transition:
                                  "opacity 0.8s ease 0.6s, transform 0.35s ease",
                                cursor: "pointer",
                              }}
                              onMouseEnter={() => setHubHovered(true)}
                              onMouseLeave={() => setHubHovered(false)}
                            >
                              <rect
                                x="-11"
                                y="0"
                                width="8"
                                height="12"
                                rx="0.8"
                                fill="#F4B942"
                                fillOpacity="0.72"
                              />
                              <rect
                                x="3"
                                y="0"
                                width="8"
                                height="12"
                                rx="0.8"
                                fill="#F4B942"
                                fillOpacity="0.72"
                              />
                              <rect
                                x="-7"
                                y="-10"
                                width="14"
                                height="12"
                                rx="0.8"
                                fill="#F4B942"
                                fillOpacity="0.88"
                              />
                              <polygon
                                points="0,-17 -10,-8 10,-8"
                                fill="#F4B942"
                                fillOpacity="0.96"
                              />
                              <line
                                x1="0"
                                y1="-17"
                                x2="0"
                                y2="-22"
                                stroke="#F4B942"
                                strokeWidth="1.2"
                              />
                              <polygon
                                points="0,-22 5,-20 0,-18"
                                fill="#F4B942"
                              />
                              <rect
                                x="-5"
                                y="-8"
                                width="3.5"
                                height="3.5"
                                rx="0.5"
                                fill="#1B0826"
                              />
                              <rect
                                x="1.5"
                                y="-8"
                                width="3.5"
                                height="3.5"
                                rx="0.5"
                                fill="#1B0826"
                              />
                              <rect
                                x="-2.5"
                                y="0"
                                width="5"
                                height="12"
                                rx="2.5"
                                fill="#1B0826"
                              />
                              <rect
                                x="-9.5"
                                y="4"
                                width="4"
                                height="7"
                                rx="0.5"
                                fill="#1B0826"
                              />
                              <rect
                                x="5.5"
                                y="4"
                                width="4"
                                height="7"
                                rx="0.5"
                                fill="#1B0826"
                              />
                            </g>
                          </g>
                        </svg>
                      );
                    };
                    return <BrandingDiagram />;
                  })()}
                </div>
              ) : activeService === 7 ? (
                <div className="relative z-10 h-full overflow-hidden">
                  <h4 className="absolute top-[28px] left-0 right-0 text-center text-[#F4B942] text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(244,185,66,0.45)] z-20">
                    INSTITUTIONAL COMMAND CENTRE
                  </h4>

                  {(() => {
                    const Blocks = () => {
                      const [hoveredBlock, setHoveredBlock] = useState<
                        number | null
                      >(null);
                      const [animated, setAnimated] = useState(false);

                      useEffect(() => {
                        setAnimated(false);
                        const t = setTimeout(() => setAnimated(true), 80);
                        return () => {
                          clearTimeout(t);
                          setAnimated(false);
                        };
                      }, []);

                      const BW = 500;
                      const BH = 72;
                      const GAP = 7;
                      const ISO = 20;
                      const CX = 400;

                      const blocks = [
                        {
                          label: "ADMINISTRATION",
                          sub: "Governance & Policy",
                          color: "rgba(244,185,66,0.88)",
                          dimColor: "rgba(175,125,28,0.88)",
                          topColor: "rgba(255,218,82,0.92)",
                          glowColor: "rgba(244,185,66,0.3)",
                        },
                        {
                          label: "ACCOUNTS",
                          sub: "Finance & Budgets",
                          color: "rgba(244,185,66,0.74)",
                          dimColor: "rgba(165,115,24,0.82)",
                          topColor: "rgba(255,212,72,0.88)",
                          glowColor: "rgba(244,185,66,0.24)",
                        },
                        {
                          label: "LIBRARY & LABS",
                          sub: "Resources & Research",
                          color: "rgba(244,185,66,0.60)",
                          dimColor: "rgba(155,106,20,0.76)",
                          topColor: "rgba(255,206,62,0.84)",
                          glowColor: "rgba(244,185,66,0.18)",
                        },
                        {
                          label: "ACADEMIC COUNSELLING",
                          sub: "Guidance & Support",
                          color: "rgba(244,185,66,0.46)",
                          dimColor: "rgba(144,96,16,0.70)",
                          topColor: "rgba(255,200,54,0.80)",
                          glowColor: "rgba(244,185,66,0.14)",
                        },
                        {
                          label: "OPERATIONS",
                          sub: "Systems & Processes",
                          color: "rgba(244,185,66,0.32)",
                          dimColor: "rgba(132,88,12,0.64)",
                          topColor: "rgba(255,194,46,0.76)",
                          glowColor: "rgba(244,185,66,0.10)",
                        },
                      ];

                      const totalBlocks = blocks.length;
                      const LEFT = CX - BW / 2;
                      const RIGHT = CX + BW / 2;
                      const connectorX = LEFT - 40;

                      const stackTotalH = totalBlocks * (BH + GAP) - GAP + ISO;
                      const topStart = 78;
                      const baseY = topStart + stackTotalH;

                      const blockY = (i: number) =>
                        baseY - (totalBlocks - i) * (BH + GAP) - ISO + GAP;

                      return (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 780 530"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <defs>
                            <filter
                              id="bglow"
                              x="-30%"
                              y="-30%"
                              width="160%"
                              height="160%"
                            >
                              <feGaussianBlur stdDeviation="9" result="b" />
                              <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            <filter
                              id="bglow2"
                              x="-20%"
                              y="-20%"
                              width="140%"
                              height="140%"
                            >
                              <feGaussianBlur stdDeviation="3" result="b" />
                              <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          <style>{`
  @keyframes slideIn {
    0%   { opacity: 0; transform: translateX(-120px); }
    100% { opacity: 1; transform: translateX(0px); }
  }
`}</style>

                          {/* Ambient shadow */}
                          <ellipse
                            cx={CX + ISO / 2}
                            cy={baseY + 22}
                            rx={BW / 2 + 30}
                            ry={14}
                            fill="rgba(244,185,66,0.10)"
                            filter="url(#bglow)"
                          />

                          {/* Vertical connector rail */}
                          <line
                            x1={connectorX}
                            y1={blockY(0) + BH / 2}
                            x2={connectorX}
                            y2={blockY(totalBlocks - 1) + BH / 2}
                            stroke="rgba(244,185,66,0.22)"
                            strokeWidth="1"
                            strokeDasharray="5 5"
                          />

                          {/* Blocks — bottom to top for z-order */}
                          {[...blocks].reverse().map((block, ri) => {
                            const i = totalBlocks - 1 - ri;
                            const y = blockY(i);
                            const isHov = hoveredBlock === i;

                            const topPts = [
                              `${LEFT},${y}`,
                              `${LEFT + ISO},${y - ISO}`,
                              `${RIGHT + ISO},${y - ISO}`,
                              `${RIGHT},${y}`,
                            ].join(" ");

                            const rightPts = [
                              `${RIGHT},${y}`,
                              `${RIGHT + ISO},${y - ISO}`,
                              `${RIGHT + ISO},${y - ISO + BH}`,
                              `${RIGHT},${y + BH}`,
                            ].join(" ");

                            const faceOpacity = [0.65, 0.52, 0.4, 0.3, 0.22][i];
                            const topOpacity = [0.5, 0.42, 0.36, 0.3, 0.24][i];
                            const dimOpacity = [0.45, 0.38, 0.32, 0.26, 0.2][i];

                            const blockCY = y + BH / 2;

                            return (
                              <g
                                key={i}
                                style={{
                                  cursor: "pointer",
                                  opacity: animated ? 1 : 0,
                                  animation: animated
                                    ? `slideIn 0.45s ease-out ${i * 0.12}s both`
                                    : "none",
                                  transformOrigin: `${CX}px ${y + BH / 2}px`,
                                }}
                                onMouseEnter={() => setHoveredBlock(i)}
                                onMouseLeave={() => setHoveredBlock(null)}
                              >
                                {/* Front face */}
                                <rect
                                  x={LEFT}
                                  y={y}
                                  width={BW}
                                  height={BH}
                                  fill={
                                    isHov
                                      ? block.color
                                      : block.color.replace(
                                          /\d+\.?\d*\)$/,
                                          `${faceOpacity})`,
                                        )
                                  }
                                  stroke="rgba(244,185,66,0.55)"
                                  strokeWidth={isHov ? 1.5 : 0.8}
                                  rx="4"
                                  filter={isHov ? "url(#bglow2)" : undefined}
                                  style={{
                                    transition: "fill 0.3s, stroke-width 0.3s",
                                  }}
                                />

                                {/* Inner inset */}
                                <rect
                                  x={LEFT + 7}
                                  y={y + 6}
                                  width={BW - 14}
                                  height={BH - 12}
                                  fill="none"
                                  stroke={
                                    isHov
                                      ? "rgba(255,255,255,0.14)"
                                      : "rgba(255,255,255,0.05)"
                                  }
                                  strokeWidth="0.8"
                                  rx="3"
                                  style={{ transition: "all 0.3s" }}
                                />

                                {/* Top face */}
                                <polygon
                                  points={topPts}
                                  fill={
                                    isHov
                                      ? block.topColor
                                      : block.topColor.replace(
                                          /\d+\.?\d*\)$/,
                                          `${topOpacity})`,
                                        )
                                  }
                                  stroke="rgba(244,185,66,0.45)"
                                  strokeWidth="0.8"
                                  style={{ transition: "all 0.3s" }}
                                />

                                {/* Right face */}
                                <polygon
                                  points={rightPts}
                                  fill={
                                    isHov
                                      ? block.dimColor
                                      : block.dimColor.replace(
                                          /\d+\.?\d*\)$/,
                                          `${dimOpacity})`,
                                        )
                                  }
                                  stroke="rgba(244,185,66,0.3)"
                                  strokeWidth="0.8"
                                  style={{ transition: "all 0.3s" }}
                                />

                                {/* Label */}
                                <text
                                  x={CX}
                                  y={y + BH / 2 - 9}
                                  textAnchor="middle"
                                  fill={
                                    isHov ? "#14071A" : "rgba(244,185,66,0.95)"
                                  }
                                  fontSize="15"
                                  fontWeight="700"
                                  letterSpacing="0.18em"
                                  style={{ transition: "fill 0.3s" }}
                                >
                                  {block.label}
                                </text>
                                <text
                                  x={CX}
                                  y={y + BH / 2 + 11}
                                  textAnchor="middle"
                                  fill={
                                    isHov
                                      ? "rgba(20,7,26,0.7)"
                                      : "rgba(255,255,255,0.42)"
                                  }
                                  fontSize="13"
                                  style={{ transition: "fill 0.3s" }}
                                >
                                  {block.sub}
                                </text>

                                {/* Rail dot */}
                                <circle
                                  cx={connectorX}
                                  cy={blockCY}
                                  r={isHov ? 6 : 4}
                                  fill={
                                    isHov ? "#F4B942" : "rgba(244,185,66,0.28)"
                                  }
                                  stroke="#F4B942"
                                  strokeWidth="0.8"
                                  filter={isHov ? "url(#bglow2)" : undefined}
                                  style={{ transition: "all 0.3s" }}
                                />

                                {/* Rail tick */}
                                <line
                                  x1={connectorX + (isHov ? 6 : 4)}
                                  y1={blockCY}
                                  x2={LEFT}
                                  y2={blockCY}
                                  stroke={
                                    isHov
                                      ? "rgba(244,185,66,0.65)"
                                      : "rgba(244,185,66,0.18)"
                                  }
                                  strokeWidth="0.8"
                                  style={{ transition: "all 0.3s" }}
                                />
                              </g>
                            );
                          })}
                        </svg>
                      );
                    };

                    return <Blocks />;
                  })()}
                </div>
              ) : (
                <div className="relative z-10 text-center px-12 h-full flex flex-col items-center justify-center">
                  <div className="text-[#F4B942] text-8xl mb-8">◈</div>
                  <h3 className="text-5xl font-bold mb-6">
                    {services[activeService].title}
                  </h3>
                  <p className="text-white/60 text-xl max-w-md mx-auto">
                    {services[activeService].description}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* STATIC CONTROLS */}
        <div
          className="flex items-center gap-16 -mt-24"
          style={{ marginLeft: "4rem" }}
        >
          {/* LEARN MORE */}
          <a
            href="/services"
            className="inline-flex items-center gap-3 border border-[#F4B942]/40 text-[#F4B942] px-7 py-4 rounded-full font-semibold text-base hover:bg-[#F4B942]/10 hover:border-[#F4B942] hover:shadow-[0_0_30px_rgba(244,185,66,0.2)] transition-all duration-300 w-fit"
            style={{
              padding: "10px 24px",
              alignSelf: "flex-start",
              display: "inline-flex",
              marginTop: "0.5rem",
              marginLeft: "-1rem",
            }}
          >
            <span>Learn More</span>

            <span className="transition-all duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>

          {/* DOTS */}
          {/* DOTS + ARROWS */}
          <div
            className="flex items-center gap-6"
            style={{ marginLeft: "24rem", marginTop: "5rem" }}
          >
            {/* PREV ARROW */}
            <button
              onClick={() => {
                setActiveService(
                  (prev) => (prev - 1 + services.length) % services.length,
                );
                startAutoSlide();
              }}
              className="
  flex items-center justify-center
  text-[#F4B942]
  drop-shadow-[0_0_8px_rgba(244,185,66,0.5)]
  hover:scale-125
  hover:drop-shadow-[0_0_20px_rgba(244,185,66,1)]
  transition-all duration-300
"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* DOTS */}
            <div className="flex gap-4 items-center">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveService(index);
                    startAutoSlide();
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    activeService === index
                      ? "w-12 h-2 bg-[#F4B942]"
                      : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* NEXT ARROW */}
            <button
              onClick={() => {
                setActiveService((prev) => (prev + 1) % services.length);
                startAutoSlide();
              }}
              className="
  flex items-center justify-center
  text-[#F4B942]
  drop-shadow-[0_0_8px_rgba(244,185,66,0.5)]
  hover:scale-125
  hover:drop-shadow-[0_0_20px_rgba(244,185,66,1)]
  transition-all duration-300
"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* SPACING BEFORE Why schools choose us */}
      <div className="h-24 md:h-36" />

      {/* ================= WHY SCHOOLS CHOOSE US ================= */}
      <section
        id="differentiators"
        className="relative pt-24 pb-16 px-8 md:px-16 overflow-hidden"
      >
        <div className="absolute top-0 left-[-120px] w-[320px] h-[320px] bg-[#F59E0B]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-[-120px] w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full" />

        <div className="relative z-10" style={{ marginLeft: "2rem" }}>
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-12">
            OUR DIFFERENTIATORS
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem", marginBottom: "3rem" }}
          >
            Why Schools Choose <span className="text-[#F4B942]">Wonder</span>
            <br />
            <span className="text-[#F4B942]">Illuminate</span>
          </h2>
        </div>

        <div
          className="relative z-10 grid lg:grid-cols-2 gap-6"
          style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
        >
          {/* CARD 1 */}
          <div className="group [perspective:2000px]">
            <div className="relative min-h-[300px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden [backface-visibility:hidden]">
                <div className="absolute top-[-100px] right-[-100px] w-[240px] h-[240px] bg-[#A855F7]/15 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  01
                </div>
                <div
                  className="relative z-10 h-full flex flex-col justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: "2.6rem",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      marginBottom: "0.75rem",
                    }}
                  >
                    End-to-End Support
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "1.2rem",
                      lineHeight: 1.7,
                    }}
                  >
                    From planning and affiliation to academics and operations.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[28px] border border-[#F4B942]/40 bg-[#F4B942]/15 backdrop-blur-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute bottom-[-100px] right-[-100px] w-[240px] h-[240px] bg-[#F4B942]/15 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  01
                </div>
                <div
                  className="relative z-10 flex flex-col h-full justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <p
                    style={{
                      color: "#F4B942",
                      fontSize: "0.9rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    WHAT THIS MEANS FOR YOU
                  </p>
                  <h3
                    style={{
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    One Partner. Every Stage.
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.80)",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                    }}
                  >
                    One trusted partner for every stage of school development,
                    ensuring consistency, efficiency, and reduced coordination
                    challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group [perspective:2000px]">
            <div className="relative min-h-[300px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden [backface-visibility:hidden]">
                <div className="absolute bottom-[-100px] left-[-100px] w-[240px] h-[240px] bg-cyan-400/10 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  02
                </div>
                <div
                  className="relative z-10 h-full flex flex-col justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: "2.6rem",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Customized Solutions
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "1.2rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Strategies aligned with every institution's vision and
                    requirements.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[28px] border border-[#F4B942]/40 bg-[#F4B942]/15 backdrop-blur-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute bottom-[-100px] right-[-100px] w-[240px] h-[240px] bg-[#F4B942]/15 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  02
                </div>
                <div
                  className="relative z-10 flex flex-col h-full justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <p
                    style={{
                      color: "#F4B942",
                      fontSize: "0.9rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    WHAT THIS MEANS FOR YOU
                  </p>
                  <h3
                    style={{
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Built Around Your School.
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.80)",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                    }}
                  >
                    No template-based approach. Every recommendation is tailored
                    to your school's goals, scale, and long-term aspirations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group [perspective:2000px]">
            <div className="relative min-h-[300px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden [backface-visibility:hidden]">
                <div className="absolute top-[-100px] left-[-100px] w-[240px] h-[240px] bg-[#F4B942]/10 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  03
                </div>
                <div
                  className="relative z-10 h-full flex flex-col justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: "2.6rem",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Long-Term Partnerships
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "1.2rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Most schools continue with us beyond initial engagement.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[28px] border border-[#F4B942]/40 bg-[#F4B942]/15 backdrop-blur-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute bottom-[-100px] right-[-100px] w-[240px] h-[240px] bg-[#F4B942]/15 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  03
                </div>
                <div
                  className="relative z-10 flex flex-col h-full justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <p
                    style={{
                      color: "#F4B942",
                      fontSize: "0.9rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    WHAT THIS MEANS FOR YOU
                  </p>
                  <h3
                    style={{
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Relationships Built to Last.
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.80)",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                    }}
                  >
                    We grow with your institution, providing continuous guidance
                    rather than one-time consultancy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="group [perspective:2000px]">
            <div className="relative min-h-[300px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden [backface-visibility:hidden]">
                <div className="absolute bottom-[-100px] right-[-100px] w-[240px] h-[240px] bg-pink-400/10 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  04
                </div>
                <div
                  className="relative z-10 h-full flex flex-col justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: "2.6rem",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Academic & Operational Depth
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "1.2rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Strong systems designed for sustainable institutional
                    growth.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[28px] border border-[#F4B942]/40 bg-[#F4B942]/15 backdrop-blur-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute top-[-100px] left-[-100px] w-[240px] h-[240px] bg-[#F4B942]/15 blur-[120px] rounded-full" />
                <div
                  className="rounded-[14px] bg-[#F4B942]/20 flex items-center justify-center font-bold text-[#F4B942]"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                    position: "absolute",
                    top: "1.6rem",
                    left: "1.6rem",
                  }}
                >
                  04
                </div>
                <div
                  className="relative z-10 flex flex-col h-full justify-center"
                  style={{ padding: "5rem 2.5rem 2rem 2.5rem" }}
                >
                  <p
                    style={{
                      color: "#F4B942",
                      fontSize: "0.9rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    WHAT THIS MEANS FOR YOU
                  </p>
                  <h3
                    style={{
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Depth Across Every Domain.
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.80)",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                    }}
                  >
                    Robust academic frameworks and efficient processes that
                    improve quality, consistency, and long-term performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learn More BUTTON */}
        <div
          className="relative z-10 flex justify-center"
          style={{ marginTop: "3.5rem" }}
        >
          <Link
            href="/why-wise#differentiator-cards"
            scroll={false}
            className="hover:scale-105 transition duration-300"
            style={{
              display: "inline-block",
              background: "#F4B942",
              color: "black",
              padding: "0.85rem 2.5rem",
              borderRadius: "9999px",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* SPACING BEFORE Our approach */}
      <div className="h-24 md:h-36" />
      {/* ================= OUR APPROACH SECTION ================= */}
      <section
        id="approach"
        className="relative z-10 px-8 md:px-20 pb-32 pt-24"
      >
        {/* BACKGROUND GLOWS — contained so they don't bleed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[0%] left-[-100px] w-[400px] h-[400px] bg-[#F4B942]/8 blur-[180px] rounded-full" />
          <div className="absolute bottom-[0%] right-[-100px] w-[400px] h-[400px] bg-[#A855F7]/8 blur-[180px] rounded-full" />
        </div>

        {/* TITLE — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginLeft: "2rem", marginBottom: "8rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
            OUR APPROACH
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem" }}
          >
            How We <span className="text-[#F4B942]">Work</span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative w-full">
          {/* VERTICAL LINE — fades at both ends identically */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[2px] pointer-events-none"
            style={{
              top: "-60px",
              bottom: "-60px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(244,185,66,0.45) 5%, rgba(244,185,66,0.45) 95%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-14">
            {[
              {
                number: "01",
                title: "Diagnose",
                description:
                  "Understanding vision, gaps, and institutional requirements",
                style: "filled",
              },
              {
                number: "02",
                title: "Plan",
                description:
                  "Developing customized academic and operational frameworks",
                style: "outline",
              },
              {
                number: "03",
                title: "Implement",
                description:
                  "Executing systems, processes, and compliance structures",
                style: "filled",
              },
              {
                number: "04",
                title: "Support",
                description:
                  "Continuous monitoring, refinement, and long-term guidance",
                style: "outline",
              },
            ].map((step, index) => {
              const isLeft = index % 2 === 0;
              const isFilled = step.style === "filled";

              const Card = ({ side }: { side: "left" | "right" }) => (
                <div
                  className={`
              relative rounded-[20px] overflow-hidden
              cursor-default transition-all duration-500
              ${
                isFilled
                  ? "bg-[#F4B942]/15 border border-[#F4B942]/40 group-hover:bg-[#F4B942]/25 group-hover:border-[#F4B942]/70 group-hover:shadow-[0_0_50px_rgba(244,185,66,0.2)]"
                  : "border border-white/10 bg-white/[0.04] backdrop-blur-xl group-hover:border-[#F4B942]/30 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]"
              }
            `}
                  style={{ padding: "28px 32px" }}
                >
                  {/* GOLD ACCENT BAR — top left, always visible on filled, hover on outline */}
                  <div
                    className={`
                absolute top-0 left-7 h-[2px] rounded-full bg-[#F4B942]
                shadow-[0_0_12px_rgba(244,185,66,0.8)]
                transition-all duration-500
                ${
                  isFilled
                    ? "w-10 opacity-60 group-hover:w-20 group-hover:opacity-100"
                    : "w-0 opacity-0 group-hover:w-16 group-hover:opacity-100"
                }
              `}
                  />

                  {/* CORNER BRACKETS — top left */}
                  <div
                    className={`
                absolute top-4 left-4 w-4 h-4
                border-t-2 border-l-2 rounded-tl-sm
                transition-all duration-500
                ${
                  isFilled
                    ? "border-[#F4B942]/40 group-hover:border-[#F4B942]/80"
                    : "border-white/20 group-hover:border-[#F4B942]/60"
                }
              `}
                  />

                  {/* CORNER BRACKETS — bottom right */}
                  <div
                    className={`
                absolute bottom-4 right-4 w-4 h-4
                border-b-2 border-r-2 rounded-br-sm
                transition-all duration-500
                ${
                  isFilled
                    ? "border-[#F4B942]/40 group-hover:border-[#F4B942]/80"
                    : "border-white/20 group-hover:border-[#F4B942]/60"
                }
              `}
                  />

                  {/* AMBIENT GLOW */}
                  <div
                    className={`
                absolute top-[-40px] right-[-40px] w-[160px] h-[160px] rounded-full blur-[50px]
                transition-all duration-700
                ${
                  isFilled
                    ? "bg-[#F4B942]/10 group-hover:bg-[#F4B942]/20"
                    : "bg-[#A855F7]/0 group-hover:bg-[#A855F7]/10"
                }
              `}
                  />

                  {/* HORIZONTAL CONNECTOR to center line */}
                  <div
                    className={`
                absolute top-1/2 -translate-y-1/2 h-[2px] w-10
                transition-all duration-500
                ${side === "left" ? "right-[-40px]" : "left-[-40px]"}
                ${
                  isFilled
                    ? "bg-[#F4B942]/50 group-hover:bg-[#F4B942]/90"
                    : "bg-[#F4B942]/25 group-hover:bg-[#F4B942]/60"
                }
              `}
                  />

                  {/* CONTENT */}
                  <div className="flex items-center gap-6">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`
                    text-2xl md:text-3xl font-bold mb-3 transition-colors duration-500
                    ${
                      isFilled
                        ? "text-[#F4B942] group-hover:text-white"
                        : "text-white group-hover:text-[#F4B942]"
                    }
                  `}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`
                    text-base md:text-lg leading-relaxed transition-colors duration-500
                    ${
                      isFilled
                        ? "text-[#F4B942]/60 group-hover:text-white/70"
                        : "text-white/50 group-hover:text-[#F4B942]/80"
                    }
                  `}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* FADED BG NUMBER */}
                    <span
                      className={`
                  heading-fluid-stat leading-none select-none
                  flex-shrink-0 transition-colors duration-500
                  ${
                    isFilled
                      ? "text-[#F4B942]/15 group-hover:text-[#F4B942]/30"
                      : "text-white/[0.05] group-hover:text-[#F4B942]/12"
                  }
                `}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative flex items-center"
                >
                  {/* LEFT SLOT */}
                  <div className="w-[calc(50%-28px)] flex justify-end pr-10">
                    {isLeft && (
                      <div className="w-full max-w-[480px]">
                        <Card side="left" />
                      </div>
                    )}
                  </div>

                  {/* CENTER NODE — solid bg so line doesn't show through */}
                  <div className="w-14 flex-shrink-0 flex justify-center z-10">
                    <div
                      className={`
                  w-12 h-12 rounded-full flex items-center justify-center relative
                  transition-all duration-500
                  ${
                    isFilled
                      ? "border border-[#F4B942]/70 shadow-[0_0_20px_rgba(244,185,66,0.35)] group-hover:border-[#F4B942] group-hover:shadow-[0_0_40px_rgba(244,185,66,0.7)]"
                      : "border border-[#F4B942]/40 shadow-[0_0_12px_rgba(244,185,66,0.1)] group-hover:border-[#F4B942] group-hover:shadow-[0_0_30px_rgba(244,185,66,0.5)]"
                  }
                `}
                      style={{ backgroundColor: "#14071A" }}
                    >
                      <span className="relative z-10 text-xs font-bold tracking-wider text-[#F4B942]">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SLOT */}
                  <div className="w-[calc(50%-28px)] flex justify-start pl-10">
                    {!isLeft && (
                      <div className="w-full max-w-[480px]">
                        <Card side="right" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Learn More BUTTON */}
        <div
          className="relative z-10 flex justify-center"
          style={{ marginTop: "3.5rem" }}
        >
          <Link
            href="/why-wise#philosophy"
            scroll={false}
            className="hover:scale-105 transition duration-300"
            style={{
              display: "inline-block",
              background: "#F4B942",
              color: "black",
              padding: "0.85rem 2.5rem",
              borderRadius: "9999px",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* SPACING BEFORE Track Record */}
      <div className="h-24 md:h-36" />

      {/* ================= TRACK RECORD SECTION ================= */}
      <section id="impact" className="relative z-10 pb-32 pt-24 px-8 md:px-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[-100px] w-[420px] h-[420px] bg-[#F4B942]/8 blur-[180px] rounded-full" />
          <div className="absolute top-[30%] right-[-80px] w-[380px] h-[380px] bg-[#6A00FF]/10 blur-[200px] rounded-full" />
          <div className="absolute bottom-[5%] left-[20%] w-[360px] h-[360px] bg-[#A855F7]/8 blur-[180px] rounded-full" />
        </div>
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-32"
          style={{ marginLeft: "2rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
            OUR IMPACT
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
          >
            Track Record & <span className="text-[#F4B942]">Institutional</span>
            <br />
            <span className="text-[#F4B942]">Impact</span>
          </h2>
          <p className="text-white/55 text-xl max-w-2xl leading-relaxed mt-6">
            Over the years, our work has evolved from affiliation support to
            long-term institutional partnerships, helping schools strengthen
            their academic, operational, and compliance systems.
          </p>
        </motion.div>
        {/* TWO-COLUMN GRID */}
        <div className="grid lg:grid-cols-2 gap-10 mb-10 items-stretch">
          {/* LEFT — GEOGRAPHIC PRESENCE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col group justify-between"
            style={{
              padding: "24px 8px 24px 8px",
              marginLeft: "2rem",
              marginTop: "2rem",
            }}
          >
            <div className="flex items-center gap-3 mb-16">
              <div className="w-11 h-11 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B942"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#F4B942]">
                  Geographic Presence
                </h3>
                <div className="w-8 h-[2px] bg-[#F4B942] mt-1 shadow-[0_0_8px_rgba(244,185,66,0.8)] group-hover:w-16 transition-all duration-300" />
              </div>
            </div>

            {/* SVG INDIA MAP */}
            <div className="h-6" />
            <div className="flex items-center justify-center relative w-full pt-8">
              <IndiaMap />
            </div>

            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    background: "#c8860a",
                    border: "1.5px solid #f5c842",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  States We Serve
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  Supporting institutions across 9 states with localized
                  understanding and structured guidance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* GROWTH JOURNEY */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex-1 group"
              style={{
                padding: "28px 28px 24px 28px",
                marginTop: "2rem",
                marginRight: "2rem",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#F4B942]">
                    Growth Journey
                  </h3>
                  <div className="w-8 h-[2px] bg-[#F4B942] mt-1 shadow-[0_0_8px_rgba(244,185,66,0.8)] group-hover:w-16 transition-all duration-300" />
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p className="text-white/50 text-base mb-4">
                  Steady growth driven primarily through trust and referrals.
                </p>
                <div className="h-6" />

                {(() => {
                  const Chart = () => {
                    const [hovered, setHovered] = useState<number | null>(null);

                    const points: [number, number, string, string][] = [
                      [56, 108, "40", "2020"],
                      [126, 105, "70", "2021"],
                      [196, 93, "120", "2022"],
                      [266, 80, "170", "2023"],
                      [336, 66, "230", "2024"],
                      [406, 50, "280", "2025"],
                      [476, 28, "300+", "2026"],
                    ];

                    return (
                      <svg viewBox="0 0 520 175" className="w-full">
                        <defs>
                          <linearGradient id="gg2" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="#F4B942"
                              stopOpacity="0.28"
                            />
                            <stop
                              offset="100%"
                              stopColor="#F4B942"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {[100, 200, 300, 400].map((val, i) => {
                          const y = 108 - (val / 400) * 96;
                          return (
                            <g key={i}>
                              <line
                                x1="48"
                                y1={y}
                                x2="510"
                                y2={y}
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                              />
                              <text
                                x="28"
                                y={y + 4}
                                textAnchor="end"
                                fill="rgba(255,255,255,0.28)"
                                fontSize="10"
                              >
                                {val}
                              </text>
                            </g>
                          );
                        })}

                        <polygon
                          fill="url(#gg2)"
                          points="56,108 126,105 196,93 266,80 336,66 406,50 476,28 476,110 56,110"
                        />
                        <polyline
                          fill="none"
                          stroke="#F4B942"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          points="56,108 126,105 196,93 266,80 336,66 406,50 476,28"
                        />

                        {points.map(([x, y, val, yr], i) => (
                          <g
                            key={i}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            {/* Invisible hit area so hover is easy to trigger */}
                            <circle cx={x} cy={y} r="14" fill="transparent" />

                            {/* Outer glow ring — only on hover */}
                            <circle
                              cx={x}
                              cy={y}
                              r="10"
                              fill="transparent"
                              stroke="#F4B942"
                              strokeWidth="1.5"
                              style={{
                                opacity: hovered === i ? 0.6 : 0,
                                transition: "opacity 0.3s ease",
                                filter:
                                  hovered === i
                                    ? "drop-shadow(0 0 6px #F4B942)"
                                    : "none",
                              }}
                            />

                            {/* Main dot */}
                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#F4B942"
                              stroke="#14071A"
                              strokeWidth="2"
                              style={{
                                filter:
                                  hovered === i
                                    ? "drop-shadow(0 0 8px #F4B942)"
                                    : "none",
                                transform:
                                  hovered === i ? "scale(1.3)" : "scale(1)",
                                transformOrigin: `${x}px ${y}px`,
                                transition:
                                  "filter 0.3s ease, transform 0.3s ease",
                              }}
                            />

                            {/* Value label */}
                            <text
                              x={x}
                              y={Number(y) - 12}
                              textAnchor="middle"
                              fontSize="10"
                              fontWeight="700"
                              style={{
                                fill:
                                  hovered === i
                                    ? "#F4B942"
                                    : "rgba(255,255,255,0.85)",
                                filter:
                                  hovered === i
                                    ? "drop-shadow(0 0 6px #F4B942)"
                                    : "none",
                                transition: "fill 0.3s ease, filter 0.3s ease",
                              }}
                            >
                              {val}
                            </text>

                            {/* Year label */}
                            <text
                              x={x}
                              y={148}
                              textAnchor="middle"
                              fill="rgba(255,255,255,0.32)"
                              fontSize="9"
                            >
                              {yr}
                            </text>
                          </g>
                        ))}
                      </svg>
                    );
                  };
                  return <Chart />;
                })()}
              </div>
            </motion.div>

            {/* SERVICE PORTFOLIO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex-1 group"
              style={{
                padding: "28px 28px 24px 28px",
                marginTop: "2rem",
                marginRight: "2rem",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#F4B942]">
                    Service Portfolio
                  </h3>
                  <div className="w-8 h-[2px] bg-[#F4B942] mt-1 shadow-[0_0_8px_rgba(244,185,66,0.8)] group-hover:w-16 transition-all duration-300" />
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p className="text-white/50 text-base mb-4">
                  Schools continue with additional services beyond initial
                  requirements.
                </p>

                {(() => {
                  const PieChart = () => {
                    const [hovered, setHovered] = useState<number | null>(null);

                    const slices = [
                      { pct: 35, color: "#FFD54F", label: "Fresh Affiliation" },

                      { pct: 25, color: "#FFC107", label: "Senior Secondary" },

                      { pct: 15, color: "#FFB300", label: "Extensions" },

                      { pct: 15, color: "#FFA000", label: "Section Increase" },

                      { pct: 10, color: "#FF8F00", label: "Other Support" },
                    ];

                    const cx = 90,
                      cy = 90,
                      R = 72,
                      r = 44;
                    let angle = -Math.PI / 2;

                    const paths = slices.map((s, i) => {
                      const sweep = (s.pct / 100) * 2 * Math.PI;
                      const x1 = cx + R * Math.cos(angle);
                      const y1 = cy + R * Math.sin(angle);
                      const x2 = cx + R * Math.cos(angle + sweep);
                      const y2 = cy + R * Math.sin(angle + sweep);
                      const ix1 = cx + r * Math.cos(angle + sweep);
                      const iy1 = cy + r * Math.sin(angle + sweep);
                      const ix2 = cx + r * Math.cos(angle);
                      const iy2 = cy + r * Math.sin(angle);
                      const lg = sweep > Math.PI ? 1 : 0;
                      const d = `M${x1},${y1} A${R},${R} 0 ${lg},1 ${x2},${y2} L${ix1},${iy1} A${r},${r} 0 ${lg},0 ${ix2},${iy2} Z`;
                      angle += sweep;
                      return { ...s, d, i };
                    });

                    return (
                      <div className="flex items-center gap-10">
                        <div className="flex-shrink-0">
                          <svg
                            viewBox="0 0 180 180"
                            style={{ width: "155px", height: "155px" }}
                          >
                            <defs>
                              <filter id="sliceGlow">
                                <feGaussianBlur
                                  stdDeviation="4"
                                  result="blur"
                                />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                            </defs>
                            {paths.map(({ d, color, i }) => (
                              <path
                                key={i}
                                d={d}
                                fill={color}
                                stroke="#14071A"
                                strokeWidth="2.5"
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                  opacity:
                                    hovered === null
                                      ? 1
                                      : hovered === i
                                        ? 1
                                        : 0.2,
                                  transform:
                                    hovered === i ? `scale(1.06)` : "scale(1)",
                                  transformOrigin: "90px 90px",
                                  transition:
                                    "opacity 0.3s ease, transform 0.3s ease",
                                  filter:
                                    hovered === i
                                      ? `drop-shadow(0 0 8px ${color})`
                                      : "none",
                                  cursor: "pointer",
                                }}
                              />
                            ))}
                            <circle cx="90" cy="90" r="40" fill="#1B0826" />
                            <text
                              x="90"
                              y="86"
                              textAnchor="middle"
                              fill="white"
                              fontSize="15"
                              fontWeight="700"
                            >
                              Multi
                            </text>
                            <text
                              x="90"
                              y="101"
                              textAnchor="middle"
                              fill="white"
                              fontSize="15"
                              fontWeight="700"
                            >
                              Service
                            </text>
                          </svg>
                        </div>

                        <div className="flex-1 space-y-4">
                          {slices.map(({ color, label, pct }, i) => (
                            <div
                              key={label}
                              className="flex items-center gap-3 cursor-pointer"
                              onMouseEnter={() => setHovered(i)}
                              onMouseLeave={() => setHovered(null)}
                              style={{
                                opacity:
                                  hovered === null
                                    ? 1
                                    : hovered === i
                                      ? 1
                                      : 0.4,
                                transition: "opacity 0.3s ease",
                              }}
                            >
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300"
                                style={{
                                  background: color,
                                  boxShadow:
                                    hovered === i
                                      ? `0 0 10px ${color}`
                                      : "none",
                                  transform:
                                    hovered === i ? "scale(1.4)" : "scale(1)",
                                }}
                              />
                              <span className="text-white/68 text-base flex-1">
                                {label}
                              </span>
                              <span
                                className="text-base font-semibold transition-all duration-300"
                                style={{
                                  color,
                                  textShadow:
                                    hovered === i
                                      ? `0 0 12px ${color}`
                                      : "none",
                                }}
                              >
                                {pct}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  };
                  return <PieChart />;
                })()}
              </div>
            </motion.div>

            {/* INSTITUTIONS SERVED */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex-1 group"
              style={{
                padding: "28px 28px 24px 28px",
                marginTop: "2rem",
                marginRight: "2rem",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#F4B942]">
                    Institutions Served
                  </h3>
                  <div className="w-8 h-[2px] bg-[#F4B942] mt-1 shadow-[0_0_8px_rgba(244,185,66,0.8)] group-hover:w-16 transition-all duration-300" />
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p className="text-white/50 text-base">
                  Experience across institutions of different scales and
                  structures.
                </p>
                <div className="h-6" />

                {(() => {
                  const Bars = () => {
                    const [hovered, setHovered] = useState<string | null>(null);

                    const items = [
                      { label: "Single Schools", pct: 48, color: "#FFD54F" },

                      {
                        label: "Multi-Branch Institutions",
                        pct: 28,
                        color: "#FFC107",
                      },

                      { label: "School Chains", pct: 15, color: "#FFB300" },

                      {
                        label: "Educational Networks",
                        pct: 9,
                        color: "#FFA000",
                      },
                    ];

                    return (
                      <div className="flex flex-col gap-4">
                        {items.map(({ label, pct, color }) => (
                          <div
                            key={label}
                            className="flex flex-col gap-2 mt-2"
                            onMouseEnter={() => setHovered(label)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            {/* Label row — animates but doesn't trigger hover itself */}
                            <div className="flex justify-between items-center pointer-events-none">
                              <span
                                className="text-base transition-all duration-300"
                                style={{
                                  color:
                                    hovered === label
                                      ? "rgba(255,255,255,1)"
                                      : "rgba(255,255,255,0.65)",
                                  transition: "color 0.3s ease",
                                }}
                              >
                                {label}
                              </span>
                              <span
                                className="font-semibold text-base transition-all duration-300"
                                style={{
                                  color,
                                  opacity: hovered === label ? 1 : 0.75,
                                  transition: "opacity 0.3s ease",
                                }}
                              >
                                {pct}%
                              </span>
                            </div>

                            {/* Bar — this is what actually triggers the hover */}
                            <div
                              className="h-[6px] rounded-full bg-white/10 overflow-hidden cursor-pointer"
                              style={{
                                opacity:
                                  hovered === null
                                    ? 1
                                    : hovered === label
                                      ? 1
                                      : 0.4,
                                transition: "opacity 0.3s ease",
                              }}
                            >
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${pct}%`,
                                  background: color,
                                  boxShadow:
                                    hovered === label
                                      ? `0 0 10px ${color}`
                                      : "none",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  };
                  return <Bars />;
                })()}
              </div>
            </motion.div>
          </div>
        </div>
        {/* Affiliatoin  */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-[#F4B942]/18 mb-8 overflow-hidden mt-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,185,66,0.06) 0%, rgba(106,0,255,0.05) 100%)",
            marginTop: "2rem",
            marginRight: "2rem",
            marginLeft: "2rem",
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* LEFT */}
            <div
              className="flex flex-col justify-center gap-3 border-b lg:border-b-0 lg:border-r border-white/[0.06] group hover:bg-white/[0.03] transition-colors duration-300"
              style={{
                padding: "28px 32px",
                minWidth: "480px",
                maxWidth: "520px",
                flexShrink: 0,
              }}
            >
              <div className="w-16 h-16 rounded-[18px] bg-[#F4B942]/12 border border-[#F4B942]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#F4B942]/50 group-hover:bg-[#F4B942]/18 transition-all duration-300">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B942"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-[#F4B942] font-bold text-lg leading-snug">
                From Affiliation to Institutional Development
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Most schools initially engage with us for affiliation-related
                support and continue with us for academics, systems,
                examinations, training, and long-term school development.
              </p>
              <p className="text-[#F4B942] text-sm font-semibold leading-relaxed">
                This relationship-based approach remains one of our strongest
                indicators of trust and impact.
              </p>
            </div>

            {/* RIGHT CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/[0.05] flex-1">
              {[
                {
                  svg: (
                    <>
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </>
                  ),
                  label: "Academics",
                  desc: "Teaching-learning and academic frameworks",
                },
                {
                  svg: (
                    <>
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </>
                  ),
                  label: "Systems",
                  desc: "Structured processes and operational excellence",
                },
                {
                  svg: (
                    <>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  ),
                  label: "Training",
                  desc: "Continuous educator capacity building",
                },
                {
                  svg: (
                    <>
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <path d="M12 18v4" />
                      <path d="M4.93 4.93l2.83 2.83" />
                      <path d="M16.24 16.24l2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="M4.93 19.07l2.83-2.83" />
                      <path d="M16.24 7.76l2.83-2.83" />
                    </>
                  ),
                  label: "Institutional Development",
                  desc: "Sustainable growth and long-term excellence",
                },
              ].map(({ svg, label, desc }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center text-center group cursor-default hover:bg-white/[0.03] transition-colors duration-300 gap-3"
                  style={{ padding: "28px 16px" }}
                >
                  <div className="w-16 h-16 rounded-[18px] bg-[#F4B942]/10 border border-[#F4B942]/22 flex items-center justify-center group-hover:border-[#F4B942]/50 group-hover:bg-[#F4B942]/18 transition-all duration-300">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B942"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {svg}
                    </svg>
                  </div>
                  <p className="text-[#F4B942] font-bold text-base leading-tight">
                    {label}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learn More BUTTON */}
        <div
          className="relative z-10 flex justify-center"
          style={{ marginTop: "3.5rem" }}
        >
          <Link
            href="/track-record#track-hero"
            scroll={false}
            className="hover:scale-105 transition duration-300"
            style={{
              display: "inline-block",
              background: "#F4B942",
              color: "black",
              padding: "0.85rem 2.5rem",
              borderRadius: "9999px",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Learn More
          </Link>
        </div>
      </section>
      {/* SPACING BEFORE Success Tales */}
      <div className="h-24 md:h-36" />

      {/* ================= SUCCESS TALES SECTION ================= */}
      <section id="success-tales" className="relative z-10 px-8 md:px-20 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-100px] w-[600px] h-[600px] bg-[#F4B942]/8 blur-[200px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-80px] w-[500px] h-[500px] bg-[#A855F7]/8 blur-[200px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginLeft: "2rem", marginBottom: "4rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
            Success tales
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem" }}
          >
            Real Schools, <span className="text-[#F4B942]">Real Stories</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 grid lg:grid-cols-2 gap-0"
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          {/* LEFT — IMAGE */}
          <div className="group relative min-h-[420px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              viewport={{ once: false, margin: "-100px" }}
              whileHover={{ scale: 1.06 }}
              // whileHover transition separate so it doesn't conflict with whileInView
              style={{
                transition:
                  "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <Image
                src="/school.jpg"
                alt="School case study"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#14071A]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14071A]/70 via-transparent to-transparent pointer-events-none" />

            <motion.div
              className="absolute bottom-6 left-6 z-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B942"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-white/50 text-base uppercase tracking-[0.2em]">
                  Location
                </p>
              </div>
              <p className="text-white font-semibold text-base transition-colors duration-300 group-hover:text-[#F4B942]">
                Holy Cross Convent Sr. Sec. School, Ambikapur
              </p>
            </motion.div>
          </div>

          {/* RIGHT — CONTENT */}
          <div
            className="flex flex-col justify-center relative"
            style={{
              padding: "2.5rem 3rem",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="absolute top-6 right-8 text-[7rem] font-bold leading-none select-none pointer-events-none"
              style={{ color: "rgba(244,185,66,0.05)" }}
            >
              "
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-[#F4B942] text-sm uppercase tracking-[0.3em] font-semibold"
              style={{ marginBottom: "0.8rem" }}
            >
              CHHATTISGARH • CBSE SITE SHIFTING & SECTION INCREASE
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: false, margin: "-100px" }}
              className="heading-fluid-xs"
              style={{ marginBottom: "1rem" }}
            >
              From Application to Approval in{" "}
              <span className="text-[#F4B942]">Record Time</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-white/55 text-base leading-relaxed"
              style={{ marginBottom: "1.8rem" }}
            >
              Holy Cross School, Ambikapur engaged Wonder Illuminate Service of
              Education Pvt. Ltd. for campus shifting and section increase
              approval. Through structured documentation, compliance management,
              and inspection preparedness, the entire process was completed
              within just 15 days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="flex gap-8"
              style={{ marginBottom: "1.8rem" }}
            >
              {[
                { value: "15 Days", label: "Project\nTimeline" },
                { value: "100%", label: "Documents\nPrepared" },
                { value: "Successful", label: "Inspection\nReadiness" },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group flex items-center gap-3 cursor-default"
                >
                  <div className="w-[4px] h-[52px] rounded-full bg-[#F4B942] shadow-[0_0_15px_rgba(244,185,66,0.6)] group-hover:shadow-[0_0_30px_rgba(244,185,66,1)] transition-all duration-300 flex-shrink-0" />
                  <div>
                    <p
                      className="text-[1.7rem] font-bold text-white group-hover:text-[#F4B942] transition-colors duration-300 leading-none"
                      style={{ marginBottom: "6px" }}
                    >
                      {value}
                    </p>
                    <p className="text-white/45 text-[10px] leading-snug whitespace-pre-line uppercase tracking-[0.1em]">
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: false, margin: "-100px" }}
              className="flex flex-wrap gap-3"
              style={{ marginBottom: "1.8rem" }}
            >
              {[
                "Campus Shifting",
                "Section Increase",
                "CBSE Compliance",
                "Documentation",
                "Inspection Support",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium rounded-full border border-[#F4B942]/20 text-[#F4B942]/60 bg-[#F4B942]/5 hover:border-[#F4B942]/50 hover:text-[#F4B942] transition-all duration-300 cursor-default"
                  style={{ padding: "3px 5px" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <MotionLink
              href="/track-record#institutions"
              scroll={false}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 bg-[#F4B942] text-black px-10 py-4 rounded-full font-semibold text-base hover:shadow-[0_0_50px_rgba(244,185,66,0.7)] transition-all duration-300 w-fit"
              style={{
                padding: "10px 24px",
                alignSelf: "flex-start",
                display: "inline-flex",
              }}
            >
              Discover Our Impact
            </MotionLink>
          </div>
        </motion.div>
      </section>

      {/* SPACING BEFORE Collaboration section */}
      <div className="h-24 md:h-36" />

      {/* ================= COLLABORATION SECTION ================= */}

      <section id="collaboration" className="relative z-10 px-8 md:px-20 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-[#F4B942]/8 blur-[200px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-80px] w-[400px] h-[400px] bg-[#A855F7]/8 blur-[200px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginLeft: "2rem", marginBottom: "4rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
            COLLABORATION
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem" }}
          >
            Guided By{" "}
            <span className="text-[#F4B942]">Academic Brilliance</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden border border-white/10"
          style={{
            marginLeft: "2rem",
            marginRight: "2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // was 1.4fr 0.6fr
          }}
        >
          {/* LEFT — Content */}
          <div
            className="flex flex-col justify-center relative"
            style={{
              padding: "3rem 2.5rem",
              background: "rgba(255,255,255,0.03)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#F4B942] text-sm uppercase tracking-[0.3em] font-semibold"
              style={{ marginBottom: "0.8rem" }}
            >
              Academic Collaboration
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-bold leading-[1.15]"
              style={{ fontSize: "2.4rem", marginBottom: "1rem" }}
            >
              Where Excellence{" "}
              <span className="text-[#F4B942]">Meets Education</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/55 text-lg leading-relaxed"
              style={{ marginBottom: "1.8rem", maxWidth: "540px" }}
            >
              WISE is honored to collaborate with Prof. H.C. Verma, renowned
              physicist and author of{" "}
              <span className="text-white/80 font-medium italic">
                Concepts of Physics
              </span>
              . Together, we are advancing initiatives in teacher development,
              conceptual learning, and academic excellence.
            </motion.p>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
              style={{ marginBottom: "2rem" }}
            >
              {[
                {
                  icon: (
                    <>
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.5.5 2.7 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </>
                  ),
                  title: "Conceptual Excellence",
                  desc: "Strengthening academic frameworks through clarity and understanding.",
                },
                {
                  icon: (
                    <>
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                      <path d="M22 10v6" />
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                    </>
                  ),
                  title: "Teacher Empowerment",
                  desc: "Enhancing teacher effectiveness through training and professional development.",
                },
                {
                  icon: (
                    <>
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </>
                  ),
                  title: "Future-Ready Learning",
                  desc: "Creating educational experiences that encourage curiosity and critical thinking.",
                },
              ].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4B942]/20 group-hover:border-[#F4B942]/50 transition-all duration-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B942"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg group-hover:text-[#F4B942] transition-colors duration-300">
                      {title}
                    </p>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <div>
              <MotionLink
                href="/why-wise#guidance"
                scroll={false}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center bg-[#F4B942] text-black rounded-full font-semibold text-sm hover:shadow-[0_0_50px_rgba(244,185,66,0.7)]"
                style={{
                  padding: "10px 24px",
                  alignSelf: "flex-start",
                  display: "inline-flex",
                }}
              >
                Explore the Collaboration
              </MotionLink>
            </div>
          </div>

          {/* RIGHT — HC Verma Visual */}

          <div
            className="relative flex flex-col items-center justify-center gap-6"
            style={{
              padding: "3rem 2.5rem ",
              background: "rgba(244,185,66,0.04)",
              minHeight: "480px",
            }}
          >
            {/* Ambient glow */}
            <div className="absolute w-[320px] h-[320px] bg-[#F4B942]/15 blur-[90px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Frame + photo */}
            <motion.div
              className="relative flex items-center justify-center flex-shrink-0"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Offset accent squares behind, stacked-card effect (no rotation) */}
              <div className="absolute w-[220px] h-[220px] rounded-[36px] border border-[#F4B942]/25 translate-x-3 translate-y-3" />
              <div className="absolute w-[220px] h-[220px] rounded-[36px] border border-[#F4B942]/10 translate-x-6 translate-y-6" />

              {/* Main squircle photo frame */}
              <div className="relative w-[220px] h-[220px] rounded-[36px] overflow-hidden border-[3px] border-[#F4B942]/60 shadow-[0_0_50px_rgba(244,185,66,0.3)]">
                <Image
                  src="/hc-verma.jpg"
                  alt="Prof. H.C. Verma"
                  fill
                  className="object-cover object-center scale-100"
                />
              </div>
            </motion.div>

            {/* Name badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ marginTop: "1rem" }}
              className="relative z-10 text-center"
            >
              <p
                className="text-white font-bold text-xl tracking-wide"
                style={{ marginBottom: "0.5rem" }}
              >
                Prof. H.C. Verma
              </p>
              <p
                className="text-[#F4B942]/70 text-xs uppercase tracking-[0.22em] mt-1.5 "
                style={{ marginBottom: "0.5rem" }}
              >
                Physicist · Author · Educator
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="w-6 h-[1.5px] bg-[#F4B942]/40 rounded-full" />
                <span className="text-white/35 text-xs uppercase tracking-[0.2em]">
                  IIT Kanpur
                </span>
                <div className="w-6 h-[1.5px] bg-[#F4B942]/40 rounded-full" />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[18px] border text-center"
              style={{
                padding: "16px 20px",
                borderColor: "rgba(244,185,66,0.4)",
                backgroundColor: "rgba(244,185,66,0.08)",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-[#F4B942] text-2xl font-bold leading-none mb-2">
                "
              </p>
              <p className="text-white/60 text-base leading-relaxed italic">
                Education is less about blindly getting a high rank and more
                about developing logical thinking and resilience that can help
                solve broader societal problems.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SPACING AFTER COLLABORATION */}
      <div className="h-24 md:h-36" />

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="relative z-10 px-8 md:px-20 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-[#F4B942]/8 blur-[200px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-80px] w-[400px] h-[400px] bg-[#A855F7]/8 blur-[200px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginLeft: "2rem", marginBottom: "4rem" }}
        >
          <p className="text-[#F4B942] uppercase tracking-[0.45em] text-xl md:text-2xl font-semibold mb-6">
            GET IN TOUCH
          </p>
          <h2
            className="heading-fluid-lg"
            style={{ marginTop: "1.5rem" }}
          >
            Let's Build Something{" "}
            <span className="text-[#F4B942]">Together</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 grid lg:grid-cols-2 gap-0"
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          {/* LEFT — Contact Info */}
          <div
            className="flex flex-col justify-center gap-10"
            style={{
              padding: "3rem",
              background: "rgba(244,185,66,0.04)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <h3 className="text-white font-bold text-3xl mb-3">
                Start a Conversation
              </h3>
              <p
                className="text-white/55 text-lg leading-relaxed"
                style={{ marginTop: "1.5rem" }}
              >
                Whether you're planning a new school, seeking CBSE affiliation,
                or looking to strengthen your institution's systems — we're here
                to help.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                  ),
                  label: "Phone",
                  value: "+91 98261 31600 | +91 97546 11052",
                  href: "tel:+910000000001",
                },

                {
                  icon: (
                    <>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </>
                  ),
                  label: "Email",
                  value: "wise.educatingindia@gmail.com",
                  href: "https://mail.google.com/mail/?view=cm&to=wise.educatingindia@gmail.com",
                },
                {
                  icon: (
                    <>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </>
                  ),
                  label: "Location",
                  value: "Raipur, Chhattisgarh",
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4B942]/20 group-hover:border-[#F4B942]/50 transition-all duration-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B942"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      label === "Phone" ? (
                        <div className="flex items-center gap-2 text-base font-medium">
                          <a
                            href="tel:+919826131600"
                            className="text-white hover:text-[#F4B942] transition-colors duration-300"
                          >
                            +91 98261 31600
                          </a>
                          <span className="text-[#F4B942] font-bold">|</span>
                          <a
                            href="tel:+919754611052"
                            className="text-white hover:text-[#F4B942] transition-colors duration-300"
                          >
                            +91 97546 11052
                          </a>
                        </div>
                      ) : (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium text-base hover:text-[#F4B942] transition-colors duration-300"
                        >
                          {value}
                        </a>
                      )
                    ) : (
                      <p className="text-white font-medium text-base group-hover:text-[#F4B942] transition-colors duration-300">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Button */}
            <motion.a
              href="https://calendly.com/wise-educatingindia/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 border border-[#F4B942]/40 text-[#F4B942] px-7 py-4 rounded-full font-semibold text-base hover:bg-[#F4B942]/10 hover:border-[#F4B942] hover:shadow-[0_0_30px_rgba(244,185,66,0.2)] transition-all duration-300 w-fit"
              style={{
                padding: "10px 24px",
                alignSelf: "flex-start",
                display: "inline-flex",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a Meeting
            </motion.a>
          </div>

          {/* RIGHT — Contact Form */}
          {/* RIGHT — Contact Form */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: "3rem", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex flex-col gap-5">
              {/* Status message */}
              {submitStatus && (
                <div
                  className={`rounded-[14px] px-5 py-4 text-sm font-medium ${
                    submitStatus === "success"
                      ? "bg-[#F4B942]/10 border border-[#F4B942]/30 text-[#F4B942]"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                  style={{ paddingLeft: "2rem" }}
                >
                  {submitStatus === "success"
                    ? "✓ Message sent! We'll get back to you soon."
                    : "✗ Something went wrong. Please try again."}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {["Your Name", "Institution Name"].map((placeholder) => (
                  <input
                    key={placeholder}
                    type="text"
                    placeholder={placeholder}
                    value={
                      formData[
                        placeholder === "Your Name" ? "name" : "institution"
                      ]
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [placeholder === "Your Name" ? "name" : "institution"]:
                          e.target.value,
                      }))
                    }
                    className="w-full bg-white/[0.05] border border-white/10 rounded-[14px] text-white placeholder-white/30 text-base focus:outline-none focus:border-[#F4B942]/50 focus:bg-white/[0.08] transition-all duration-300"
                    style={{ padding: "14px 18px" }}
                  />
                ))}
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full bg-white/[0.05] border border-white/10 rounded-[14px] text-white placeholder-white/30 text-base focus:outline-none focus:border-[#F4B942]/50 focus:bg-white/[0.08] transition-all duration-300"
                style={{ padding: "14px 18px" }}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full bg-white/[0.05] border border-white/10 rounded-[14px] text-white placeholder-white/30 text-base focus:outline-none focus:border-[#F4B942]/50 focus:bg-white/[0.08] transition-all duration-300"
                style={{ padding: "14px 18px" }}
              />

              <div className="relative">
                <select
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      interest: e.target.value,
                    }))
                  }
                  className="w-full bg-white/[0.05] border border-white/10 rounded-[14px] text-white/60 text-base focus:outline-none focus:border-[#F4B942]/50 focus:bg-white/[0.08] transition-all duration-300 appearance-none cursor-pointer"
                  style={{ padding: "14px 18px" }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Area of Interest
                  </option>
                  {[
                    "Affiliation & Compliance",
                    "School Planning & Development",
                    "Academic Solutions",
                    "Examination Systems",
                    "Training & Development",
                    "Student Growth & Advancement",
                    "School Branding & Admissions",
                    "Systemic School Upgradation",
                  ].map((s) => (
                    <option
                      key={s}
                      value={s}
                      className="bg-[#1B0826] text-white"
                    >
                      {s}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F4B942"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <textarea
                placeholder="Tell us about your institution and requirements..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full bg-white/[0.05] border border-white/10 rounded-[14px] text-white placeholder-white/30 text-base focus:outline-none focus:border-[#F4B942]/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                style={{ padding: "14px 18px" }}
              />

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={
                  !isSubmitting
                    ? {
                        scale: 1.03,
                        boxShadow: "0 0 50px rgba(244,185,66,0.6)",
                      }
                    : {}
                }
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full bg-[#F4B942] text-black font-bold text-base rounded-[14px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ padding: "16px" }}
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SPACING BEFORE FOOTER */}
      <div className="h-8 md:h-16" />

      {/* ================= FOOTER / COPYRIGHT ================= */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="px-8 md:px-20 py-12">
          <div
            className="grid md:grid-cols-3 gap-10 mb-12"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          >
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="relative w-10 h-10 rounded-full overflow-hidden border border-[#F4B942]/30"
                  style={{ marginTop: "0.75rem" }}
                >
                  <Image
                    src="/logo2.jpg"
                    alt="WISE Logo"
                    fill
                    className="object-cover scale-[2.2]"
                  />
                </div>
                <span
                  className="text-white font-bold text-lg tracking-wide"
                  style={{ marginTop: "0.75rem" }}
                >
                  WISE
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Wonder Illuminate Service of Education — Building future-ready
                institutions across India.
              </p>
              <div className="flex gap-3 mt-1">
                {[
                  {
                    /* Facebook */
                    href: "https://www.facebook.com/people/Wonder-Iluminate/pfbid0sDyztz3joks3btfHthHQPTbnD6ksXSvA5y1N1YBRQ4YFWiBrMaUFrwmr4Fn6rriwl/?mibextid=wwXIfr&rdid=iecJ82WU6GvkHC2a&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Eu2xs28G9%2F%3Fmibextid%3DwwXIfr%26ref%3D1",
                    icon: (
                      <>
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </>
                    ),
                  },
                  {
                    /* Linkedin */
                    href: "https://www.linkedin.com/company/wonder-illuminate-service-of-education/",
                    icon: (
                      <>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </>
                    ),
                  },
                  {
                    /* Insta */
                    href: "https://www.instagram.com/wise.educatingindia?igsh=enJnY3phejR3NWVr&utm_source=qr",
                    icon: (
                      <>
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </>
                    ),
                  },
                ].map(({ href, icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-[#F4B942]/15 hover:border-[#F4B942]/40 transition-all duration-300"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B942"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p
                className="text-[#F4B942] text-xs uppercase tracking-[0.25em] font-semibold mb-5"
                style={{ marginTop: "0.75rem" }}
              >
                Quick Links
              </p>
              <div
                className="grid grid-cols-2 gap-x-6 gap-y-3"
                style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
              >
                {[
                  { label: "Home", id: "home" },
                  { label: "Approach", id: "approach" },
                  { label: "About", id: "about" },
                  { label: "Impact", id: "impact" },
                  { label: "Services", id: "services" },
                  { label: "Success Tales", id: "success-tales" },
                  { label: "Differentiators", id: "differentiators" },
                  { label: "Collaboration", id: "collaboration" },
                ].map(({ label, id }) => (
                  <a
                    key={label}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(id);
                      if (el) {
                        const top =
                          el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className="text-white/45 text-sm hover:text-[#F4B942] transition-colors duration-300 w-fit cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p
                className="text-[#F4B942] text-xs uppercase tracking-[0.25em] font-semibold mb-5"
                style={{ marginTop: "0.75rem" }}
              >
                Services
              </p>
              <div
                className="grid grid-cols-2 gap-x-6 gap-y-3"
                style={{ marginTop: "0.75rem" }}
              >
                {[
                  { label: "Affiliation & Compliance", index: 0 },
                  { label: "Training & Development", index: 4 },
                  { label: "School Planning & Development", index: 1 },
                  { label: "Student Growth & Advancement", index: 5 },
                  { label: "Academic Solutions", index: 2 },
                  { label: "School Branding & Admissions", index: 6 },
                  { label: "Examination Systems", index: 3 },
                  { label: "Systemic School Upgradation", index: 7 },
                ].map(({ label, index }) => (
                  <a
                    key={label}
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveService(index);
                      startAutoSlide();
                      const el = document.getElementById("services");
                      if (el) {
                        const top =
                          el.getBoundingClientRect().top + window.scrollY + 200;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className="text-white/45 text-sm hover:text-[#F4B942] transition-colors duration-300 w-fit cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <p className="text-white/25 text-sm">
              © {new Date().getFullYear()} Wonder Illuminate Service of
              Education. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveModal("privacy")}
                className="text-white/25 text-sm hover:text-white/50 transition-colors duration-300"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
      {/* ================= LEGAL MODAL ================= */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-8"
            style={{
              background: "rgba(10,3,14,0.75)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[82vh] rounded-[32px] border border-[#F4B942]/20 bg-[#1B0826]/95 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(244,185,66,0.15)]"
            >
              {/* AMBIENT GLOWS */}
              <div className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] bg-[#F4B942]/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-100px] left-[-100px] w-[260px] h-[260px] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none" />

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-[#F4B942]/15 hover:border-[#F4B942]/40 transition-all duration-300 z-50"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B942"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* HEADER */}
              <div className="relative z-10 px-10 md:px-12 pt-12 pb-6 border-b border-white/[0.06]">
                <p
                  className="text-[#F4B942] uppercase tracking-[0.35em] text-xs font-semibold mb-3"
                  style={{
                    marginLeft: "2rem",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  Legal
                </p>
                <h3
                  className="text-white font-bold text-3xl tracking-[-0.02em]"
                  style={{
                    marginLeft: "2rem",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  Privacy Policy
                </h3>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div
                className="relative z-10 px-10 md:px-12 py-8 overflow-y-auto max-h-[calc(82vh-150px)] text-white/65 text-[15px] leading-relaxed space-y-7"
                style={{
                  paddingLeft: "2rem",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  paddingBottom: "2rem",
                  paddingRight: "2rem",
                }}
              >
                <PrivacyContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}
