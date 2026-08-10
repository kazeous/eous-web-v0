import React, {type CSSProperties, type ReactNode, useEffect, useState} from "react";

export function SkeletonImage({children, debug = false, src, skeletonStyle}: { children: ReactNode, debug?: boolean, src: string, skeletonStyle: CSSProperties }) {
    const [isReady, setIsReady] = useState(isImageCached());
    function isImageCached() {
        const image = new Image();
        image.src = src;
        return image.complete;
    }

    useEffect(() => {
        const image = new Image();
        const markReady = () => {
            setIsReady(true);
        };

        image.addEventListener("load", markReady);
        image.src = src;

        return () => image.removeEventListener("load", markReady);
    }, [src]);

    if (isReady && !debug) {
        // TODO Make Skeleton also navigate even when unloaded
        return children;
    } else {
        return <div style={{height: '100%', background: 'var(--surface-container)', borderRadius: 4, animation: 'skeleton-animation 2s ease-in-out 0.5s infinite', ...skeletonStyle}}/>;
    }
}
