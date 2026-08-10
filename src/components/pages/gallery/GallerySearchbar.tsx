import {BeerCssCombobox} from "../../ui/BeerCssCombobox.tsx";
import {ArtTag, Rating, type SelectedFilters} from "../../../../api/src/images/TagUtils.ts";
import type {Option} from "react-multi-select-component";

export function GallerySearchbar(props: Readonly<{filters: SelectedFilters, onChange: (filters: string) => void}>) {
    /**
     * Get a sorted list of options by flattening the tagGroup object's values, and then inserting tags that aren't classified in the flattened array
     */
    function getSortedOptions() {
        const groupedTags = Object.values(ArtTag).flat().map(value => value.toString());
        const sortedTags = groupedTags.concat(Object.values(ArtTag).map(value => value.toString()).filter(value => !groupedTags.includes(value)));
        return sortedTags.concat(sortedTags.map(value => `-${value.toString()}`));
    }

    function handleFilterChange(value: Option[]) {
        const tagAndRatingNames = new Set<string>([...Object.values(ArtTag), ...Object.values(Rating)]);
        const remainingFilters = props.filters.toArray().filter(value => {
            const filterName = value.startsWith("-") ? value.substring(1) : value;
            return !tagAndRatingNames.has(filterName);
        });
        props.onChange([...remainingFilters, ...value.map(option => option.value)].join('+'));
    }


    return <BeerCssCombobox placeholder={"Select tags"}
                            className={"max"}
                            value={props.filters.toArray()
                                .filter(value => {
                                    const filterName = value.startsWith("-") ? value.substring(1) : value;
                                    return (Object.values(ArtTag) as string[]).includes(filterName) || (Object.values(Rating) as string[]).includes(filterName);
                                })
                                .map(value => ({value: value, label: value}))}
                            filterOptions={(options, query) => query === "" ? options.filter(value => !value.label.startsWith("-")) : options.filter(value => value.label.toLowerCase().startsWith(query.toLowerCase()))}
                            options={[...getSortedOptions(),
                                ...Object.values(Rating).flatMap(value => [value, `-${value}`])].map(value => ({label: value, value: value}))}
                            onChange={selectedOption => handleFilterChange(selectedOption)}/>;
}
