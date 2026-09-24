import { projects } from "../data";
import ProjectArt from "./ProjectArt";

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="section-head">
        <h2 id="projects-title">Featured Projects</h2>
        <p>These are some of the projects I have worked on.</p>
      </div>

      <article className="project project-featured">
        <div className="project-art art-tv"><ProjectArt icon={featured.icon} /></div>
        <div className="project-body">
          <p className="project-kind">{featured.kind}</p>
          <h3>{featured.name}</h3>
          <p>{featured.summary}</p>
          <ul className="tags">{featured.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      </article>

      <div className="project-pair">
        {rest.map((pr) => (
          <article className={`project project-${pr.id}`} key={pr.id}>
            <div className={`project-art art-${pr.icon}`}><ProjectArt icon={pr.icon} /></div>
            <div className="project-body">
              <p className="project-kind">{pr.kind}</p>
              <h3>{pr.name}</h3>
              <p>{pr.summary}</p>
              <ul className="tags">{pr.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
