export type CookieChoice = "accepted" | "rejected";

export const CONSENT_COOKIE = "haode_cookie_consent";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60;
export const OPEN_COOKIE_SETTINGS = "haode:cookie-settings";

export function readCookieChoice(): CookieChoice | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie.split("; ").find((part) => part.startsWith(CONSENT_COOKIE + "="))?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

export function consentState(choice: CookieChoice | null) {
  return {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

// Runs before any Google script/config/event, including on returning visits.
export const CONSENT_BOOTSTRAP =
  "window.dataLayer=window.dataLayer||[];" +
  "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};" +
  "window.gtag('consent','default'," + JSON.stringify(consentState(null)) + ");";

export function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((item) => item.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name.startsWith("_gat"));
  const host = window.location.hostname.split(".");
  const domains = ["", ...host.map((_, i) => "; Domain=" + host.slice(i).join("."))];
  const parts = window.location.pathname.split("/");
  const paths = new Set(["/", ...parts.map((_, i) => parts.slice(0, i + 1).join("/") || "/")]);
  for (const name of names) {
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = name + "=; Max-Age=0; Path=" + path + domain + "; SameSite=Lax";
      }
    }
  }
}

export function updateCookieConsent(choice: CookieChoice | null) {
  window.gtag?.("consent", "update", consentState(choice));
  if (choice !== "accepted") clearAnalyticsCookies();
}

export function saveCookieChoice(choice: CookieChoice) {
  document.cookie = CONSENT_COOKIE + "=" + choice + "; Path=/; Max-Age=" + CONSENT_MAX_AGE +
    "; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  updateCookieConsent(choice);
}

