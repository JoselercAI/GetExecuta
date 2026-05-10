"use client";

import { useState } from "react";

const products = {
  pe: {
    tab: "Private Equity",
    title: "From first look to IC pack in an afternoon",
    body: "Compress the time between deal identification and IC presentation without reducing analytical quality.",
    items: ["LBO in 3 minutes with firm defaults", "Full DD across six workstreams", "IC memo with quantified risk", "LP letters and covenant monitoring"],
    stats: [["Entry multiple", "9.5x"], ["Base IRR", "22.4%"], ["MOIC", "2.7x"], ["Downside IRR", "16.1%"]],
  },
  ma: {
    tab: "M&A Advisory",
    title: "Pitch more. Win more. Deliver faster.",
    body: "Respond to live mandates the same day and run sell-side processes from teaser to close.",
    items: ["Pitch books in hours", "Buyer universe mapping", "Client voice encoded", "Sell-side workflow automation"],
    stats: [["Teaser", "Ready"], ["CIM", "Drafted"], ["Buyer list", "Ranked"], ["Process letter", "Exported"]],
  },
  ib: {
    tab: "Investment Banking",
    title: "Banker-grade output. Fraction of the time.",
    body: "Eliminate the production bottleneck so bankers spend more time on clients and origination.",
    items: ["Multi-deal workflow management", "Comparable analysis in minutes", "Institutional audit trail", "Pitch book automation"],
    stats: [["Live mandates", "24"], ["Comps pulled", "118"], ["Slides created", "42"], ["Audit trail", "On"]],
  },
  credit: {
    tab: "Credit & Debt",
    title: "Credit analysis at the speed of the market",
    body: "Model debt capacity, generate credit memos and monitor portfolio covenants automatically.",
    items: ["Leveraged finance models", "Credit memo generation", "Covenant monitoring", "Lender presentations"],
    stats: [["DSCR", "1.8x"], ["Interest cover", "3.4x"], ["Headroom", "18%"], ["Status", "Clear"]],
  },
  asset: {
    tab: "Asset Advisory",
    title: "RICS-standard valuations at a fraction of the time",
    body: "Produce Red Book compliant valuation reports, comparable evidence packs and portfolio assessments.",
    items: ["Red Book valuation reports", "Comparable evidence retrieval", "Capital and rental value analysis", "Portfolio valuation runs"],
    stats: [["Reports", "12"], ["Comparables", "86"], ["Evidence packs", "Cited"], ["RICS Skills", "Active"]],
  },
};

const features = [
  ["Productivity", "Deal Intelligence", "Model Builder", "Workflows", "Enrich"],
  ["Time", "Scheduled Tasks", "Market Monitor", "Pre-IC Briefing", "Auto Document Indexing"],
  ["Institutional Output", "Document Generation", "Source Citations", "IC Chair Test", "Native Format Export"],
  ["Security", "Row Level Security", "EU Data Residency", "SOC 2 Infrastructure", "Zero Data Retention"],
  ["Smarter Organisations", "Organisation Skills", "Team Skills", "Personal Skills", "RAG Knowledge Base"],
];

const roles = ["Investment Banks", "M&A Advisory Firms", "Private Equity Firms", "Transaction Services", "Credit & Debt Advisory", "Independent Sponsors", "Asset Advisory", "Valuation Teams", "Portfolio Monitoring"];
const logos = ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "KKR", "Blackstone", "Apollo", "Lazard", "Rothschild & Co", "Nomura", "UBS"];
const faqs = [
  ["What is Get Executa?", "A firm-private AI platform for investment workflows, financial analysis and institutional document generation."],
  ["Does it connect to our data?", "Yes. It can connect to data rooms, CRM, research, models and internal knowledge bases."],
  ["Can it match our methodology?", "Yes. Firm assumptions, templates, voice and approval standards are encoded as Skills."],
  ["Is it secure enough for live deals?", "The platform is designed around firm isolation, EU residency, audit trails and zero retention patterns."],
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<keyof typeof products>("pe");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const product = products[activeProduct];

  return (
    <>
      <nav className="nav">
        <div className="navLeft">
          <a className="logo" href="#"><span className="mark" /><span>Get Executa</span></a>
          <div className="navLinks">
            <a href="#what">Platform</a><a href="#who">Who We Serve</a><a href="#features">Features</a><a href="#product">Product</a><a href="#security">Security</a><a href="#about">About</a>
          </div>
        </div>
        <a className="navCta" href="mailto:hello@getexecuta.com">Request a Call</a>
      </nav>

      <header className="hero">
        <div className="heroCopy">
          <div className="container">
            <div className="eyebrow">AI Partner to Finance</div>
            <h1>The intelligence layer for elite financial institutions</h1>
            <p>Get Executa embeds institutional AI across your deal workflows, turning live data rooms, models and firm methodology into investment-grade outputs.</p>
            <a className="btn" href="#cta">Request a Call -&gt;</a>
          </div>
        </div>
        <div className="heroVisual">
          <div className="terminal">
            <div className="terminalTop"><span><i /><i /><i />Deal Intelligence</span><span>Skills active</span></div>
            <div className="chat">
              <div className="msg user">Run a full LBO using our European mid-market defaults. Include downside.</div>
              <div className="msg">Building Project Helios with your firm&apos;s assumptions, source data and IC memo standard.</div>
              <div className="metric"><div><small>Base IRR</small><b>22.4%</b></div><div><small>MOIC</small><b>2.7x</b></div><div><small>Downside</small><b>16.1%</b></div></div>
              <div className="msg">IC memo drafted, assumptions benchmarked and outputs ready for partner review.</div>
            </div>
          </div>
        </div>
      </header>

      <div className="infoStrip">
        {["Firm-private workspace", "EU-hosted residency", "SOC 2 infrastructure", "Native format outputs"].map((item) => <div className="infoCard" key={item}><small>{item.split(" ")[0]}</small><b>{item}</b></div>)}
      </div>

      <section id="what">
        <div className="container">
          <SectionHead label="What Get Executa does" title="An AI partner that works the way your firm does" body="Purpose-built for investment workflows, deployed inside your firm's data and encoded with your methodology." />
          <div className="cards">
            <Card n="1" title="Connect your data universe" body="Data rooms, CRM, models, research and proprietary firm knowledge work as one source of truth." />
            <Card n="2" title="Encode your firm's methodology" body="Your assumptions, voice, IC standards and templates become reusable Skills." />
            <Card n="3" title="Generate institutional outputs" body="LBOs, memos, CIMs, DD summaries, valuation reports and monitoring packs in native formats." />
          </div>
        </div>
      </section>

      <section id="who">
        <div className="container split">
          <div><div className="label">Who Get Executa serves</div><h2>Built for every corner of finance</h2><p>From boutiques running three mandates to banks managing hundreds of live transactions globally.</p></div>
          <div className="roleCloud">{roles.map((role) => <div className="role" key={role}>{role}</div>)}</div>
        </div>
      </section>

      <section><div className="logos"><h2>Trusted by professionals at leading institutions</h2><div className="logoTrack">{[...logos, ...logos].map((logo, i) => <span key={`${logo}-${i}`}>{logo}</span>)}</div></div></section>

      <section id="features">
        <div className="container">
          <SectionHead label="Platform features" title="Five pillars of institutional AI" body="Every feature is built around one question: what does a senior partner need to see, and how fast can we get it in front of them?" />
          <div className="cards">{features.map(([title, ...items]) => <article className="card" key={title}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}<article className="card gray"><h3>Forward Deployed Engineering</h3><p>We map your workflows, encode your methodology and deploy a platform that works your way from day one.</p></article></div>
        </div>
      </section>

      <section id="product">
        <div className="container">
          <SectionHead label="Product" title="One platform. Every deal type." body="Select your firm type to see how Get Executa adapts to your workflows." />
          <div className="tabs">{Object.entries(products).map(([key, value]) => <button className={`tab ${activeProduct === key ? "active" : ""}`} key={key} onClick={() => setActiveProduct(key as keyof typeof products)}>{value.tab}</button>)}</div>
          <div className="productPanel">
            <div className="productCopy"><h3>{product.title}</h3><p>{product.body}</p><ul>{product.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="mock">{product.stats.map(([k, v]) => <div className="mockRow" key={k}><span>{k}</span><b>{v}</b></div>)}</div>
          </div>
        </div>
      </section>

      <section id="security">
        <div className="container">
          <SectionHead label="Security & Compliance" title="Generic AI with deal data creates regulatory exposure" body="Get Executa removes this risk architecturally with firm isolation, EU data residency, row-level security and compliance-grade audit trails." />
          <div className="cards"><Card title="SOC 2 Type II" body="Enterprise infrastructure for sensitive workflows." /><Card title="GDPR & MAR" body="Built for regulated European financial institutions." /><Card title="Zero Data Retention" body="Your data stays private to your firm and workspace." /></div>
        </div>
      </section>

      <section id="about">
        <div className="container split">
          <div><div className="label">About Get Executa</div><h2>An AI research lab powered by finance professionals</h2><p>Built by people from M&A advisory, private equity and investment banking who know where generic AI breaks down.</p></div>
          <div className="stack"><article className="card"><h3>Domain expertise is in our DNA</h3><p>Our founding team has been in the IC meeting, the data room at 2am and the client call where the model was wrong.</p></article><article className="card"><h3>Research-first, product-second</h3><p>Our AI team continuously develops routing, context assembly and workflow techniques for financial outputs.</p></article></div>
        </div>
      </section>

      <section><div className="container"><SectionHead label="Trusted by leading professionals" title="What clients say" /><div className="testimonialRow"><Testimonial text="Get Executa changed what we can offer a client in the first week of a mandate." by="Managing Director, European M&A Advisory Firm" /><Testimonial text="The IC memo standard is what convinced the partners. It comes out in our firm's voice." by="Investment Director, Mid-Market PE Fund" /><Testimonial text="Our analysts now operate like senior associates and our associates operate like directors." by="COO, European Credit Fund" /></div></div></section>

      <section>
        <div className="container faq">
          <div><div className="label">Any questions?</div><h2>Frequently asked questions</h2><a className="btn" href="mailto:hello@getexecuta.com">Ask us more</a></div>
          <div>{faqs.map(([q, a], i) => <div className={`faqItem ${openFaq === i ? "open" : ""}`} key={q}><button className="faqQ" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{q}<span>+</span></button><p>{a}</p></div>)}</div>
        </div>
      </section>

      <section id="cta"><div className="container sectionHead"><div className="label">Ready to see it on your deals?</div><h2>The way the best investment firms work</h2><a className="btn" href="mailto:hello@getexecuta.com">Request a Call -&gt;</a></div></section>

      <footer><div className="footerGrid"><div><a className="logo footerLogo" href="#"><span className="mark" /><span>Get Executa</span></a><p>The AI partner for investment banks, advisory firms and private equity.</p></div><FooterCol title="Platform" links={["What We Do", "Features", "Product", "Security"]} /><FooterCol title="Company" links={["About", "Clients", "Contact", "Careers"]} /><FooterCol title="Get started" links={["Request a Call", "Talk to Sales", "Sign in", "Documentation"]} /></div></footer>

      <div className="sticky"><div className="stickyInner"><div><small>AI Partner to Finance</small><b>Get Executa</b></div><a className="btn" href="mailto:hello@getexecuta.com">Request a Call -&gt;</a></div></div>
    </>
  );
}

function SectionHead({ label, title, body }: { label: string; title: string; body?: string }) {
  return <div className="sectionHead"><div className="label">{label}</div><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function Card({ n, title, body }: { n?: string; title: string; body: string }) {
  return <article className="card gray">{n && <div className="num">{n}</div>}<h3>{title}</h3><p>{body}</p></article>;
}

function Testimonial({ text, by }: { text: string; by: string }) {
  return <article className="testimonial"><q>{text}</q><small>{by}</small></article>;
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return <div><h4>{title}</h4>{links.map((link) => <a href={link === "Contact" || link.includes("Call") || link.includes("Sales") ? "mailto:hello@getexecuta.com" : "#"} key={link}>{link}</a>)}</div>;
}
