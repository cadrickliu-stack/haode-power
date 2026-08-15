import {
  generatorSeriesBySlug,
  type GeneratorSeriesGroup,
  type GeneratorSpecification,
  type GeneratorSpecificationColumn,
  type GeneratorSpecificationField,
} from "@/lib/diesel-generator-specifications";

export type {
  GeneratorSeriesGroup,
  GeneratorSpecification,
  GeneratorSpecificationColumn,
  GeneratorSpecificationField,
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

const sharedFrequencySummary = "50Hz reference table; 60Hz available on request";
const sharedPowerRange = "See the complete supplied specification table";
const sharedConfigurations = "Confirmed per quotation";

export const dieselGeneratorBrands: DieselGeneratorBrand[] = [
  {
    name: "Cummins",
    slug: "cummins",
    title: "Cummins Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by Cummins engines, with complete supplied technical references organized by engine series.",
    description: "This page presents the supplied Dongfeng Cummins and Chongqing Cummins generator set references. Each row preserves the source type, output, current, engine, cylinder, bore and stroke, fuel, dimension, and weight values for model selection.",
    image: "/images/real/products/diesel-generators/brands/cummins-diesel-generator-series.webp",
    imageAlt: "Cummins-powered open diesel generator set at a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.cummins,
  },
  {
    name: "Perkins",
    slug: "perkins",
    title: "Perkins Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by Perkins engines, with complete supplied generator set and engine references for project selection.",
    description: "The specification table reproduces the supplied Perkins generator set types and technical values without assigning prime or standby ratings. Final voltage, enclosure, alternator, controller, and order scope are confirmed during quotation.",
    image: "/images/real/products/diesel-generators/brands/perkins-diesel-generator-series.webp",
    imageAlt: "Perkins-powered open diesel generator set in a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.perkins,
  },
  {
    name: "Volvo",
    slug: "volvo",
    title: "Volvo Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by Volvo engines, with supplied model-by-model technical references for project selection.",
    description: "The table presents each supplied Volvo generator set type and its corresponding engine and technical values. Project-specific electrical configuration, enclosure, and accessories are confirmed before quotation.",
    image: "/images/real/products/diesel-generators/brands/volvo-diesel-generator-series.webp",
    imageAlt: "Volvo-powered open diesel generator set prepared for testing",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.volvo,
  },
  {
    name: "MTU",
    slug: "mtu",
    title: "MTU Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by MTU engines, organized into the supplied MTU 1600, 2000, and 4000 Series groups.",
    description: "Each MTU series remains separate so customers can review the supplied generator set types and technical values within the correct engine family. Final project configuration is confirmed during quotation.",
    image: "/images/real/products/diesel-generators/brands/mtu-diesel-generator-series.webp",
    imageAlt: "MTU-powered open diesel generator set in a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.mtu,
  },
  {
    name: "Yuchai",
    slug: "yuchai",
    title: "Yuchai Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by Yuchai engines, with supplied generator set types and complete technical reference columns.",
    description: "This table preserves the supplied Yuchai values, including separate bore and stroke fields and repeated engine models at different outputs. No prime or standby rating is inferred from the source output values.",
    image: "/images/real/products/diesel-generators/brands/yuchai-diesel-generator-series.webp",
    imageAlt: "Yuchai-powered open diesel generator set in a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.yuchai,
  },
  {
    name: "Weichai",
    slug: "weichai",
    title: "Weichai Diesel Generator Series",
    shortDescription: "Diesel generator references organized into all supplied Weichai Standard, Huafeng, Yang Chai, Deutz, Land King, and Baudouin groups.",
    description: "The source grouping is retained throughout this page rather than combining different engine families. Groups with an Oil Capacity field display that additional source column alongside the other supplied technical values.",
    image: "/images/real/products/diesel-generators/brands/weichai-diesel-generator-series.webp",
    imageAlt: "Weichai diesel generator series product at a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.weichai,
  },
  {
    name: "SDEC (Shangchai)",
    slug: "sdec-shangchai",
    title: "SDEC (Shangchai) Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by SDEC (Shangchai) engines, with the supplied model-by-model technical references.",
    description: "The specification table shows the supplied SDEC (Shangchai) generator set types and technical values directly, including repeated outputs paired with different engine models. Final configuration is confirmed per quotation.",
    image: "/images/real/products/diesel-generators/brands/sdec-shangchai-diesel-generator-series.webp",
    imageAlt: "SDEC Shangchai-powered open diesel generator set in a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug["sdec-shangchai"],
  },
  {
    name: "Doosan",
    slug: "doosan",
    title: "Doosan Diesel Generator Series",
    shortDescription: "Diesel generator sets powered by Doosan engines, with all supplied generator set types and technical values retained.",
    description: "Every source row is presented as supplied, including values that may require order-stage confirmation. The page does not recalculate, correct, or reinterpret the published output columns.",
    image: "/images/real/products/diesel-generators/brands/doosan-diesel-generator-series.webp",
    imageAlt: "Doosan-powered open diesel generator set in a manufacturing facility",
    frequencySummary: sharedFrequencySummary,
    powerRange: sharedPowerRange,
    configurations: sharedConfigurations,
    seriesGroups: generatorSeriesBySlug.doosan,
  },
];

export const plannedDieselGeneratorBrands = ["Mitsubishi"];

export function getDieselGeneratorBrand(slug: string) {
  return dieselGeneratorBrands.find((brand) => brand.slug === slug);
}
