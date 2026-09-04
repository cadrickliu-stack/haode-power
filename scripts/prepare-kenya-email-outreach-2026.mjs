import fs from "node:fs";

for (const line of fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (match) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const API = "https://open.larksuite.com/open-apis";
const appToken = process.env.LARK_APP_TOKEN;
const tableId = process.env.LARK_TABLE_ID;
const verifiedDate = "2026-09-04";

if (!process.env.LARK_APP_ID || !process.env.LARK_APP_SECRET || !appToken || !tableId) {
  throw new Error("Missing Lark configuration.");
}

const previouslyCurrent = [
  "Rixing Company Ltd",
  "Generators Kenya Limited",
  "Colt Power Solutions",
  "Fastlane Engineering and Energy Limited",
  "Wilrose Engineers",
  "Schomax Ltd",
  "Clykay Water Experts",
  "Gentech Machinery Limited",
  "Kreatives Kenya",
  "Gilfield Services",
  "Steve and Robert Generators Services Ltd",
  "Flying Horse Limited",
  "Protech Industrial Equipment Ltd",
  "Davis & Shirtliff Ltd",
  "Generac Engineering Ltd",
  "PowerPoint Systems EA",
  "National Cement Company Limited",
  "Kenya Data Centre",
  "iColo (Digital Realty Kenya)",
  "Safaricom PLC",
];

const reverified = {
  "Aksa Power Generation Kenya": {
    email: "info@aksakenya.com",
    source: "https://www.aksakenya.com/en-us/world-wide-aksa",
  },
  "Atlas Copco Eastern Africa": {
    email: "PowertechniqueKE.web@atlascopco.com",
    source: "https://www.atlascopco.com/en-ke/construction-equipment/contact-us",
  },
  "Blackwood Hodge Kenya Ltd": {
    email: "blackwood@blackwoodhodge.com",
    source: "https://blackwoodhodge.com/contact-us/",
  },
  "Compression Services Group Ltd": {
    email: "sales@compressorsinkenya.com",
    source: "https://www.compressorsinkenya.com/",
  },
  "Famiar Generating Systems Limited": {
    email: "info@famiar.co.ke",
    source: "https://www.famiar.co.ke/",
  },
  "Gaston Kenya": {
    email: "info@gastonkenya.com",
    source: "https://gastonkenya.com/downloads/GastonPowerBrochure.pdf",
  },
  "Holman Brothers East Africa Limited": {
    email: "sales@holman.co.ke",
    source: "https://holman.co.ke/",
  },
  "MultiVista Kenya Ltd": {
    email: "marketing@multivista-kenya.com",
    source: "https://www.multivista-kenya.com/contact.php",
  },
  "YorPower Kenya": {
    email: "sales@yorpower.com",
    source: "https://ke.linkedin.com/showcase/yorpowerkenya/",
  },
  "Circuit Power Ltd": {
    email: "info@circuitpowerltd.net",
    source: "https://circuit-power.com/",
  },
  "Ryce East Africa Ltd": {
    email: "ryce@ryce.co.ke",
    source: "https://www.ryce.co.ke/engineering-solutions/",
  },
  "Africa Data Centres Kenya": {
    email: "enquiries@africadatacentres.com",
    source: "https://www.africadatacentres.com/nairobi/",
  },
};

const auth = await fetch(`${API}/auth/v3/tenant_access_token/internal`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    app_id: process.env.LARK_APP_ID,
    app_secret: process.env.LARK_APP_SECRET,
  }),
}).then((response) => response.json());
if (auth.code !== 0) throw new Error(`Lark authentication failed: ${auth.msg}`);

const headers = {
  Authorization: `Bearer ${auth.tenant_access_token}`,
  "Content-Type": "application/json",
};

async function api(path, init = {}) {
  const response = await fetch(API + path, { ...init, headers: { ...headers, ...init.headers } });
  const result = await response.json();
  if (result.code !== 0) throw new Error(`${path}: ${result.msg}`);
  return result.data;
}

const base = `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}`;
let fields = (await api(`${base}/fields?page_size=100`)).items;
for (const definition of [
  { field_name: "Recipient Email", type: 1 },
  { field_name: "Sent Email Subject", type: 1 },
  { field_name: "Email Campaign", type: 1 },
  { field_name: "Email Attempted At", type: 5 },
  { field_name: "Email Failure Reason", type: 1 },
]) {
  if (!fields.some((field) => field.field_name === definition.field_name)) {
    await api(`${base}/fields`, { method: "POST", body: JSON.stringify(definition) });
  }
}
fields = (await api(`${base}/fields?page_size=100`)).items;
const fieldMap = new Map(fields.map((field) => [field.field_name, field]));

const records = [];
let pageToken = "";
do {
  const query = new URLSearchParams({ page_size: "500" });
  if (pageToken) query.set("page_token", pageToken);
  const data = await api(`${base}/records?${query}`);
  records.push(...(data.items ?? []));
  pageToken = data.has_more ? data.page_token || "" : "";
} while (pageToken);

const kenyaA = records.filter(
  (record) => record.fields.Country === "Kenya" && record.fields.Priority === "A - High Priority",
);
if (kenyaA.length !== 35) throw new Error(`Safety check failed: expected 35 Kenya A leads, got ${kenyaA.length}.`);

function isBlocked(record) {
  return Boolean(
    record.fields.Status === "Do Not Contact" ||
      record.fields["Do Not Contact Reason"] ||
      record.fields["Do Not Contact"] ||
      record.fields.Unsubscribed ||
      ["Sent", "Pending", "Failed", "Delivered", "Bounced", "Complained"].includes(
        record.fields["Email Status"],
      ) ||
      record.fields["Resend Email ID"],
  );
}

function serialize(name, value) {
  const field = fieldMap.get(name);
  if (!field) throw new Error(`CRM field missing: ${name}`);
  if (field.type === 15) return { link: String(value), text: String(value) };
  if (field.type === 2 || field.type === 5) return Number(value);
  return String(value);
}

async function updateCompany(company, values) {
  const matches = kenyaA.filter((record) => record.fields.Company === company);
  if (matches.length !== 1) throw new Error(`Safety check failed for ${company}: ${matches.length} records.`);
  const record = matches[0];
  if (!/^KE-\d{8}-\d{3}$/.test(String(record.fields["Inquiry ID"]))) {
    throw new Error(`Safety check failed for ${company}: invalid Kenya lead ID.`);
  }
  if (record.fields["Duplicate Status"] !== "Unique" || isBlocked(record)) {
    throw new Error(`Safety check failed for ${company}: duplicate, suppression, or prior-attempt marker.`);
  }
  const finalEmail = String(values.Email ?? record.fields.Email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
    throw new Error(`Safety check failed for ${company}: invalid email.`);
  }
  if (!record.fields["Email Subject"] || !record.fields["Email Draft"]) {
    throw new Error(`Safety check failed for ${company}: missing subject or draft.`);
  }
  const payload = {};
  for (const [name, value] of Object.entries(values)) payload[name] = serialize(name, value);
  await api(`${base}/records/${encodeURIComponent(record.record_id)}`, {
    method: "PUT",
    body: JSON.stringify({ fields: payload }),
  });
}

for (const company of previouslyCurrent) {
  await updateCompany(company, { Status: "Ready to Contact", "Email Status": "Ready" });
}

for (const [company, evidence] of Object.entries(reverified)) {
  const record = kenyaA.find((item) => item.fields.Company === company);
  const priorSources = String(record?.fields["Research Sources"] ?? "").trim();
  await updateCompany(company, {
    Email: evidence.email,
    Status: "Ready to Contact",
    "Email Status": "Ready",
    "Contact Source URL": evidence.source,
    "Last Verified Date": verifiedDate,
    "Research Sources": `${priorSources}\nCurrent email re-verified ${verifiedDate}: ${evidence.source}`.trim(),
  });
}

console.log(
  JSON.stringify(
    {
      kenyaAReviewed: kenyaA.length,
      previouslyCurrentSetReady: previouslyCurrent.length,
      historicalEmailsReverified: Object.keys(reverified).length,
      totalSetReady: previouslyCurrent.length + Object.keys(reverified).length,
      emailsChanged: Object.entries(reverified)
        .filter(([company, evidence]) => {
          const record = kenyaA.find((item) => item.fields.Company === company);
          return String(record?.fields.Email ?? "").toLowerCase() !== evidence.email.toLowerCase();
        })
        .map(([company, evidence]) => ({ company, email: evidence.email })),
      emailSent: false,
    },
    null,
    2,
  ),
);
