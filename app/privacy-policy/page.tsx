import type { Metadata } from "next";

const title = "Privacy Policy | HAODE Power";
const description = "Read the HAODE Power Privacy Policy to learn how we collect, use, protect and manage personal information submitted through our website.";
const url = "https://www.haodepower.com/privacy-policy";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const contents = [
  {
    "id": "section-1",
    "title": "Information You Provide"
  },
  {
    "id": "section-2",
    "title": "Information Collected Automatically"
  },
  {
    "id": "section-3",
    "title": "How We Use Information"
  },
  {
    "id": "section-4",
    "title": "Google Analytics and Website Measurement"
  },
  {
    "id": "section-5",
    "title": "Cookies and Similar Technologies"
  },
  {
    "id": "section-6",
    "title": "Sharing of Information"
  },
  {
    "id": "section-7",
    "title": "International Data Transfers"
  },
  {
    "id": "section-8",
    "title": "Data Retention"
  },
  {
    "id": "section-9",
    "title": "Data Security"
  },
  {
    "id": "section-10",
    "title": "Your Privacy Rights"
  },
  {
    "id": "section-11",
    "title": "Sale of Personal Information"
  },
  {
    "id": "section-12",
    "title": "Third-Party Services and Children’s Privacy"
  },
  {
    "id": "section-13",
    "title": "Changes to This Policy"
  },
  {
    "id": "section-14",
    "title": "Contact Us"
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="container-wide">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">HAODE Power · Legal</p>
          <h1 className="mt-4 font-display text-5xl font-800 tracking-tight text-white sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 text-sm text-white/75">Last Updated: <time dateTime="2026-09-21">September 21, 2026</time></p>
        </div>
      </section>
      <div className="container-wide grid gap-10 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <aside>
          <nav aria-label="Privacy policy contents" className="border-l-2 border-orange-500 pl-5 lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-navy-900">On this page</p>
            <ol className="grid gap-2 text-sm leading-6 text-steel-600 sm:grid-cols-2 lg:grid-cols-1">
              {contents.map((item, index) => (
                <li key={item.id}><a href={`#${item.id}`} className="focus-ring hover:text-orange-600">{index + 1}. {item.title}</a></li>
              ))}
            </ol>
          </nav>
        </aside>
        <article aria-label="Privacy policy" className="min-w-0 max-w-3xl space-y-9 text-base leading-8 text-steel-600 [overflow-wrap:anywhere]">
          <div className="space-y-4">
            <p>Changzhou Haode Electromechanical Technology Co., Ltd. (“HAODE Power”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide when visiting our website at <a href="https://www.haodepower.com" className="focus-ring text-navy-900 underline decoration-orange-500 underline-offset-4">www.haodepower.com</a>.</p>
            <p>This Privacy Policy explains what information we may collect, how we use it, how it may be shared, and the choices and rights available to you.</p>
          </div>
        <section id="section-1" aria-labelledby="section-1-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-1-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">1. Information You Provide</h2>
          <div className="space-y-4">
            <p>{"We may collect information that you voluntarily provide to us when you contact us, submit an inquiry, request a quotation, or communicate with us through our website."}</p>
            <p>{"This information may include:"}</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>{"Your name"}</li>
              <li>{"Company name"}</li>
              <li>{"Email address"}</li>
              <li>{"Telephone or WhatsApp number"}</li>
              <li>{"Country or region"}</li>
              <li>{"Product interests"}</li>
              <li>{"Project or purchasing requirements"}</li>
              <li>{"Information contained in your inquiry or message"}</li>
            </ul>
            <p>{"You are not required to provide personal information simply to browse our website."}</p>
          </div>
        </section>
        <section id="section-2" aria-labelledby="section-2-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-2-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">2. Information Collected Automatically</h2>
          <div className="space-y-4">
            <p>{"We may also automatically collect certain technical and usage information when you visit the website, including:"}</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>{"Browser and device information"}</li>
              <li>{"General geographic information"}</li>
              <li>{"Pages visited"}</li>
              <li>{"Referring pages or websites"}</li>
              <li>{"Time and duration of visits"}</li>
              <li>{"Website interactions and navigation activity"}</li>
              <li>{"Analytics identifiers and cookie-related information"}</li>
            </ul>
          </div>
        </section>
        <section id="section-3" aria-labelledby="section-3-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-3-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">3. How We Use Information</h2>
          <div className="space-y-4">
            <p>{"We may use the information we collect to:"}</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>{"Respond to inquiries and quotation requests"}</li>
              <li>{"Provide product and technical information"}</li>
              <li>{"Communicate with prospective and existing customers"}</li>
              <li>{"Prepare quotations and commercial proposals"}</li>
              <li>{"Understand customer requirements"}</li>
              <li>{"Provide sales and after-sales support"}</li>
              <li>{"Improve our website, products, and services"}</li>
              <li>{"Measure website performance and visitor interactions"}</li>
              <li>{"Protect our website against misuse, fraud, or security threats"}</li>
              <li>{"Comply with applicable legal and regulatory requirements"}</li>
            </ul>
            <p>{"We do not use information submitted through our inquiry forms for purposes unrelated to legitimate business communication without an appropriate legal basis or permission where required."}</p>
          </div>
        </section>
        <section id="section-4" aria-labelledby="section-4-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-4-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">4. Google Analytics and Website Measurement</h2>
          <div className="space-y-4">
            <p>{"We use Google Analytics 4 (GA4) to understand how visitors use our website and to improve its performance and usability."}</p>
            <p>{"Google Analytics may collect information such as device and browser information, website interactions, pages visited, approximate geographic information, and identifiers associated with analytics cookies."}</p>
            <p>{"We also measure certain website interactions, including page visits and clicks on quotation, WhatsApp, telephone, and email contact options."}</p>
            <p>{"Our analytics implementation is designed to avoid intentionally sending information such as your name, email address, telephone number, WhatsApp number, company name, or inquiry message to Google Analytics."}</p>
            <p>{"Google processes Analytics data in accordance with its own privacy policies and terms."}</p>
            <p>{"Visitors may control or delete cookies through their browser settings. Google also provides tools and settings that may allow users to limit Google Analytics measurement."}</p>
          </div>
        </section>
        <section id="section-5" aria-labelledby="section-5-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-5-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">5. Cookies and Similar Technologies</h2>
          <div className="space-y-4">
            <p>{"Our website may use cookies and similar technologies to support website functionality, understand website usage, and measure website performance."}</p>
            <p>{"Cookies are small data files stored on your device or browser."}</p>
            <p>{"Depending on your location and applicable law, you may have the right to accept, reject, or manage certain categories of cookies."}</p>
            <p>{"You can also control cookies through your browser settings. Disabling certain cookies may affect some website functionality."}</p>
            <p>{"Where consent is legally required for analytics or similar technologies, appropriate consent mechanisms may be provided."}</p>
          </div>
        </section>
        <section id="section-6" aria-labelledby="section-6-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-6-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">6. Sharing of Information</h2>
          <div className="space-y-4">
            <p>{"We do not sell personal information provided to us through our website."}</p>
            <p>{"We may share limited information with service providers that help us operate our website and conduct legitimate business activities, including:"}</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>{"Website hosting and infrastructure providers"}</li>
              <li>{"Website analytics providers"}</li>
              <li>{"Email and communication service providers"}</li>
              <li>{"CRM and inquiry-management service providers"}</li>
              <li>{"IT, security, and technical service providers"}</li>
              <li>{"Logistics or business partners when necessary to respond to a specific customer request"}</li>
            </ul>
            <p>{"These providers may process information only as necessary to provide their respective services and subject to their applicable contractual and legal obligations."}</p>
            <p>{"We may also disclose information where required by law, regulation, legal process, or a lawful request from a competent authority."}</p>
          </div>
        </section>
        <section id="section-7" aria-labelledby="section-7-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-7-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">7. International Data Transfers</h2>
          <div className="space-y-4">
            <p>{"HAODE Power operates from China and serves customers internationally."}</p>
            <p>{"When you contact us from another country or region, your information may be processed in China or in other jurisdictions where our technology and service providers operate."}</p>
            <p>{"Where required by applicable law, we will take appropriate measures regarding international transfers of personal information."}</p>
          </div>
        </section>
        <section id="section-8" aria-labelledby="section-8-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-8-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">8. Data Retention</h2>
          <div className="space-y-4">
            <p>{"We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including responding to inquiries, maintaining business records, managing customer relationships, resolving disputes, and complying with legal obligations."}</p>
            <p>{"Retention periods may vary depending on the nature of the information and the purpose for which it was collected."}</p>
          </div>
        </section>
        <section id="section-9" aria-labelledby="section-9-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-9-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">9. Data Security</h2>
          <div className="space-y-4">
            <p>{"We use reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, loss, or misuse."}</p>
            <p>{"Our website uses HTTPS encryption for information transmitted between your browser and our website."}</p>
            <p>{"However, no Internet transmission or electronic storage system can be guaranteed to be completely secure."}</p>
          </div>
        </section>
        <section id="section-10" aria-labelledby="section-10-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-10-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">10. Your Privacy Rights</h2>
          <div className="space-y-4">
            <p>{"Depending on your country or region, applicable privacy laws may provide certain rights regarding your personal information."}</p>
            <p>{"These may include the right to:"}</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-orange-600">
              <li>{"Request access to your personal information"}</li>
              <li>{"Request correction of inaccurate information"}</li>
              <li>{"Request deletion of certain personal information"}</li>
              <li>{"Object to or restrict certain processing"}</li>
              <li>{"Withdraw consent where processing is based on consent"}</li>
              <li>{"Request information about how your personal information is used or shared"}</li>
              <li>{"Exercise other rights available under applicable privacy laws"}</li>
            </ul>
            <p>{"These rights may be subject to applicable legal requirements, limitations, and exceptions."}</p>
            <p>{"To exercise an applicable privacy right, please contact us using the details provided below."}</p>
          </div>
        </section>
        <section id="section-11" aria-labelledby="section-11-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-11-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">11. Sale of Personal Information</h2>
          <div className="space-y-4">
            <p>{"HAODE Power does not sell personal information submitted through this website for monetary consideration."}</p>
            <p>{"If our data practices change in the future in a way that creates additional disclosure or opt-out obligations under applicable privacy laws, we will update this Privacy Policy and provide any legally required controls."}</p>
          </div>
        </section>
        <section id="section-12" aria-labelledby="section-12-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-12-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">12. Third-Party Services and Children’s Privacy</h2>
          <div className="space-y-4">
            <p>{"Our website may contain links to or integrations with third-party websites and services, including communication platforms and other external resources."}</p>
            <p>{"We are not responsible for the privacy practices, security, or content of third-party websites or services."}</p>
            <p>{"We encourage visitors to review the applicable privacy policies of those third parties before providing personal information to them."}</p>
            <p>{"Our website, products, and services are intended primarily for businesses and professional users and are not directed to children."}</p>
            <p>{"We do not knowingly collect personal information from children through this website."}</p>
            <p>{"If we learn that personal information from a child has been collected in circumstances where such collection is prohibited by applicable law, we will take reasonable steps to delete it."}</p>
          </div>
        </section>
        <section id="section-13" aria-labelledby="section-13-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-13-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">13. Changes to This Policy</h2>
          <div className="space-y-4">
            <p>{"We may update this Privacy Policy periodically to reflect changes to our website, business practices, technologies, service providers, or applicable legal requirements."}</p>
            <p>{"When changes are made, we will update the “Last Updated” date at the top of this page."}</p>
            <p>{"We encourage visitors to review this Privacy Policy periodically."}</p>
          </div>
        </section>
        <section id="section-14" aria-labelledby="section-14-title" className="scroll-mt-28 border-t border-navy-900/10 pt-8">
          <h2 id="section-14-title" className="mb-5 font-display text-2xl font-700 text-navy-900 sm:text-3xl">14. Contact Us</h2>
          <div className="space-y-4">
            <p>{"If you have questions about this Privacy Policy, our privacy practices, or would like to exercise an applicable privacy right, please contact us:"}</p>
            <p>{"Changzhou Haode Electromechanical Technology Co., Ltd."}</p>
            <p>{"Changzhou, Jiangsu, China"}</p>
            <p>Email: <a href="mailto:sales@haodepower.com" className="focus-ring text-navy-900 underline decoration-orange-500 underline-offset-4">sales@haodepower.com</a></p>
            <p>WhatsApp / Tel: <a href="tel:+8619084957004" className="focus-ring text-navy-900 underline decoration-orange-500 underline-offset-4">+86 190 8495 7004</a> · <a href="https://wa.me/8619084957004" className="focus-ring text-navy-900 underline decoration-orange-500 underline-offset-4">WhatsApp</a></p>
            <p>Website: <a href="https://www.haodepower.com" className="focus-ring text-navy-900 underline decoration-orange-500 underline-offset-4">www.haodepower.com</a></p>
          </div>
        </section>

        </article>
      </div>
    </>
  );
}

