export type GeneratorSpecification = {
  engineModel: string;
  outputKw: number;
  outputKva: number;
  cylinders: number;
  boreStrokeMm: string;
};

export type GeneratorSeriesGroup = {
  name: string;
  models: GeneratorSpecification[];
};

export type DieselGeneratorBrand = {
  name: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  frequencySummary: string;
  powerRange: string;
  configurations: string;
  seriesGroups: GeneratorSeriesGroup[];
};

export const dieselGeneratorBrands: DieselGeneratorBrand[] = [
  {
    name: "Cummins",
    slug: "cummins",
    title: "Cummins Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by Cummins engines, with a confirmed 50Hz engine and output reference for initial model selection.",
    description:
      "This series uses Cummins engines across a broad output range. The 50Hz reference below supports initial selection; final generator set model, voltage, enclosure, dimensions, weight, and order-specific configuration are confirmed before quotation.",
    image:
      "/images/real/products/diesel-generators/brands/cummins-diesel-generator-series.webp",
    imageAlt:
      "Cummins-powered open diesel generator set at a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "18.75–2300 kVA (50Hz reference)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Dongfeng Cummins Series",
        models: [
          { engineModel: "4B3.9-G2", outputKw: 15, outputKva: 18.75, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4B3.9-G2", outputKw: 20, outputKva: 25, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4BT3.9-G2", outputKw: 24, outputKva: 30, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4BT3.9-G2", outputKw: 30, outputKva: 37.5, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4BTA3.9-G2", outputKw: 40, outputKva: 50, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4BTA3.9-G2", outputKw: 50, outputKva: 62.5, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "4BTA3.9-G11", outputKw: 64, outputKva: 80, cylinders: 4, boreStrokeMm: "102 × 120" },
          { engineModel: "6BT5.9-G2", outputKw: 80, outputKva: 100, cylinders: 6, boreStrokeMm: "102 × 120" },
          { engineModel: "6BTA5.9-G2", outputKw: 100, outputKva: 125, cylinders: 6, boreStrokeMm: "102 × 120" },
          { engineModel: "6BTAA5.9-G2", outputKw: 120, outputKva: 150, cylinders: 6, boreStrokeMm: "102 × 120" },
          { engineModel: "6CTA8.3-G2", outputKw: 150, outputKva: 187.5, cylinders: 6, boreStrokeMm: "114 × 135" },
          { engineModel: "6CTAA8.3-G2", outputKw: 180, outputKva: 225, cylinders: 6, boreStrokeMm: "114 × 135" },
          { engineModel: "6LTAA8.9-G2", outputKw: 200, outputKva: 250, cylinders: 6, boreStrokeMm: "114 × 145" },
          { engineModel: "6LTAA8.9-G3", outputKw: 220, outputKva: 275, cylinders: 6, boreStrokeMm: "114 × 145" },
          { engineModel: "6ZTAA13-G3", outputKw: 320, outputKva: 400, cylinders: 6, boreStrokeMm: "114 × 145" },
          { engineModel: "6ZTAA13-G4", outputKw: 400, outputKva: 500, cylinders: 6, boreStrokeMm: "114 × 145" },
          { engineModel: "QSZ13-G2", outputKw: 400, outputKva: 500, cylinders: 6, boreStrokeMm: "130 × 163" },
          { engineModel: "QSZ13-G3", outputKw: 450, outputKva: 562.5, cylinders: 6, boreStrokeMm: "130 × 163" },
        ],
      },
      {
        name: "Chongqing Cummins Series",
        models: [
          { engineModel: "NT855-GA", outputKw: 200, outputKva: 250, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "MTA11-G2", outputKw: 200, outputKva: 250, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "NTA855-G1A", outputKw: 250, outputKva: 312.5, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "MTAA11-G3", outputKw: 280, outputKva: 350, cylinders: 6, boreStrokeMm: "125 × 147" },
          { engineModel: "NTA855-G1B", outputKw: 280, outputKva: 350, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "NTA855-G2A", outputKw: 300, outputKva: 375, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "NTAA855-G7A", outputKw: 350, outputKva: 437.5, cylinders: 6, boreStrokeMm: "140 × 152" },
          { engineModel: "KTA19-G3A", outputKw: 400, outputKva: 500, cylinders: 6, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA19-G4", outputKw: 450, outputKva: 562.5, cylinders: 6, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA19-G8", outputKw: 500, outputKva: 625, cylinders: 6, boreStrokeMm: "159 × 159" },
          { engineModel: "KTAA19-G6A", outputKw: 550, outputKva: 687.5, cylinders: 6, boreStrokeMm: "159 × 159" },
          { engineModel: "KT38-GA", outputKw: 600, outputKva: 750, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA38-G2", outputKw: 650, outputKva: 812.5, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA38-G2B", outputKw: 700, outputKva: 875, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA38-G2A", outputKw: 800, outputKva: 1000, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA38-G5", outputKw: 900, outputKva: 1125, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA38-G9", outputKw: 1000, outputKva: 1250, cylinders: 12, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA50-G3", outputKw: 1100, outputKva: 1375, cylinders: 16, boreStrokeMm: "159 × 159" },
          { engineModel: "KTA50-G8", outputKw: 1200, outputKva: 1500, cylinders: 16, boreStrokeMm: "159 × 159" },
          { engineModel: "QSK50G7", outputKw: 1440, outputKva: 1800, cylinders: 16, boreStrokeMm: "159 × 190" },
          { engineModel: "QSK60G3", outputKw: 1680, outputKva: 2100, cylinders: 16, boreStrokeMm: "159 × 190" },
          { engineModel: "QSK60G4", outputKw: 1760, outputKva: 2200, cylinders: 16, boreStrokeMm: "159 × 190" },
          { engineModel: "QSK60G13", outputKw: 1840, outputKva: 2300, cylinders: 16, boreStrokeMm: "159 × 190" },
        ],
      },
    ],
  },
];

export const plannedDieselGeneratorBrands = [
  "Perkins",
  "Mitsubishi",
  "MTU",
  "Doosan",
  "Volvo",
  "Weichai",
  "Yuchai",
  "Shangchai",
];

export function getDieselGeneratorBrand(slug: string) {
  return dieselGeneratorBrands.find((brand) => brand.slug === slug);
}
