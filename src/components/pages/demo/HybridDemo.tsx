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
    {label: "Art", to: "/gallery"},
    {label: "Projects", to: "/projects"},
    {label: "Lore", to: "/lore"},
];

export function HybridDemo() {
    useDocumentTitle("kazeous.com");

    return <div className="hybrid-demo">
        <section className="hybrid-hero" aria-labelledby="hybrid-title">
                <div className="hybrid-hero-copy">
                    <h1 id="hybrid-title">Art, worlds<br/>and software.</h1>
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
