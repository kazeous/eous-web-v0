import {Link} from "react-router-dom";
import galleryEntries from "../../../../api/src/images/images.json";
import {isImageInformation, type ImageEntry} from "../../../../api/src/images/ImageInformation.ts";
import "./hybrid-demo.css";
import {useDocumentTitle} from "usehooks-ts";

const galleryArtwork = (galleryEntries as ImageEntry[]).filter(isImageInformation);

function findGalleryArtwork(title: string) {
    const artwork = galleryArtwork.find(image => image.title === title);

    if (!artwork) {
        throw new Error(`Gallery artwork not found: ${title}`);
    }

    return artwork;
}

const heroArtwork = findGalleryArtwork("A little tired");
const featuredArtwork = findGalleryArtwork("C'mere");

const indexLinks = [
    {label: "Gallery", to: "/gallery"},
    {label: "Projects", to: "/projects"},
    {label: "Characters", to: "/lore"},
];

const featuredProjects = [
    {
        name: "eous-web-v0",
        description: "Personal website, currently running v0.1.",
        language: "TypeScript",
        type: "Personal website",
        href: "https://github.com/kazeous/eous-web-v0",
    },
    {
        name: "sona",
        description: "Character reference page that makes commissioning artists easier.",
        language: "JavaScript",
        type: "Character reference",
        href: "https://github.com/kazeous/sona",
    },
];

export function HybridDemo() {
    useDocumentTitle("kazeous.com");

    return <div className="hybrid-demo">
        <section className="hybrid-hero" aria-labelledby="hybrid-title">
                <div className="hybrid-hero-copy">
                    <div className="hybrid-hero-heading">
                        <h1 id="hybrid-title">Art, worlds<br/>and software.</h1>
                        <p className="hybrid-hero-note">
                            amateur at everything✨software engineer👨‍💻game designer 🎲still trying xD
                        </p>
                    </div>
                    <div className="hybrid-hero-bottom">
                        <p>
                            Người ta vẫn thường nghĩ bình yên nằm ở cuối con đường. Nhưng đôi khi,
                            bình yên là lúc ta thôi trách mình vì những điều đã cũ.
                        </p>
                        <div className="hybrid-actions" aria-label="Explore Kaze's work">
                            <Link className="hybrid-action hybrid-action-primary" to="/gallery">View art</Link>
                            <Link className="hybrid-action" to="/projects">Browse projects</Link>
                        </div>
                    </div>
                </div>

                <Link className="hybrid-hero-art" to={`/gallery/${heroArtwork.id}`} aria-label={`Open ${heroArtwork.title} in the gallery`}>
                    <img
                        src={heroArtwork.webp}
                        alt={`Artwork: ${heroArtwork.title}`}
                        width={1200}
                        height={1600}
                        fetchPriority="high"
                    />
                    <span className="hybrid-media-caption">
                        <span>{heroArtwork.title}</span>
                        <span>Open gallery →</span>
                    </span>
                </Link>
        </section>

        <section className="hybrid-work" aria-label="Featured work">
                <Link className="hybrid-featured-art" to={`/gallery/${featuredArtwork.id}`}>
                    <img
                        src={featuredArtwork.webp}
                        alt={`Artwork: ${featuredArtwork.title}`}
                        width={1244}
                        height={1200}
                        loading="lazy"
                    />
                    <span className="hybrid-media-caption hybrid-media-caption-on-image">
                        <span>{featuredArtwork.title}</span>
                        <span>Open gallery →</span>
                    </span>
                </Link>

                {featuredProjects.map(project =>
                    <article className="hybrid-project-cell" key={project.name}>
                        <div>
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                        <dl className="hybrid-project-meta">
                            <div><dt>Language</dt><dd>{project.language}</dd></div>
                            <div><dt>Type</dt><dd>{project.type}</dd></div>
                        </dl>
                        <a
                            className="hybrid-project-link"
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name} on GitHub`}
                        >
                            Open on GitHub <span aria-hidden="true">↗</span>
                        </a>
                    </article>
                )}
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
