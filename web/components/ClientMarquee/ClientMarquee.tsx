"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  value: number;
  start: boolean;
  suffix?: string;
}

function Counter({ value, start, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const duration = 2.0;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [value, start]);

  return <span>{count}{suffix}</span>;
}

export default function ClientMarquee() {
  const { ref, inView } = useInView(0.1);

  const clientLogos = [
    { name: "GMMCO Limited (C K Birla Group)", logo: "/images/clients/gmmco.jpg" },
    { name: "BorgWarner Morse Systems India Private Limited", logo: "/images/clients/borgwarner.svg" },
    { name: "Inexo Cast Metal Solutions Private Limited", logo: "/images/clients/inexo.svg" },
    { name: "Resolux India Private Limited", logo: "/images/clients/resolux.svg" },
    { name: "Cavotec India Private Limited", logo: "/images/clients/cavotec.svg" },
    { name: "Titan Engineering & Automation Limited", logo: "/images/clients/titan_teal.svg" },
    { name: "Justech Precision Industry India Pvt Ltd", logo: "/images/clients/justech.svg" },
    { name: "Srivari Colour Coating", logo: "/images/clients/srivari.svg" },
    { name: "Airflow Equipment’s (India) Pvt Ltd", logo: "/images/clients/airflow.svg" },
    { name: "Polyfit Fabricators Pvt Ltd", logo: "/images/clients/polyfit.jpg" },
    { name: "Rexan Steel Tubes", logo: "/images/clients/rexan.svg" },
    { name: "SPACK Automotive Pvt Ltd", logo: "/images/clients/spack_automotive.png" },
  ];

  return (
    <section ref={ref} className="client-marquee" aria-label="Client testimonials">
      <div className="marquee-container">
        <motion.div 
          className="marquee-content"
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logos Marquee */}

          {/* Right side - Logos */}
          <div className="marquee-right">
            <div className="marquee-right-inner">
              {clientLogos.map((logo, index) => (
                <motion.div 
                  key={index} 
                  className="client-logo-badge"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                  title={logo.name}
                >
                  <img 
                    src={logo.logo} 
                    alt={logo.name} 
                    className="client-logo-img"
                  />
                </motion.div>
              ))}
              {/* Duplicate for seamless loop */}
              {clientLogos.map((logo, index) => (
                <motion.div 
                  key={`dup-${index}`} 
                  className="client-logo-badge"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                  title={logo.name}
                >
                  <img 
                    src={logo.logo} 
                    alt={logo.name} 
                    className="client-logo-img"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


