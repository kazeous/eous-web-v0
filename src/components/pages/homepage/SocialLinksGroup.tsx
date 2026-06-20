import {SocialMediaButton} from "../../ui/SocialMediaButton.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBluesky, faGithub, faTwitch, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faBlog} from "@fortawesome/free-solid-svg-icons/faBlog";

export function SocialLinksGroup() {
    return <article>
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faBlog}/>}
            link={"https://blog.kazeous.com"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faTwitter}/>}
            link={"https://twitter.com/kaze_ous"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faTwitch}/>}
            link={"https://www.twitch.tv/kazeous"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faBluesky}/>}
            link="https://bsky.app/profile/kazeous.bsky.social"
        />
    </article>;
}
