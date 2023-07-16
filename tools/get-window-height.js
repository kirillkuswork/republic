// получаем высоту окна

const getWindowHeight = () => {
    const windowHeight = () => {
        const doc = document.documentElement;
        const windowHeight = doc.clientHeight;
        doc.style.setProperty('--window-height', `${windowHeight}px`);
    }
    window.addEventListener('orientationchange', windowHeight);
    window.addEventListener('resize', windowHeight);
    windowHeight();
}

export default getWindowHeight;