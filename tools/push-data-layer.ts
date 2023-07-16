declare global {
    interface Window {
        dataLayer: any[];
    }
}

export const pushDataLayer = (label: string) => {
    window.dataLayer.push({
        event: 'event-to-gtm',
        eventCategory: 'Form',
        eventAction: 'Send',
        eventLabel: label,
    });
};
