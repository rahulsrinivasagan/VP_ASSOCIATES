"use client";

import { motion, Variants } from "framer-motion";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function AboutWhatMakesUsBest() {
  // SVG Clover/Tri-leaf shape
  const TriLeafIcon = () => (
    <svg className="vpa-wmub-icon" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="7.5" r="4.5" />
      <circle cx="7.5" cy="15.5" r="4.5" />
      <circle cx="16.5" cy="15.5" r="4.5" />
    </svg>
  );

  // SVG Cross/Four-leaf flower shape
  const FourLeafIcon = () => (
    <svg className="vpa-wmub-icon" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="6" r="4" />
      <circle cx="12" cy="18" r="4" />
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
    </svg>
  );

  // SVG Tulip/bud shape
  const BudIcon = () => (
    <svg className="vpa-wmub-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7 8 7 14 12 22C17 14 17 8 12 2Z" />
      <path d="M12 6C9.5 10 9.5 14 12 19" stroke="#ffffff" strokeWidth="1.5" fill="none" />
    </svg>
  );

  const cardsData = [
    {
      icon: <TriLeafIcon />,
      title: "Engineering Excellence",
      desc: "Standard-compliant structural work, quality site supervision, and transparent milestone tracking on all construction projects.",
    },
    {
      icon: <FourLeafIcon />,
      title: "Reliable Manpower Supply",
      desc: "Pre-screened staff for casual labor, industrial housekeeping, workshop spare parts cleaning, and warehouse picking operations.",
    },
    {
      icon: <BudIcon />,
      title: "Exceptional Culinary Services",
      desc: "Authentic flavors, customized menus, and strict hygiene protocols for corporate gatherings, weddings, and private celebrations.",
    },
    {
      icon: <BudIcon />,
      title: "Quality Sports Venues",
      desc: "Professionally maintained cricket turf grounds, net rentals, and match hosting built for athletes, corporate teams, and local clubs.",
    },
  ];

  return (
    <section className="vpa-wmub-section" aria-label="What Makes Us Best">
      {/* Scoped CSS stylesheets for layout styling and responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        .vpa-wmub-section {
          background-color: #FAF6F0; /* Soft cream/light beige bg matching Serenity theme */
          padding: 120px 0 140px;
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }

        .vpa-wmub-container {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
          text-align: left;
        }

        .vpa-wmub-badge {
          display: inline-block;
          background-color: #F7D6CD; /* Soft coral bg */
          color: #8D5A47; /* Darker coral text */
          padding: 6px 16px;
          border-radius: 9999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .vpa-wmub-heading {
          font-family: Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.1rem);
          font-weight: 400;
          line-height: 1.35;
          color: var(--black);
          margin: 0 0 70px;
          max-width: 600px;
          text-align: left;
        }

        .vpa-wmub-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
          box-sizing: border-box;
        }

        .vpa-wmub-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-sizing: border-box;
        }

        .vpa-wmub-icon-wrap {
          width: 44px;
          height: 44px;
          color: #DF9482; /* Coral color */
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vpa-wmub-icon {
          width: 100%;
          height: 100%;
          display: block;
        }

        .vpa-wmub-card-title {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(1.15rem, 1.5vw, 1.35rem);
          font-weight: 600;
          color: var(--black);
          margin: 0 0 16px;
          line-height: 1.4;
          letter-spacing: -0.015em;
        }

        .vpa-wmub-card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(13.5px, 1vw, 14.5px);
          color: #79716B; /* Soft muted description */
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .vpa-wmub-section {
            padding: 100px 0 110px;
          }
          .vpa-wmub-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        @media (max-width: 640px) {
          .vpa-wmub-section {
            padding: 80px 0 90px;
          }
          .vpa-wmub-heading {
            margin-bottom: 50px;
          }
          .vpa-wmub-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .vpa-wmub-card {
            padding: 32px 24px;
          }
        }
      ` }} />

      <div className="vpa-wmub-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <span className="vpa-wmub-badge">WHY CHOOSE US</span>
          <h2 className="vpa-wmub-heading">What Sets VP Associates Apart</h2>
        </motion.div>

        {/* 6-Card Staggered Float Grid */}
        <motion.div
          className="vpa-wmub-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              className="vpa-wmub-card"
              variants={cardVariants}
            >
              <div className="vpa-wmub-icon-wrap">
                {card.icon}
              </div>
              <h3 className="vpa-wmub-card-title">{card.title}</h3>
              <p className="vpa-wmub-card-desc">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
