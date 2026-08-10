import {Container} from "../../ui/Container.tsx";
import kazeBadge from "./assets/badges/Character_Badge_-page001.webp"
import yoichiBadge from "./assets/badges/Character_Badge_-page006.webp"
import {useDocumentTitle} from "usehooks-ts";
import "./lore.css";

export function OCList() {
    useDocumentTitle("Lore - kazeous.com");

    return <Container className="lore-page fade">
        <header className="lore-header">
            <h1>Original characters</h1>
            <p>Character sheets, worlds, and fragments of lore collected in one place.</p>
        </header>
        <section className="lore-collection" aria-labelledby="furverse-title">
            <h2 id="furverse-title">Furverse</h2>
            <div className="lore-grid">
                <a href="https://vgen.co/c/kaze-hishou" target="_blank" rel="noopener noreferrer" className="lore-card">
                    <img src={kazeBadge} className={"lore-card-image"} alt={"Kaze Hishou character badge"}/>
                    <span>Kaze Hishou <span aria-hidden="true">↗</span></span>
                </a>
                <a href="https://vgen.co/c/yoichi-shimizu" target="_blank" rel="noopener noreferrer" className="lore-card">
                    <img src={yoichiBadge} className={"lore-card-image"} alt={"Yoichi Shimizu character badge"}/>
                    <span>Yoichi Shimizu <span aria-hidden="true">↗</span></span>
                </a>
            </div>
        </section>
    </Container>;
}
