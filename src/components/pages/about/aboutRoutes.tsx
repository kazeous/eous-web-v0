import {Changelog} from "./subpages/Changelog.tsx";
import {Credits} from "./subpages/Credits.tsx";

export const aboutSubRoutes = [
    {name: "Credits", path: "credits", element: <Credits/>},
    {name: "Changelog", path: "changelog", element: <Changelog/>},
];
