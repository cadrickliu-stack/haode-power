export type LightTowerSpecification = {
  label: string;
  value: string;
};

export type LightTowerSpecificationSection = {
  title: string;
  items: LightTowerSpecification[];
};

export type MobileLightTower = {
  name: string;
  model: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  powerSource: string;
  mastHeight: string;
  lighting: string;
  runtime: string;
  weight: string;
  cardFeatures: string[];
  highlights: LightTowerSpecification[];
  specificationSections: LightTowerSpecificationSection[];
  applications: string[];
};

const dieselApplications = [
  "Municipal works",
  "Road projects",
  "Building and construction sites",
  "Night-time site illumination",
];

export const mobileLightTowers: MobileLightTower[] = [
  {
    name: "BMA4000",
    model: "BMA4000",
    slug: "bma4000",
    title: "BMA4000 Mobile Light Tower",
    shortDescription:
      "A compact diesel mobile light tower with a 7 m manual or electric mast and metal halide or LED lighting configurations.",
    description:
      "The BMA4000 combines a single-cylinder Changchai 186F diesel engine with a compact towable chassis. Its four-section mast and two confirmed lighting configurations support night-time municipal, road, building, and construction work.",
    image:
      "/images/real/products/mobile-light-towers/bma4000-mobile-light-tower.webp",
    imageAlt: "BMA4000 mobile light tower with mast fully extended",
    powerSource: "Diesel",
    mastHeight: "7 m",
    lighting: "4 × 1000 W metal halide / 4 × 400 W LED",
    runtime: "28 h",
    weight: "550 kg",
    cardFeatures: ["7 m four-section mast", "35 L fuel tank", "Manual / electric mast lifting"],
    highlights: [
      { label: "Power Source", value: "Diesel" },
      { label: "Mast Height", value: "7 m" },
      { label: "Lighting", value: "Metal halide / LED" },
      { label: "Runtime", value: "28 h" },
    ],
    specificationSections: [
      {
        title: "Engine / Power Source",
        items: [
          { label: "Engine Brand / Model", value: "Changchai 186F" },
          { label: "Rated Speed", value: "3600 rpm" },
          { label: "Cylinders", value: "1" },
          { label: "Engine Type", value: "Air-cooled diesel" },
          { label: "Aspiration", value: "Naturally aspirated" },
          { label: "Frequency", value: "50 / 60 Hz" },
          { label: "Rated Voltage", value: "220 V" },
          { label: "Alternator Configuration", value: "SPARKS" },
          { label: "Alternator Insulation", value: "Class H" },
          { label: "Alternator Protection", value: "IP65" },
          { label: "Starting Method", value: "Key start" },
          { label: "Noise Level", value: "72 dB(A) at 7 m" },
        ],
      },
      {
        title: "Lighting System",
        items: [
          { label: "Lighting Type", value: "Metal halide or LED" },
          { label: "Lamp Fixture", value: "Oval" },
          { label: "Metal Halide Configuration", value: "4 × 1000 W" },
          { label: "LED Configuration", value: "4 × 400 W" },
          { label: "Light Tilt", value: "Manual" },
        ],
      },
      {
        title: "Mast System",
        items: [
          { label: "Mast Height", value: "7 m" },
          { label: "Mast Sections", value: "4" },
          { label: "Mast Lifting Type", value: "Manual / Electric" },
        ],
      },
      {
        title: "Fuel System",
        items: [
          { label: "Fuel Tank Type", value: "Rotational-moulded plastic" },
          { label: "Fuel Tank Capacity", value: "35 L" },
          { label: "Runtime", value: "28 h" },
        ],
      },
      {
        title: "Trailer & Mobility",
        items: [
          { label: "Suspension / Axle", value: "Leaf spring, single axle without brake" },
          { label: "Tow Bar", value: "Retractable and adjustable with supporting wheel" },
          { label: "Outriggers", value: "4 manually retractable stabilizing legs" },
          { label: "Tires", value: "13-inch standard tires" },
          { label: "Tow Adapter", value: "2-inch or 50 mm ball" },
          { label: "Tail Light", value: "Tail reflector" },
          { label: "Maximum Towing Speed", value: "80 km/h" },
          { label: "Wind Resistance", value: "20 m/s when fully extended" },
          { label: "Standard Colour", value: "Orange or yellow canopy, black chassis, galvanized mast and trailer components" },
        ],
      },
      {
        title: "Dimensions & Weight",
        items: [
          { label: "Dimensions", value: "2180 × 1130 × 2300 mm" },
          { label: "Weight", value: "550 kg" },
        ],
      },
    ],
    applications: dieselApplications,
  },
  {
    name: "BMN4000",
    model: "BMN4000",
    slug: "bmn4000",
    title: "BMN4000 Mobile Light Tower",
    shortDescription:
      "A 9 m diesel mobile light tower with a three-section manual or electric mast and a 65-hour full-tank runtime reference.",
    description:
      "The BMN4000 uses a Changchai CZ380 diesel engine and a 110 L fuel tank for extended site-lighting requirements. Its three-section 9 m mast can be raised manually or electrically and supports metal halide or LED lamp configurations.",
    image:
      "/images/real/products/mobile-light-towers/bmn4000-mobile-light-tower.webp",
    imageAlt: "BMN4000 mobile light tower operating inside a production facility",
    powerSource: "Diesel",
    mastHeight: "9 m",
    lighting: "4 × 1000 W metal halide / 4 × 400 W LED",
    runtime: "65 h",
    weight: "960 kg",
    cardFeatures: ["9 m three-section mast", "110 L fuel tank", "65 h runtime"],
    highlights: [
      { label: "Power Source", value: "Diesel" },
      { label: "Mast Height", value: "9 m" },
      { label: "Lighting", value: "Metal halide / LED" },
      { label: "Runtime", value: "65 h" },
    ],
    specificationSections: [
      {
        title: "Engine / Power Source",
        items: [
          { label: "Engine Brand / Model", value: "Changchai CZ380" },
          { label: "Rated Speed", value: "1500 rpm" },
          { label: "Cylinders", value: "3" },
          { label: "Engine Type", value: "Four-stroke, water-cooled diesel" },
          { label: "Aspiration", value: "Naturally aspirated" },
          { label: "Frequency", value: "50 / 60 Hz" },
          { label: "Rated Voltage", value: "220 V" },
          { label: "Alternator Configuration", value: "SPARKS" },
          { label: "Alternator Insulation", value: "Class H" },
          { label: "Alternator Protection", value: "IP65" },
          { label: "Starting Method", value: "Key start" },
          { label: "Noise Level", value: "72 dB(A) at 7 m" },
        ],
      },
      {
        title: "Lighting System",
        items: [
          { label: "Lighting Type", value: "Metal halide or LED" },
          { label: "Lamp Fixture", value: "Oval" },
          { label: "Metal Halide Configuration", value: "4 × 1000 W" },
          { label: "LED Configuration", value: "4 × 400 W" },
          { label: "Light Tilt", value: "Manual" },
        ],
      },
      {
        title: "Mast System",
        items: [
          { label: "Mast Height", value: "9 m" },
          { label: "Mast Sections", value: "3" },
          { label: "Mast Lifting Type", value: "Manual / Electric" },
          { label: "Mast Rotation", value: "Manual, maximum 359°, lockable" },
        ],
      },
      {
        title: "Fuel System",
        items: [
          { label: "Fuel Tank Type", value: "Rotational-moulded plastic" },
          { label: "Fuel Tank Capacity", value: "110 L" },
          { label: "Runtime", value: "65 h" },
        ],
      },
      {
        title: "Trailer & Mobility",
        items: [
          { label: "Suspension / Axle", value: "Leaf spring, single axle without brake" },
          { label: "Tow Bar", value: "Retractable and adjustable with supporting wheel" },
          { label: "Outriggers", value: "4 manually retractable stabilizing legs" },
          { label: "Tires", value: "14-inch standard tires" },
          { label: "Tow Adapter", value: "2-inch or 50 mm ball" },
          { label: "Tail Light", value: "Tail reflector" },
          { label: "Maximum Towing Speed", value: "80 km/h" },
          { label: "Wind Resistance", value: "20 m/s when fully extended" },
          { label: "Standard Colour", value: "Orange or yellow canopy, black chassis, galvanized mast and trailer components" },
        ],
      },
      {
        title: "Dimensions & Weight",
        items: [
          { label: "Dimensions", value: "4360 × 1430 × 1450 mm" },
          { label: "Weight", value: "960 kg" },
        ],
      },
    ],
    applications: dieselApplications,
  },
  {
    name: "BMNVH1600",
    model: "BMNVH1600",
    slug: "bmnvh1600",
    title: "BMNVH1600 Mobile Light Tower",
    shortDescription:
      "A diesel mobile light tower with a 9 m six-section electric mast, lockable manual rotation, and metal halide or LED lighting.",
    description:
      "The BMNVH1600 combines a Kubota D1105 diesel engine with an electrically raised six-section mast. The mast reaches 9 m and provides lockable manual rotation for positioning the selected metal halide or LED lighting configuration.",
    image:
      "/images/real/products/mobile-light-towers/bmnvh1600-mobile-light-tower.webp",
    imageAlt: "BMNVH1600 mobile light tower shown with lowered and raised mast",
    powerSource: "Diesel",
    mastHeight: "9 m",
    lighting: "4 × 1000 W metal halide / 4 × 400 W LED",
    runtime: "65 h",
    weight: "860 kg",
    cardFeatures: ["9 m six-section mast", "Electric mast lifting", "110 L fuel tank"],
    highlights: [
      { label: "Power Source", value: "Diesel" },
      { label: "Mast Height", value: "9 m" },
      { label: "Lighting", value: "Metal halide / LED" },
      { label: "Runtime", value: "65 h" },
    ],
    specificationSections: [
      {
        title: "Engine / Power Source",
        items: [
          { label: "Engine Brand / Model", value: "Kubota D1105" },
          { label: "Rated Speed", value: "1500 rpm" },
          { label: "Cylinders", value: "3" },
          { label: "Engine Type", value: "Four-stroke, water-cooled diesel" },
          { label: "Aspiration", value: "Naturally aspirated" },
          { label: "Frequency", value: "50 / 60 Hz" },
          { label: "Rated Voltage", value: "220 V" },
          { label: "Alternator Configuration", value: "SPARKS" },
          { label: "Alternator Insulation", value: "Class H" },
          { label: "Alternator Protection", value: "IP65" },
          { label: "Starting Method", value: "Key start" },
          { label: "Noise Level", value: "72 dB(A) at 7 m" },
        ],
      },
      {
        title: "Lighting System",
        items: [
          { label: "Lighting Type", value: "Metal halide or LED" },
          { label: "Lamp Fixture", value: "Oval" },
          { label: "Metal Halide Configuration", value: "4 × 1000 W" },
          { label: "LED Configuration", value: "4 × 400 W" },
          { label: "Light Tilt", value: "Manual" },
        ],
      },
      {
        title: "Mast System",
        items: [
          { label: "Mast Height", value: "9 m" },
          { label: "Mast Sections", value: "6" },
          { label: "Mast Lifting Type", value: "Electric" },
          { label: "Mast Rotation", value: "Manual, maximum 359°, lockable" },
        ],
      },
      {
        title: "Fuel System",
        items: [
          { label: "Fuel Tank Type", value: "Rotational-moulded plastic" },
          { label: "Fuel Tank Capacity", value: "110 L" },
          { label: "Runtime", value: "65 h" },
        ],
      },
      {
        title: "Trailer & Mobility",
        items: [
          { label: "Suspension / Axle", value: "Leaf spring, single axle without brake" },
          { label: "Tow Bar", value: "Retractable and adjustable with supporting wheel" },
          { label: "Outriggers", value: "4 manually retractable stabilizing legs" },
          { label: "Tires", value: "14-inch standard tires" },
          { label: "Tow Adapter", value: "2-inch or 50 mm ball" },
          { label: "Tail Light", value: "Tail reflector" },
          { label: "Maximum Towing Speed", value: "80 km/h" },
          { label: "Wind Resistance", value: "20 m/s when fully extended" },
          { label: "Standard Colour", value: "Orange or yellow canopy, black chassis, galvanized mast and trailer components" },
        ],
      },
      {
        title: "Dimensions & Weight",
        items: [
          { label: "Dimensions", value: "2450 × 1350 × 2650 mm" },
          { label: "Weight", value: "860 kg" },
        ],
      },
    ],
    applications: dieselApplications,
  },
  {
    name: "4HVP1600M",
    model: "4HVP1600M",
    slug: "4hvp1600m",
    title: "4HVP1600M Mobile Light Tower",
    shortDescription:
      "A diesel mobile light tower with a 9 m eight-section hydraulic mast, electric light tilt, and two confirmed lighting configurations.",
    description:
      "The 4HVP1600M uses a Changchai CZ380 diesel engine with a hydraulic eight-section mast. The mast reaches 9 m, while electric light tilt and lockable manual mast rotation support controlled illumination positioning on night-time work sites.",
    image:
      "/images/real/products/mobile-light-towers/4hvp1600m-mobile-light-tower.webp",
    imageAlt: "4HVP1600M mobile light tower shown with raised and lowered mast",
    powerSource: "Diesel",
    mastHeight: "9 m",
    lighting: "4 × 1000 W metal halide / 4 × 400 W LED",
    runtime: "65 h",
    weight: "1200 kg",
    cardFeatures: ["9 m eight-section mast", "Hydraulic mast lifting", "Electric light tilt"],
    highlights: [
      { label: "Power Source", value: "Diesel" },
      { label: "Mast Height", value: "9 m" },
      { label: "Mast Lifting", value: "Hydraulic" },
      { label: "Runtime", value: "65 h" },
    ],
    specificationSections: [
      {
        title: "Engine / Power Source",
        items: [
          { label: "Engine Brand / Model", value: "Changchai CZ380" },
          { label: "Rated Speed", value: "1500 rpm" },
          { label: "Cylinders", value: "3" },
          { label: "Engine Type", value: "Four-stroke, water-cooled diesel" },
          { label: "Aspiration", value: "Naturally aspirated" },
          { label: "Frequency", value: "50 / 60 Hz" },
          { label: "Rated Voltage", value: "220 V" },
          { label: "Alternator Configuration", value: "SPARKS" },
          { label: "Alternator Insulation", value: "Class H" },
          { label: "Alternator Protection", value: "IP67" },
          { label: "Starting Method", value: "Key start" },
          { label: "Noise Level", value: "72 dB(A) at 7 m" },
        ],
      },
      {
        title: "Lighting System",
        items: [
          { label: "Lighting Type", value: "Metal halide or LED" },
          { label: "Lamp Fixture", value: "Oval" },
          { label: "Metal Halide Configuration", value: "4 × 1000 W" },
          { label: "LED Configuration", value: "4 × 400 W" },
          { label: "Light Tilt", value: "Electric" },
        ],
      },
      {
        title: "Mast System",
        items: [
          { label: "Mast Height", value: "9 m" },
          { label: "Mast Sections", value: "8" },
          { label: "Mast Lifting Type", value: "Hydraulic" },
          { label: "Mast Rotation", value: "Manual, maximum 359°, lockable" },
        ],
      },
      {
        title: "Fuel System",
        items: [
          { label: "Fuel Tank Type", value: "Rotational-moulded plastic" },
          { label: "Fuel Tank Capacity", value: "110 L" },
          { label: "Runtime", value: "65 h" },
        ],
      },
      {
        title: "Trailer & Mobility",
        items: [
          { label: "Suspension / Axle", value: "Leaf spring, single axle without brake" },
          { label: "Tow Bar", value: "Retractable and adjustable with supporting wheel" },
          { label: "Outriggers", value: "4 manually retractable stabilizing legs" },
          { label: "Tires", value: "14-inch standard tires" },
          { label: "Tow Adapter", value: "2-inch or 50 mm ball" },
          { label: "Tail Light", value: "Tail reflector" },
          { label: "Maximum Towing Speed", value: "80 km/h" },
          { label: "Wind Resistance", value: "20 m/s when fully extended" },
          { label: "Standard Colour", value: "Orange or yellow canopy, black chassis, galvanized mast and trailer components" },
        ],
      },
      {
        title: "Dimensions & Weight",
        items: [
          { label: "Dimensions", value: "3600 × 1670 × 2480 mm" },
          { label: "Weight", value: "1200 kg" },
        ],
      },
    ],
    applications: dieselApplications,
  },
  {
    name: "4TNVE600 Solar Light Tower",
    model: "4TNVE600",
    slug: "4tnve600",
    title: "4TNVE600 Solar Light Tower",
    shortDescription:
      "A solar and battery mobile light tower with 3 × 470 W monocrystalline panels, a DC 24 V GEL battery system, and 4 × 150 W LED lights.",
    description:
      "The 4TNVE600 combines monocrystalline solar panels, a DC 24 V GEL battery system, and four LED lights in a towable lighting platform. Its six-section mast supports manual or electric lifting to a confirmed height of 9 m.",
    image:
      "/images/real/products/mobile-light-towers/4tnve600-solar-light-tower.webp",
    imageAlt: "4TNVE600 solar mobile light tower with monocrystalline panels",
    powerSource: "Solar + Battery",
    mastHeight: "9 m",
    lighting: "4 × 150 W LED",
    runtime: "8–12 h",
    weight: "1180 kg",
    cardFeatures: ["3 × 470 W solar panels", "6 × 200 Ah GEL batteries", "DC 24 V system"],
    highlights: [
      { label: "Power Source", value: "Solar + Battery" },
      { label: "Solar Array", value: "3 × 470 W" },
      { label: "LED Lighting", value: "4 × 150 W" },
      { label: "Runtime", value: "8–12 h" },
    ],
    specificationSections: [
      {
        title: "Lighting System",
        items: [
          { label: "Lighting Type", value: "LED" },
          { label: "Number of Lamps", value: "4" },
          { label: "Power per Lamp", value: "150 W" },
          { label: "Total Lighting Power", value: "600 W" },
          { label: "Luminous Flux", value: "4 × 21,000 lm" },
          { label: "Lighting Protection", value: "IP68" },
        ],
      },
      {
        title: "Mast System",
        items: [
          { label: "Mast Height", value: "9 m" },
          { label: "Mast Sections", value: "6" },
          { label: "Mast Lifting Type", value: "Manual / Electric" },
        ],
      },
      {
        title: "Solar System",
        items: [
          { label: "Power Source", value: "Solar + Battery" },
          { label: "Solar Panel Power", value: "3 × 470 W" },
          { label: "Solar Panel Type", value: "Monocrystalline" },
        ],
      },
      {
        title: "Battery System",
        items: [
          { label: "Battery Type", value: "GEL Battery" },
          { label: "Battery Capacity", value: "6 × 200 Ah" },
          { label: "System Voltage", value: "DC 24 V" },
          { label: "Runtime", value: "8–12 h (test conditions not specified)" },
        ],
      },
      {
        title: "Trailer & Mobility",
        items: [
          { label: "Suspension / Axle", value: "Leaf spring, single axle with brakes" },
          { label: "Tow Bar", value: "Retractable and adjustable with supporting wheel" },
          { label: "Outriggers", value: "4 manually operated retractable support legs" },
          { label: "Tires", value: "14-inch" },
          { label: "Tow Adapter", value: "2-inch or 50 mm ball" },
          { label: "Tail Light", value: "Tail reflector" },
          { label: "Maximum Towing Speed", value: "80 km/h" },
          { label: "Wind Resistance", value: "20 m/s when fully extended" },
        ],
      },
      {
        title: "Dimensions & Weight",
        items: [
          { label: "Dimensions", value: "3200 × 1630 × 2750 mm" },
          { label: "Packing Size", value: "2200 × 1630 × 2330 mm" },
          { label: "Weight", value: "1180 kg" },
        ],
      },
    ],
    applications: [
      "Large-scale construction operations",
      "Mining operations",
      "Sites requiring extensive, high-brightness lighting",
    ],
  },
];

export function getMobileLightTower(slug: string) {
  return mobileLightTowers.find((tower) => tower.slug === slug);
}
