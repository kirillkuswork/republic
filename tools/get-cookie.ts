export const getCookie = (name: string) => {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // @ts-ignore
        return parts.pop().split(';').shift();
    }
};
