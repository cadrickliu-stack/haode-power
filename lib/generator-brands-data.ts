export interface GeneratorModel {
  model: string;
  ratedPowerKw: number;
  ratedPowerKva: number;
  standbyPowerKw: number;
  standbyPowerKva: number;
  engineModel: string;
  alternator: string;
  controller: string;
  frequency: string;
  voltage: string;
  fuelConsumption: string;
  coolingSystem: string;
  dimension: string;
  weight: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GeneratorBrand {
  slug: string;
  name: string;
  companyIntroduction: string;
  engineFeatures: string[];
  applicationFields: string[];
  compatibleGeneratorApplications: string[];
  powerRange: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: FAQItem[];
  models: GeneratorModel[];
}

export const GENERATOR_BRANDS_DATA: Record<string, GeneratorBrand> = {
  cummins: {
    slug: "cummins",
    name: "Cummins Diesel Generator",
    companyIntroduction:
      "Cummins Inc. is a global leader in power technology, engineering high-efficiency and heavy-duty combustion engines. Haode Power combines Cummins engine platforms with precision alternators to deliver high reliability, outstanding transient response, and long operational service under demanding industrial conditions.",
    engineFeatures: [
      "Advanced electronic fuel injection for optimized fuel economy",
      "High block load capability and rapid dynamic load acceptance",
      "Durable cast-iron engine blocks for long overhaul intervals",
      "Global spare parts accessibility and worldwide technical support network",
    ],
    applicationFields: [
      "Mining & Heavy Industry Works",
      "Commercial Building Projects",
      "Manufacturing & Processing Plants",
      "Emergency Standby Power for Hospitals & Data Centers",
    ],
    compatibleGeneratorApplications: [
      "Open-frame prime power generator sets",
      "Soundproof and silent canopy generator sets",
      "Containerized heavy-duty power stations",
      "Mobile light towers and emergency trailer units",
    ],
    powerRange: "20 kW - 2000 kW (25 kVA - 2500 kVA)",
    metaTitle: "Cummins Diesel Generator Supplier China | Industrial Gensets - Haode Power",
    metaDescription:
      "Haode Power is a trusted Cummins diesel generator supplier in China. We supply heavy-duty 20kW-2000kW Cummins generator sets for industrial, mining, and standby power.",
    keywords: [
      "Cummins diesel generator supplier",
      "Cummins generator set China",
      "industrial diesel generator supplier",
      "diesel generator manufacturer China",
    ],
    faqs: [
      {
        question: "Why choose Cummins generator sets from Haode Power?",
        answer:
          "Haode Power integrates authentic Cummins engines with top-tier alternators (Stamford/Marathon) and intelligent controllers (DeepSea/SmartGen) to deliver fully tested, reliable power solutions.",
      },
      {
        question: "What power ranges are covered by Cummins generator sets?",
        answer:
          "Our Cummins generator range spans from 20 kW up to 2000 kW in open-type, silent canopy, and containerized structures.",
      },
    ],
    models: [
      {
        model: "HD-C25",
        ratedPowerKw: 20,
        ratedPowerKva: 25,
        standbyPowerKw: 22,
        standbyPowerKva: 28,
        engineModel: "4LB3.9-G2",
        alternator: "Stamford / Marathon",
        controller: "DeepSea / SmartGen",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "208 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "1650 x 750 x 1100 mm",
        weight: 780,
      },
      {
        model: "HD-C200",
        ratedPowerKw: 160,
        ratedPowerKva: 200,
        standbyPowerKw: 176,
        standbyPowerKva: 220,
        engineModel: "6CTA8.3-G2",
        alternator: "Stamford / Marathon",
        controller: "DeepSea DSE7320",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "205 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "2500 x 950 x 1500 mm",
        weight: 1850,
      },
    ],
  },
  perkins: {
    slug: "perkins",
    name: "Perkins Diesel Generator",
    companyIntroduction:
      "Perkins Engines Company Limited brings British engineering quality with decades of power generation expertise. Haode Power Perkins generator sets are renowned for ultra-quiet running, minimal vibration, and high environmental compliance.",
    engineFeatures: [
      "Smooth mechanical operation and quiet combustion performance",
      "Compact design with excellent power-to-weight density",
      "Strict compliance with global emissions standards with low oil consumption",
      "Extended service intervals reducing total lifecycle operational costs",
    ],
    applicationFields: [
      "Telecom Infrastructure & Data Hubs",
      "Commercial Malls & Hotels",
      "Urban Construction Sites",
      "Critical Backup Emergency Power",
    ],
    compatibleGeneratorApplications: [
      "Ultra-silent generator enclosures for noise-sensitive sites",
      "Automatic transfer switch (ATS) emergency standby sets",
      "Mobile light tower power systems",
      "Skid-mounted temporary construction generators",
    ],
    powerRange: "10 kW - 1800 kW (12.5 kVA - 2250 kVA)",
    metaTitle: "Perkins Generator Supplier | Heavy Duty Silent Gensets - Haode Power",
    metaDescription:
      "Haode Power is a leading Perkins generator supplier. We supply reliable, quiet, and fuel-efficient Perkins diesel generators from 10kW to 1800kW.",
    keywords: [
      "Perkins generator supplier",
      "Perkins diesel generator",
      "industrial diesel generator supplier",
      "silent diesel generator supplier",
    ],
    faqs: [
      {
        question: "Are Perkins diesel generators suitable for urban/residential areas?",
        answer:
          "Yes. Perkins engines feature low baseline acoustic signatures, which, paired with Haode Power soundproof enclosures, fit residential and hospital applications.",
      },
    ],
    models: [
      {
        model: "HD-P50",
        ratedPowerKw: 40,
        ratedPowerKva: 50,
        standbyPowerKw: 44,
        standbyPowerKva: 55,
        engineModel: "1103A-33TG1",
        alternator: "Stamford",
        controller: "DeepSea",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "205 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "1800 x 800 x 1200 mm",
        weight: 890,
      },
    ],
  },
  weichai: {
    slug: "weichai",
    name: "Weichai Diesel Generator",
    companyIntroduction:
      "Weichai Power is one of China's largest industrial equipment groups. Haode Power manufactures Weichai-powered generator sets designed to provide heavy torque output, easy maintenance, and robust endurance in harsh operating conditions.",
    engineFeatures: [
      "High torque reserve engineered for heavy duty application acceleration",
      "Reinforced cylinder block structure ensuring structural stability",
      "Cost-effective fuel economy and affordable maintenance parts",
      "High ambient temperature and high altitude endurance",
    ],
    applicationFields: [
      "Civil Engineering & Heavy Earthmoving",
      "Open-Pit Mining Operations",
      "Agricultural Irrigation Power Supply",
      "Industrial Factories & Assembly Lines",
    ],
    compatibleGeneratorApplications: [
      "Industrial continuous prime power sets",
      "Off-grid remote site power plants",
      "Heavy-duty mobile trailer power generators",
      "Mobile light towers for outdoor job sites",
    ],
    powerRange: "30 kW - 1000 kW (37.5 kVA - 1250 kVA)",
    metaTitle: "Weichai Diesel Generator Manufacturer China - Haode Power",
    metaDescription:
      "Haode Power is a leading Weichai diesel generator manufacturer in China, producing 30kW-1000kW generator sets for mining, construction, and factories.",
    keywords: [
      "Weichai diesel generator manufacturer",
      "diesel generator manufacturer China",
      "Weichai generator supplier",
      "industrial diesel generator supplier",
    ],
    faqs: [
      {
        question: "Why select Weichai generators for heavy industrial sites?",
        answer:
          "Weichai engines offer outstanding durability, high load resistance, and cost-effective maintenance, making them ideal for heavy industrial work.",
      },
    ],
    models: [
      {
        model: "HD-W100",
        ratedPowerKw: 80,
        ratedPowerKva: 100,
        standbyPowerKw: 88,
        standbyPowerKva: 110,
        engineModel: "WP4.1D100E200",
        alternator: "Haode / Stamford",
        controller: "SmartGen",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "198 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "2100 x 900 x 1350 mm",
        weight: 1150,
      },
    ],
  },
  yuchai: {
    slug: "yuchai",
    name: "Yuchai Diesel Generator",
    companyIntroduction:
      "Guangxi Yuchai Machinery Group is a major engine technology developer in China. Haode Power utilizes Yuchai engines to supply compact, high power-density generator sets with low emissions and high energy transformation.",
    engineFeatures: [
      "Multi-valve combustion technology ensuring complete fuel burning",
      "Low sound emission profile and low exhaust opacity",
      "Compact dimensions requiring less installation footprint",
      "Reliable low-temperature quick start capability",
    ],
    applicationFields: [
      "Municipal Public Works",
      "Commercial Real Estate Facilities",
      "Quarry & Aggregates Operations",
      "Water Supply Facilities Emergency Backup",
    ],
    compatibleGeneratorApplications: [
      "Automatic emergency standby generator sets",
      "Weatherproof outdoor silent generators",
      "Mobile trailer-mounted generators",
      "Mobile light towers for municipal maintenance",
    ],
    powerRange: "20 kW - 1200 kW (25 kVA - 1500 kVA)",
    metaTitle: "Yuchai Diesel Generator Supplier & Manufacturer - Haode Power",
    metaDescription:
      "Haode Power supplies high-efficiency Yuchai diesel generators from 20kW to 1200kW with reliable control systems and canopy choices.",
    keywords: [
      "Yuchai diesel generator supplier",
      "diesel generator manufacturer China",
      "industrial diesel generator supplier",
    ],
    faqs: [
      {
        question: "Can Yuchai generators be fitted onto trailer mobile light towers?",
        answer:
          "Yes, Haode Power builds custom mobile light towers and trailer-mounted Yuchai diesel generator sets for roadwork and night projects.",
      },
    ],
    models: [
      {
        model: "HD-Y150",
        ratedPowerKw: 120,
        ratedPowerKva: 150,
        standbyPowerKw: 132,
        standbyPowerKva: 165,
        engineModel: "YC6A180-D20",
        alternator: "Stamford / Haode",
        controller: "SmartGen",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "197 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "2350 x 980 x 1450 mm",
        weight: 1420,
      },
    ],
  },
  shangchai: {
    slug: "shangchai",
    name: "Shangchai Diesel Generator",
    companyIntroduction:
      "Shangchai series engines, developed by Shanghai Diesel Engine Co., Ltd., represent traditional heavy-duty engine engineering. Haode Power integrates Shangchai engines to provide steady output and dependable operation for medium and heavy loads.",
    engineFeatures: [
      "Proven mechanical stability and straightforward servicing",
      "Heavy-duty engine block built for high strain acceptance",
      "Cost-effective operating expenses with global parts availability",
      "High cooling efficiency suited for high ambient temperatures",
    ],
    applicationFields: [
      "Construction Sites & Remote Camp Lines",
      "Manufacturing Units & Warehouses",
      "Public Infrastructure Projects",
      "Industrial Utility Backup Power",
    ],
    compatibleGeneratorApplications: [
      "Standard open-frame skid generators",
      "Soundproof & weatherproof canopy sets",
      "High-capacity industrial prime power sets",
    ],
    powerRange: "50 kW - 1000 kW (62.5 kVA - 1250 kVA)",
    metaTitle: "Shangchai Diesel Generator Set Manufacturer - Haode Power",
    metaDescription:
      "Explore Shangchai diesel generator sets manufactured by Haode Power. High load tolerance, durable engine architecture, and direct factory pricing.",
    keywords: [
      "Shangchai diesel generator",
      "diesel generator manufacturer China",
      "industrial diesel generator supplier",
    ],
    faqs: [
      {
        question: "What is the relation between Shangchai and SDEC?",
        answer:
          "Shangchai is the traditional brand designation for Shanghai Diesel Engine Co., Ltd. (SDEC), representing the exact same high standard of engine manufacturing.",
      },
    ],
    models: [
      {
        model: "HD-SC200",
        ratedPowerKw: 160,
        ratedPowerKva: 200,
        standbyPowerKw: 176,
        standbyPowerKva: 220,
        engineModel: "SC7H250D2",
        alternator: "Stamford",
        controller: "DeepSea / SmartGen",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "196 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "2550 x 1000 x 1550 mm",
        weight: 1750,
      },
    ],
  },
  sdec: {
    slug: "sdec",
    name: "SDEC Diesel Generator",
    companyIntroduction:
      "Shanghai Diesel Engine Co., Ltd. (SDEC) develops state-of-the-art power units through advanced digital manufacturing. Haode Power SDEC generator sets provide high fuel efficiency, low emissions, and seamless intelligent controller integration.",
    engineFeatures: [
      "Modern multi-valve architecture with precision electronic speed control",
      "Optimized thermal combustion yielding reduced fuel consumption",
      "Extensive testing for continuous load performance under harsh conditions",
      "Seamless ATS automatic transfer switch integration",
    ],
    applicationFields: [
      "Industrial Plants & Manufacturing Facilities",
      "Bridges, Roads & Tunnel Engineering",
      "Commercial Buildings & Facilities",
      "Emergency Power Stations",
    ],
    compatibleGeneratorApplications: [
      "Parallel multi-generator power systems",
      "Soundproof and containerized power modules",
      "Mobile light towers and portable site power",
    ],
    powerRange: "50 kW - 1000 kW (62.5 kVA - 1250 kVA)",
    metaTitle: "SDEC Diesel Generator Supplier China | Gensets - Haode Power",
    metaDescription:
      "Haode Power manufactures SDEC diesel generators with efficient performance, intelligent controls, and soundproof options for global B2B clients.",
    keywords: [
      "SDEC diesel generator",
      "SDEC generator supplier",
      "diesel generator manufacturer China",
      "industrial diesel generator supplier",
    ],
    faqs: [
      {
        question: "Does Haode Power export SDEC generator sets globally?",
        answer:
          "Yes, Haode Power exports SDEC generator sets globally, configured to match international power grids, frequencies, and ambient requirements.",
      },
    ],
    models: [
      {
        model: "HD-SDEC400",
        ratedPowerKw: 320,
        ratedPowerKva: 400,
        standbyPowerKw: 352,
        standbyPowerKva: 440,
        engineModel: "SC13G450D2",
        alternator: "Stamford / Marathon",
        controller: "DeepSea DSE7320",
        frequency: "50Hz / 60Hz",
        voltage: "400V / 230V",
        fuelConsumption: "195 g/kWh",
        coolingSystem: "Water Cooled",
        dimension: "3200 x 1250 x 1800 mm",
        weight: 3100,
      },
    ],
  },
};