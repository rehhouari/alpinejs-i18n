declare const AlpineI18n: {
    version: string;
    /**
     * setter for the current locale
     */
    locale: string;
    currentLocale: string;
    /**
     * translations data
     * the first keys are the locale codes.
     */
    messages: any;
    /**
     * components that use the magic helpers
     */
    subscribers: never[];
    /**
     * event that will be dispatched when the locale changes
     * useful for when using outside of alpine components
     * like changing "dir" inside the body
     */
    localChange: Event;
    start(): void;
    /**
     * Set up i18n's default locale and data.
     * @param locale the default locale
     * @param messages the translation data
     */
    create(locale: string, messages: object): void;
    /**
     * Get the localized version of a string
     * @param name the name of the message
     * @param vars optional variables to be passed to the string
     * @returns string
     */
    t(name: string, vars: object): string;
    /**
     * Check if a locale exists in the message list
     * If it don't throw an Error. Does nothing otherwise.
     * @param locale locale to check
     */
    checkLocale(locale: string): void;
    /**
     * Save an element to update it when locale change
     * @param el The element that uses the magic helper
     */
    subscribe(el: never): void;
    /**
     * Update components that use the magic helpers
     * taken from Spruce
     */
    updateSubscribers(): void;
};
declare global {
    interface Window {
        Alpine: any;
        deferLoadingAlpine: any;
        AlpineI18n: typeof AlpineI18n;
    }
}
export default AlpineI18n;
