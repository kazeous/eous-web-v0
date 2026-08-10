import {Link} from "react-router-dom";
import featuredArtwork from "../lore/assets/splash/aicore-splash-1.webp";
import heroArtwork from "../lore/assets/splash/jupiter-splash.webp";
import "./hybrid-demo.css";
import {useDocumentTitle} from "usehooks-ts";

const indexLinks = [
    {label: "Art", to: "/gallery"},
    {label: "Projects", to: "/projects"},
    {label: "Lore", to: "/lore"},
];

export function HybridDemo() {
    useDocumentTitle("kazeous.com");

    return <div className="hybrid-demo">
        <section className="hybrid-hero" aria-labelledby="hybrid-title">
                <div className="hybrid-hero-copy">
                    <p className="hybrid-intro">A dragon-shark wandering on a path.</p>
                    <h1 id="hybrid-title">Art, worlds<br/>and software.</h1>
                    <div className="hybrid-hero-bottom">
                        <p>
                            A personal studio for the things Kaze draws, builds and keeps exploring.
                            Amateur at everything—curious about all of it.
                        </p>
                        <div className="hybrid-actions" aria-label="Explore Kaze's work">
                            <Link className="hybrid-action hybrid-action-primary" to="/gallery">View art</Link>
                            <Link className="hybrid-action" to="/projects">Browse projects</Link>
                        </div>
                    </div>
                </div>

                <Link className="hybrid-hero-art" to="/lore" aria-label="Explore Kaze's character lore">
                    <img
                        src={heroArtwork}
                        alt="A blue, white and gold dragon character reaching toward the viewer"
                        width={1191}
                        height={2048}
                        fetchPriority="high"
                    />
                    <span className="hybrid-media-caption">
                        <span>Character work</span>
                        <span>Explore lore →</span>
                    </span>
                </Link>
        </section>

        <section className="hybrid-work" aria-label="Featured work">
                <Link className="hybrid-featured-art" to="/gallery">
                    <img
                        src={featuredArtwork}
                        alt="A close portrait of a teal dragon-shark character surrounded by digital fragments"
                        width={1668}
                        height={1668}
                        loading="lazy"
                    />
                    <span className="hybrid-media-caption hybrid-media-caption-on-image">
                        <span>Character study</span>
                        <span>Featured art →</span>
                    </span>
                </Link>

                <article className="hybrid-project-cell">
                    <div>
                        <p className="hybrid-cell-label">Current build</p>
                        <h2>eous-web-v0</h2>
                        <p>A React home for artwork, original worlds, and the software made along the way.</p>
                    </div>
                    <dl className="hybrid-project-meta">
                        <div><dt>Stack</dt><dd>React / TypeScript</dd></div>
                        <div><dt>Type</dt><dd>Personal web</dd></div>
                        <div><dt>Status</dt><dd>In progress</dd></div>
                    </dl>
                    <Link className="hybrid-project-link" to="/projects">Open projects <span aria-hidden="true">→</span></Link>
                </article>
        </section>

        <section className="hybrid-index" aria-label="Explore the site">
                <div className="hybrid-index-intro">
                    <h2>Different outputs.<br/>One practice.</h2>
                    <p>The frame stays disciplined. The work inside it can be expressive, technical, or both.</p>
                </div>
                <div className="hybrid-index-links">
                    {indexLinks.map((destination, index) =>
                        <Link to={destination.to} key={destination.to}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{destination.label}</strong>
                            <span aria-hidden="true">→</span>
                        </Link>
                    )}
                </div>
        </section>
    </div>;
}
