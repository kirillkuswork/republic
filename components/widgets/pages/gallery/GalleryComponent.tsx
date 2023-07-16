import React from 'react';
import PageScroller from './page-scroll/PageScroller';
import SliderSection from './SliderSection';
import DefaultHead from '../../../shared/head/DefaultHead';

const GalleryComponent: React.FC<{}> = ({}) => {
    return (
        <>
            <DefaultHead />
            <PageScroller>
                <SliderSection />
            </PageScroller>
        </>
    );
};

export default GalleryComponent;
