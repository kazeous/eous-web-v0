import {type AltInformation, type ImageEntry, type ImageInformation, isAltInformation, isImageInformation} from "../../api/src/images/ImageInformation.ts";
import images from '../../api/src/images/images.json'
import hidden from '../../api/src/routes/local_scripts/hidden.json'
import {SelectedFilters} from "../../api/src/images/TagUtils.ts";
import {useQueryState} from "./useQueryState.ts";

const imageEntries = [...images, ...hidden] as ImageEntry[];
const imageData = imageEntries.filter(isImageInformation);
const altData = imageEntries
    .filter(isAltInformation)
    .reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map<string, AltInformation[]>());
const hiddenImageTitles = new Set((hidden as ImageEntry[]).filter(isImageInformation).map(image => image.title));

export function useTagHooks() {
    const [filterString, setFilterString] = useQueryState('filters', '');

    function isImageHidden(entry: ImageInformation): boolean {
        return hiddenImageTitles.has(entry.title)
    }

    return {filters: new SelectedFilters(filterString), setFilters: setFilterString, images: imageData, altData, imageEntries, isImageHidden};
}
