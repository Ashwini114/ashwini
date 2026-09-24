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
