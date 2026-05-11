"use client";

import { useState } from "react";

const CALL_URL = "https://tidycal.com/mathew1/20minutes";
const SALES_EMAIL = "mailto:hello@getexecuta.com";

const logos = ["Ashcroft Partners", "Whitcombe & Bell", "Ravensford Capital", "Hartley Linden", "Northgate Advisory", "Marchmont & Co", "Linwood Partners", "EY", "Deloitte", "KPMG"];

const clients = [
  ["01", "Investment Banks", "Coverage and M&A teams at global and regional investment banks. Deal execution at scale - without scaling headcount.", ["Analyst productivity at VP standard", "Pitch book and CIM generation in hours", "Multi-deal workflow automation", "Comparable transactions from LSEG and PitchBook", "Compliance-grade audit trail on every output"]],
  ["02", "M&A Advisory Firms", "Boutique to mid-tier advisory businesses where every mandate matters and the partner is the product. Executa extends the partner's reach without diluting quality.", ["Respond to live mandates the same day", "IC memos that pass the managing partner's standard", "Sell-side process automation from CIM to buyer portal", "Client voice encoded in every deliverable"]],
  ["03", "Private Equity Firms", "Mid-market PE funds where IC discipline, LP reporting, and portfolio monitoring are board-level responsibilities. Executa becomes the firm's institutional memory.", ["LBO models in 3 minutes with firm-default assumptions", "DD analysis across 6 workstreams simultaneously", "LP quarterly letters generated and queued for review", "Portfolio covenant monitoring - automated monthly", "Deal knowledge base accumulates across every deal"]],
  ["04", "Transaction Services", "Big-4 and boutique FDD and valuations teams where rigour, source citation, and workstream coverage define the quality of the deliverable.", ["DD report generation across all 6 workstreams", "Every finding cited to source document and page", "200-document data rooms processed in full", "IC chair test applied to every output automatically"]],
  ["05", "Credit & Debt Advisory", "Debt advisory boutiques, credit funds, and leveraged finance teams where debt capacity, covenant modelling, and credit memos are daily deliverables.", ["Leveraged finance models with debt schedule", "Credit memo generation at institutional standard", "Covenant monitoring across portfolio - monthly", "Lender presentations and term sheet analysis"]],
  ["06", "Independent Sponsors", "Independent sponsors and search funds operating without a permanent team. Executa provides the analytical firepower of a full deal team at a fraction of the cost.", ["Full deal package - LBO, IC memo, teaser - in one day", "Buyer and LP universe mapping with ranked fit scores", "Deal room analysis without an analyst"]],
  ["07", "Asset Advisory", "RICS-standard asset valuation firms and property advisory businesses - surveying, Red Book valuations, plant and machinery appraisals, and portfolio assessments produced at scale.", ["Red Book valuation reports in your firm's template and RICS format", "Comparable evidence from registered title data, EPC records, and market databases", "Capital and rental value analysis with yield and growth assumptions cited", "Portfolio valuation runs across multiple assets simultaneously", "RICS methodology, disclaimer language, and assumptions encoded as Skills"]],
] as const;

const featureTabs = {
  productivity: ["Productivity", ["Deal Intelligence", "Model Builder", "Workflows", "Enrich"]],
  time: ["Time", ["Scheduled Tasks", "Market Monitor", "Pre-IC Briefing", "Auto Document Indexing"]],
  output: ["Institutional Output", ["Document Generation", "Source Citations", "IC Chair Test", "Native Format Export"]],
  security: ["Security", ["Row Level Security", "EU Data Residency", "SOC 2 Infrastructure", "Zero Data Retention"]],
  smart: ["Smarter Organisations", ["Organisation Skills", "Team Skills", "Personal Skills", "RAG Knowledge Base"]],
} as const;

const products = {
  pe: ["Private Equity", "From first look to IC pack in an afternoon", "Mid-market PE funds use Get Executa to compress the time between deal identification and IC presentation - without compressing the quality of the analysis.", ["LBO in 3 minutes - Upload management accounts. Firm default assumptions applied. Sensitivity tables and equity bridge included.", "Full DD across 6 workstreams - Financial, Legal, Commercial, Operational, Management, Regulatory. Every finding cited.", "IC memo that passes your committee - IC Chair Test applied automatically. Deal rating, three risks with EUR impact, management assessment.", "LP quarterly letters - automated - Generated, reviewed, and sent from your address. 40 hours of formatting in one click.", "Portfolio covenant monitoring - Monthly automated check across all covenant metrics. Alerts when headroom falls below 15%."]],
  ma: ["M&A Advisory", "Pitch more. Win more. Deliver faster.", "M&A advisory firms use Get Executa to respond to live mandates the same day they arise - and to run sell-side processes that reflect the firm's institutional standard from teaser to close.", ["Pitch book in hours - Teaser, CIM, and process letter generated and branded to your firm in one workflow.", "Buyer universe mapping - Strategic and financial sponsors ranked by fit, powered by PitchBook and your firm's CRM.", "Client voice encoded - Your firm's tone, style, and standards applied to every client-facing document automatically.", "Sell-side workflow automation - From exclusivity to buyer portal. Every step automated. Every output approved before release."]],
  ib: ["Investment Banking", "Banker-grade output. Fraction of the time.", "Investment banking teams use Get Executa to eliminate the production bottleneck - freeing bankers to spend time on client relationships and deal origination rather than formatting pitch books at midnight.", ["Multi-deal workflow management - Pipeline across 20+ mandates. Every deal with its own Skills, knowledge base, and workflow configuration.", "Comparable analysis in 2 minutes - LSEG and PitchBook pulled automatically. EV/EBITDA, EV/Revenue, P/E. Source-cited.", "Institutional audit trail - Every generation logged with context, model used, and source data. MAR and GDPR compliant."]],
  credit: ["Credit & Debt Advisory", "Credit analysis at the speed of the market", "Credit and debt advisory teams use Get Executa to model debt capacity, generate credit memos, and monitor portfolio covenants - automatically, at institutional standard.", ["Leveraged finance model - Debt schedule, DSCR, interest cover, covenant testing. Firm defaults pre-configured.", "Credit memo generation - Structured credit analysis at the standard your lending syndicate expects.", "Covenant monitoring - automated - Monthly check across all portfolio positions. Alert when headroom falls below your defined threshold."]],
  asset: ["Asset Advisory", "RICS-standard valuations at a fraction of the time", "Asset valuation and advisory firms use Get Executa to produce Red Book compliant valuation reports, comparable evidence packs, and portfolio assessments - with RICS methodology encoded, assumptions cited, and reports formatted to your firm's standard from day one.", ["Red Book valuation reports - RICS VPS-compliant reports generated in your firm's template. Purpose, basis of value, assumptions, and opinion of value structured automatically.", "Comparable evidence retrieval - Comparable transactions pulled from registered data, EPC records, and market databases. Every comparable cited with address, date, tenure, and adjusted price per sq ft.", "Capital and rental value analysis - Yield, equivalent yield, reversionary yield, and ERV calculated and benchmarked against market evidence. Covenant strength assessed where relevant.", "Portfolio valuation runs - Multiple assets valued in a single instruction. Consistent assumptions applied across the portfolio. Summary schedule generated automatically.", "Plant, machinery & specialist assets - Depreciated replacement cost, market value in continued use, and orderly liquidation value methodologies supported. Encoded to your firm's inspection and reporting standard."]],
} as const;

const testimonials = [
  ["Get Executa changed what we can offer a client in the first week of a mandate. We had a full CIM, LBO, and DD summary in front of management within four days of signing. That used to take three weeks and a team of four.", "Managing Director", "European M&A Advisory Firm", "MR"],
  ["The IC memo standard is what convinced the partners. It comes out in our firm's voice, with our deal rating framework, and every risk quantified. The IC chair test catches gaps we used to find at midnight before the meeting.", "Investment Director", "Mid-Market Private Equity Fund", "JP"],
  ["Our analysts now operate like senior associates and our associates operate like directors. The quality floor is higher than it was before. And I stopped getting calls about covenant checks - they just happen, and I get an alert when something matters.", "Chief Operating Officer", "European Credit Fund", "SC"],
] as const;

type FeatureKey = keyof typeof featureTabs;
type ProductKey = keyof typeof products;

export default function Home() {
  const [feature, setFeature] = useState<FeatureKey>("productivity");
  const [product, setProduct] = useState<ProductKey>("pe");
  const activeProduct = products[product];

  return (
    <>
      <nav className="nav">
        <div className="navLeft">
          <a className="logo" href="#"><span className="mark" /><span>Get Executa</span></a>
          <div className="navLinks"><a href="#what">Platform</a><a href="#who">Who We Serve</a><a href="#features">Features</a><a href="#product">Product</a><a href="#security">Security</a><a href="#about">About</a></div>
        </div>
        <a className="navCta" href={CALL_URL}>Request a Call</a>
      </nav>

      <header className="hero">
        <div className="heroCopy">
          <div className="container">
            <div className="eyebrow">AI Partner to Financial Institutions</div>
            <h1>The intelligence layer for elite financial institutions</h1>
            <p>Get Executa embeds institutional AI across your deal workflows.</p>
            <div className="heroActions">
              <a className="btn" href={CALL_URL}>Request a Call</a>
              <a className="btn ghost" href="#what">Explore Platform</a>
            </div>
            <div className="heroBadges">
              <span>EU data residency</span>
              <span>Firm-private workspace</span>
              <span>SOC 2 infrastructure</span>
            </div>
            <div className="heroStats">
              <article><small>Built for</small><b>Investment teams</b></article>
              <article><small>Outputs</small><b>Models, memos, DD</b></article>
              <article><small>Deployment</small><b>Forward deployed</b></article>
            </div>
          </div>
        </div>
      </header>

      <Logos />

      <section id="what">
        <div className="container">
          <SectionHead align="left" label="What Get Executa does" title="An AI partner that works the way your firm does" body="Get Executa is not a generic AI tool you have to prompt into shape. It is a purpose-built intelligence layer trained on investment workflows - deployed inside your firm's data, encoded with your methodology, and producing outputs at the standard your clients hold you to." />
          <div className="pillarGrid">{["Connect your data universe", "Encode your firm's methodology", "Generate institutional outputs", "Automate deal workflows"].map((item, i) => <article className="pillar" key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></article>)}</div>
        </div>
      </section>

      <section id="who" className="soft">
        <div className="container">
          <SectionHead align="left" label="Who Get Executa serves" title="Built for every corner of finance" body="Get Executa is deployed across the full spectrum of financial institutions - from boutique advisory firms running 3 mandates in parallel, to investment banks managing hundreds of live transactions globally." />
          <div className="clientGrid">{clients.map(([n, title, desc, items]) => <article className="clientCard" key={title}><span>{n}</span><h3>{title}</h3><p>{desc}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section id="features">
        <div className="container splitHead">
          <div><div className="label">Platform features</div><h2>Five pillars of institutional AI</h2></div>
          <p>Every feature built around the same question: what does a senior partner need to see, and how quickly can we get it in front of them?</p>
        </div>
        <div className="container featureLayout">
          <div className="tabList">{Object.entries(featureTabs).map(([key, [label]]) => <button className={feature === key ? "active" : ""} key={key} onClick={() => setFeature(key as FeatureKey)}>{label}</button>)}</div>
          <div className="featureList">{featureTabs[feature][1].map((item) => <div key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section id="product" className="soft">
        <div className="container">
          <SectionHead label="Product" title="One platform. Every deal type." body="Get Executa adapts to your deal flow - not the other way around. Select your firm type to see how the platform is configured for your specific workflows." />
          <div className="tabs">{Object.entries(products).map(([key, [label]]) => <button className={product === key ? "active tab" : "tab"} key={key} onClick={() => setProduct(key as ProductKey)}>{label}</button>)}</div>
          <div className="productPanel"><div className="productCopy"><div className="label">{activeProduct[0]}</div><h3>{activeProduct[1]}</h3><p>{activeProduct[2]}</p><ul>{activeProduct[3].map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        </div>
      </section>

      <section id="testimonials">
        <div className="container">
          <SectionHead label="Trusted by leading professionals" title="What our clients say" />
          <div className="testimonialGrid">{testimonials.map(([text, name, role, initials]) => <article className="testimonial" key={initials}><q>{text}</q><div><span>{initials}</span><p><b>{name}</b><small>{role}</small></p></div></article>)}</div>
        </div>
      </section>

      <section id="security" className="soft">
        <div className="container securityBlock">
          <div><div className="label">Security & Compliance</div><h2>Using generic AI with deal data creates regulatory exposure</h2><p>Every document sent to ChatGPT or Copilot may constitute unlawful disclosure of inside information under MAR, violate GDPR, and breach client NDA obligations. Get Executa eliminates this risk architecturally - not by policy.</p></div>
          <div><div className="badges">{["SOC 2 TYPE II", "GDPR", "EU AI ACT", "ISO 27001 READY", "MAR COMPLIANT"].map((b) => <span key={b}>{b}</span>)}</div><blockquote>&quot;Get Executa is the first AI tool we have been comfortable deploying on live deal data. The firm isolation and EU data residency gave our compliance team everything they needed to approve it in two weeks.&quot;</blockquote></div>
        </div>
      </section>

      <section id="about">
        <div className="container aboutGrid">
          <div><div className="label">About Get Executa</div><h2>An AI research lab powered by finance professionals</h2><p>Get Executa was built by people who spent careers in M&A advisory, private equity, and investment banking - and who knew exactly why every generic AI tool broke down at the moment it mattered most.</p></div>
          <div className="aboutList">{[["Domain expertise is in our DNA", "Our founding team comes from advisory, PE, and credit. We have been in the IC meeting, the data room at 2am, and the client call where the model was wrong. That experience is embedded in every prompt, every Skill, and every output standard the platform enforces."], ["Forward Deployed Engineering", "Every new client engagement begins with a Forward Deployed Engineer embedded with your firm for two weeks - mapping your workflows, encoding your methodology, and deploying a platform that works your way from day one. No configuration burden on your team."], ["Research-first, product-second", "Our AI research team continuously develops new models, routing logic, and context assembly techniques specifically optimised for financial workflows. Every quarterly release makes the platform materially better - not just more feature-complete."]].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section id="cta" className="cta"><div className="container"><div className="label">Ready to see it on your deals?</div><h2>The way the best investment firms work</h2><div className="ctaActions"><a className="btn" href={CALL_URL}>Request a Call</a><a className="btn ghost" href={SALES_EMAIL}>Talk to Sales -&gt;</a></div><p>EU data residency - Firm-private workspace - SOC 2 infrastructure</p></div></section>
      <Footer />
      <div className="sticky"><div className="stickyInner"><div><small>AI Partner to Finance</small><b>Get Executa</b></div><a className="btn" href={CALL_URL}>Request a Call -&gt;</a></div></div>
    </>
  );
}

function Logos() {
  return <div className="logos"><div className="logosLabel">Trusted by professionals at leading institutions</div><div className="logoTrack">{[...logos, ...logos].map((logo, i) => <span key={`${logo}-${i}`}>{logo}</span>)}</div></div>;
}

function SectionHead({ label, title, body, align = "center" }: { label: string; title: string; body?: string; align?: "left" | "center" }) {
  return <div className={`sectionHead ${align}`}><div className="label">{label}</div><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function Footer() {
  return <footer><div className="footerGrid"><div><a className="logo footerLogo" href="#"><span className="mark" /><span>Get Executa</span></a><p>The AI partner for investment banks, M&A advisory firms, and private equity. Institutional outputs. Firm-private. EU-hosted.</p></div><FooterCol title="Platform" links={["What We Do", "Features", "Product", "Security"]} /><FooterCol title="Company" links={["About", "Clients", "Contact", "Careers"]} /><FooterCol title="Get started" links={["Request a Call", "Talk to Sales", "Sign in", "Documentation"]} /></div><div className="footerBottom">© 2026 Get Executa - getexecuta.com - New York, Madrid & London</div></footer>;
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return <div><h4>{title}</h4>{links.map((link) => <a href={link === "Request a Call" ? CALL_URL : link === "Contact" || link.includes("Sales") ? SALES_EMAIL : "#"} key={link}>{link}</a>)}</div>;
}
