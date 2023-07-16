export default function getScaledSize(size: number, clientWidth: number) {
    const divider = clientWidth > 1370 ? 1460 : clientWidth >= 1024 ? 1200 : clientWidth >= 541 ? 768 : 380;
    const scaledSize = (size / divider) * clientWidth;
    return Number(scaledSize.toFixed(0));
}
