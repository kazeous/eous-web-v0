import {Container} from "../../../ui/Container.tsx";

export function Changelog() {
    const entries = [
        {
            version: "2.0",
            date: "2026-08-10",
            displayDate: "08/10/2026",
            description: "UI/UX redesign."
        },
    ]
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>Changelog</h2>
        <ul className={"list border"}>
            {entries.map(value => <li key={value.version}>
                <div>
                    <h3>{value.version}</h3>
                    <time dateTime={value.date}>{value.displayDate}</time>
                    <p>{value.description}</p>
                </div>
            </li>)}
        </ul>
    </Container>;
}
