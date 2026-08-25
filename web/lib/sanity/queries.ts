export const sportsHeroQuery = `
*[_type == "sportsHeroSection"][0] {
  _id,
  title,
  eyebrow,
  headingLine1,
  headingLine2,
  headingLine3Accent,
  description,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  stadiumImage {
    _type,
    asset,
    alt
  },
  heroVideo {
    _type,
    asset-> { _id, url }
  },
  featureStrip[] {
    label,
    iconName
  }
}
`;

export const sportsPhilosophyQuery = `
*[_type == "sportsPhilosophySection"][0] {
  _id,
  title,
  eyebrow,
  heading,
  headingAccent,
  description,
  cards[] {
    id,
    title,
    desc,
    icon,
    image {
      _type,
      asset,
      alt
    },
    video {
      _type,
      asset-> { _id, url }
    }
  }
}
`;

export const sportsCricketArenaQuery = `
*[_type == "sportsCricketArenaSection"][0] {
  _id,
  title,
  eyebrow,
  headingLine1,
  headingAccent,
  description,
  badgeNumber,
  badgeLabel,
  mainImage {
    _type,
    asset,
    alt
  },
  video {
    _type,
    asset-> { _id, url }
  },
  galleryImages[] {
    _type,
    asset,
    alt
  },
  features[] {
    id,
    title,
    desc,
    image {
      _type,
      asset,
      alt
    }
  }
}
`;

export const sportsPassionQuery = `
*[_type == "sportsPassionSection"][0] {
  _id,
  title,
  eyebrow,
  heading,
  description,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  mainImage {
    _type,
    asset,
    alt
  },
  video {
    _type,
    asset-> { _id, url }
  },
  galleryImages[] {
    _type,
    asset,
    alt
  },
  highlightPanels[] {
    id,
    title,
    desc,
    image {
      _type,
      asset,
      alt
    }
  }
}
`;

export const sportsTestimonialsQuery = `
*[_type == "sportsTestimonialsSection"][0] {
  _id,
  title,
  eyebrow,
  heading,
  description,
  featuredStory {
    label,
    title,
    subtitle,
    description,
    duration,
    thumbnail {
      _type,
      asset
    },
    videoFile {
      _type,
      asset-> { _id, url }
    }
  },
  items[] {
    id,
    title,
    description,
    duration,
    thumbnail {
      _type,
      asset
    },
    videoFile {
      _type,
      asset-> { _id, url }
    }
  }
}
`;

export const sportsMatchCTAQuery = `
*[_type == "sportsMatchCTASection"][0] {
  _id,
  title,
  eyebrow,
  heading,
  description,
  blueprintImage {
    _type,
    asset,
    alt
  },
  video {
    _type,
    asset-> { _id, url }
  },
  hotspots[] {
    id,
    icon,
    title,
    desc
  },
  stats[] {
    label,
    value
  }
}
`;

export const sportsMediaGalleryQuery = `
*[_type == "sportsMediaGallery"][0] {
  _id,
  title,
  images[] {
    _type,
    asset,
    caption,
    alt
  },
  videos[] {
    _type,
    asset-> { _id, url },
    title,
    description,
    posterImage {
      _type,
      asset
    }
  }
}
`;
