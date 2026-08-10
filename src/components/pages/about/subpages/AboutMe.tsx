import moodboard from "../../../../assets/about.webp";
import {Container} from "../../../ui/Container.tsx";
import Markdown from "react-markdown";

export function AboutMe() {
    // language=Markdown
    let intro = `**Name**: Vu  
**Country**: Viet Nam  
**Hobbies**: Video Games, Novels

yea idk what to write here yet
    
will comeback after I can think of some    
`;
    return <Container className="about-page fade">
        <div className="about-intro-grid">
            <div className="about-copy">
                <h1>About Me (IRL)</h1>
                <div className={"large-text"}>
                    <Markdown>
                        {intro}
                    </Markdown>
                </div>
            </div>
            <figure className="about-portrait">
                <img alt="Vu with Alcor" src={moodboard}/>
                <figcaption>Vu / Kaze</figcaption>
            </figure>
        </div>
    </Container>
    ;
}
