import {Container} from "../../ui/Container.tsx";
import {JustifiedGrid} from "./JustifiedGrid.tsx";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import useMeasure from 'react-use-measure';
import {GallerySearchbar} from "./GallerySearchbar.tsx";
import {useSearchParams} from "react-router-dom";
import {ArtworkUploader} from "./uploader-modal/ArtworkUploader.tsx";
import {useDocumentTitle} from "usehooks-ts";
import {useQueryState} from "../../../hooks/useQueryState.ts";
import {GalleryPagination} from "./GalleryPagination.tsx";
import type {ImageInformation} from "../../../../api/src/images/ImageInformation.ts";
import {RadioGroup} from "../../ui/RadioGroup.tsx";
import {GalleryImage} from "./GalleryImage.tsx";
import {useIsDevelopment} from "../../../hooks/useIsDevelopment.ts";
import {artists, characters} from "../../../../api/src/images/TagUtils.ts";
import "./gallery.css";

export function Gallery() {
    const {images, altData, filters} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    // TODO Remove pages when you navigate
    const [page, setPage] = useQueryState("page", 1)
    const [displayMode, setDisplayMode] = useQueryState<"paginated" | "monthly" | "all">("displayMode", "paginated")
    const [filterMode, setFilterMode] = useQueryState<"and" | "or">("filterMode", "and")
    const [searchParams, setSearchParams] = useSearchParams();
    const isDevelopment = useIsDevelopment();

    const pageSize = 4;

    useDocumentTitle("Gallery - kazeous.com");

    const displayedImages = images.filter(value => filters.doesImageMatch(value, filterMode)).sort((a, b) => b.published.localeCompare(a.published))
    const yearMonthPairs = Array.from(new Set(displayedImages.map(value => value.published.substring(0, 7)))).sort((a, b) => b.localeCompare(a));
    const displayedMonths = displayMode === "monthly" ? yearMonthPairs : yearMonthPairs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    const imagesForMonth: { [monthYear: string]: ImageInformation[] } = displayedImages.reduce<{ [monthYear: string]: ImageInformation[] }>((previousValue, currentValue) => ({...previousValue, [currentValue.published.substring(0, 7)]: (previousValue[currentValue.published.substring(0, 7)] ?? []).concat(currentValue)}), {})
    const selectedArtist = artists.find(artist => filters.artists[artist] === 1) ?? "";

    function applyFilters(filterString: string) {
        const nextSearchParams = new URLSearchParams(searchParams);
        if (filterString === "") {
            nextSearchParams.delete("filters");
        } else {
            nextSearchParams.set("filters", JSON.stringify(filterString));
        }
        nextSearchParams.delete("page");
        setSearchParams(nextSearchParams, {replace: true});
    }

    function replaceFilterGroup(group: string[], selectedValue?: string) {
        const groupNames = new Set(group);
        const remainingFilters = filters.toArray().filter(value => {
            const filterName = value.startsWith("-") ? value.substring(1) : value;
            return !groupNames.has(filterName);
        });
        applyFilters([...remainingFilters, ...(selectedValue ? [selectedValue] : [])].join("+"));
    }

    function toggleCharacter(character: string) {
        const isSelected = filters.characters[character] === 1;
        const characterNames = new Set(characters);
        const remainingFilters = filters.toArray().filter(value => {
            const filterName = value.startsWith("-") ? value.substring(1) : value;
            return filterName !== character || !characterNames.has(filterName);
        });
        applyFilters([...remainingFilters, ...(isSelected ? [] : [character])].join("+"));
    }

    return <>
        <Container className="gallery-page fade" style={{maxWidth: "none"}}>
            <header className="gallery-header">
                <h1>Gallery</h1>
                <p>Artwork arranged by date, tags, and alternate versions.</p>
            </header>
            <div className="gallery-layout">
                <aside className="gallery-filter-column" aria-label="Gallery filters">
                    <fieldset className="gallery-filters">
                        <legend>Filter Settings</legend>
                        <p className="gallery-filter-count" aria-live="polite">
                            {displayedImages.length} {displayedImages.length === 1 ? "artwork" : "artworks"}
                        </p>
                        <RadioGroup value={filterMode} setValue={setFilterMode} options={["and", "or"]} label={"Filter Mode"}/>
                        <div className="gallery-filter-control">
                            <label className="gallery-filter-label" htmlFor="gallery-artist">Artist</label>
                            <select
                                id="gallery-artist"
                                className="gallery-artist-select"
                                value={selectedArtist}
                                onChange={event => replaceFilterGroup(artists, event.target.value || undefined)}
                            >
                                <option value="">All artists</option>
                                {artists.map(artist => <option key={artist} value={artist}>{artist}</option>)}
                            </select>
                        </div>
                        <div className="gallery-filter-control">
                            <span className="gallery-filter-label" id="gallery-characters-label">Characters</span>
                            <div className="gallery-character-list" role="group" aria-labelledby="gallery-characters-label">
                                {characters.map(character => {
                                    const isSelected = filters.characters[character] === 1;
                                    return <button
                                        key={character}
                                        type="button"
                                        className="gallery-character-filter"
                                        aria-pressed={isSelected}
                                        onClick={() => toggleCharacter(character)}
                                    >
                                        <span className="gallery-character-check" aria-hidden="true">{isSelected ? "✓" : ""}</span>
                                        {character}
                                    </button>;
                                })}
                            </div>
                        </div>
                        <div className="gallery-filter-control">
                            <span className="gallery-filter-label">Tags</span>
                            <GallerySearchbar filters={filters} onChange={applyFilters}/>
                        </div>
                        <RadioGroup value={displayMode} setValue={setDisplayMode} options={["paginated", "monthly", "all"]} label={"Display Mode"} />
                        {displayMode === "paginated" && <GalleryPagination page={page} setPage={setPage} maxPages={Math.ceil(yearMonthPairs.length / pageSize)}/>}
                    </fieldset>
                </aside>
                <div className="gallery-results" ref={ref}>
                    {(displayMode === "paginated" || displayMode === "monthly") && displayedMonths.map(value => {
                        const imagesInMonth = imagesForMonth[value]
                        return <section key={value} className="gallery-month">
                            <h2 className="gallery-date">{value}</h2>
                            <JustifiedGrid aspectRatioList={imagesInMonth.map(image => image.aspectRatio)} width={bounds.width}>
                                {imagesInMonth.map(value => <GalleryImage key={value.id} value={value} searchParams={searchParams.toString()} hasAlts={altData.has(value.title)}/>)}
                            </JustifiedGrid>
                        </section>;
                    })}
                    {displayMode === "all" && <JustifiedGrid aspectRatioList={displayedImages.map(value => value.aspectRatio)} width={bounds.width} targetRowHeight={350}>
                        {displayedImages.map(value => <GalleryImage key={value.id} value={value} searchParams={searchParams.toString()} hasAlts={altData.has(value.title)}/>)}
                    </JustifiedGrid>}
                    {displayedImages.length === 0 && <p className="gallery-empty">No artwork matches these filters.</p>}
                </div>
            </div>
        </Container>
        {isDevelopment && <ArtworkUploader variant={"parent"}/>}
    </>;
}
