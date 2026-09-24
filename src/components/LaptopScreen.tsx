/** The laptop's display: a tiny browser flipping between three kinds of websites. */
export const SITES = [
  { key: "shop", label: "E-commerce", url: "northwind.store" },
  { key: "events", label: "Event management", url: "eventdesk.app/dashboard" },
  { key: "team", label: "Employee management", url: "staffboard.io/team" },
] as const;

function ShopSite() {
  const products = [
    { name: "Running shoes", price: "$49", tint: "var(--powder)" },
    { name: "Leather tote", price: "$32", tint: "var(--lavender)" },
    { name: "Sunglasses", price: "$18", tint: "var(--mint)" },
    { name: "Classic watch", price: "$85", tint: "var(--butter)" },
  ];
  return (
    <div className="ws ws-shop">
      <div className="ws-head">
        <strong className="ws-logo">Northwind</strong>
        <nav className="ws-links"><span>New in</span><span>Women</span><span>Men</span><span>Home</span></nav>
        <span className="ws-search">Search products</span>
        <span className="ws-cart">Cart<b>3</b></span>
      </div>
      <div className="ws-banner">
        <div>
          <p className="ws-kicker">Seasonal collection</p>
          <p className="ws-big">Up to 40% off selected lines</p>
          <span className="ws-btn">Shop now</span>
        </div>
        <div className="ws-banner-art" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className="ws-grid">
        {products.map((p, i) => (
          <div className="ws-card" key={p.name}>
            <div className="ws-img" style={{ background: p.tint }}><i /></div>
            <p className="ws-name">{p.name}</p>
            <div className="ws-row">
              <b>{p.price}</b>
              <span className={`ws-add${i === 1 ? " is-added" : ""}`}>{i === 1 ? "Added" : "Add to cart"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventSite() {
  const events = [
    { m: "Mar", d: "14", title: "Product leadership summit", place: "City Arts Hall", fill: 82, tint: "var(--powder)" },
    { m: "Mar", d: "22", title: "Quarterly partner review", place: "Riverside Hub", fill: 56, tint: "var(--lavender)" },
    { m: "Apr", d: "03", title: "Annual customer conference", place: "Central Park Lawn", fill: 94, tint: "var(--mint)" },
  ];
  return (
    <div className="ws ws-events">
      <aside className="ws-side" aria-hidden="true">
        <b /><i className="on" /><i /><i /><i />
      </aside>
      <div className="ws-main">
        <div className="ws-head">
          <strong className="ws-title">Upcoming events</strong>
          <span className="ws-btn">+ New event</span>
        </div>
        <div className="ws-stats">
          <div><b>1,284</b><span>Tickets sold</span></div>
          <div><b>862</b><span>RSVPs</span></div>
          <div><b>12</b><span>Venues</span></div>
        </div>
        <div className="ws-list">
          {events.map((e) => (
            <div className="ws-event" key={e.title}>
              <div className="ws-date" style={{ background: e.tint }}><span>{e.m}</span><b>{e.d}</b></div>
              <div className="ws-event-body">
                <p className="ws-name">{e.title}</p>
                <p className="ws-muted">{e.place}</p>
                <div className="ws-bar"><i style={{ width: `${e.fill}%` }} /></div>
              </div>
              <div className="ws-faces" aria-hidden="true"><i /><i /><i /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSite() {
  const people = [
    { init: "AK", name: "Arjun K.", role: "Frontend", skills: ["React", "TS"], status: "Available", tone: "ok" },
    { init: "MS", name: "Meera S.", role: "QA", skills: ["Automation"], status: "On a task", tone: "busy" },
    { init: "RJ", name: "Rahul J.", role: "Mobile", skills: ["Ionic", "Android"], status: "Available", tone: "ok" },
    { init: "NP", name: "Nisha P.", role: "Design", skills: ["UX", "Figma"], status: "On leave", tone: "away" },
  ];
  return (
    <div className="ws ws-team">
      <div className="ws-head">
        <strong className="ws-title">Team overview</strong>
        <div className="ws-chips"><span className="on">Everyone</span><span>Available</span><span>On leave</span></div>
      </div>
      <div className="ws-table">
        {people.map((p) => (
          <div className="ws-tr" key={p.name}>
            <span className="ws-avatar">{p.init}</span>
            <div className="ws-who"><p className="ws-name">{p.name}</p><p className="ws-muted">{p.role}</p></div>
            <div className="ws-skills">{p.skills.map((s) => <span key={s}>{s}</span>)}</div>
            <span className={`ws-status ${p.tone}`}>{p.status}</span>
            <span className={`ws-assign${p.tone === "ok" ? "" : " is-disabled"}`}>Assign</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LaptopScreen({  compact }: { compact: boolean }) {
  return (
    <div className={`browser${compact ? " compact" : ""}`}>
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="browser-url">{SITES[0].url}</span>
      </div>
      <div className="browser-view">
        <div className="browser-track" >
          <ShopSite />

        </div>
      </div>
    </div>
  );
}
