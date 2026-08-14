export const site = {
  name: "Haode Power",
  domain: "haodepower.com",
  url: "https://www.haodepower.com",
  legalName: "Haode Power Equipment Co., Ltd.",
  tagline: "Reliable Power Solutions for Mining & Construction",
  description:
    "Haode Power manufactures heavy-duty diesel generator sets and mobile light towers for mining, construction, oil & gas, and rental fleets, exporting to over 60 countries.",
  phone: "+86 190 8495 7004",
  whatsapp: "+86 190 8495 7004",
  email: "sales@haodepower.com",
  address:
    "No. 600, Tongjiang Middle Road, Xinbei District, Changzhou City, Jiangsu Province, China",
  socials: {
    linkedin: "https://linkedin.com/company/haodepower",
    facebook: "https://facebook.com/haodepower",
    youtube: "https://youtube.com/@haodepower",
    whatsapp: "https://wa.me/8619084957004",
  },
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Diesel Generators", href: "/products/diesel-generators" },
  { label: "Mobile Light Towers", href: "/products/mobile-light-towers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const dieselGeneratorCategory = {
  image: "/images/real/products/diesel-generators/diesel-generator-series-category.webp",
  alt: "Diesel generator sets prepared for shipment",
};

export type LightTower = {
  name: string;
  slug: string;
  power: string;
  mastHeight: string;
  lighting: string;
  runtime: string;
  image: string;
  alt: string;
  description: string;
  features: string[];
};

export const lightTowers: LightTower[] = [
  {
    name: "BMA4000",
    slug: "bma4000",
    power: "Available on request",
    mastHeight: "Available on request",
    lighting: "Available on request",
    runtime: "Available on request",
    image: "/images/real/products/mobile-light-towers/bma4000-mobile-light-tower.webp",
    alt: "BMA4000 mobile light tower product view",
    description:
      "BMA4000 mobile light tower for professional site lighting. Contact our team for the verified configuration and technical specification.",
    features: ["Model-specific specification available on request"],
  },
  {
    name: "BMN4000",
    slug: "bmn4000",
    power: "Available on request",
    mastHeight: "Available on request",
    lighting: "Available on request",
    runtime: "Available on request",
    image: "/images/real/products/mobile-light-towers/bmn4000-mobile-light-tower.webp",
    alt: "BMN4000 mobile light tower operating in a production facility",
    description:
      "BMN4000 mobile light tower shown with its lighting system in operation. Contact our team for the verified configuration and technical specification.",
    features: ["Model-specific specification available on request"],
  },
  {
    name: "BMNVH1600",
    slug: "bmnvh1600",
    power: "Available on request",
    mastHeight: "Available on request",
    lighting: "Available on request",
    runtime: "Available on request",
    image: "/images/real/products/mobile-light-towers/bmnvh1600-mobile-light-tower.webp",
    alt: "BMNVH1600 towable mobile light tower in raised and lowered positions",
    description:
      "BMNVH1600 towable mobile light tower shown in transport and operating positions. Contact our team for the verified technical specification.",
    features: ["Model-specific specification available on request"],
  },
  {
    name: "4HVP1600M",
    slug: "4hvp1600m",
    power: "Available on request",
    mastHeight: "Available on request",
    lighting: "Available on request",
    runtime: "Available on request",
    image: "/images/real/products/mobile-light-towers/4hvp1600m-mobile-light-tower.webp",
    alt: "4HVP1600M towable mobile light tower in raised and lowered positions",
    description:
      "4HVP1600M towable mobile light tower for site illumination. Contact our team for the verified configuration and technical specification.",
    features: ["Model-specific specification available on request"],
  },
  {
    name: "4TNVE600 Solar Light Tower",
    slug: "4tnve600-solar-light-tower",
    power: "Solar",
    mastHeight: "Available on request",
    lighting: "Available on request",
    runtime: "Available on request",
    image: "/images/real/products/mobile-light-towers/4tnve600-solar-light-tower.webp",
    alt: "4TNVE600 solar mobile light tower with photovoltaic panels",
    description:
      "4TNVE600 solar mobile light tower with integrated photovoltaic panels. Contact our team for the verified battery, lighting, mast, and runtime specification.",
    features: ["Solar-powered model", "Detailed specification available on request"],
  },
];

export const lightTowerHero = {
  image: "/images/products/mobile-light-towers/hero-light-tower-construction.jpg",
  alt: "Mobile light tower for construction site",
};

export const lightTowerCategory = {
  image: "/images/real/products/mobile-light-towers/bmnvh1600-mobile-light-tower.webp",
  alt: "BMNVH1600 towable mobile light tower product views",
};

export const industries = [
  {
    name: "Mining",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop",
    description:
      "Continuous prime power and night-shift lighting engineered for remote, high-vibration, high-dust mine sites.",
  },
  {
    name: "Construction",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
    description:
      "Compact, towable power and lighting for fast-moving job sites and multi-phase builds.",
  },
  {
    name: "Oil & Gas",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop",
    description:
      "Explosion-aware enclosure options and high-load standby generators for upstream and midstream operations.",
  },
  {
    name: "Rental",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    description:
      "Fleet-standardized models built for turnaround durability, easy servicing, and resale value.",
  },
  {
    name: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Dependable backup and prime power for government, utility, and public works projects.",
  },
];

export const advantages = [
  {
    title: "10+ Years Manufacturing",
    description:
      "A decade of engineering diesel generator sets and mobile lighting equipment for the toughest job sites.",
  },
  {
    title: "Export Worldwide",
    description:
      "Shipping to 60+ countries across Africa, the Middle East, Southeast Asia, and Latin America.",
  },
  {
    title: "OEM & ODM Support",
    description:
      "Custom branding, canopy design, control panels, and configurations built to your specification.",
  },
  {
    title: "Strict Quality Control",
    description:
      "Every unit undergoes full-load bench testing, burn-in runs, and multi-point inspection before shipment.",
  },
  {
    title: "Fast Delivery",
    description:
      "Standard models ship from stock; custom configurations built and delivered in 15–30 days.",
  },
];
