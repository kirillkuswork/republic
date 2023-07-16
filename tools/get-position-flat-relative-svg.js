const getPositionFlatRelativeSvg = (svgRef, target) => {
    const {
        left: targetLeft,
        top: targetTop,
        bottom: targetBottom,
        right: targetRight,
    } = target.getBoundingClientRect();

    const {
        left: svgLeft,
        top: svgTop,
        bottom: svgBottom,
        right: svgRight,
    } = svgRef.current.getBoundingClientRect();

    return {
        left: targetLeft - svgLeft,
        right: svgRight - targetRight,
        top: targetTop - svgTop,
        bottom: svgBottom - targetBottom
    };
};

export default getPositionFlatRelativeSvg;
