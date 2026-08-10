import moodboard from "../../../../assets/about.webp";

export function AboutMe() {
    return <div className="about-page fade">
        <div className="about-intro-grid">
            <div className="about-copy">
                <h1>About Me (IRL)</h1>
                <div className={"large-text"}>
                    <p><strong>Name:</strong> Vu</p>
                    <p><strong>Country:</strong> Viet Nam</p>
                    <p><strong>Hobbies:</strong> Video Games, Novels</p>
                    <p>yea idk what to write here yet</p>
                    <p>will comeback after I can think of some</p>
                </div>
            </div>
            <figure className="about-portrait">
                <img alt="Vu with Alcor" src={moodboard}/>
                <figcaption>Vu / Kaze</figcaption>
            </figure>
        </div>
    </div>
    ;
}
