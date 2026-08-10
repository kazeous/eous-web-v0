import {Container} from "../../ui/Container.tsx";
import {JustifiedGrid} from "react-justified-layout-ts";
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
import "./gallery.css";

export function Gallery() {
    const {images, altData, filters} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    // TODO Remove pages when you navigate
    const [page, setPage] = useQueryState("page", 1)
    const [displayMode, setDisplayMode] = useQueryState<"paginated" | "monthly" | "all">("displayMode", "paginated")
    const [filterMode, setFilterMode] = useQueryState<"and" | "or">("filterMode", "and")
    const [searchParams] = useSearchParams();
    const isDevelopment = useIsDevelopment();

    const pageSize = 4;

    useDocumentTitle("Gallery - kazeous.com");

    const displayedImages = images.filter(value => filters.doesImageMatch(value, filterMode)).sort((a, b) => b.published.localeCompare(a.published))
    const yearMonthPairs = Array.from(new Set(displayedImages.map(value => value.published.substring(0, 7)))).sort((a, b) => b.localeCompare(a));
    const displayedMonths = displayMode === "monthly" ? yearMonthPairs : yearMonthPairs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    const imagesForMonth: { [monthYear: string]: ImageInformation[] } = displayedImages.reduce<{ [monthYear: string]: ImageInformation[] }>((previousValue, currentValue) => ({...previousValue, [currentValue.published.substring(0, 7)]: (previousValue[currentValue.published.substring(0, 7)] ?? []).concat(currentValue)}), {})

    return <>
        <Container className="gallery-page fade">
            <div ref={ref}></div>
            <header className="gallery-header">
                <h1>Gallery</h1>
                <p>Artwork arranged by date, tags, and alternate versions.</p>
            </header>
            <fieldset className="gallery-filters">
                <legend>Filter Settings</legend>
                <RadioGroup value={filterMode} setValue={setFilterMode} options={["and", "or"]} label={"Filter Mode"}/>
                <GallerySearchbar/>
                <RadioGroup value={displayMode} setValue={setDisplayMode} options={["paginated", "monthly", "all"]} label={"Display Mode"} />
                {displayMode === "paginated" && <div><GalleryPagination page={page} className={"right-align"} setPage={setPage} maxPages={Math.ceil(yearMonthPairs.length / pageSize)}/></div>}
            </fieldset>
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
        </Container>
        {isDevelopment && <ArtworkUploader variant={"parent"}/>}
    </>;
}
