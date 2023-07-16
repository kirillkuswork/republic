export default function getScaledSizeSecond(size: number, width: number) {
    const divider = width > 1370 ? 1460 : width >= 1024 ? 1200 : width >= 541 ? 768 : 380;
    const scaledSize = (size / divider) * width;
    return Number(scaledSize.toFixed(0));
}
