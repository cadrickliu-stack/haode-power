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
  address: "No. 600, Tongjiang Middle Road, Xinbei District, Changzhou City, Jiangsu Province, China",
  socials: {
    linkedin: "https://linkedin.com/company/haodepower",
    facebook: "https://facebook.com/haodepower",
    youtube: "https://youtube.com/@haodepower",
    whatsapp: "https://wa.me/8613000000000",
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
    image:
      "https://images.unsplash.com/photo-1622912427800-5cfdb5b0c1a2?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1200&auto=format&fit=crop",
    useCase: "Large mining operations, power plants, utilities",
  },
];

export type LightTower = {
  name: string;
  slug: string;
  power: string;
  mastHeight: string;
  lighting: string;
  runtime: string;
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1590959651373-a3db0f38c961?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
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
