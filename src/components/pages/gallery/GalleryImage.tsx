import type {ImageInformation} from "../../../../api/src/images/ImageInformation.ts";
import {SkeletonImage} from "./SkeletonImage.tsx";
import {Link} from "react-router-dom";

export function GalleryImage(props: { value: ImageInformation, searchParams: string, hasAlts?: boolean }) {
    return <SkeletonImage src={props.value.thumbnailUrl} skeletonStyle={{aspectRatio: props.value.aspectRatio}}>
        <Link to={{pathname: props.value.id, search: "?" + props.searchParams.toString()}} style={{display: "contents"}}>
            <img alt={props.value.title} src={props.value.thumbnailUrl}/>
            {props.hasAlts && <button className="gallery-alt-button absolute secondary-container" aria-label="Artwork has alternate versions">
                <i>more</i>
            </button>}
        </Link>
    </SkeletonImage>;
}
