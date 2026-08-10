import {useDocumentTitle} from "usehooks-ts";
import {AboutSubnavigation} from "./AboutSubnavigation.tsx";
import {Outlet} from "react-router";
import './about.css'
export function AboutRoot() {
    useDocumentTitle("About Me - kazeous.com");
    return <div className="about-layout">
        <AboutSubnavigation/>
        <div className="about-content">
            <Outlet/>
        </div>
    </div>;
}
