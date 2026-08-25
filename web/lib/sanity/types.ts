export interface SanityImage {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
    url?: string;
  };
  alt?: string;
}

export interface SanityFileAsset {
  _type?: "file";
  asset?: {
    _ref?: string;
    _type?: "reference";
    url?: string;
  };
}

export interface SanityHeroSection {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  headingLine3Accent?: string;
  description?: string;
  stadiumImage?: SanityImage;
  heroVideo?: SanityFileAsset;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  featureStrip?: Array<{
    label?: string;
    iconName?: string;
  }>;
}

export interface SanityPhilosophyCard {
  id?: string;
  title?: string;
  desc?: string;
  image?: SanityImage;
}

export interface SanityPhilosophySection {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  cards?: SanityPhilosophyCard[];
}

export interface SanityCricketArenaFeature {
  id?: string;
  title?: string;
  desc?: string;
}

export interface SanityCricketArenaSection {
  eyebrow?: string;
  headingLine1?: string;
  headingAccent?: string;
  description?: string;
  mainImage?: SanityImage;
  video?: SanityFileAsset;
  badgeNumber?: string;
  badgeLabel?: string;
  features?: SanityCricketArenaFeature[];
}

export interface SanityPassionPanel {
  id?: string;
  title?: string;
  desc?: string;
}

export interface SanityPassionSection {
  eyebrow?: string;
  heading?: string;
  description?: string;
  mainImage?: SanityImage;
  video?: SanityFileAsset;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  highlightPanels?: SanityPassionPanel[];
}

export interface SanityTestimonialItem {
  id?: string;
  title?: string;
  description?: string;
  duration?: string;
  thumbnail?: SanityImage;
  videoFile?: SanityFileAsset;
}

export interface SanityFeaturedStory {
  label?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  duration?: string;
  thumbnail?: SanityImage;
  videoFile?: SanityFileAsset;
}

export interface SanityTestimonialsSection {
  eyebrow?: string;
  heading?: string;
  description?: string;
  featuredStory?: SanityFeaturedStory;
  items?: SanityTestimonialItem[];
}

export interface SanityMatchCTAHotspot {
  id?: string;
  icon?: string;
  title?: string;
  desc?: string;
}

export interface SanityMatchCTAStat {
  label?: string;
  value?: string;
}

export interface SanityMatchCTASection {
  eyebrow?: string;
  heading?: string;
  description?: string;
  video?: SanityFileAsset;
  hotspots?: SanityMatchCTAHotspot[];
  stats?: SanityMatchCTAStat[];
}

export interface SportsPageData {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  hero?: SanityHeroSection;
  philosophy?: SanityPhilosophySection;
  cricketArena?: SanityCricketArenaSection;
  passionPerformance?: SanityPassionSection;
  testimonials?: SanityTestimonialsSection;
  matchCTA?: SanityMatchCTASection;
}
