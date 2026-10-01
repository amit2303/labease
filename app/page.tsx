"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  FileCheck,
  Binary,
  ArrowRight,
  CheckCircle2,
  FileText,
  BookOpenCheck,
  History,
  Sparkles,
  Zap,
  Lock,
  Check,
  Mail,
  ChevronRight,
  Database,
  Sliders,
  Phone,
} from "lucide-react";

// =========================================================================
// 1. MAGNETIC BUTTON COMPONENT (CUSTOM MOUSE TRACKING HOOK)
// =========================================================================
function MagneticButton({
  children,
  className = "",
  onClick,
  disabled = false,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// =========================================================================
// 2. SPOTLIGHT CARD WITH CURSOR-TRACKED RADIAL GRADIENT BORDER
// =========================================================================
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(6, 182, 212, 0.22)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// =========================================================================
// 3. CENTER 3D CIRCULAR CELESTIAL ORBITS & ISOMETRIC MATRIX
// =========================================================================
function GeometricOrbits({ scrollYProgress }: { scrollYProgress: any }) {
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 75]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 160]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.25, 0.9]);
  const sphereOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.45, 0.8, 0.95, 0.6, 0.3]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center [perspective:1400px] z-0">
      {/* Dynamic 3D Ring Matrix */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          scale: sphereScale,
          opacity: sphereOpacity,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[320px] h-[320px] sm:w-[550px] sm:h-[550px] lg:w-[720px] lg:h-[720px] opacity-30 sm:opacity-100"
      >
        {/* Outer Glowing Celestial Orbit */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/25 shadow-[0_0_60px_rgba(6,182,212,0.25)] animate-[spin_40s_linear_infinite]" />

        {/* Equatorial Secondary Dashed Ring */}
        <div
          style={{ transform: "rotateX(65deg) rotateY(25deg)" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-[spin_55s_linear_infinite_reverse]"
        />

        {/* Orthogonal Longitudinal Ring */}
        <div
          style={{ transform: "rotateY(75deg) rotateX(15deg)" }}
          className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[0_0_40px_rgba(6,182,212,0.3)] animate-[spin_48s_linear_infinite]"
        />

        {/* Inner Glowing Gyro Core */}
        <div
          style={{ transform: "rotateX(45deg) rotateZ(30deg)" }}
          className="absolute inset-28 rounded-full border border-white/20 bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent blur-[1px]"
        />

        {/* Glowing Center Meridian */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-500/15 blur-[50px]" />
      </motion.div>

      {/* Floating 3D Isometric Grid Plane at base */}
      <motion.div
        style={{
          rotateX: 70,
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.4]),
          opacity: useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.15, 0.35, 0.3, 0.1]),
        }}
        className="absolute -bottom-40 w-[1200px] h-[1200px] bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
    </div>
  );
}

// =========================================================================
// 4. MULTI-DISCIPLINE HOLOGRAPHIC LABORATORY INSTRUMENTS (ORGANICALLY SCATTERED)
// =========================================================================

/**
 * 1) MECHANICAL / DIMENSIONAL: HOLOGRAPHIC VERNIER CALIPER
 * Position: High Far-Left quadrant with dynamic jaw slide
 */
function HolographicVernierCaliper({ scrollYProgress }: { scrollYProgress: any }) {
  const jawSlideX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 65, 85, 25]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 22, -8]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-18, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.65, 0.85, 0.75, 0.3]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: floatRotate,
        opacity,
      }}
      className="absolute top-3 left-[-2%] sm:left-[1%] lg:left-[3%] w-[290px] sm:w-[370px] h-[155px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]"
    >
      <svg
        viewBox="0 0 460 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-cyan-400"
      >
        <g stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.75" strokeDasharray="3 3">
          <line x1="10" y1="95" x2="450" y2="95" />
          <line x1="50" y1="20" x2="50" y2="180" />
        </g>

        {/* Fixed Beam */}
        <g stroke="#22d3ee" strokeWidth="1.5">
          <path d="M 50 80 L 440 80 L 440 110 L 50 110 Z" />
          <path d="M 50 80 L 50 175 L 35 180 L 32 155 L 32 80 Z" />
          <path d="M 50 80 L 50 30 L 40 25 L 35 48 L 35 80 Z" />
          <line x1="440" y1="95" x2="458" y2="95" strokeWidth="1.8" stroke="#38bdf8" />
        </g>

        {/* Millimeter Graduations */}
        <g stroke="#38bdf8" strokeWidth="1">
          {Array.from({ length: 32 }).map((_, i) => (
            <line
              key={`beam-tick-${i}`}
              x1={65 + i * 11}
              y1="80"
              x2={65 + i * 11}
              y2={i % 5 === 0 ? "94" : "88"}
              strokeOpacity={i % 5 === 0 ? 0.9 : 0.5}
            />
          ))}
        </g>

        <text x="70" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.8">
          0.02mm VERNIER // MECHANICAL CALIBRATION
        </text>

        {/* Sliding Jaw */}
        <motion.g style={{ x: jawSlideX }} stroke="#06b6d4" strokeWidth="1.5">
          <path d="M 68 74 L 140 74 L 140 116 L 68 116 Z" fill="rgba(6, 182, 212, 0.05)" />
          <path d="M 68 116 L 68 175 L 82 180 L 85 155 L 85 116 Z" />
          <path d="M 68 74 L 68 30 L 78 25 L 82 48 L 82 74 Z" />
          <rect x="96" y="62" width="16" height="12" rx="2" strokeWidth="1.2" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

/**
 * 2) MECHANICAL / METROLOGY: HOLOGRAPHIC ANALOG DIAL GAUGE
 * Position: High Inner-Right quadrant (shifted away from edge for asymmetry)
 */
function HolographicDialGauge({ scrollYProgress }: { scrollYProgress: any }) {
  const needleRotation = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [-115, 35, 110, -45]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [16, -18, 12]);
  const rotate3D = useTransform(scrollYProgress, [0, 1], [14, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.65, 0.9, 0.8, 0.3]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: rotate3D,
        opacity,
      }}
      className="absolute top-6 right-[10%] sm:right-[14%] lg:right-[18%] w-[200px] sm:w-[250px] h-[270px] pointer-events-none z-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]"
    >
      <svg
        viewBox="0 0 280 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-blue-400"
      >
        <g stroke="#3b82f6" strokeWidth="1.5">
          <circle cx="140" cy="22" r="12" />
          <circle cx="140" cy="22" r="5" />
          <rect x="134" y="230" width="12" height="75" rx="2" fill="rgba(59, 130, 246, 0.05)" />
          <path d="M 134 305 L 140 325 L 146 305 Z" fill="rgba(34, 211, 238, 0.2)" stroke="#22d3ee" />
        </g>

        <circle cx="140" cy="140" r="86" strokeDasharray="3 3" stroke="#38bdf8" strokeWidth="1.8" />
        <circle cx="140" cy="140" r="78" strokeWidth="1.8" fill="rgba(15, 23, 42, 0.6)" stroke="#38bdf8" />

        {/* Graduation Ticks (Deterministic SVG rotation to prevent SSR/hydration float mismatches) */}
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const isMajor = i % 5 === 0;
            return (
              <line
                key={`dial-tick-${i}`}
                x1="140"
                y1={isMajor ? "66" : "72"}
                x2="140"
                y2="78"
                transform={`rotate(${i * 10} 140 140)`}
                strokeWidth={isMajor ? 1.5 : 0.8}
                stroke={isMajor ? "#22d3ee" : "#60a5fa"}
              />
            );
          })}
        </g>

        <text x="140" y="105" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
          0.01 mm / REV
        </text>
        <text x="140" y="180" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="monospace" opacity="0.75">
          TOLERANCE COMPARATOR
        </text>

        {/* Sweeping Pointer */}
        <g transform="translate(140, 140)">
          <motion.g style={{ rotate: needleRotation }}>
            <path d="M -3 14 L 0 -64 L 3 14 L 0 18 Z" fill="#22d3ee" stroke="#a5f3fc" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * 3) OPTICAL / PHOTOMETRIC: HOLOGRAPHIC LUX SPECTROMETER SENSOR
 * Position: Upper-Mid Inner-Left quadrant (IS 374 photometrics & spectral evaluation)
 */
function HolographicLuxSpectrometer({ scrollYProgress }: { scrollYProgress: any }) {
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 14, -8]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-14, 12]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.35, 0.6, 0.5, 0.2]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: floatRotate,
        opacity,
      }}
      className="absolute top-[24%] left-[6%] sm:left-[10%] lg:left-[15%] w-[190px] sm:w-[230px] h-[190px] pointer-events-none z-0 drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]"
    >
      <svg
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-cyan-400"
      >
        {/* Optical Sensor Probe Dome */}
        <path d="M 60 70 A 30 30 0 0 1 120 70 Z" stroke="#38bdf8" strokeWidth="1.6" fill="rgba(6, 182, 212, 0.1)" />
        <line x1="90" y1="40" x2="90" y2="25" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="72" y1="48" x2="60" y2="36" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="108" y1="48" x2="120" y2="36" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Handheld Sensor Body */}
        <rect x="50" y="70" width="80" height="110" rx="8" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(15, 23, 42, 0.7)" />

        {/* LCD Display */}
        <rect x="60" y="85" width="60" height="38" rx="3" stroke="#22d3ee" strokeWidth="1" fill="rgba(6, 182, 212, 0.05)" />
        <text x="66" y="102" fill="#a5f3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
          4820 lx
        </text>
        <text x="66" y="115" fill="#38bdf8" fontSize="6" fontFamily="monospace">
          λ 555nm PEAK
        </text>

        {/* Spectral Bar Graph */}
        <g fill="#22d3ee">
          <rect x="62" y="134" width="6" height="18" rx="1" />
          <rect x="71" y="128" width="6" height="24" rx="1" fill="#38bdf8" />
          <rect x="80" y="124" width="6" height="28" rx="1" fill="#67e8f9" />
          <rect x="89" y="130" width="6" height="22" rx="1" fill="#38bdf8" />
          <rect x="98" y="138" width="6" height="14" rx="1" />
          <rect x="107" y="142" width="6" height="10" rx="1" />
        </g>

        {/* Technical Label */}
        <text x="50" y="195" fill="#67e8f9" fontSize="6.5" fontFamily="monospace">
          // PHOTOMETRIC SENSOR [IS 374]
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * 4) ELECTRICAL / SAFETY: HOLOGRAPHIC DIELECTRIC STRENGTH PROBE
 * Position: Mid Far-Right (angled down-in towards center)
 */
function HolographicDielectricProbe({ scrollYProgress }: { scrollYProgress: any }) {
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [14, -16, 18]);
  const rotateArc = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const probeRotate = useTransform(scrollYProgress, [0, 1], [-26, -14]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 0.85, 0.75, 0.3]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: probeRotate,
        opacity,
      }}
      className="absolute top-[42%] -right-10 sm:-right-4 lg:right-[2%] w-[250px] sm:w-[310px] h-[210px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
    >
      <svg
        viewBox="0 0 340 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-blue-400"
      >
        {/* Insulated Safety Handle */}
        <g stroke="#3b82f6" strokeWidth="1.5">
          <rect x="40" y="105" width="130" height="30" rx="5" fill="rgba(15, 23, 42, 0.8)" />
          {/* Finger barrier ring */}
          <line x1="170" y1="90" x2="170" y2="150" strokeWidth="2.5" stroke="#22d3ee" />
          {/* Coiled lead entry */}
          <path d="M 40 120 Q 20 120 15 135 T 25 160 T 15 185" strokeWidth="1.8" />
        </g>

        {/* Stainless Probe Shaft & Tungsten Tip */}
        <g stroke="#38bdf8" strokeWidth="1.8">
          <rect x="170" y="114" width="70" height="12" fill="rgba(59, 130, 246, 0.1)" />
          <path d="M 240 114 L 275 120 L 240 126 Z" fill="#22d3ee" stroke="#22d3ee" />
        </g>

        {/* Corona Field Rings at Tip */}
        <g transform="translate(275, 120)">
          <motion.g style={{ rotate: rotateArc }}>
            <circle cx="0" cy="0" r="16" strokeDasharray="3 3" stroke="#22d3ee" strokeWidth="1" />
            <circle cx="0" cy="0" r="28" strokeDasharray="4 4" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="0.8" />
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#67e8f9" strokeWidth="0.8" />
            <line x1="-12" y1="12" x2="12" y2="-12" stroke="#67e8f9" strokeWidth="0.8" />
          </motion.g>
        </g>

        {/* High Voltage Telemetry Callouts */}
        <g stroke="#ef4444" strokeWidth="1.2">
          {/* Warning Triangle */}
          <polygon points="120,55 135,80 105,80" fill="rgba(239, 68, 68, 0.15)" />
          <line x1="120" y1="64" x2="120" y2="72" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="120" cy="76" r="0.8" fill="#ef4444" />
        </g>

        <text x="145" y="70" fill="#a5f3fc" fontSize="8" fontFamily="monospace">
          3750V AC DIELECTRIC PROBE
        </text>
        <text x="145" y="82" fill="#22d3ee" fontSize="7" fontFamily="monospace">
          LEAKAGE &lt; 0.75mA [VALIDATED]
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * 5) ELECTRICAL TESTING: HOLOGRAPHIC DIGITAL OSCILLOSCOPE
 * Position: Lower-Mid Far-Left (CRT waveform & THD harmonic spectrum)
 */
function HolographicOscilloscope({ scrollYProgress }: { scrollYProgress: any }) {
  const waveShift = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 14, -12]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [6, -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 0.85, 0.7, 0.25]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: floatRotate,
        opacity,
      }}
      className="absolute top-[62%] -left-10 sm:-left-4 lg:left-[1%] w-[270px] sm:w-[340px] h-[200px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    >
      <svg
        viewBox="0 0 360 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-cyan-400"
      >
        {/* Chassis */}
        <rect x="20" y="20" width="320" height="180" rx="10" stroke="#06b6d4" strokeWidth="1.6" fill="rgba(15, 23, 42, 0.7)" />

        {/* CRT Display Bezel */}
        <rect x="36" y="34" width="220" height="130" rx="4" stroke="#22d3ee" strokeWidth="1.2" fill="rgba(6, 182, 212, 0.04)" />

        {/* Grid divisions */}
        <g stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.8">
          <line x1="36" y1="99" x2="256" y2="99" strokeDasharray="2 2" stroke="rgba(34, 211, 238, 0.4)" />
          <line x1="146" y1="34" x2="146" y2="164" strokeDasharray="2 2" stroke="rgba(34, 211, 238, 0.4)" />
          <line x1="36" y1="66" x2="256" y2="66" />
          <line x1="36" y1="132" x2="256" y2="132" />
          <line x1="91" y1="34" x2="91" y2="164" />
          <line x1="201" y1="34" x2="201" y2="164" />
        </g>

        {/* Dynamic Sine Waveform Shifted by Scroll */}
        <g transform="translate(36, 99)">
          <motion.path
            d="M 0 0 Q 25 -40 55 0 T 110 0 T 165 0 T 220 0"
            style={{ x: waveShift }}
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Right Control Knobs & BNC Ports */}
        <g stroke="#38bdf8" strokeWidth="1.2">
          <circle cx="285" cy="55" r="14" fill="rgba(59, 130, 246, 0.1)" />
          <line x1="285" y1="47" x2="285" y2="55" strokeWidth="2" />
          <circle cx="285" cy="95" r="10" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="285" cy="135" r="7" />
          <circle cx="310" cy="135" r="7" />
          <text x="278" y="152" fill="#67e8f9" fontSize="6" fontFamily="monospace">CH1</text>
          <text x="303" y="152" fill="#67e8f9" fontSize="6" fontFamily="monospace">CH2</text>
        </g>

        {/* Live Electrical Telemetry */}
        <text x="44" y="50" fill="#a5f3fc" fontSize="7" fontFamily="monospace">
          230.2 V AC @ 50.0 Hz // THD 4.2% [PASS]
        </text>
        <text x="44" y="158" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.8">
          ELECTRICAL TEST ENGINE // IS 302-1
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * 6) PNEUMATIC / PRESSURE: HOLOGRAPHIC PRESSURE MANOMETER GAUGE
 * Position: Lower-Mid Inner-Right quadrant (IP ingress & burst limit testing)
 */
function HolographicPressureManometer({ scrollYProgress }: { scrollYProgress: any }) {
  const needleRot = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-80, 45, 95, -20]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [14, -16, 12]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [16, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 0.6, 0.5, 0.2]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: floatRotate,
        opacity,
      }}
      className="absolute bottom-[26%] right-[10%] sm:right-[15%] lg:right-[20%] w-[190px] sm:w-[230px] h-[210px] pointer-events-none z-0 drop-shadow-[0_0_18px_rgba(59,130,246,0.25)]"
    >
      <svg
        viewBox="0 0 240 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-blue-400"
      >
        {/* Dial Casing */}
        <circle cx="110" cy="100" r="75" stroke="#3b82f6" strokeWidth="1.8" fill="rgba(15, 23, 42, 0.6)" />
        <circle cx="110" cy="100" r="68" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" />

        {/* Deterministic Radial Ticks */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const isMajor = i % 4 === 0;
            return (
              <line
                key={`manometer-tick-${i}`}
                x1="110"
                y1={isMajor ? "38" : "44"}
                x2="110"
                y2="50"
                transform={`rotate(${i * 15} 110 100)`}
                strokeWidth={isMajor ? 1.5 : 0.8}
                stroke={isMajor ? "#22d3ee" : "#60a5fa"}
              />
            );
          })}
        </g>

        {/* Dial Center Needle */}
        <g transform="translate(110, 100)">
          <motion.g style={{ rotate: needleRot }}>
            <line x1="0" y1="10" x2="0" y2="-52" stroke="#22d3ee" strokeWidth="1.6" />
            <polygon points="-3,-42 0,-55 3,-42" fill="#22d3ee" stroke="#22d3ee" />
            <circle cx="0" cy="0" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          </motion.g>
        </g>

        {/* Readout callout */}
        <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">
          BAR / PSI
        </text>
        <text x="110" y="130" textAnchor="middle" fill="#a5f3fc" fontSize="8" fontFamily="monospace" fontWeight="bold">
          6.85 BAR
        </text>
        <text x="110" y="142" textAnchor="middle" fill="#67e8f9" fontSize="6" fontFamily="monospace">
          IP6X INGRESS
        </text>

        {/* Bottom Stem & Threaded Fitting */}
        <rect x="104" y="175" width="12" height="30" stroke="#3b82f6" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.1)" />
        <line x1="100" y1="185" x2="120" y2="185" stroke="#38bdf8" strokeWidth="1.2" />
        <line x1="100" y1="195" x2="120" y2="195" stroke="#38bdf8" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}

/**
 * 7) MECHANICAL / PRECISION: HOLOGRAPHIC MICROMETER
 * Position: Bottom Inner-Left quadrant (3D tumbling C-frame caliper)
 */
function HolographicMicrometer({ scrollYProgress }: { scrollYProgress: any }) {
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 35]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [18, -12]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [10, -22, 14]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 0.85, 0.7, 0.25]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        rotateZ,
        y: floatY,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute bottom-3 left-[14%] sm:left-[18%] lg:left-[22%] w-[260px] sm:w-[330px] h-[170px] pointer-events-none z-10 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]"
    >
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-cyan-400"
      >
        <g stroke="#22d3ee" strokeWidth="2">
          <path d="M 120 70 C 40 70 30 180 120 190 C 180 195 210 160 215 110" fill="none" strokeLinecap="round" />
          <path d="M 125 85 C 60 85 52 165 120 172 C 165 175 190 145 195 110" fill="none" strokeWidth="1.2" strokeDasharray="4 2" />
        </g>
        <rect x="110" y="60" width="14" height="24" rx="2" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="160" y="66" width="55" height="12" stroke="#22d3ee" strokeWidth="1.5" />

        <g stroke="#38bdf8" strokeWidth="1.5">
          <rect x="215" y="60" width="80" height="24" rx="2" fill="rgba(6, 182, 212, 0.05)" />
          <line x1="220" y1="72" x2="290" y2="72" stroke="#67e8f9" strokeWidth="1.2" />
        </g>

        <g stroke="#06b6d4" strokeWidth="1.5">
          <path d="M 295 56 L 310 60 L 365 60 L 365 84 L 310 84 L 295 88 Z" fill="rgba(59, 130, 246, 0.08)" />
        </g>

        <rect x="365" y="66" width="30" height="12" rx="2" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="120" y="140" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
          0-25mm 0.001mm // ISO 3611
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * 8) CHEMICAL / MATERIAL: HOLOGRAPHIC ERLENMEYER FLASK & TITRATION PIPETTE
 * Position: Bottom Far-Right quadrant (conical vessel, reagent meniscus, molecular lattice)
 */
function HolographicChemicalFlask({ scrollYProgress }: { scrollYProgress: any }) {
  const liquidLevelY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [150, 95, 125, 75]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 18, -15]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-12, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.55, 0.85, 0.75, 0.3]);

  return (
    <motion.div
      style={{
        y: floatY,
        rotate: floatRotate,
        opacity,
      }}
      className="absolute bottom-2 right-[2%] sm:right-[4%] lg:right-[6%] w-[210px] sm:w-[260px] h-[280px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
    >
      <svg
        viewBox="0 0 260 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-blue-400"
      >
        {/* Erlenmeyer Conical Flask Body */}
        <g stroke="#38bdf8" strokeWidth="1.8">
          <path d="M 105 45 L 155 45" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M 110 45 L 110 90 L 45 270 Q 40 285 55 285 L 205 285 Q 220 285 215 270 L 150 90 L 150 45" />
        </g>

        {/* Graduated Volume Marks */}
        <g stroke="#22d3ee" strokeWidth="1">
          <line x1="75" y1="240" x2="105" y2="240" />
          <text x="112" y="243" fill="#38bdf8" fontSize="7" fontFamily="monospace">50ml</text>
          <line x1="90" y1="200" x2="120" y2="200" />
          <text x="127" y="203" fill="#38bdf8" fontSize="7" fontFamily="monospace">100ml</text>
          <line x1="105" y1="160" x2="135" y2="160" />
          <text x="142" y="163" fill="#38bdf8" fontSize="7" fontFamily="monospace">150ml</text>
        </g>

        {/* Dynamic Meniscus Level */}
        <motion.path
          d="M 60 0 Q 130 14 200 0"
          style={{ y: liquidLevelY }}
          stroke="#22d3ee"
          strokeWidth="2"
          fill="none"
        />

        {/* Floating Molecular Bond Lattice */}
        <g transform="translate(170, 70)" stroke="#67e8f9" strokeWidth="1.2">
          {/* Hexagonal Benzene/Polymer Ring */}
          <polygon points="30,0 60,15 60,45 30,60 0,45 0,15" strokeDasharray="3 2" fill="rgba(6, 182, 212, 0.05)" />
          <circle cx="30" cy="0" r="3" fill="#22d3ee" />
          <circle cx="60" cy="15" r="3" fill="#3b82f6" />
          <circle cx="60" cy="45" r="3" fill="#22d3ee" />
          <circle cx="30" cy="60" r="3" fill="#3b82f6" />
          <circle cx="0" cy="45" r="3" fill="#22d3ee" />
          <circle cx="0" cy="15" r="3" fill="#3b82f6" />
          <text x="18" y="34" fill="#a5f3fc" fontSize="6" fontFamily="monospace">C6H6</text>
        </g>

        <text x="130" y="305" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="monospace" opacity="0.75">
          CHEMICAL TITRATION &amp; PURITY
        </text>
      </svg>
    </motion.div>
  );
}

// =========================================================================
// 4B. LOWER SECTION AMBIENT HOLOGRAPHIC INSTRUMENTS (BENCHMARK & WAITLIST)
// =========================================================================

function AmbientOscilloscope() {
  return (
    <motion.div
      animate={{ y: [-8, 14, -8], rotate: [-8, -4, -8] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-10 -left-16 sm:-left-8 lg:-left-12 xl:left-2 w-[270px] sm:w-[330px] h-[200px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    >
      <svg viewBox="0 0 360 220" fill="none" className="w-full h-full stroke-cyan-400">
        <rect x="20" y="20" width="320" height="180" rx="10" stroke="#06b6d4" strokeWidth="1.6" fill="rgba(15, 23, 42, 0.7)" />
        <rect x="36" y="34" width="220" height="130" rx="4" stroke="#22d3ee" strokeWidth="1.2" fill="rgba(6, 182, 212, 0.04)" />
        <g stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.8">
          <line x1="36" y1="99" x2="256" y2="99" strokeDasharray="2 2" stroke="rgba(34, 211, 238, 0.4)" />
          <line x1="146" y1="34" x2="146" y2="164" strokeDasharray="2 2" stroke="rgba(34, 211, 238, 0.4)" />
          <line x1="36" y1="66" x2="256" y2="66" />
          <line x1="36" y1="132" x2="256" y2="132" />
          <line x1="91" y1="34" x2="91" y2="164" />
          <line x1="201" y1="34" x2="201" y2="164" />
        </g>
        <g transform="translate(36, 99)">
          <motion.path
            d="M 0 0 Q 25 -40 55 0 T 110 0 T 165 0 T 220 0"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
          />
        </g>
        <g stroke="#38bdf8" strokeWidth="1.2">
          <circle cx="285" cy="55" r="14" fill="rgba(59, 130, 246, 0.1)" />
          <line x1="285" y1="47" x2="285" y2="55" strokeWidth="2" />
          <circle cx="285" cy="95" r="10" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="285" cy="135" r="7" />
          <circle cx="310" cy="135" r="7" />
          <text x="278" y="152" fill="#67e8f9" fontSize="6" fontFamily="monospace">CH1</text>
          <text x="303" y="152" fill="#67e8f9" fontSize="6" fontFamily="monospace">CH2</text>
        </g>
        <text x="44" y="50" fill="#a5f3fc" fontSize="7" fontFamily="monospace">
          230.2 V AC @ 50.0 Hz // THD 4.2% [PASS]
        </text>
        <text x="44" y="158" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.8">
          ELECTRICAL TEST ENGINE // IS 302-1
        </text>
      </svg>
    </motion.div>
  );
}

function AmbientDielectricProbe() {
  return (
    <motion.div
      animate={{ y: [10, -14, 10], rotate: [-24, -20, -24] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-16 -right-16 sm:-right-8 lg:-right-10 xl:right-4 w-[250px] sm:w-[300px] h-[210px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
    >
      <svg viewBox="0 0 340 240" fill="none" className="w-full h-full stroke-blue-400">
        <g stroke="#3b82f6" strokeWidth="1.5">
          <rect x="40" y="105" width="130" height="30" rx="5" fill="rgba(15, 23, 42, 0.8)" />
          <line x1="170" y1="90" x2="170" y2="150" strokeWidth="2.5" stroke="#22d3ee" />
          <path d="M 40 120 Q 20 120 15 135 T 25 160 T 15 185" strokeWidth="1.8" />
        </g>
        <g stroke="#38bdf8" strokeWidth="1.8">
          <rect x="170" y="114" width="70" height="12" fill="rgba(59, 130, 246, 0.1)" />
          <path d="M 240 114 L 275 120 L 240 126 Z" fill="#22d3ee" stroke="#22d3ee" />
        </g>
        <g transform="translate(275, 120)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="0" cy="0" r="16" strokeDasharray="3 3" stroke="#22d3ee" strokeWidth="1" />
            <circle cx="0" cy="0" r="28" strokeDasharray="4 4" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="0.8" />
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#67e8f9" strokeWidth="0.8" />
            <line x1="-12" y1="12" x2="12" y2="-12" stroke="#67e8f9" strokeWidth="0.8" />
          </motion.g>
        </g>
        <g stroke="#ef4444" strokeWidth="1.2">
          <polygon points="120,55 135,80 105,80" fill="rgba(239, 68, 68, 0.15)" />
          <line x1="120" y1="64" x2="120" y2="72" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="120" cy="76" r="0.8" fill="#ef4444" />
        </g>
        <text x="145" y="70" fill="#a5f3fc" fontSize="8" fontFamily="monospace">
          3750V AC DIELECTRIC PROBE
        </text>
        <text x="145" y="82" fill="#22d3ee" fontSize="7" fontFamily="monospace">
          LEAKAGE &lt; 0.75mA [VALIDATED]
        </text>
      </svg>
    </motion.div>
  );
}

function AmbientLuxSpectrometer() {
  return (
    <motion.div
      animate={{ y: [-8, 12, -8], rotate: [10, 15, 10] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[32%] left-[1%] sm:left-[2%] lg:left-[4%] xl:left-[6%] w-[180px] sm:w-[210px] h-[180px] pointer-events-none z-0 opacity-40 hover:opacity-75 drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]"
    >
      <svg viewBox="0 0 240 200" fill="none" className="w-full h-full stroke-cyan-400">
        <path d="M 60 70 A 30 30 0 0 1 120 70 Z" stroke="#38bdf8" strokeWidth="1.6" fill="rgba(6, 182, 212, 0.1)" />
        <line x1="90" y1="40" x2="90" y2="25" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="72" y1="48" x2="60" y2="36" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="108" y1="48" x2="120" y2="36" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="50" y="70" width="80" height="110" rx="8" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(15, 23, 42, 0.7)" />
        <rect x="60" y="85" width="60" height="38" rx="3" stroke="#22d3ee" strokeWidth="1" fill="rgba(6, 182, 212, 0.05)" />
        <text x="66" y="102" fill="#a5f3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
          4820 lx
        </text>
        <text x="66" y="115" fill="#38bdf8" fontSize="6" fontFamily="monospace">
          λ 555nm PEAK
        </text>
        <g fill="#22d3ee">
          <rect x="62" y="134" width="6" height="18" rx="1" />
          <rect x="71" y="128" width="6" height="24" rx="1" fill="#38bdf8" />
          <rect x="80" y="124" width="6" height="28" rx="1" fill="#67e8f9" />
          <rect x="89" y="130" width="6" height="22" rx="1" fill="#38bdf8" />
          <rect x="98" y="138" width="6" height="14" rx="1" />
          <rect x="107" y="142" width="6" height="10" rx="1" />
        </g>
        <text x="50" y="195" fill="#67e8f9" fontSize="6.5" fontFamily="monospace">
          // PHOTOMETRIC SENSOR [IS 374]
        </text>
      </svg>
    </motion.div>
  );
}

function AmbientVernierCaliper() {
  return (
    <motion.div
      animate={{ y: [-12, 14, -12], rotate: [14, 18, 14] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[48%] -left-16 sm:-left-10 lg:-left-14 xl:left-2 w-[280px] sm:w-[350px] h-[155px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]"
    >
      <svg viewBox="0 0 460 200" fill="none" className="w-full h-full stroke-cyan-400">
        <g stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.75" strokeDasharray="3 3">
          <line x1="10" y1="95" x2="450" y2="95" />
          <line x1="50" y1="20" x2="50" y2="180" />
        </g>
        <g stroke="#22d3ee" strokeWidth="1.5">
          <path d="M 50 80 L 440 80 L 440 110 L 50 110 Z" />
          <path d="M 50 80 L 50 175 L 35 180 L 32 155 L 32 80 Z" />
          <path d="M 50 80 L 50 30 L 40 25 L 35 48 L 35 80 Z" />
          <line x1="440" y1="95" x2="458" y2="95" strokeWidth="1.8" stroke="#38bdf8" />
        </g>
        <g stroke="#38bdf8" strokeWidth="1">
          {Array.from({ length: 32 }).map((_, i) => (
            <line
              key={`ambient-beam-tick-${i}`}
              x1={65 + i * 11}
              y1="80"
              x2={65 + i * 11}
              y2={i % 5 === 0 ? "94" : "88"}
              strokeOpacity={i % 5 === 0 ? 0.9 : 0.5}
            />
          ))}
        </g>
        <text x="70" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.8">
          0.02mm VERNIER // MECHANICAL CALIBRATION
        </text>
        <motion.g
          animate={{ x: [0, 45, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          stroke="#06b6d4"
          strokeWidth="1.5"
        >
          <path d="M 68 74 L 140 74 L 140 116 L 68 116 Z" fill="rgba(6, 182, 212, 0.05)" />
          <path d="M 68 116 L 68 175 L 82 180 L 85 155 L 85 116 Z" />
          <path d="M 68 74 L 68 30 L 78 25 L 82 48 L 82 74 Z" />
          <rect x="96" y="62" width="16" height="12" rx="2" strokeWidth="1.2" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function AmbientDialGauge() {
  return (
    <motion.div
      animate={{ y: [12, -14, 12], rotate: [-14, -10, -14] }}
      transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[44%] -right-12 sm:-right-6 lg:-right-8 xl:right-8 w-[200px] sm:w-[250px] h-[270px] pointer-events-none z-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]"
    >
      <svg viewBox="0 0 280 340" fill="none" className="w-full h-full stroke-blue-400">
        <g stroke="#3b82f6" strokeWidth="1.5">
          <circle cx="140" cy="22" r="12" />
          <circle cx="140" cy="22" r="5" />
          <rect x="134" y="230" width="12" height="75" rx="2" fill="rgba(59, 130, 246, 0.05)" />
          <path d="M 134 305 L 140 325 L 146 305 Z" fill="rgba(34, 211, 238, 0.2)" stroke="#22d3ee" />
        </g>
        <circle cx="140" cy="140" r="86" strokeDasharray="3 3" stroke="#38bdf8" strokeWidth="1.8" />
        <circle cx="140" cy="140" r="78" strokeWidth="1.8" fill="rgba(15, 23, 42, 0.6)" stroke="#38bdf8" />
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const isMajor = i % 5 === 0;
            return (
              <line
                key={`ambient-dial-tick-${i}`}
                x1="140"
                y1={isMajor ? "66" : "72"}
                x2="140"
                y2="78"
                transform={`rotate(${i * 10} 140 140)`}
                strokeWidth={isMajor ? 1.5 : 0.8}
                stroke={isMajor ? "#22d3ee" : "#60a5fa"}
              />
            );
          })}
        </g>
        <text x="140" y="105" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
          0.01 mm / REV
        </text>
        <text x="140" y="180" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="monospace" opacity="0.75">
          TOLERANCE COMPARATOR
        </text>
        <g transform="translate(140, 140)">
          <motion.g
            animate={{ rotate: [-25, 45, -10, 30, -25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M -3 14 L 0 -64 L 3 14 L 0 18 Z" fill="#22d3ee" stroke="#a5f3fc" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}

function AmbientPressureManometer() {
  return (
    <motion.div
      animate={{ y: [-10, 12, -10], rotate: [14, 18, 14] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[66%] right-[1%] sm:right-[3%] lg:right-[5%] xl:right-[8%] w-[180px] sm:w-[220px] h-[200px] pointer-events-none z-0 opacity-45 hover:opacity-80 drop-shadow-[0_0_18px_rgba(59,130,246,0.25)]"
    >
      <svg viewBox="0 0 240 220" fill="none" className="w-full h-full stroke-blue-400">
        <circle cx="110" cy="100" r="75" stroke="#3b82f6" strokeWidth="1.8" fill="rgba(15, 23, 42, 0.6)" />
        <circle cx="110" cy="100" r="68" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" />
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const isMajor = i % 4 === 0;
            return (
              <line
                key={`ambient-manometer-tick-${i}`}
                x1="110"
                y1={isMajor ? "38" : "44"}
                x2="110"
                y2="50"
                transform={`rotate(${i * 15} 110 100)`}
                strokeWidth={isMajor ? 1.5 : 0.8}
                stroke={isMajor ? "#22d3ee" : "#60a5fa"}
              />
            );
          })}
        </g>
        <g transform="translate(110, 100)">
          <motion.g
            animate={{ rotate: [-40, 50, -15, 30, -40] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="0" y1="10" x2="0" y2="-52" stroke="#22d3ee" strokeWidth="1.6" />
            <polygon points="-3,-42 0,-55 3,-42" fill="#22d3ee" stroke="#22d3ee" />
            <circle cx="0" cy="0" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          </motion.g>
        </g>
        <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">
          BAR / PSI
        </text>
        <text x="110" y="130" textAnchor="middle" fill="#a5f3fc" fontSize="8" fontFamily="monospace" fontWeight="bold">
          6.85 BAR
        </text>
        <text x="110" y="142" textAnchor="middle" fill="#67e8f9" fontSize="6" fontFamily="monospace">
          IP6X INGRESS
        </text>
        <rect x="104" y="175" width="12" height="30" stroke="#3b82f6" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.1)" />
        <line x1="100" y1="185" x2="120" y2="185" stroke="#38bdf8" strokeWidth="1.2" />
        <line x1="100" y1="195" x2="120" y2="195" stroke="#38bdf8" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}

function AmbientMicrometer() {
  return (
    <motion.div
      animate={{
        y: [-10, 14, -10],
        rotateX: [24, 16, 24],
        rotateY: [-18, 18, -18],
        rotateZ: [20, 16, 20],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
      className="absolute bottom-24 -left-12 sm:-left-6 lg:-left-10 xl:left-4 w-[260px] sm:w-[320px] h-[170px] pointer-events-none z-10 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]"
    >
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full stroke-cyan-400">
        <g stroke="#22d3ee" strokeWidth="2">
          <path d="M 120 70 C 40 70 30 180 120 190 C 180 195 210 160 215 110" fill="none" strokeLinecap="round" />
          <path d="M 125 85 C 60 85 52 165 120 172 C 165 175 190 145 195 110" fill="none" strokeWidth="1.2" strokeDasharray="4 2" />
        </g>
        <rect x="110" y="60" width="14" height="24" rx="2" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="160" y="66" width="55" height="12" stroke="#22d3ee" strokeWidth="1.5" />
        <g stroke="#38bdf8" strokeWidth="1.5">
          <rect x="215" y="60" width="80" height="24" rx="2" fill="rgba(6, 182, 212, 0.05)" />
          <line x1="220" y1="72" x2="290" y2="72" stroke="#67e8f9" strokeWidth="1.2" />
        </g>
        <g stroke="#06b6d4" strokeWidth="1.5">
          <path d="M 295 56 L 310 60 L 365 60 L 365 84 L 310 84 L 295 88 Z" fill="rgba(59, 130, 246, 0.08)" />
        </g>
        <rect x="365" y="66" width="30" height="12" rx="2" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="120" y="140" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
          0-25mm 0.001mm // ISO 3611
        </text>
      </svg>
    </motion.div>
  );
}

function AmbientChemicalFlask() {
  return (
    <motion.div
      animate={{ y: [12, -14, 12], rotate: [-10, -6, -10] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-16 -right-12 sm:-right-6 lg:-right-8 xl:right-6 w-[200px] sm:w-[250px] h-[280px] pointer-events-none z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
    >
      <svg viewBox="0 0 260 320" fill="none" className="w-full h-full stroke-blue-400">
        <g stroke="#38bdf8" strokeWidth="1.8">
          <path d="M 105 45 L 155 45" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M 110 45 L 110 90 L 45 270 Q 40 285 55 285 L 205 285 Q 220 285 215 270 L 150 90 L 150 45" />
        </g>
        <g stroke="#22d3ee" strokeWidth="1">
          <line x1="75" y1="240" x2="105" y2="240" />
          <text x="112" y="243" fill="#38bdf8" fontSize="7" fontFamily="monospace">50ml</text>
          <line x1="90" y1="200" x2="120" y2="200" />
          <text x="127" y="203" fill="#38bdf8" fontSize="7" fontFamily="monospace">100ml</text>
          <line x1="105" y1="160" x2="135" y2="160" />
          <text x="142" y="163" fill="#38bdf8" fontSize="7" fontFamily="monospace">150ml</text>
        </g>
        <motion.path
          d="M 60 110 Q 130 124 200 110"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          stroke="#22d3ee"
          strokeWidth="2"
          fill="none"
        />
        <g transform="translate(170, 70)" stroke="#67e8f9" strokeWidth="1.2">
          <polygon points="30,0 60,15 60,45 30,60 0,45 0,15" strokeDasharray="3 2" fill="rgba(6, 182, 212, 0.05)" />
          <circle cx="30" cy="0" r="3" fill="#22d3ee" />
          <circle cx="60" cy="15" r="3" fill="#3b82f6" />
          <circle cx="60" cy="45" r="3" fill="#22d3ee" />
          <circle cx="30" cy="60" r="3" fill="#3b82f6" />
          <circle cx="0" cy="45" r="3" fill="#22d3ee" />
          <circle cx="0" cy="15" r="3" fill="#3b82f6" />
          <text x="18" y="34" fill="#a5f3fc" fontSize="6" fontFamily="monospace">C6H6</text>
        </g>
        <text x="130" y="305" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="monospace" opacity="0.75">
          CHEMICAL TITRATION &amp; PURITY
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * Mobile-First: Single clear outline precision caliper schematic in negative space
 */
function MobilePrecisionCaliperSchematic() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[300px] h-[90px] pointer-events-none md:hidden opacity-25 z-0">
      <svg viewBox="0 0 420 120" fill="none" className="w-full h-full stroke-cyan-400">
        <line x1="30" y1="50" x2="390" y2="50" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="30" y1="25" x2="30" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M 30 85 L 20 90 L 18 70 L 18 50" stroke="#38bdf8" strokeWidth="1.2" />
        
        <g stroke="#38bdf8" strokeWidth="1">
          {Array.from({ length: 28 }).map((_, i) => (
            <line
              key={`mob-tick-${i}`}
              x1={45 + i * 12}
              y1="50"
              x2={45 + i * 12}
              y2={i % 5 === 0 ? "65" : "58"}
              strokeOpacity={i % 5 === 0 ? 0.9 : 0.4}
            />
          ))}
        </g>
        
        <rect x="120" y="38" width="55" height="24" rx="2" stroke="#06b6d4" strokeWidth="1.2" fill="rgba(6, 182, 212, 0.05)" />
        <line x1="120" y1="50" x2="120" y2="85" stroke="#06b6d4" strokeWidth="1.2" />
        
        <text x="260" y="85" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.8">
          0.02mm CALIPER SCHEMATIC
        </text>
      </svg>
    </div>
  );
}

/**
 * Mobile-First: Subtle floating background circuit traces
 */
function MobileCircuitTraces() {
  return (
    <div className="absolute inset-0 pointer-events-none md:hidden opacity-20 z-0 overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M -10 140 L 70 140 L 110 180 L 190 180 M 160 90 L 230 90 L 270 50 L 360 50"
          stroke="#06b6d4"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        <circle cx="110" cy="180" r="3" fill="#22d3ee" />
        <circle cx="270" cy="50" r="3" fill="#22d3ee" />
        <path
          d="M 20 520 L 90 520 L 130 560 L 260 560"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        <circle cx="130" cy="560" r="3" fill="#3b82f6" />
      </svg>
    </div>
  );
}

function LowerSectionAmbientInstruments() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden z-10">
      <AmbientOscilloscope />
      <AmbientDielectricProbe />
      <AmbientLuxSpectrometer />
      <AmbientVernierCaliper />
      <AmbientDialGauge />
      <AmbientPressureManometer />
      <AmbientMicrometer />
      <AmbientChemicalFlask />
    </div>
  );
}

// =========================================================================
// 5. MAIN SCROLLYTELLING COMPONENT
// =========================================================================
export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // State management
  const [email, setEmail] = useState("");
  const [labType, setLabType] = useState("Commercial Testing Lab");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [activeTab, setActiveTab] = useState<"IS374" | "IS302">("IS374");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // -------------------------------------------------------------------------
  // TIMELINE ANIMATION TRANSFORMS
  // -------------------------------------------------------------------------
  // 1. HERO PHASE (0.00 -> 0.24)
  const heroOpacity = useTransform(smoothProgress, [0, 0.14, 0.23], [1, 0.85, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.22], [1, 1.35]);
  const heroBlur = useTransform(smoothProgress, [0, 0.12, 0.22], ["0px", "3px", "18px"]);
  const heroY = useTransform(smoothProgress, [0, 0.22], ["0%", "-18%"]);
  const heroPointerEvents = useTransform(smoothProgress, (val) => (val > 0.22 ? "none" : "auto"));

  // 2. FEATURE PILLARS PHASE A: Math Core & Template Fidelity (0.20 -> 0.52)
  const phaseAOpacity = useTransform(smoothProgress, [0.22, 0.28, 0.44, 0.52], [0, 1, 1, 0]);
  const phaseAScale = useTransform(smoothProgress, [0.22, 0.32, 0.46, 0.52], [0.85, 1, 1, 1.15]);
  const phaseARotateYLeft = useTransform(smoothProgress, [0.22, 0.32], [-24, 0]);
  const phaseARotateYRight = useTransform(smoothProgress, [0.22, 0.32], [24, 0]);
  const phaseAY = useTransform(smoothProgress, [0.22, 0.32, 0.46, 0.52], ["40px", "0px", "0px", "-40px"]);
  const phaseAPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.22 && val <= 0.51 ? "auto" : "none"
  );

  // 3. FEATURE PILLARS PHASE B: Standards Engine & Audit Tracking (0.48 -> 0.76)
  const phaseBOpacity = useTransform(smoothProgress, [0.50, 0.56, 0.70, 0.76], [0, 1, 1, 0]);
  const phaseBScale = useTransform(smoothProgress, [0.50, 0.58, 0.70, 0.76], [0.85, 1, 1, 1.15]);
  const phaseBRotateX = useTransform(smoothProgress, [0.50, 0.58], [25, 0]);
  const phaseBY = useTransform(smoothProgress, [0.50, 0.58, 0.70, 0.76], ["40px", "0px", "0px", "-40px"]);
  const phaseBPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.50 && val <= 0.75 ? "auto" : "none"
  );

  // 4. AUTONOMOUS PIPELINE / 3-STEP PHASE (0.74 -> 1.00)
  const phaseCOpacity = useTransform(smoothProgress, [0.74, 0.82, 1], [0, 1, 1]);
  const phaseCScale = useTransform(smoothProgress, [0.74, 0.82], [0.9, 1]);
  const phaseCY = useTransform(smoothProgress, [0.74, 0.82], ["50px", "0px"]);
  const phaseCPointerEvents = useTransform(smoothProgress, (val) => (val >= 0.74 ? "auto" : "none"));

  // Timeline HUD label
  const [hudStep, setHudStep] = useState("01 // ZERO-HALLUCINATION PLATFORM");

  useMotionValueEvent(smoothProgress, "change", (val) => {
    if (val < 0.24) {
      setHudStep("01 // ZERO-HALLUCINATION PLATFORM");
    } else if (val < 0.52) {
      setHudStep("02 // DETERMINISTIC MATH & DOCX FIDELITY");
    } else if (val < 0.76) {
      setHudStep("03 // UNIVERSAL STANDARDS & AUDIT TRAILS");
    } else {
      setHudStep("04 // AUTONOMOUS 3-STEP PIPELINE");
    }
  });

  return (
    <div className="relative bg-slate-950 text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Fixed Ambient Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-radial-vignette" />

        {/* Ambient Pulsing Lighting Blobs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-[40%] -left-36 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[65%] -right-36 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      {/* ========================================================================= */}
      {/* NAVIGATION BAR (FIXED TOP) */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/[0.08] bg-slate-950/75 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center group cursor-pointer">
              <Image
                src="/logo.png"
                alt="LabEase.ai Logo"
                width={60}
                height={36}
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.65)] transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                LabEase<span className="text-cyan-400">.ai</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400/80 px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 hidden sm:inline-block">
                Cinematic Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:+918368747244"
              className="hidden lg:flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20"
            >
              <Phone className="w-3 h-3" />
              <span>+91 8368747244</span>
            </a>

            {/* Mobile clean text-link: collapsed header, minimal footprint */}
            <button
              onClick={scrollToWaitlist}
              className="sm:hidden text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 transition-all cursor-pointer shadow-sm"
            >
              <span>Request Early Access</span>
              <ArrowRight className="w-3 h-3 text-cyan-400" />
            </button>

            {/* Desktop Magnetic CTA button */}
            <div className="hidden sm:block">
              <MagneticButton
                onClick={scrollToWaitlist}
                className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover:opacity-100 opacity-80" />
                <div className="relative px-4 py-2 rounded-[11px] bg-slate-950 text-xs sm:text-sm font-semibold text-white transition-all duration-200 group-hover:bg-slate-950/80 flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                  <span>Request Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CINEMATIC HUD / SCROLL SCRUBBER CONTROLLER (RIGHT FLANK) */}
      {/* ========================================================================= */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-none">
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded border border-cyan-500/30 backdrop-blur-md shadow-lg">
          <span>{hudStep}</span>
        </div>

        <div className="w-1.5 h-36 rounded-full bg-slate-800/80 relative overflow-hidden backdrop-blur-sm border border-white/10">
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
          />
        </div>

        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
          Scroll to Scrub
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PINNED SCROLLYTELLING VIEWPORT CONTAINER (h-[420vh]) */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="relative h-[420vh] w-full">
        {/* Sticky 100vh Viewport Window */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* ===================================================================== */}
          {/* 1. CENTER 3D CIRCULAR CELESTIAL ORBITS ANIMATION */}
          {/* ===================================================================== */}
          <GeometricOrbits scrollYProgress={smoothProgress} />

          {/* ===================================================================== */}
          {/* 2. ASYMMETRICAL MULTI-DISCIPLINE HOLOGRAPHIC LABORATORY INSTRUMENTS */}
          {/* Desktop: Full 8-instrument scattered layout */}
          {/* Mobile: Clean background traces + Single precision caliper outline in negative space */}
          {/* ===================================================================== */}
          <div className="hidden md:contents">
            {/* Mechanical / Metrology */}
            <HolographicVernierCaliper scrollYProgress={smoothProgress} />
            <HolographicDialGauge scrollYProgress={smoothProgress} />
            <HolographicMicrometer scrollYProgress={smoothProgress} />

            {/* Electrical / High-Voltage Safety */}
            <HolographicOscilloscope scrollYProgress={smoothProgress} />
            <HolographicDielectricProbe scrollYProgress={smoothProgress} />

            {/* Chemical / Material Analysis */}
            <HolographicChemicalFlask scrollYProgress={smoothProgress} />

            {/* Optical Photometrics (IS 374 / Lux Evaluation) */}
            <HolographicLuxSpectrometer scrollYProgress={smoothProgress} />

            {/* Pneumatic / Hydrostatic Manometer (IP6X / Burst Pressure) */}
            <HolographicPressureManometer scrollYProgress={smoothProgress} />
          </div>

          {/* Mobile Context: Non-overlapping subtle circuit traces & single clean precision caliper outline */}
          <MobileCircuitTraces />
          <MobilePrecisionCaliperSchematic />

          {/* ===================================================================== */}
          {/* SCENE 1: CINEMATIC HERO */}
          {/* ===================================================================== */}
          <motion.div
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              filter: useMotionTemplate`blur(${heroBlur})`,
              y: heroY,
              pointerEvents: heroPointerEvents as any,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-20 pt-8 sm:pt-10"
          >
            {/* Top Pill / Badge: Single line, no messy multiline wrapping on mobile */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-700/60 bg-slate-900/80 backdrop-blur-md shadow-sm mb-4 sm:mb-6 max-w-[92vw]">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium text-slate-300 tracking-wide truncate">
                <span className="hidden sm:inline">Universal Testing Engine // Electrical • Mechanical • Chemical</span>
                <span className="sm:hidden">Universal AI Testing Engine</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono text-cyan-400 shrink-0">NABL Ready</span>
            </div>

            {/* Headline: responsive mobile scaling with supreme contrast */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] max-w-4xl px-2">
              Autonomous Laboratory Report Generation.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Zero Hallucinations.
              </span>
            </h1>

            {/* Subtitle: generous negative space, no instrument collisions */}
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto font-normal leading-relaxed mt-3.5 sm:mt-6 px-1">
              LabEase transforms product specifications and raw test readings into
              fully compliant, audit-ready test reports in seconds—across Indian Standards
              (e.g., IS 374, IS 302), global standards, or custom laboratory SOPs—combining
              semantic AI reasoning with deterministic validation.
            </p>

            {/* Feature Points: Desktop horizontal row (hidden on mobile) */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Engineered for NABL Accredited Labs</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% Template Fidelity (.docx)</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic Math Engine</span>
              </div>
            </div>

            {/* Feature Points: Mobile-First Single-Column Stacked Feature List (NO overlap, clean vertical layout) */}
            <div className="flex flex-col w-full max-w-[320px] mx-auto gap-2 mt-5 md:hidden text-left">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Engineered for NABL Accredited Labs</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-medium text-slate-200">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% Template Fidelity (.docx)</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-medium text-slate-200">
                <Binary className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Deterministic Math Engine</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs font-medium text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Zero Hallucinations Guarantee</span>
              </div>
            </div>

            {/* Timeline Scrub Indicator: Simplified for mobile gestures without messy outlines */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-6 sm:mt-10 flex flex-col items-center gap-1.5 text-[11px] sm:text-xs font-mono text-slate-400"
            >
              <span>Scroll to scrub timeline</span>
              <div className="w-3.5 h-6 sm:w-4 sm:h-7 rounded-full border border-cyan-500/40 flex items-start justify-center p-1">
                <div className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>

          {/* ===================================================================== */}
          {/* SCENE 2: 3D UNPACKING CARDS (CORE PILLARS 1 & 2) */}
          {/* ===================================================================== */}
          <motion.div
            style={{
              opacity: phaseAOpacity,
              scale: phaseAScale,
              y: phaseAY,
              pointerEvents: phaseAPointerEvents as any,
              perspective: 1200,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-20"
          >
            <div className="text-center mb-8 sm:mb-10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                Pillar Phase 01 // Mathematical Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Hard Mathematics &amp; Native Word Fidelity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
              <motion.div style={{ rotateY: phaseARotateYLeft }}>
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      Deterministic Calculation Core
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Hard mathematical verification for Service Value, Current THD, and tolerances.
                      Calculations are verified through symbolic math engines—never guessed by generative AI.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                    <div className="text-cyan-400">// Symbolic Verification Engine:</div>
                    <div className="text-slate-400">
                      SV = Air_Delivery (m³/min) / Input_Power (W)
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      Calculated: 4.265 m³/min/W | Req: &gt;= 4.00 [VALIDATED ✓]
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

              <motion.div style={{ rotateY: phaseARotateYRight }}>
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Exact Template Preservation
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      Directly populates existing .docx test draft templates. Retains exact laboratory
                      logos, signatures, nested tables, and typography without corrupting native Word styles.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                    <div className="text-blue-400">// OpenXML Node Injector:</div>
                    <div className="text-slate-400">
                      Target: Standard_NABL_Draft_Report_v4.docx
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      100% Table &amp; Border Alignment Preserved [MATCH ✓]
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* SCENE 3: 3D UNPACKING CARDS (CORE PILLARS 3 & 4) */}
          {/* ===================================================================== */}
          <motion.div
            style={{
              opacity: phaseBOpacity,
              scale: phaseBScale,
              rotateX: phaseBRotateX,
              y: phaseBY,
              pointerEvents: phaseBPointerEvents as any,
              perspective: 1200,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-20"
          >
            <div className="text-center mb-8 sm:mb-10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                Pillar Phase 02 // Universal Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Universal Standards &amp; Audit-Grade Lineage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
              <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                    <BookOpenCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    Universal Standards &amp; Clause Engine
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Dynamic RAG knowledge base engineered for any testing standard (e.g., IS 374, IS 302,
                    IS 10322, IEC guidelines, or proprietary laboratory SOPs). Ingest any standard gazette to
                    automatically parse clause thresholds, pass/fail criteria, and test formulas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                  <div className="text-cyan-400">// Universal Standards Ingestion:</div>
                  <div className="text-slate-400">
                    Benchmarked: IS 374, IS 302-1, IS 10322, IS 16046 (Examples)
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    + Dynamic Ingestion for ANY Custom Standard or Lab SOP
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                    <History className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    Audit-Grade Tracking
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Auto-generates structured Job Order Numbers and Test Report Numbers with cryptographic timestamps.
                    Provides an immutable audit log ready for NABL surveillance and BIS factory audits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                  <div className="text-blue-400">// Cryptographic Audit Trail:</div>
                  <div className="text-slate-400">
                    SHA-256 Telemetry Hash • Job Order JO-2026-BL-8920
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    Full Lineage Traced: Chamber Sensor to PDF/DOCX
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* SCENE 4: 3-STEP PIPELINE UNFOLDING */}
          {/* ===================================================================== */}
          <motion.div
            style={{
              opacity: phaseCOpacity,
              scale: phaseCScale,
              y: phaseCY,
              pointerEvents: phaseCPointerEvents as any,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-20"
          >
            <div className="text-center mb-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                Pillar Phase 03 // Execution Pipeline
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                From Raw Sensor Readings to Certified Report
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
              <SpotlightCard className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-slate-700">01</span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Database className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Input Product Details</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Enter nominal specs and raw instrument logs. Upload observation sheets or chamber sensor dumps directly.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-cyan-400">
                  Multi-channel intake
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.3)"
                className="p-6 flex flex-col justify-between border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-cyan-500/50">02</span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Automated Verification</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Deterministic cross-referencing against clauses, tolerance calculations, and automated verdicts without hallucinations.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-cyan-400">
                  Symbolic clause math
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-slate-700">03</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Export &amp; Archive</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Instant download of audit-ready native Microsoft Word (.docx) or certified PDF with full cryptographic traceability.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-blue-400">
                  NABL &amp; BIS Audit Ready
                </div>
              </SpotlightCard>
            </div>

            <div className="flex items-center gap-4">
              <MagneticButton
                onClick={scrollToWaitlist}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Jump to Interactive Benchmark &amp; Waitlist</span>
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6 & 7. INTERACTIVE BENCHMARK & PILOT ENROLLMENT (WITH SCATTERED INSTRUMENTS) */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden border-t border-white/10">
        {/* Ambient Pulsing Lighting Blobs */}
        <div className="absolute top-[15%] -left-36 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[60%] -right-36 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Scattered Holographic Laboratory Instruments Layer */}
        <LowerSectionAmbientInstruments />

        {/* 6. INTERACTIVE BENCHMARK & LIVE REPORT TERMINAL */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Live Telemetry Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Deterministic Clause Evaluation in Action
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Switch between example benchmarks to observe real-time symbolic math calculations,
            tolerance bounding, and verdict formatting.
          </p>
        </div>

        {/* Live Terminal Preview */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <SpotlightCard className="p-5 sm:p-7 shadow-2xl">
            {/* Top Terminal Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  live-demonstration: {activeTab === "IS374" ? "Example 1 (IS 374 Fan Performance)" : "Example 2 (IS 302-1 Electrical Safety)"}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-slate-500 hidden xl:inline">
                  Interactive Benchmarks:
                </span>
                <button
                  onClick={() => setActiveTab("IS374")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTab === "IS374"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Example: IS 374 (Performance)
                </button>
                <button
                  onClick={() => setActiveTab("IS302")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTab === "IS302"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Example: IS 302-1 (Safety)
                </button>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 rounded hidden sm:inline-block">
                  + Any Custom Standard
                </span>
              </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 rounded-xl border border-white/10 bg-slate-950/80 p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                    Job Order Context
                  </span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800">
                    NABL-AUDIT-ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-slate-300 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Job Order No:</span>
                    <span className="text-cyan-300">JO-2026-BL-8920</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Test Report No:</span>
                    <span className="text-cyan-300">TR-IS374-0491</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Test Voltage:</span>
                    <span>230.0 V AC @ 50 Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blade Sweep:</span>
                    <span>1200 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rated Power:</span>
                    <span>53.0 W</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                  <div className="text-slate-500 mb-1">Target Template:</div>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Standard_NABL_Report_Draft_v4.docx</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 rounded-xl border border-white/10 bg-slate-950/80 p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                    Deterministic Clause Evaluation Engine
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> All Clauses Verified
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-500 border-b border-white/10 text-[11px]">
                        <th className="pb-2">Clause / Test Parameter</th>
                        <th className="pb-2">Specified Limit</th>
                        <th className="pb-2">Observed Reading</th>
                        <th className="pb-2">Deterministic Math</th>
                        <th className="pb-2 text-right">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-slate-300 text-[11px]">
                      {activeTab === "IS374" ? (
                        <>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 10.3 Air Delivery
                            </td>
                            <td className="py-2.5 text-slate-400">Min 210.0 m³/min</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">218.4 m³/min</td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              Σ(v_i × 2πr_i) = 218.42
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 11.1 Input Power (W)
                            </td>
                            <td className="py-2.5 text-slate-400">53.0 W ± 10% (47.7 - 58.3)</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">51.2 W</td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              Δ = -3.39% (In tolerance)
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 10.4 Service Value
                            </td>
                            <td className="py-2.5 text-slate-400">Min 4.00 m³/min/W</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">
                              4.26 m³/min/W
                            </td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              218.4 / 51.2 = 4.265
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 15.2 THD Analysis
                            </td>
                            <td className="py-2.5 text-slate-400">Max 10.0% Current THD</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">4.8%</td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              √(Σ(I_h)²)/I_1 = 0.048
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 8 Protection Against Shock
                            </td>
                            <td className="py-2.5 text-slate-400">Test Probe B (10N force)</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">No Contact</td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              Pin contact sensor: Open
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 13 Leakage Current
                            </td>
                            <td className="py-2.5 text-slate-400">Max 0.75 mA (Class II)</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">0.14 mA</td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              Peak detector reading
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 text-slate-200 font-medium">
                              Cl. 16 Dielectric Strength
                            </td>
                            <td className="py-2.5 text-slate-400">3750 V AC for 60s</td>
                            <td className="py-2.5 text-cyan-300 font-semibold">
                              No Breakdown (0.8mA trip)
                            </td>
                            <td className="py-2.5 text-slate-400 text-[10px]">
                              Ramp: 500V/s, t=60s
                            </td>
                            <td className="py-2.5 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                                PASS
                              </span>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Ready for 1-Click Export to .docx Template</span>
                  </div>
                  <span className="font-mono text-cyan-400/90">0.42s Generation Time</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WAITLIST ACCESS & PILOT ENROLLMENT SECTION */}
      {/* ========================================================================= */}
      <section id="waitlist" className="relative z-30 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Cohort 1 Enrollment
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your Laboratory&apos;s Pilot Slot
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We work closely with accredited facilities during onboarding to calibrate your specific
            Microsoft Word (.docx) test templates and test chamber formats.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-center space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                You&apos;re on the list. We&apos;ll be in touch soon.
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you for requesting early access. Our engineering team is onboarding pilot
                laboratories in cohorts to ensure complete calibration for your test templates.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
                >
                  Register another laboratory or email
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6 sm:p-8 bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <label className="text-xs font-medium text-slate-400 self-center sm:self-start">
                  Laboratory Type:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {["Commercial Testing Lab", "In-House OEM Lab", "Certification Body"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLabType(type)}
                        className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          labType === type
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                            : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="director@testlab.org or your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  />
                </div>

                <MagneticButton
                  disabled={status === "loading"}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-70 cursor-pointer min-w-[180px]"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Reserving Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </MagneticButton>
              </form>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 px-1 gap-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  Strict confidentiality. Customer-proprietary data protected under NDA.
                </span>
                <span className="text-slate-400">Cohort 1 Launch: Q2 2026</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      </div>

      {/* ========================================================================= */}
      {/* 8. STANDARDS COMPLIANCE BANNER */}
      {/* ========================================================================= */}
      <section className="relative z-30 py-12 border-y border-white/10 bg-slate-900/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Universal Standards &amp; Custom Regulations Ready
                </h4>
                <p className="text-xs text-slate-400">
                  Works across any Bureau of Indian Standards (BIS), IEC specifications, or custom SOPs. Examples include:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                "e.g., IS 374 (Fans)",
                "e.g., IS 302-1 (Safety)",
                "e.g., IS 302-2-80 (Ventilators)",
                "e.g., IS 10322 (Luminaires)",
                "e.g., IS 15885 (LED Drivers)",
                "e.g., IS 16046 (Batteries)",
                "+ Any Custom Lab Standard / SOP",
              ].map((std) => (
                <span
                  key={std}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                    std.startsWith("+")
                      ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-semibold"
                      : "bg-slate-800/80 border-slate-700/60 text-slate-300"
                  }`}
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER WITH DIRECT CONTACT PHONE & EMAIL */}
      {/* ========================================================================= */}
      <footer className="relative z-30 border-t border-white/10 bg-slate-950 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="LabEase.ai Logo"
                width={48}
                height={29}
                className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">
                LabEase<span className="text-cyan-400">.ai</span>
              </span>
              <p className="text-xs text-slate-500">
                Autonomous Compliance &amp; Report Intelligence
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#waitlist" className="hover:text-cyan-400 transition-colors">
              Waitlist
            </a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Privacy Policy: LabEase.ai treats all laboratory test parameters, templates, and telemetry as strictly confidential and customer-proprietary under NDA."
                );
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Terms: LabEase.ai is designed to assist accredited laboratory technicians in draft generation and verification in compliance with relevant standard procedures."
                );
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="tel:+918368747244"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 8368747244
            </a>
            <a
              href="mailto:contact@labease.ai"
              className="text-slate-300 hover:text-cyan-400 font-mono transition-colors"
            >
              contact@labease.ai
            </a>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} LabEase.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
