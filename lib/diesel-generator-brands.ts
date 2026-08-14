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

type SpecificationRow = [
  engineModel: string,
  outputKw: number,
  outputKva: number,
  cylinders: number,
  boreStrokeMm: string,
];

function specifications(rows: SpecificationRow[]): GeneratorSpecification[] {
  return rows.map(
    ([engineModel, outputKw, outputKva, cylinders, boreStrokeMm]) => ({
      engineModel,
      outputKw,
      outputKva,
      cylinders,
      boreStrokeMm,
    }),
  );
}

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
  {
    name: "Perkins",
    slug: "perkins",
    title: "Perkins Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by Perkins engines, with confirmed 50Hz engine and output references for project selection.",
    description:
      "This series pairs Perkins engines with generator set configurations selected for the required site and electrical conditions. The table publishes only the supplied 50Hz engine, output, cylinder, and bore-and-stroke references; the final alternator, controller, enclosure, and order scope are confirmed before quotation.",
    image:
      "/images/real/products/diesel-generators/brands/perkins-diesel-generator-series.webp",
    imageAlt: "Perkins-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "8.75–2250 kVA (50Hz reference)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Perkins Engine Series",
        models: specifications([
          ["403A-11G1", 7, 8.75, 3, "77 × 87"],
          ["403D-11G", 8, 10, 3, "77 × 81"],
          ["403A-15G1", 10, 12.5, 3, "84 × 90"],
          ["403D-15G", 11, 13.75, 3, "84 × 90"],
          ["403A-15G2", 12, 15, 3, "84 × 90"],
          ["404A-22G1", 16, 20, 4, "84 × 100"],
          ["404D-22G", 16, 20, 4, "84 × 100"],
          ["1103A-33G", 24, 30, 3, "105 × 127"],
          ["1103A-33TG1", 36, 45, 3, "105 × 127"],
          ["1104A-44TG1", 50, 62.5, 4, "105 × 127"],
          ["1103A-33TG2", 50, 62.5, 3, "105 × 127"],
          ["1104A-44TG2", 64, 80, 4, "105 × 127"],
          ["1104C-44TAG1", 64, 80, 4, "100 × 127"],
          ["1104C-44TAG2", 80, 100, 4, "100 × 127"],
          ["1106A-70TG1", 110, 137.5, 6, "100 × 120"],
          ["1106A-70TAG2", 120, 150, 6, "105 × 135"],
          ["1106A-70TAG3", 140, 175, 6, "105 × 135"],
          ["1106A-70TAG4", 160, 200, 6, "105 × 135"],
          ["1306A-E87TAG4", 180, 225, 6, "116 × 136"],
          ["1506A-E88TAG2", 180, 225, 6, "112 × 149"],
          ["1306A-E87TAG6", 200, 250, 6, "116 × 136"],
          ["1506A-E88TAG3", 200, 250, 6, "112 × 149"],
          ["1606A-E93TAG4", 220, 275, 6, "116 × 136"],
          ["1506A-E88TAG4", 220, 275, 6, "112 × 149"],
          ["1606A-E93TAG5", 240, 300, 6, "116 × 136"],
          ["1506A-E88TAG5", 240, 300, 6, "112 × 149"],
          ["2206C-E13TAG2", 280, 350, 6, "130 × 157"],
          ["2206C-E13TAG3", 320, 400, 6, "130 × 157"],
          ["2506C-E15TAG1", 360, 450, 6, "137 × 171"],
          ["2506C-E15TAG2", 400, 500, 6, "137 × 171"],
          ["2806C-E18TAG1A", 480, 600, 6, "145 × 183"],
          ["2806A-E18TAG2", 520, 650, 6, "145 × 183"],
          ["4006-23TAG2A", 600, 750, 6, "160 × 190"],
          ["4006-23TAG3A", 640, 800, 6, "160 × 190"],
          ["4008TAG1A", 720, 900, 8, "160 × 190"],
          ["4008TAG2A", 800, 1000, 8, "160 × 190"],
          ["4012-46TWG2A", 1000, 1250, 12, "160 × 190"],
          ["4012-46TWG3A", 1100, 1375, 12, "160 × 190"],
          ["4012-46TAG2A", 1200, 1500, 12, "160 × 190"],
          ["4012-46TAG3A", 1360, 1700, 12, "160 × 190"],
          ["4016TAG1A", 1480, 1850, 16, "160 × 190"],
          ["4016TAG2A", 1600, 2000, 16, "160 × 190"],
          ["4016-61TRG3", 1800, 2250, 16, "160 × 190"],
        ]),
      },
    ],
  },
  {
    name: "Volvo",
    slug: "volvo",
    title: "Volvo Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by Volvo engines, with confirmed 50Hz engine and output references for project selection.",
    description:
      "This series uses Volvo engines for generator set projects requiring a clearly documented engine and output reference. Published values are limited to the supplied 50Hz data, while the final electrical configuration, enclosure, and project scope are confirmed for each quotation.",
    image:
      "/images/real/products/diesel-generators/brands/volvo-diesel-generator-series.webp",
    imageAlt: "Volvo-powered open diesel generator set prepared for testing",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "85–687.5 kVA (50Hz reference)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Volvo Engine Series",
        models: specifications([
          ["TAD530GE", 68, 85, 4, "108 × 130"],
          ["TAD531GE", 88, 110, 4, "108 × 130"],
          ["TAD532GE", 112, 140, 4, "108 × 130"],
          ["TAD731GE", 128, 160, 6, "108 × 130"],
          ["TAD732GE", 160, 200, 6, "108 × 130"],
          ["TAD733GE", 180, 225, 6, "108 × 130"],
          ["TAD734GE", 200, 250, 6, "108 × 130"],
          ["TAD734GE", 220, 275, 6, "108 × 130"],
          ["TAD1341GE", 280, 350, 6, "131 × 158"],
          ["TAD1342GE", 300, 375, 6, "131 × 158"],
          ["TAD1343GE", 320, 400, 6, "131 × 158"],
          ["TAD1344GE", 350, 437.5, 6, "131 × 158"],
          ["TAD1345GE", 400, 500, 6, "131 × 158"],
          ["TAD1641GE", 440, 550, 6, "144 × 165"],
          ["TAD1642GE", 480, 600, 6, "144 × 165"],
          ["TWD1643GE", 500, 625, 6, "144 × 165"],
          ["TWD1643GE", 550, 687.5, 6, "144 × 165"],
        ]),
      },
    ],
  },
  {
    name: "MTU",
    slug: "mtu",
    title: "MTU Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by MTU engines, organized into confirmed 1600, 2000, and 4000 Series 50Hz references.",
    description:
      "This generator range uses MTU engines across the 1600, 2000, and 4000 Series. The first published table contains only the supplied 50Hz engine and output references; final electrical equipment, enclosure, and order-specific configuration are confirmed during quotation.",
    image:
      "/images/real/products/diesel-generators/brands/mtu-diesel-generator-series.webp",
    imageAlt: "MTU-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "275–3125 kVA (50Hz reference)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "MTU 1600 Series",
        models: specifications([
          ["6R1600G10F", 220, 275, 6, "122 × 150"],
          ["6R1600G20F", 250, 312.5, 6, "122 × 150"],
          ["8V1600G10F", 300, 375, 8, "122 × 150"],
          ["8V1600G20F", 320, 400, 8, "122 × 150"],
          ["10V1600G10F", 360, 450, 10, "122 × 150"],
          ["10V1600G20F", 400, 500, 10, "122 × 150"],
          ["12V1600G10F", 480, 600, 12, "122 × 150"],
          ["12V1600G20F", 500, 625, 12, "122 × 150"],
        ]),
      },
      {
        name: "MTU 2000 Series",
        models: specifications([
          ["12V2000G25", 550, 687.5, 12, "130 × 150"],
          ["12V2000G65", 630, 787.5, 12, "130 × 150"],
          ["16V2000G25", 800, 1000, 16, "130 × 150"],
          ["16V2000G65", 880, 1100, 16, "130 × 150"],
          ["18V2000G65", 1000, 1250, 18, "130 × 150"],
        ]),
      },
      {
        name: "MTU 4000 Series",
        models: specifications([
          ["12V4000G21R", 1100, 1375, 12, "165 × 190"],
          ["12V4000G23R", 1200, 1500, 12, "170 × 210"],
          ["12V4000G23", 1400, 1750, 12, "170 × 210"],
          ["12V4000G63", 1500, 1875, 12, "170 × 210"],
          ["16V4000G23", 1760, 2200, 16, "170 × 210"],
          ["16V4000G63", 1900, 2375, 16, "170 × 210"],
          ["20V4000G23", 2200, 2750, 20, "170 × 210"],
          ["20V4000G63", 2400, 3000, 20, "170 × 210"],
          ["20V4000G63L", 2400, 3125, 20, "170 × 210"],
        ]),
      },
    ],
  },
  {
    name: "Yuchai",
    slug: "yuchai",
    title: "Yuchai Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by Yuchai engines, with confirmed 50Hz engine and output references for project selection.",
    description:
      "This series uses Yuchai engines across a wide selection of generator output combinations. The table publishes the supplied 50Hz engine, output, cylinder, and bore-and-stroke references without assigning prime or standby ratings; the final generator set scope is confirmed before quotation.",
    image:
      "/images/real/products/diesel-generators/brands/yuchai-diesel-generator-series.webp",
    imageAlt: "Yuchai-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "22.5–2000 kVA (50Hz reference)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Yuchai Engine Series",
        models: specifications([
          ["YC2108D", 18, 22.5, 2, "108 × 120"],
          ["YC2115D", 24, 30, 2, "115 × 120"],
          ["YC2115ZD", 30, 37.5, 2, "108 × 115"],
          ["YC4D60-D21", 40, 50, 4, "108 × 115"],
          ["YC4D85Z-D20", 50, 62.5, 4, "108 × 115"],
          ["YC4D90Z-D20", 60, 75, 4, "108 × 115"],
          ["YC4A100Z-D20", 64, 80, 4, "108 × 125"],
          ["YC6B135Z-D20", 90, 112.5, 6, "108 × 125"],
          ["YC6B155L-D21", 100, 125, 6, "108 × 125"],
          ["YC6B180L-D20", 120, 150, 6, "108 × 132"],
          ["YC6A200L-D20", 132, 165, 6, "108 × 132"],
          ["YC6A230L-D20", 150, 187.5, 6, "108 × 132"],
          ["YC6G245L-D20", 160, 200, 6, "112 × 132"],
          ["YC6M350L-D20", 200, 250, 6, "120 × 145"],
          ["YC6MK420L-D20", 250, 312.5, 6, "123 × 145"],
          ["YC6MK420L-D20", 280, 350, 6, "123 × 145"],
          ["YC6MJ480L-D20", 300, 375, 6, "131 × 145"],
          ["YC6MJ480L-D20", 320, 400, 6, "131 × 145"],
          ["YC6T550L-D21", 350, 437.5, 6, "145 × 165"],
          ["YC6T600L-D22", 400, 500, 6, "145 × 165"],
          ["YC6T660L-D20", 440, 550, 6, "145 × 165"],
          ["YC6T700L-D20", 460, 575, 6, "145 × 165"],
          ["YC6TD780L-D20", 500, 625, 6, "145 × 165"],
          ["YC6TD840L-D20", 550, 687.5, 6, "200 × 210"],
          ["YC6C1020L-D20", 650, 812.5, 6, "200 × 210"],
          ["YC6C1070L-D20", 700, 875, 6, "200 × 210"],
          ["YC6C1220L-D20", 800, 1000, 6, "200 × 210"],
          ["YC6C1320L-D20", 880, 1100, 6, "200 × 210"],
          ["YC12VC1680L-D20", 1000, 1250, 12, "200 × 210"],
          ["YC12VC1680L-D20", 1100, 1375, 12, "200 × 210"],
          ["YC12VC2070L-D20", 1200, 1500, 12, "200 × 210"],
          ["YC12VC2070L-D20", 1320, 1650, 12, "200 × 210"],
          ["YC12VC2270L-D20", 1500, 1875, 12, "200 × 210"],
          ["YC12VC2510L-D20", 1600, 2000, 12, "200 × 210"],
        ]),
      },
    ],
  },
  {
    name: "Weichai",
    slug: "weichai",
    title: "Weichai Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by confirmed Weichai Standard engines, using a conservative 50Hz reference for initial selection.",
    description:
      "The first Weichai page is intentionally limited to rows clearly identified as Weichai Standard in the supplied material. Sub-series with uncertain brand ownership and engine-model characters that require source confirmation are not published in this first version.",
    image:
      "/images/real/products/diesel-generators/brands/weichai-diesel-generator-series.webp",
    imageAlt: "Weichai-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "18.7–187.5 kVA (published 50Hz references)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Weichai Standard Series",
        models: specifications([
          ["k4100D", 15, 18.7, 4, "100 × 115"],
          ["k4100D", 20, 25, 4, "100 × 115"],
          ["k4100D", 24, 30, 4, "100 × 115"],
          ["k4100D", 30, 37.5, 4, "100 × 115"],
          ["K4100ZD", 40, 50, 4, "100 × 115"],
          ["R4105ZD", 50, 62.5, 4, "105 × 115"],
          ["R6105ZD", 75, 93.75, 6, "105 × 115"],
          ["R6105AZLD", 100, 125, 6, "105 × 115"],
          ["6113AZLD", 150, 187.5, 6, "113 × 115"],
        ]),
      },
    ],
  },
  {
    name: "SDEC (Shangchai)",
    slug: "sdec-shangchai",
    title: "SDEC (Shangchai) Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by SDEC (Shangchai) engines, with confirmed 50Hz engine and output references shown in the selection table.",
    description:
      "This series uses SDEC (Shangchai) engines for generator set projects. No promotional power range is assigned to the series: the supplied 50Hz engine and output combinations are shown directly, and the final electrical and mechanical configuration is confirmed before quotation.",
    image:
      "/images/real/products/diesel-generators/brands/sdec-shangchai-diesel-generator-series.webp",
    imageAlt: "SDEC Shangchai-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "See published 50Hz output table",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "SDEC (Shangchai) Engine Series",
        models: specifications([
          ["SC4H95D2", 50, 62.5, 4, "105 × 124"],
          ["SC4H115D2", 75, 93.75, 4, "105 × 124"],
          ["SC4H160D2", 100, 125, 4, "105 × 124"],
          ["SC4H180D2", 120, 150, 4, "105 × 124"],
          ["SC7H230D2", 150, 187.5, 6, "105 × 124"],
          ["SC7H250D2", 170, 212.5, 6, "105 × 124"],
          ["SC8D280D2", 180, 225, 6, "114 × 135"],
          ["SC9D310D2", 200, 250, 6, "114 × 144"],
          ["SC9D340D2", 220, 275, 6, "114 × 144"],
          ["SC13G355D2", 250, 312.5, 6, "135 × 150"],
          ["SC13G420D2", 250, 312.5, 6, "135 × 150"],
          ["SC13G420D2", 300, 375, 6, "135 × 150"],
          ["SC12E460D2", 300, 375, 6, "128 × 153"],
          ["SC15G500D2", 320, 400, 6, "135 × 165"],
          ["SC15G500D2", 350, 437.5, 6, "135 × 165"],
          ["SC25G610D2", 400, 500, 12, "135 × 150"],
          ["SC25G690D2", 450, 562.5, 12, "135 × 150"],
          ["SC27G755D2", 500, 625, 12, "135 × 155"],
          ["SC27G830D2", 550, 687.5, 12, "135 × 155"],
          ["SC27G900D2", 600, 750, 12, "135 × 155"],
          ["SC33W990D2", 660, 825, 6, "180 × 215"],
          ["SC33W1150D", 800, 1000, 6, "180 × 215"],
        ]),
      },
    ],
  },
  {
    name: "Doosan",
    slug: "doosan",
    title: "Doosan Diesel Generator Series",
    shortDescription:
      "Diesel generator sets powered by Doosan engines, with confirmed 50Hz references and one inconsistent source row intentionally excluded.",
    description:
      "This series uses Doosan engines for generator set projects across the supplied 50Hz output combinations. Only internally consistent engine and output rows are published; final electrical equipment, enclosure, and order configuration are confirmed before quotation.",
    image:
      "/images/real/products/diesel-generators/brands/doosan-diesel-generator-series.webp",
    imageAlt: "Doosan-powered open diesel generator set in a manufacturing facility",
    frequencySummary: "50Hz reference available; 60Hz table pending",
    powerRange: "62.5–812.5 kVA (published 50Hz references)",
    configurations: "Confirmed per quotation",
    seriesGroups: [
      {
        name: "Doosan Engine Series",
        models: specifications([
          ["DB58", 50, 62.5, 6, "102 × 118"],
          ["D1146", 64, 80, 6, "111 × 139"],
          ["D1146", 75, 93.7, 6, "111 × 139"],
          ["D1146T", 100, 125, 6, "111 × 139"],
          ["DP086TA", 120, 150, 6, "111 × 139"],
          ["DP086TA", 132, 165, 6, "111 × 139"],
          ["P086TI", 180, 225, 6, "111 × 139"],
          ["DP086LA", 200, 250, 6, "111 × 139"],
          ["P126TI", 220, 275, 6, "123 × 155"],
          ["P126TT", 240, 300, 6, "123 × 155"],
          ["P126TI-II", 260, 325, 6, "123 × 155"],
          ["P158LE-1", 300, 375, 8, "128 × 142"],
          ["P158LE-1", 320, 400, 8, "128 × 142"],
          ["P158LE", 350, 437.5, 8, "128 × 142"],
          ["P158LE-S", 400, 500, 8, "128 × 142"],
          ["P180LE", 440, 550, 10, "128 × 142"],
          ["P222LE-1", 500, 625, 12, "128 × 142"],
          ["P222LE-S", 550, 687.5, 12, "128 × 142"],
          ["P222LE-II", 600, 750, 12, "128 × 142"],
          ["P222FE-II", 650, 812.5, 12, "128 × 142"],
        ]),
      },
    ],
  },
];

export const plannedDieselGeneratorBrands = [
  "Mitsubishi",
];

export function getDieselGeneratorBrand(slug: string) {
  return dieselGeneratorBrands.find((brand) => brand.slug === slug);
}
