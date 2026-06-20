import {Container} from "../../../ui/Container.tsx";
import {format} from "date-fns";
import Markdown from "react-markdown";

export function Changelog() {
    const entries: {version: string, date: Date, description: string}[] = [
        {
            version: "0.1.1",
            date: new Date(2026, 6, 20),
            // language=Markdown
            description: `Trying to make something different!
- Modify light theme color
- Start maintaining a changelog`
        },
    ]
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>Changelog</h2>
        <ul className={"list border"}>
            {entries.map(value => <li key={value.version}>
                <div>
                    <h3>{value.version}</h3>
                    <time>{format(value.date, "MM/dd/yyyy")}</time>
                    <Markdown>
                        {value.description}
                    </Markdown>
                </div>
            </li>)}
        </ul>
    </Container>;
}