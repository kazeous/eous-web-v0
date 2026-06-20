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
    return <Container className={"fade"}>
        <div className={"grid medium-space"}>
            <div className={"m6 s12"}>
                <h2 className={"primary-text"}>About Me (IRL)</h2>
                <div className={"large-text"}>
                    <Markdown>
                        {intro}
                    </Markdown>
                </div>
            </div>
            <img alt={"me and Alcor"} src={moodboard} style={{width: "100%", objectFit: "contain"}} className={"m6 s12"}/>
        </div>
    </Container>
    ;
}
