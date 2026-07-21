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

export type Generator = {
  model: string;
  kva: string;
  kw: string;
  engine: string;
  fuelTankL: string;
  runtimeHrs: string;
  phase: string;
  slug: string;
  image: string;
  alt: string;
  useCase: string;
};

export const generators: Generator[] = [
  {
    model: "HDP-20GF",
    kva: "20kVA",
    kw: "16kW",
    engine: "Cummins / Yangdong",
    fuelTankL: "100 L",
    runtimeHrs: "8 hrs",
    phase: "Single/Three",
    slug: "20kva",
    image: "/images/products/diesel-generators/20kva-diesel-generator.jpg",
    alt: "20kVA diesel generator for workshops and small construction sites",
    useCase: "Small sites, workshops, backup power",
  },
  {
    model: "HDP-50GF",
    kva: "50kVA",
    kw: "40kW",
    engine: "Cummins 4BTA",
    fuelTankL: "200 L",
    runtimeHrs: "10 hrs",
    phase: "Three Phase",
    slug: "50kva",
    image: "/images/products/diesel-generators/50kva-diesel-generator.jpg",
    alt: "50kVA diesel generator for construction sites and rental fleets",
    useCase: "Construction sites, small rental fleets",
  },
  {
    model: "HDP-100GF",
    kva: "100kVA",
    kw: "80kW",
    engine: "Cummins 6BTA",
    fuelTankL: "300 L",
    runtimeHrs: "12 hrs",
    phase: "Three Phase",
    slug: "100kva",
    image: "/images/products/diesel-generators/100kva-diesel-generator.jpg",
    alt: "100kVA diesel generator for commercial buildings and mid-size construction",
    useCase: "Mid-size construction, commercial buildings",
  },
  {
    model: "HDP-200GF",
    kva: "200kVA",
    kw: "160kW",
    engine: "Cummins NTA855",
    fuelTankL: "500 L",
    runtimeHrs: "15 hrs",
    phase: "Three Phase",
    slug: "200kva",
    image: "/images/products/diesel-generators/200kva-diesel-generator.jpg",
    alt: "200kVA diesel generator for mining support and industrial facilities",
    useCase: "Mining support, hospitals, factories",
  },
  {
    model: "HDP-500GF",
    kva: "500kVA",
    kw: "400kW",
    engine: "Cummins KTA19",
    fuelTankL: "800 L",
    runtimeHrs: "18 hrs",
    phase: "Three Phase",
    slug: "500kva",
    image: "/images/products/diesel-generators/500kva-diesel-generator.jpg",
    alt: "500kVA diesel generator for mining application and oil and gas fields",
    useCase: "Mining sites, oil & gas fields, data centers",
  },
  {
    model: "HDP-1000GF",
    kva: "1000kVA",
    kw: "800kW",
    engine: "Cummins KTA38 / Perkins",
    fuelTankL: "1500 L",
    runtimeHrs: "24 hrs",
    phase: "Three Phase",
    slug: "1000kva",
    image: "/images/products/diesel-generators/1000kva-diesel-generator.jpg",
    alt: "1000kVA diesel generator for large mining operations and power plants",
    useCase: "Large mining operations, power plants, utilities",
  },
];

export const dieselGeneratorHero = {
  image: "/images/products/diesel-generators/hero-diesel-generator-mining.jpg",
  alt: "Diesel generator set for mining application",
};

export const dieselGeneratorCategory = {
  image: "/images/products/diesel-generators/category-diesel-generators.jpg",
  alt: "Diesel generator sets for mining and construction power",
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
    name: "Solar Light Tower",
    slug: "solar-light-tower",
    power: "Solar Panel + Battery Bank",
    mastHeight: "9m Pneumatic Mast",
    lighting: "4 x 300W LED",
    runtime: "Continuous (Solar Charged)",
    image: "/images/products/mobile-light-towers/solar-light-tower.jpg",
    alt: "Solar powered mobile light tower for remote construction sites",
    description:
      "Zero-fuel, silent illumination for remote sites and noise-sensitive zones. Fully autonomous solar charging with battery backup for multi-day cloudy runtime.",
    features: [
      "100% fuel-free operation",
      "Silent — ideal for urban & residential sites",
      "Remote monitoring & GPS tracking",
      "Automatic dusk-to-dawn operation",
    ],
  },
  {
    name: "Diesel Light Tower",
    slug: "diesel-light-tower",
    power: "Diesel Engine Generator",
    mastHeight: "9m Pneumatic Mast",
    lighting: "4 x 1000W Metal Halide / LED",
    runtime: "Up to 100 hrs on single tank",
    image: "/images/products/mobile-light-towers/diesel-light-tower.jpg",
    alt: "LED lighting tower for mining operations and night-shift construction",
    description:
      "Heavy-duty towed light tower engineered for mining and infrastructure night shifts, with extended-runtime fuel tanks and a galvanized-steel frame.",
    features: [
      "Extended-runtime fuel tank",
      "360° tower rotation",
      "Heavy-duty galvanized chassis",
      "Towable highway-rated trailer",
    ],
  },
  {
    name: "Hybrid Light Tower",
    slug: "hybrid-light-tower",
    power: "Solar + Diesel + Battery",
    mastHeight: "9m Pneumatic Mast",
    lighting: "4 x 300W LED",
    runtime: "300+ hrs between refuels",
    image: "/images/products/mobile-light-towers/hybrid-light-tower.jpg",
    alt: "Hybrid solar and diesel mobile light tower for long-term rental fleets",
    description:
      "The lowest total operating cost of the range: solar and battery handle everyday loads while the diesel engine engages automatically only when needed.",
    features: [
      "Up to 90% fuel savings vs diesel-only",
      "Automatic power-source switching",
      "Telematics-ready fuel monitoring",
      "Ideal for long-term rental fleets",
    ],
  },
];

export const lightTowerHero = {
  image: "/images/products/mobile-light-towers/hero-light-tower-construction.jpg",
  alt: "Mobile light tower for construction site",
};

export const lightTowerCategory = {
  image: "/images/products/mobile-light-towers/category-mobile-light-towers.jpg",
  alt: "Mobile light towers illuminating a night construction site",
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
