import {useEffect, useRef, type ReactNode} from "react";
import {NavLink, Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBluesky, faGithub, faTwitch, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faBlog} from "@fortawesome/free-solid-svg-icons/faBlog";
import "./site-shell.css";

const navigation = [
    {label: "Art", to: "/gallery"},
    {label: "Projects", to: "/projects"},
    {label: "Lore", to: "/lore"},
    {label: "About", to: "/about"},
];

const socialLinks = [
    {label: "Blog", href: "https://blog.kazeous.com", icon: faBlog},
    {label: "GitHub", href: "https://github.com/kazeous", icon: faGithub},
    {label: "Twitter", href: "https://twitter.com/kaze_ous", icon: faTwitter},
    {label: "Twitch", href: "https://www.twitch.tv/kazeous", icon: faTwitch},
    {label: "Bluesky", href: "https://bsky.app/profile/kazeous.bsky.social", icon: faBluesky},
];

function DestinationLinks({className, onNavigate}: Readonly<{className: string; onNavigate?: () => void}>) {
    return <nav className={className} aria-label="Primary navigation">
        {navigation.map(destination =>
            <NavLink
                to={destination.to}
                key={destination.to}
                onClick={onNavigate}
                className={({isActive}) => isActive ? "site-nav-link is-active" : "site-nav-link"}
            >
                <span>{destination.label}</span>
                <span aria-hidden="true">↗</span>
            </NavLink>
        )}
    </nav>;
}

export function SiteShell({children}: Readonly<{children: ReactNode}>) {
    const location = useLocation();
    const menuRef = useRef<HTMLDetailsElement>(null);
    const isHome = location.pathname === "/";

    useEffect(() => {
        menuRef.current?.removeAttribute("open");
    }, [location.pathname]);

    return <div className="site-shell">
        <header className="site-header">
            <div className="site-header-top site-frame">
                <Link className="site-wordmark" to="/" aria-label="Kaze home">Kaze</Link>
                <p className="site-discipline">A dragon-shark wandering on a path.</p>
                <nav className="site-social-links" aria-label="Social links">
                    {socialLinks.map(social =>
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            title={social.label}
                        >
                            <FontAwesomeIcon icon={social.icon} aria-hidden="true"/>
                        </a>
                    )}
                </nav>
                <details className="site-mobile-menu" ref={menuRef}>
                    <summary>Menu</summary>
                    <DestinationLinks
                        className="site-mobile-destinations"
                        onNavigate={() => menuRef.current?.removeAttribute("open")}
                    />
                </details>
            </div>
            <DestinationLinks className="site-nav site-frame"/>
        </header>

        <main className={`site-main site-frame${isHome ? " site-main-home" : " site-main-route"}`}>
            {children}
        </main>

        <footer className="site-footer site-frame">
            <p>© {new Date().getFullYear()} Kazeous</p>
            <p>Art and software, composed on one grid.</p>
            <a href="https://github.com/kazeous" target="_blank" rel="noreferrer">GitHub ↗</a>
        </footer>
    </div>;
}
