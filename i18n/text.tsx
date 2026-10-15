import { cloneElement, isValidElement, type ReactNode } from "react";
import common from "./messages/common.json";
import content from "./messages/content.json";
import products from "./messages/products.json";
import privacy from "./messages/privacy.json";
import specifications from "./messages/specifications.json";
import brands from "./messages/brands.json";

export type Locale = "en" | "ru" | "es";
type Dictionary = Record<string, string[]>;
const dictionary: Dictionary = { ...common, ...content, ...products, ...privacy, ...specifications, ...brands };
for (const brand of ["Cummins", "Perkins", "Volvo", "MTU", "Yuchai", "Weichai", "SDEC (Shangchai)", "Doosan"]) {
  dictionary[`${brand} Diesel Generator Series`] = [`Серия дизельных электростанций ${brand}`, `Serie de grupos electrógenos diésel ${brand}`];
  dictionary[`${brand} Diesel Generators & Generator Sets`] = [`Дизельные электростанции ${brand} — модели и характеристики`, `Grupos electrógenos diésel ${brand} — modelos y especificaciones`];
  dictionary[`Explore ${brand} diesel generator sets with engine models, output data, dimensions, weight, and technical references for industrial and commercial power projects.`] = [`ДГУ ${brand}: модели двигателей, мощность, габариты, масса и технические данные для промышленных и коммерческих объектов.`, `Explore grupos electrógenos ${brand}: motores, potencia, dimensiones, peso y referencias técnicas para proyectos industriales y comerciales.`];
  for (const ending of ["at a manufacturing facility", "in a manufacturing facility", "prepared for testing"]) {
    dictionary[`${brand}-powered open diesel generator set ${ending}`] = [`ДГУ открытого исполнения с двигателем ${brand} на производстве`, `Grupo electrógeno abierto con motor ${brand} en planta`];
  }
}
for (const model of ["BMA4000", "BMN4000", "BMNVH1600", "4HVP1600M"]) {
  dictionary[`${model} Mobile Light Tower`] = [`Передвижная осветительная мачта ${model}`, `Torre de iluminación móvil ${model}`];
}
for (const group of ["Dongfeng Cummins", "Chongqing Cummins", "MTU 1600", "MTU 2000", "MTU 4000", "Weichai Standard", "Weichai Huafeng", "Weichai Yang Chai", "Weichai Deutz", "Weichai Land King", "Weichai Baudouin"]) {
  dictionary[`${group} Series`] = [`Серия ${group}`, `Serie ${group}`];
}
for (const brand of ["Perkins", "Volvo", "Yuchai", "SDEC (Shangchai)", "Doosan"]) {
  dictionary[`${brand} Engine Series`] = [`Серия двигателей ${brand}`, `Serie de motores ${brand}`];
}
for (const industry of ["Mining", "Construction", "Oil & Gas", "Rental", "Infrastructure"]) {
  dictionary[`${industry} industry power solutions`] = [`Энергетические решения: ${dictionary[industry][0]}`, `Soluciones de energía: ${dictionary[industry][1]}`];
}
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

/** Exact, reviewed source-text dictionaries. Model numbers and numeric data are never converted. */
export function text(value: string, locale: string): string {
  if (locale === "en") return value;
  const key = normalize(value);
  const entry = dictionary[key];
  if (entry) return (value.match(/^\s+/)?.[0] || "") + entry[locale === "ru" ? 0 : 1] + (value.match(/\s+$/)?.[0] || "");
  const numbered = key.match(/^(\d+\. )(.+)$/);
  if (numbered && dictionary[numbered[2]]) return numbered[1] + text(numbered[2], locale);
  const unitHeading = key.match(/^(.+) (\(.+\))$/);
  if (unitHeading && dictionary[unitHeading[1]]) return text(unitHeading[1], locale) + " " + unitHeading[2];
  const references = key.match(/^(\d+) references$/);
  if (references) return `${references[1]} ${locale === "ru" ? "вариантов" : "referencias"}`;
  return value;
}

/** Localize JSX before rendering (server and client), never by mutating the DOM.
 * Only display text is translated: URLs, form values, event handlers and technical data stay intact.
 * Each UI component localizes its own output; client/server component boundaries stay unchanged.
 */
export function localizeNode(node: ReactNode, locale: string): ReactNode {
  if (locale === "en") return node;
  if (typeof node === "string") return text(node, locale);
  if (Array.isArray(node)) return node.map((child) => localizeNode(child, locale));
  if (!isValidElement<Record<string, unknown>>(node)) return node;
  if (node.type === "script" || node.type === "style") return node;
  const props: Record<string, unknown> = {};
  for (const key of ["title", "alt", "imageAlt", "placeholder", "aria-label", "description", "eyebrow"]) {
    if (typeof node.props[key] === "string") props[key] = text(node.props[key] as string, locale);
  }
  if (node.props.children !== undefined) props.children = localizeNode(node.props.children as ReactNode, locale);
  return cloneElement(node, props);
}

export function localizedPath(path: string, locale: string) {
  return locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;
}
