import { aboutMe } from "../data";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">Beyond the code</h2>
        <p>{aboutMe.lede}</p>
      </div>

      <ul className="passions">
        {aboutMe.passions.map((p) => (
          <li className="passion" key={p.title}>
            <span className="passion-icon" aria-hidden="true">{p.emoji}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>

      <blockquote className="about-closing">
        <p>{aboutMe.closing}</p>
      </blockquote>
    </section>
  );
}
