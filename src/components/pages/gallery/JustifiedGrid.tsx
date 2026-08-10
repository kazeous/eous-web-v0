import {Children, type CSSProperties, type ReactNode} from "react";

interface JustifiedGridProps {
    aspectRatioList: number[];
    width: number;
    children: ReactNode;
    targetRowHeight?: number;
    targetRowHeightTolerance?: number;
    itemSpacing?: number;
    rowSpacing?: number;
    containerStyle?: CSSProperties;
}

interface GridCell {
    aspectRatio: number;
    childIndex?: number;
}

function sumAspectRatios(cells: GridCell[]) {
    return cells.reduce((total, cell) => total + cell.aspectRatio, 0);
}

function createRows(
    aspectRatioList: number[],
    width: number,
    targetRowHeight: number,
    tolerance: number,
    itemSpacing: number,
) {
    const rows: GridCell[][] = [];
    let buffer: GridCell[] = [];
    const minRowWidth = width / (1 + tolerance);
    const maxRowWidth = width / (1 - tolerance);

    aspectRatioList.forEach((aspectRatio, childIndex) => {
        const nextWidth = (sumAspectRatios(buffer) + aspectRatio) * targetRowHeight
            + itemSpacing * buffer.length;

        if (buffer.length === 0 || nextWidth < maxRowWidth) {
            buffer.push({aspectRatio, childIndex});

            if (nextWidth > minRowWidth) {
                rows.push(buffer);
                buffer = [];
            } else if (childIndex === aspectRatioList.length - 1) {
                const remainingWidth = width
                    - sumAspectRatios(buffer) * targetRowHeight
                    - itemSpacing * Math.max(buffer.length - 1, 0);
                buffer.push({aspectRatio: Math.max(remainingWidth / targetRowHeight, 0)});
            }
        } else {
            rows.push(buffer);
            buffer = [{aspectRatio, childIndex}];
        }
    });

    if (buffer.length > 0) {
        rows.push(buffer);
    }

    return rows;
}

export function JustifiedGrid({
    aspectRatioList,
    width,
    children,
    targetRowHeight = 320,
    targetRowHeightTolerance = 0.25,
    itemSpacing = 8,
    rowSpacing = 8,
    containerStyle,
}: Readonly<JustifiedGridProps>) {
    const childNodes = Children.toArray(children);
    const rows = createRows(
        aspectRatioList,
        width,
        targetRowHeight,
        targetRowHeightTolerance,
        itemSpacing,
    );

    return <div style={{display: "flex", flexDirection: "column", gap: rowSpacing}}>
        {rows.map((row, rowIndex) =>
            <div
                className="justified-row"
                key={`row-${rowIndex}`}
                style={{display: "flex", flexDirection: "row", gap: itemSpacing}}
            >
                {row.map((cell, cellIndex) =>
                    <div
                        key={cell.childIndex === undefined ? `spacer-${cellIndex}` : `item-${cell.childIndex}`}
                        style={{
                            flex: row.length === 1 ? 1 : cell.aspectRatio,
                            minWidth: 0,
                            position: "relative",
                            ...containerStyle,
                        }}
                    >
                        {cell.childIndex === undefined ? null : childNodes[cell.childIndex]}
                    </div>
                )}
            </div>
        )}
    </div>;
}
