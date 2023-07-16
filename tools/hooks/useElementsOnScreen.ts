import { RefObject, useEffect, useRef, useState } from 'react';

export const useElementOnScreen = <T extends HTMLDivElement>(options?: IntersectionObserverInit): [RefObject<T>, boolean] => {
    const containerRef = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    const observeCallback: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        console.log(isVisible);
    };

    useEffect(() => {
        const { current: container } = containerRef;
        if (!container) return undefined;

        if (!('IntersectionObserver' in window)) return undefined;

        const observer = new IntersectionObserver(observeCallback, options);
        observer.observe(container);

        return () => observer.unobserve(container);
    }, [containerRef, options]);

    return [containerRef, isVisible];
};
