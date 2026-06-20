import {Container} from "../../ui/Container.tsx";
import kazeBadge from "./assets/badges/Character_Badge_-page001.webp"
import yoichiBadge from "./assets/badges/Character_Badge_-page006.webp"
import {useDocumentTitle} from "usehooks-ts";
import "./lore.css";

export function OCList() {
    useDocumentTitle("Lore - kazeous.com");

    return <Container className={"fade"}>
        <h2 className={"primary-text"}>My OCs</h2>
        <article>
            <h3 className={"secondary-text"}>Furverse</h3>
            <div className={"grid"}>
                <a href={"https://vgen.co/c/kaze-hishou"} target="_blank" rel="noopener noreferrer" className={"m3 s6 lore-card"}>
                    <img src={kazeBadge} className={"lore-card-image"} alt={"Kaze Hishou character badge"}/>
                </a>
                <a href={"https://vgen.co/c/yoichi-shimizu"} target="_blank" rel="noopener noreferrer" className={"m3 s6 lore-card"}>
                    <img src={yoichiBadge} className={"lore-card-image"} alt={"Yoichi Shimizu character badge"}/>
                </a>
            </div>
        </article>
    </Container>;
}
